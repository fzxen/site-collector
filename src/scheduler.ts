import { requestMulti } from "./request";
import type { RequestTask, RequestTasks } from "./request";
import { PlainObj, debounce } from "./utils";

/**
 * 任务调度
 */

export type Schedular = ReturnType<typeof createSchedular>;
export type Transformer<T = any> = (task: T) => T | undefined;

enum STATUS {
  PENDING,
  WAITING,
}
const resolvedPromise = Promise.resolve();

const uidToSchedular = new Map<number, Schedular>();

export function getSchedular(uid: number) {
  return uidToSchedular.get(uid);
}

export function createSchedular(uid: number) {
  let status: STATUS = STATUS.WAITING;

  let transformer: Transformer;

  // Task Queue
  const requestQueue = new Set<RequestTask>();

  const flushQueue = debounce(() => {
    if (requestQueue.size > 0) {
      // divide task by url
      // url can be change by useConfig
      const taskGroup = Array.from(requestQueue).reduce<PlainObj<RequestTasks>>(
        (group, task) => {
          const { url, headers, properties } = task;
          group[url] = group[url] ?? { url, headers, properties: [] };
          group[url].properties.push(properties);
          return group;
        },
        {}
      );

      // report
      Object.keys(taskGroup).forEach((key) => {
        try {
          let task = taskGroup[key];
          if (transformer !== undefined) task = transformer(task);
          if (task) requestMulti(taskGroup[key]);
        } catch {}
      });
    }

    requestQueue.clear();
    status = STATUS.WAITING;
  }, 3000);

  const schedular = {
    queueTask(task: RequestTask) {
      requestQueue.add(task);

      if (status === STATUS.PENDING) return;
      status = STATUS.PENDING;
      resolvedPromise.then(flushQueue);
    },
    setTransformer(fn: Transformer) {
      transformer = fn;
    },
  };

  uidToSchedular.set(uid, schedular);

  return schedular;
}

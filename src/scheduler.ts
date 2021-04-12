import { requestMulti } from "./request";
import type { RequestTask, RequestTasks } from "./request";
import { PlainObj, debounce } from "./utils";

/**
 * 任务调度
 */

enum STATUS {
  PENDING,
  FLUSHING,
}

let status: STATUS = STATUS.PENDING;

const resolvedPromise = Promise.resolve();

// 任务队列
export const requestQueue: RequestTask[] = [];

export function queueTask(task: RequestTask) {
  requestQueue.push(task);

  if (status === STATUS.FLUSHING) return;
  status = STATUS.FLUSHING;
  resolvedPromise.then(flushTask);
}

export const flushTask = debounce(() => {
  // 根据 url，将所有请求任务分组
  const taskGroup = requestQueue.reduce<PlainObj<RequestTasks>>(
    (group, task) => {
      const { url, headers, properties } = task;
      group[url] = group[url] ?? { url, headers, properties: [] };
      group[url].properties.push(properties);
      return group;
    },
    {}
  );

  // 根据不同批量上报
  Object.keys(taskGroup).forEach((key) => {
    requestMulti(taskGroup[key]);
  });

  requestQueue.length = 0;
  status = STATUS.PENDING;
}, 3000);

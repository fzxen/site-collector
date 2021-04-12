import { queueTask } from "./scheduler";
import type { TrackerOptions } from "./tracker";
import type { RequestTask } from "./request";
import merge from "deepmerge";

/**
 * 自动捕获数据
 * 在没有实例化tracker之前，将track数据存放到autoQueue
 * 实例化tracker之后，将数据转移到requestQueue
 */

let hasTracker = false;
let url = "";
let global = {};

// 自动捕获的 任务队列
let autoQueue: RequestTask[] = [];

// 异常
window.addEventListener(
  "error",
  (ev) => {
    const task = {
      url,
      headers: {},
      properties: merge.all([{}, global, ev]),
    };
    if (hasTracker) {
      queueTask(task);
    } else autoQueue.push(task);
  },
  true
);

// TODO 性能数据

export function createAutoTrack(opts: TrackerOptions) {
  return function autoTrack() {
    hasTracker = true;
    url = opts.url;
    global = opts.global ?? global;

    // 将autoQueue 转移到 requestQueue
    autoQueue.forEach((task) => {
      queueTask(merge(task, { url, properties: global, header: {} }));
    });
    // 清空 autoQueue
    autoQueue.length = 0;
  };
}

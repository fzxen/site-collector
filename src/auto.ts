import { queueTask } from "./scheduler";
import type { TrackerOptions } from "./tracker";
import type { RequestTask } from "./request";
import { PlainObj, merge } from "./utils";

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

// * 监听脚本
window.onerror = function (message, source, lineno, colno, error) {
  const task = {
    url,
    headers: {},
    properties: merge.all([
      {},
      processDynamicGlobal(global),
      {
        _type: "SCRIPT_ERROR",
        _level: "error",
        message,
        source,
        lineno,
        colno,
        error,
      },
    ]),
  };
  if (hasTracker) {
    queueTask(task);
  } else autoQueue.push(task);
};

// * 监听资源加载
window.addEventListener(
  "error",
  (error) => {
    const target: any = error.target;
    const name = target?.localName;
    let sourceURL: string = "";
    // link
    if (name === "link") sourceURL = target?.href;
    // img video script ...
    else sourceURL = target?.src;
    if (sourceURL.length <= 0) return;

    const task = {
      url,
      headers: {},
      properties: merge.all([
        {},
        processDynamicGlobal(global),
        {
          _type: "SOURCES_FAILED",
          _level: "error",
          target: error.target,
          sourceURL,
        },
      ]),
    };
    if (hasTracker) {
      queueTask(task);
    } else autoQueue.push(task);
  },
  true
);

// * 监听未捕获的promise
window.addEventListener(
  "unhandledrejection",
  (event) => {
    const task = {
      url,
      headers: {},
      properties: merge.all([
        {},
        processDynamicGlobal(global),
        { _type: "UNCAUGHT_PROMISE", _level: "warn", reason: event.reason },
      ]),
    };
    if (hasTracker) {
      queueTask(task);
    } else autoQueue.push(task);
  },
  true
);

// 性能数据

export function createAutoTrack(opts: TrackerOptions) {
  return function autoTrack() {
    hasTracker = true;
    url = opts.url;
    global = opts.global ?? global;

    // 将autoQueue 转移到 requestQueue
    autoQueue.forEach((task) => {
      queueTask(
        merge(task, {
          url,
          properties: processDynamicGlobal(global),
          header: {},
        })
      );
    });
    // 清空 autoQueue
    autoQueue.length = 0;
  };
}

function processDynamicGlobal(global: PlainObj) {
  // 处理动态参数
  return Object.keys(global).reduce<PlainObj>((t, c) => {
    let value = global[c];
    if (typeof value === "function") {
      try {
        value = value();
      } catch {
        value = undefined;
      }
    }
    t[c] = value;
    return t;
  }, {});
}

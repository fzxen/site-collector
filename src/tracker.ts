import { PlainObj } from "./utils";
import { queueTask } from "./scheduler";
import { createAutoTrack } from "./auto";
import { useTransformer } from "./request";
import UAParser from "ua-parser-js";
import merge from "deepmerge";

export interface TrackerOptions {
  url: string;
  global?: PlainObj;
}

export interface Tracker {
  $url: string;
  track: (eventType: string, properties?: PlainObj, headers?: PlainObj) => void;
  autoTrack: () => void;
  useTransformer: typeof useTransformer;
}

function createDefaultGlobal() {
  const ua = new UAParser();
  const result = ua.getResult();

  return {
    _device: result,
    _path: location.href,
    _signalType: (navigator as any)?.connection?.effectiveType ?? "unknown",
  };
}

function processOptions(options: TrackerOptions) {
  const global = Object.assign(options.global ?? {}, createDefaultGlobal());
  const opts = Object.assign(options, { global });
  return opts;
}

export function createTracker(options: TrackerOptions): Tracker {
  const opts = processOptions(options);

  const tracker: Tracker = {
    $url: opts.url,
    track: createTrack(opts),
    autoTrack: createAutoTrack(opts),
    useTransformer,
  };
  return tracker;
}

function createTrack(opts: Required<TrackerOptions>) {
  let { url, global } = opts;

  return function (properties = {}, headers = {}) {
    // 处理动态参数
    global = Object.keys(global).reduce<PlainObj>((t, c) => {
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

    const task = {
      properties: merge.all([{}, global, properties]),
      headers,
      url,
    };

    queueTask(task);
  };
}

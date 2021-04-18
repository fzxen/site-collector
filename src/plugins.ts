import { PlainObj } from "./utils";

interface PluginFn {
  (task: PlainObj): PlainObj;
}

function createPluginUse() {
  export function use(point: "request", fn: PluginFn): PlainObj;
  export function use(point: string, fn: PluginFn) {
    if (point === "request") {
      return config;
    }
  }
}

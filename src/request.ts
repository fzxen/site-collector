import type { PlainObj } from "./utils";

export interface RequestTask {
  properties: object;
  url: string;
  headers: PlainObj;
}
export interface RequestTasks {
  properties: object[];
  url: string;
  headers: PlainObj;
}

type Transformer = (params: RequestTasks["properties"]) => string;
let transformer: Transformer;

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function request(task: RequestTasks, method: RequestMethod = "GET") {
  const { url, properties, headers } = task;

  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);

      Object.keys(headers).forEach((key) =>
        xhr.setRequestHeader(key, headers[key])
      );

      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

      xhr.addEventListener("load", resolve);
      xhr.addEventListener("error", reject);
      xhr.addEventListener("timeout", reject);

      xhr.timeout = 5000;

      const data = JSON.stringify(
        transformer ? transformer(properties) : properties
      );
      xhr.send(data);
    } catch (err) {
      reject(err);
    }
  });
}

export function requestMulti(task: RequestTasks) {
  return request(task, "POST");
}

export function useTransformer(fn: Transformer) {
  if (typeof fn !== "function")
    throw new Error("[site-collector error] transformer must be function!");
  transformer = fn;
}

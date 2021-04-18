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

type RequestMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function request(task: RequestTasks, method: RequestMethod = "GET") {
  const { url, properties, headers } = task;

  try {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Object.keys(headers).forEach((key) =>
      xhr.setRequestHeader(key, headers[key])
    );

    xhr.timeout = 5000;

    const data = JSON.stringify(properties);
    xhr.send(data);
  } catch (err) {
    // reject(err);
  }
}

export function requestMulti(task: RequestTasks) {
  request(task, "POST");
}

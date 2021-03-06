import deepmerge from "./libs/deepmerge.esm";
export interface PlainObj<T = any> {
  [props: string]: T;
}

export function getTypeof(obj: unknown) {
  return Object.prototype.toString
    .call([])
    .match(/\s(.*)]$/)![1]
    .toLowerCase();
}

export function isPlainObj(target: unknown): target is PlainObj<any> {
  return getTypeof(target) === "object";
}

export function debounce<T extends Function>(fn: T, delay: number) {
  let timer: any;
  return function (...args: unknown[]) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
}

export const merge = deepmerge;

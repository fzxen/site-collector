import { getLCP, getTTFB, getFCP, getFID, getCLS } from "web-vitals";
import { debounce } from "../utils";

type PerformanceFn = (...args: any[]) => void;

export function enableFcp(fn: PerformanceFn) {
  getFCP((metric) => {
    const fcp = metric.value;

    fn({ fcp });
  });
}

export function enableNetwork(fn: PerformanceFn) {
  getTTFB((metric) => {
    const requestTime = metric.value - (metric.entries[0] as any)?.requestStart;
    const ttfb = requestTime;

    // navigationTime
    const timing = performance?.timing;

    const props = {};
    if (timing.domainLookupStart && timing.domainLookupEnd) {
      Reflect.set(
        props,
        "dns",
        timing.domainLookupEnd - timing.domainLookupStart
      );
    }
    if (timing.connectEnd && timing.connectStart) {
      Reflect.set(props, "tcp", timing.connectEnd - timing.connectStart);
    }
    if (timing.connectEnd && timing.secureConnectionStart) {
      Reflect.set(
        props,
        "tls",
        timing.connectEnd - timing.secureConnectionStart
      );
    }
    if (timing.responseEnd && timing.responseStart) {
      Reflect.set(props, "response", timing.responseEnd - timing.responseStart);
    }

    fn({ ttfb, ...props });
  });
}

export function enableLcp(fn: PerformanceFn) {
  getLCP(
    debounce((metric: any) => {
      const lcp = metric.value;

      const entry = (metric.entries[metric.entries.length - 1] as any)?.element;
      let target = {};
      if (entry) {
        target = {
          tag: entry.localName,
          className: entry.className,
        };
      }
      fn({ lcp, target });
    }, 3000),
    true
  );
}

export function enableFid(fn: PerformanceFn) {
  getFID((metric) => {
    const timing = metric.entries[0];

    const element = (metric.entries[0] as any)?.target;
    let target = {};
    if (element) {
      target = {
        tag: element.localName,
        className: element.className,
      };
    }

    fn({ fid: metric.value, event: timing.name, target });
  }, true);
}

export function enableCls(fn: PerformanceFn) {
  getCLS((metric) => {
    const { value } = metric;
    fn({ cls: value });
  });
}

export function enableMutationObserver(fn: PerformanceFn) {
  const origin = performance.timeOrigin;

  const onMutate = debounce((now: number) => {
    let time = now - origin;
    observer.disconnect();
    fn({ time });
  }, 3000);

  setTimeout(() => {
    observer.disconnect();
  }, 10000);

  const observer = new MutationObserver(() => onMutate(Date.now()));

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true,
  });
}

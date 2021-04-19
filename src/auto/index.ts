import { Schedular } from "../scheduler";
import type { CollectorOptions } from "../collector";
import { PlainObj } from "../utils";
import {
  enableScriptError,
  enableResourcesError,
  enableUnhandledRejection,
} from "./error";
import { enableXhrAndFetch } from "./ajax";
import {
  enableFcp,
  enableLcp,
  enableNetwork,
  enableMutationObserver,
  enableFid,
  enableCls,
} from "./performance";

// * auto options
export interface AutoOptions {
  scriptError?: boolean;
  resourcesError?: boolean;
  unhandledrejection?: boolean;
  xhrAndFetchError?: boolean;
  first?: boolean;
  crash?: boolean;

  // web-vitals
  fcp?: boolean;
  lcp?: boolean;
  cls?: boolean;
  network?: boolean; // include ttfb
  fid?: boolean;
}
export const defaultAutoOptions: Readonly<AutoOptions> = {
  scriptError: false,
  resourcesError: false,
  unhandledrejection: false,
  xhrAndFetchError: false,
  first: false,
  crash: false,
  fcp: false,
  lcp: false,
  cls: false,
  network: false,
  fid: false,
};
const autoKeys = Object.keys(defaultAutoOptions);

// * urls
// collector will not collect these errors caused by itself
const urlMap = new Map<number, string>();

// * dependency map
// scriptError -> [{uid, options, schedular}]
type DepOption = {
  uid: number;
  options: Required<CollectorOptions>;
  schedular: Schedular;
};
const deps = new Map<keyof AutoOptions, Set<DepOption>>();

const uidToDepOptions = new Map<number, DepOption>();

/*
 * * Enable Data Catch
 */
// * watch script error
enableScriptError((message, source, lineno, colno, error) => {
  const dep = deps.get("scriptError");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "SCRIPT_ERROR",
        _level: "error",
        message,
        source,
        lineno,
        colno,
        error,
      }),
    });
  });
});

// * watch resources error
enableResourcesError((tagName, sourceURL) => {
  const dep = deps.get("resourcesError");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "RESOURCES_ERROR",
        _level: "error",
        tagName,
        sourceURL,
      }),
    });
  });
});

// * watch unhandledrejection
enableUnhandledRejection((reason) => {
  const dep = deps.get("unhandledrejection");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "UNHANDLED_REJECTION",
        _level: "error",
        reason,
      }),
    });
  });
});

// * watch xhr and fetch
enableXhrAndFetch((data) => {
  const dep = deps.get("xhrAndFetchError");
  if (dep === undefined) return;

  // avoid circular report
  const errorUrl = data.url;
  const urls = Array.from(urlMap.values());
  if (urls.includes(errorUrl)) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "XHR_AND_FETCH_ERROR",
        _level: "error",
        ...data,
      }),
    });
  });
});

/*
 * * Enable Performance Catch
 */
enableFcp((data) => {
  const dep = deps.get("fcp");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "FCP",
        _level: "info",
        ...data,
      }),
    });
  });
});
enableLcp((data) => {
  const dep = deps.get("lcp");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "LCP",
        _level: "info",
        ...data,
      }),
    });
  });
});
enableNetwork((data) => {
  const dep = deps.get("network");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "NETWORK",
        _level: "info",
        ...data,
      }),
    });
  });
});
enableFid((data) => {
  const dep = deps.get("fid");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "FID",
        _level: "info",
        ...data,
      }),
    });
  });
});
enableCls((data) => {
  const dep = deps.get("cls");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "CLS",
        _level: "info",
        ...data,
      }),
    });
  });
});
enableMutationObserver((data) => {
  const dep = deps.get("first");
  if (dep === undefined) return;

  dep.forEach(({ options, schedular }) => {
    const { url, headers, global } = options;
    schedular.queueTask({
      url,
      headers,
      properties: handleProperties(global, {
        _type: "FIRST",
        _level: "info",
        ...data,
      }),
    });
  });
});

export function createRegister(uid: number, url: string) {
  urlMap.set(uid, url);
  return function registerAutoCollector(
    depOption: DepOption,
    autoOptions: AutoOptions
  ) {
    // reset url
    const newUrl = depOption.options.url;
    urlMap.set(uid, newUrl);

    let oldDepOption = uidToDepOptions.get(depOption.uid);
    uidToDepOptions.set(depOption.uid, depOption);

    // add DepOptions into Dep map
    autoKeys.forEach((key: any) => {
      let dep = deps.get(key);
      if (dep === undefined) deps.set(key, (dep = new Set<DepOption>()));

      if (oldDepOption) dep.delete(oldDepOption);
      if (autoOptions[key as keyof AutoOptions] === true) dep.add(depOption);
    });
  };
}

function handleProperties(global: PlainObj, properties: PlainObj) {
  return Object.keys(global).reduce<PlainObj>(
    (t, c) => {
      if (t[c] !== undefined) return t;
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
    },
    { ...properties, ...{ _createTime: Date.now() } }
  );
}

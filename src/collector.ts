import { PlainObj, merge } from "./utils";
import { createSchedular, Transformer } from "./scheduler";
import { AutoOptions, defaultAutoOptions, createRegister } from "./auto";

export interface CollectorOptions {
  url: string;
  headers: PlainObj<string>;
  global?: PlainObj;
  deprecateRate: number;
}

let _uid = 0;

function standardizeOpts(opts: CollectorOptions) {
  return merge(opts, {
    headers: {},
    global: {
      _path: location.href,
      _signalType: (navigator as any)?.connection?.effectiveType ?? "unknown",
      _userAgent: navigator.userAgent,
    },
    deprecateRate: 0,
  });
}

export function createCollector(opts: CollectorOptions) {
  let options = standardizeOpts(opts);
  let autoOptions: AutoOptions;

  const uid = _uid++;

  const schedular = createSchedular(uid);
  const originalQueueTask = schedular.queueTask;

  // deprecate rate
  schedular.queueTask = function (args: any) {
    if (Math.random() < options.deprecateRate) return;
    originalQueueTask(args);
  };

  const { queueTask } = schedular;

  const registerAutoCollector = createRegister(uid, options.url);

  function useAutoFn(autoOpts?: AutoOptions) {
    autoOptions = autoOpts ? merge(defaultAutoOptions, autoOpts) : autoOptions;
    registerAutoCollector({ uid, options, schedular }, autoOptions);
  }

  return {
    _uid: uid,
    useConfig(opts: CollectorOptions) {
      options = standardizeOpts(opts);
      autoOptions && useAutoFn();
    },
    useTransformer(fn: Transformer) {
      schedular.setTransformer(fn);
    },
    /**
     * * collect
     * tips: properties will override global config
     */
    collect(properties: PlainObj) {
      const { url, headers, global } = options;

      // process global
      properties = Object.keys(global).reduce<PlainObj>(
        (t, c) => {
          // property will be ignore
          // when user passed this property
          if (t[c] !== undefined) return t;

          // dynamic property
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

      const task = {
        url,
        headers,
        properties,
      };

      queueTask(task);
    },

    useAuto(autoOpts: AutoOptions) {
      useAutoFn(autoOpts);
    },
  };
}

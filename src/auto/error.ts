type ScriptErrorFn = (
  message: string | Event,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error
) => void;
export function enableScriptError(fn: ScriptErrorFn) {
  window.onerror = function (message, source, lineno, colno, error) {
    fn(message, source, lineno, colno, error);
  };
}

type ResourcesErrorFn = (tagName: string, sourceURL: string) => void;
export function enableResourcesError(fn: ResourcesErrorFn) {
  window.addEventListener(
    "error",
    (error) => {
      try {
        const { localName, href, src } = error?.target ?? ({} as any);

        if (["link", "script", "img", "audio", "video"].indexOf(localName) < 0)
          return;

        let sourceURL: string = localName === "link" ? href : src;

        fn(localName, sourceURL);
      } catch {}
    },
    true
  );
}

type UnhandledRejectionFn = (reason: string) => void;
export function enableUnhandledRejection(fn: UnhandledRejectionFn) {
  window.addEventListener(
    "unhandledrejection",
    (event) => {
      fn(event.reason);
    },
    true
  );
}

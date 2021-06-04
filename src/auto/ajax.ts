interface XhrAndFetchErrorData {
  url: string;
  method: string;
  status: number;
  statusText: string;
  requestBody: any;
  responseBody: any;
  requestHeader?: any;
  responseHeader?: any;
}
type XhrAndFetchErrorFn = (data: XhrAndFetchErrorData) => void;

export function enableXhrAndFetch(fn: XhrAndFetchErrorFn) {
  if (window.XMLHttpRequest) {
    class XMLHttpRequestWithCatch extends XMLHttpRequest {
      private _method!: string;
      private _url!: string;
      private requestBody: any;
      constructor() {
        super();

        const send = this.send;
        const open = this.open;
        this.send = function (body) {
          this.requestBody = body;
          const handler = this.handleEvent;

          if (this.addEventListener !== undefined) {
            this.addEventListener("error", handler);
            this.addEventListener("load", handler);
            this.addEventListener("abort", handler);
          } else {
            const onStateChange = this.onreadystatechange;
            this.onreadystatechange = function (event) {
              if (this.readyState === 4) handler(event);
              onStateChange && onStateChange.call(this, event);
            };
          }
          return send.call(this, body);
        };

        this.open = function (...args: any) {
          const [method, url] = args;
          this._method = method;
          this._url = url;
          open.apply(this, args);
        };
      }
      handleEvent(ev: any) {
        const method = this._method;
        const url = this._url;
        const requestBody = this.requestBody;

        const target = ev?.currentTarget;

        // track 4xx and 5xx
        if (target && target.status >= 400) {
          const { status, statusText, response: responseBody } = target;

          fn({
            url,
            status,
            statusText,
            responseBody,
            requestBody,
            method,
          });
        }
      }
    }
    window.XMLHttpRequest = XMLHttpRequestWithCatch;
  }

  if (window.fetch !== undefined) {
    const fetch = window.fetch;

    window.fetch = function (...args) {
      function handleEvent(args: any, res?: any) {
        const [url, init] = args;
        fn({
          url,
          requestBody: init?.body,
          requestHeader: init?.headers,
          method: init?.method ?? "GET",
          status: res?.status ?? 0,
          statusText: res?.statusText ?? "failed",
          responseBody: res?.body,
          responseHeader: res?.headers,
        });
      }
      return fetch(...args)
        .then((res) => {
          if (!res.ok) handleEvent(args, res);
          return res;
        })
        .catch((error) => {
          handleEvent(args);
          throw error;
        });
    };
  }
}

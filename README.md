<p align="center">
  <img src="./resources/logo.png" width="256"/>
</p>
# site-collector

`site-collector` is a convenient tool for collecting all kinds of data of websites.
## Simple Example

```typescript
import { createCollector } from "site-collector"

// pass config object
const collector = createCollector({

  // request properties
  url: ""
  headers: {},

  // global properties
  global: {  

    // static property
    signalType: "4G",

    // dynamic property
    // fn will be recalled when collect
    custom: () => store.custom
  }
})

// collect data
collector.collect({ myProperty: 'value' })
```

## Multi Collector

```typescript
import { createCollector } from "site-collector";

const collectorA = createCollector({
  url: "/a",
});
const collectorB = createCollector({
  url: "/b",
});

collectorA.collect({ name: "zxfan" });
collectorB.collect({ name: "king" });
```

Two request will be sent.

## Advance

### Override Config

```typescript
collector.useConfig({
  url: ""
  headers: {},
  global: {}
})
```

### Auto Collect

set these key to `true`. collector will collect these data automatically.

```typescript
// all default false
collector.useAuto({
  scriptError: true,
  resourcesError: true,
  unhandledrejection: true,
  xhrAndFetchError: true,
  first: true,

  // web-vitals
  fcp: true,
  lcp: true,
  cls: true,
  network: true,
  fid: true
})
```

Options description:

- `scriptError`: script error will be caught by window.onerror
- `resourcesError`: Error that failed to load resource
- `unhandlerejection`: uncatched Promise error
- `xhrAndFetchError`: status of xmlHttpRequest and fetch is not `200`
- `first`: Time about page loading calculated by MutationObserver
- `fcp`: First Contentful Paint
- `lcp`: Largest Contentful Paint
- `cls`: Cumlative Layout Shift
- `fid`: First Input Delay
- `network`: network data fetched by performance api(include ttfb)

> Looking for more information about `fcp` `lcp`, Please read doc [web-vitals](https://www.npmjs.com/package/web-vitals)

### Transform properties

```typescript
collector.useTransformer((task) => {
  return task;
});
```

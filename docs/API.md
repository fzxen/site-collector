# API Description

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

```typescript
// all default false
collector.useAuto({
  scriptError: true,
  resourcesError: true,
  unhandledrejection: true,
  xhrAndFetchError: true,
  first: true,
  crash: true,

  // web-vitals
  fcp: true,
  lcp: true,
  cls: true,
  network: true,
  fid: true
})
```

### Plugins

```typescript

collector.use("properties", properties => {
  // transform properties
  return properties
})
```
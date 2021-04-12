# site-collector

`site-collector`是一个用于捕获异常数据、性能数据以及自定义数据的工具

## How to use?

```javascript
import { createTracker } from "site-collector"

const tracker = createTracker({
  url: "http://xxxx:xx/track"
   // 自定义全局参数
  global: {

    // 静态参数
    signalType: "4G",

    // 动态参数, 每次track都会执行函数
    custom: () => store.custom
  }
})

// 开启自动上报 数据
// 部分脚本错误和性能数据会自动捕获并上报
tracker.autoTrack()


// 转换参数
tracker.useTransformer((tasks) => {
  // todo
  return tasks
})

tracker.track({ uid: "xxxxx" })

```

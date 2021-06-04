function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var isMergeableObject = function isMergeableObject(value) {
  return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
  return !!value && _typeof(value) === 'object';
}

function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}

function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function (element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}

function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }

  var customMerge = options.customMerge(key);
  return typeof customMerge === 'function' ? customMerge : deepmerge;
}

function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}

function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}

function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
} // Protects from prototype poisoning and unexpected merging up the prototype chain.


function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
  var destination = {};

  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function (key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }

  getKeys(source).forEach(function (key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }

    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}

function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
  // implementations can use it. The caller may not replace it.

  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}

deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error('first argument should be an array');
  }

  return array.reduce(function (prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};

var deepmerge_1 = deepmerge;

function debounce(fn, delay) {
  var timer;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(null, args);
    }, delay);
  };
}
var merge = deepmerge_1;

function request(task) {
  var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
  var url = task.url,
      properties = task.properties,
      headers = task.headers;

  try {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Object.keys(headers).forEach(function (key) {
      return xhr.setRequestHeader(key, headers[key]);
    });
    xhr.timeout = 5000;
    var data = JSON.stringify(properties);
    xhr.send(data);
  } catch (err) {// reject(err);
  }
}

function requestMulti(task) {
  request(task, "POST");
}

var STATUS;

(function (STATUS) {
  STATUS[STATUS["PENDING"] = 0] = "PENDING";
  STATUS[STATUS["WAITING"] = 1] = "WAITING";
})(STATUS || (STATUS = {}));

var resolvedPromise = Promise.resolve();
var uidToSchedular = new Map();
function createSchedular(uid) {
  var status = STATUS.WAITING;
  var transformer; // Task Queue

  var requestQueue = new Set();
  var flushQueue = debounce(function () {
    if (requestQueue.size > 0) {
      // divide task by url
      // url can be change by useConfig
      var taskGroup = Array.from(requestQueue).reduce(function (group, task) {
        var _a;

        var url = task.url,
            headers = task.headers,
            properties = task.properties;
        group[url] = (_a = group[url]) !== null && _a !== void 0 ? _a : {
          url: url,
          headers: headers,
          properties: []
        };
        group[url].properties.push(properties);
        return group;
      }, {}); // report

      Object.keys(taskGroup).forEach(function (key) {
        try {
          var task = taskGroup[key];
          if (transformer !== undefined) task = transformer(task);
          if (task) requestMulti(taskGroup[key]);
        } catch (_a) {}
      });
    }

    requestQueue.clear();
    status = STATUS.WAITING;
  }, 3000);
  var schedular = {
    queueTask: function queueTask(task) {
      requestQueue.add(task);
      if (status === STATUS.PENDING) return;
      status = STATUS.PENDING;
      resolvedPromise.then(flushQueue);
    },
    setTransformer: function setTransformer(fn) {
      transformer = fn;
    }
  };
  uidToSchedular.set(uid, schedular);
  return schedular;
}

function enableScriptError(fn) {
  window.onerror = function (message, source, lineno, colno, error) {
    fn(message, source, lineno, colno, error);
  };
}
function enableResourcesError(fn) {
  window.addEventListener("error", function (error) {
    var _a;

    try {
      var _ref = (_a = error === null || error === void 0 ? void 0 : error.target) !== null && _a !== void 0 ? _a : {},
          localName = _ref.localName,
          href = _ref.href,
          src = _ref.src;

      if (["link", "script", "img", "audio", "video"].indexOf(localName) < 0) return;
      var sourceURL = localName === "link" ? href : src;
      fn(localName, sourceURL);
    } catch (_b) {}
  }, true);
}
function enableUnhandledRejection(fn) {
  window.addEventListener("unhandledrejection", function (event) {
    fn(event.reason);
  }, true);
}

function enableXhrAndFetch(fn) {
  if (window.XMLHttpRequest) {
    var XMLHttpRequestWithCatch = /*#__PURE__*/function (_XMLHttpRequest) {
      _inherits(XMLHttpRequestWithCatch, _XMLHttpRequest);

      var _super = _createSuper(XMLHttpRequestWithCatch);

      function XMLHttpRequestWithCatch() {
        var _this;

        _classCallCheck(this, XMLHttpRequestWithCatch);

        _this = _super.call(this);
        var send = _this.send;
        var open = _this.open;

        _this.send = function (body) {
          this.requestBody = body;
          var handler = this.handleEvent;

          if (this.addEventListener !== undefined) {
            this.addEventListener("error", handler);
            this.addEventListener("load", handler);
            this.addEventListener("abort", handler);
          } else {
            var onStateChange = this.onreadystatechange;

            this.onreadystatechange = function (event) {
              if (this.readyState === 4) handler(event);
              onStateChange && onStateChange.call(this, event);
            };
          }

          return send.call(this, body);
        };

        _this.open = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var method = args[0],
              url = args[1];
          this._method = method;
          this._url = url;
          open.apply(this, args);
        };

        return _this;
      }

      _createClass(XMLHttpRequestWithCatch, [{
        key: "handleEvent",
        value: function handleEvent(ev) {
          var method = this._method;
          var url = this._url;
          var requestBody = this.requestBody;
          var target = ev === null || ev === void 0 ? void 0 : ev.currentTarget;

          if (target && target.status !== 200) {
            var status = target.status,
                statusText = target.statusText,
                responseBody = target.response;
            fn({
              url: url,
              status: status,
              statusText: statusText,
              responseBody: responseBody,
              requestBody: requestBody,
              method: method
            });
          }
        }
      }]);

      return XMLHttpRequestWithCatch;
    }( /*#__PURE__*/_wrapNativeSuper(XMLHttpRequest));

    window.XMLHttpRequest = XMLHttpRequestWithCatch;
  }

  if (window.fetch !== undefined) {
    var fetch = window.fetch;

    window.fetch = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      function handleEvent(args, res) {
        var _a, _b, _c;

        var _args = _slicedToArray(args, 2),
            url = _args[0],
            init = _args[1];

        fn({
          url: url,
          requestBody: init === null || init === void 0 ? void 0 : init.body,
          requestHeader: init === null || init === void 0 ? void 0 : init.headers,
          method: (_a = init === null || init === void 0 ? void 0 : init.method) !== null && _a !== void 0 ? _a : "GET",
          status: (_b = res === null || res === void 0 ? void 0 : res.status) !== null && _b !== void 0 ? _b : 0,
          statusText: (_c = res === null || res === void 0 ? void 0 : res.statusText) !== null && _c !== void 0 ? _c : "failed",
          responseBody: res === null || res === void 0 ? void 0 : res.body,
          responseHeader: res === null || res === void 0 ? void 0 : res.headers
        });
      }

      return fetch.apply(void 0, args).then(function (res) {
        if (!res.ok) handleEvent(args, res);
        return res;
      }).catch(function (error) {
        handleEvent(args);
        throw error;
      });
    };
  }
}

var e,
    t,
    n,
    i,
    a = function a(e, t) {
  return {
    name: e,
    value: void 0 === t ? -1 : t,
    delta: 0,
    entries: [],
    id: "v1-".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12)
  };
},
    r = function r(e, t) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(e)) {
      var n = new PerformanceObserver(function (e) {
        return e.getEntries().map(t);
      });
      return n.observe({
        type: e,
        buffered: !0
      }), n;
    }
  } catch (e) {}
},
    o = function o(e, t) {
  var n = function n(i) {
    "pagehide" !== i.type && "hidden" !== document.visibilityState || (e(i), t && (removeEventListener("visibilitychange", n, !0), removeEventListener("pagehide", n, !0)));
  };

  addEventListener("visibilitychange", n, !0), addEventListener("pagehide", n, !0);
},
    c = function c(e) {
  addEventListener("pageshow", function (t) {
    t.persisted && e(t);
  }, !0);
},
    u = "function" == typeof WeakSet ? new WeakSet() : new Set(),
    s = function s(e, t, n) {
  var i;
  return function () {
    t.value >= 0 && (n || u.has(t) || "hidden" === document.visibilityState) && (t.delta = t.value - (i || 0), (t.delta || void 0 === i) && (i = t.value, e(t)));
  };
},
    f = function f(e, t) {
  var n,
      i = a("CLS", 0),
      u = function u(e) {
    e.hadRecentInput || (i.value += e.value, i.entries.push(e), n());
  },
      f = r("layout-shift", u);

  f && (n = s(e, i, t), o(function () {
    f.takeRecords().map(u), n();
  }), c(function () {
    i = a("CLS", 0), n = s(e, i, t);
  }));
},
    m = -1,
    v = function v() {
  return "hidden" === document.visibilityState ? 0 : 1 / 0;
},
    d = function d() {
  o(function (e) {
    var t = e.timeStamp;
    m = t;
  }, !0);
},
    p = function p() {
  return m < 0 && (m = v(), d(), c(function () {
    setTimeout(function () {
      m = v(), d();
    }, 0);
  })), {
    get timeStamp() {
      return m;
    }

  };
},
    l = function l(e, t) {
  var n,
      i = p(),
      o = a("FCP"),
      f = r("paint", function (e) {
    "first-contentful-paint" === e.name && (f && f.disconnect(), e.startTime < i.timeStamp && (o.value = e.startTime, o.entries.push(e), u.add(o), n()));
  });
  f && (n = s(e, o, t), c(function (i) {
    o = a("FCP"), n = s(e, o, t), requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        o.value = performance.now() - i.timeStamp, u.add(o), n();
      });
    });
  }));
},
    h = {
  passive: !0,
  capture: !0
},
    S = new Date(),
    y = function y(i, a) {
  e || (e = a, t = i, n = new Date(), w(removeEventListener), g());
},
    g = function g() {
  if (t >= 0 && t < n - S) {
    var a = {
      entryType: "first-input",
      name: e.type,
      target: e.target,
      cancelable: e.cancelable,
      startTime: e.timeStamp,
      processingStart: e.timeStamp + t
    };
    i.forEach(function (e) {
      e(a);
    }), i = [];
  }
},
    E = function E(e) {
  if (e.cancelable) {
    var t = (e.timeStamp > 1e12 ? new Date() : performance.now()) - e.timeStamp;
    "pointerdown" == e.type ? function (e, t) {
      var n = function n() {
        y(e, t), a();
      },
          i = function i() {
        a();
      },
          a = function a() {
        removeEventListener("pointerup", n, h), removeEventListener("pointercancel", i, h);
      };

      addEventListener("pointerup", n, h), addEventListener("pointercancel", i, h);
    }(t, e) : y(t, e);
  }
},
    w = function w(e) {
  ["mousedown", "keydown", "touchstart", "pointerdown"].forEach(function (t) {
    return e(t, E, h);
  });
},
    L = function L(n, f) {
  var m,
      v = p(),
      d = a("FID"),
      l = function l(e) {
    e.startTime < v.timeStamp && (d.value = e.processingStart - e.startTime, d.entries.push(e), u.add(d), m());
  },
      h = r("first-input", l);

  m = s(n, d, f), h && o(function () {
    h.takeRecords().map(l), h.disconnect();
  }, !0), h && c(function () {
    var r;
    d = a("FID"), m = s(n, d, f), i = [], t = -1, e = null, w(addEventListener), r = l, i.push(r), g();
  });
},
    T = function T(e, t) {
  var n,
      i = p(),
      f = a("LCP"),
      m = function m(e) {
    var t = e.startTime;
    t < i.timeStamp && (f.value = t, f.entries.push(e)), n();
  },
      v = r("largest-contentful-paint", m);

  if (v) {
    n = s(e, f, t);

    var d = function d() {
      u.has(f) || (v.takeRecords().map(m), v.disconnect(), u.add(f), n());
    };

    ["keydown", "click"].forEach(function (e) {
      addEventListener(e, d, {
        once: !0,
        capture: !0
      });
    }), o(d, !0), c(function (i) {
      f = a("LCP"), n = s(e, f, t), requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          f.value = performance.now() - i.timeStamp, u.add(f), n();
        });
      });
    });
  }
},
    b = function b(e) {
  var t,
      n = a("TTFB");
  t = function t() {
    try {
      var t = performance.getEntriesByType("navigation")[0] || function () {
        var e = performance.timing,
            t = {
          entryType: "navigation",
          startTime: 0
        };

        for (var n in e) {
          "navigationStart" !== n && "toJSON" !== n && (t[n] = Math.max(e[n] - e.navigationStart, 0));
        }

        return t;
      }();

      n.value = n.delta = t.responseStart, n.entries = [t], e(n);
    } catch (e) {}
  }, "complete" === document.readyState ? setTimeout(t, 0) : addEventListener("pageshow", t);
};

function enableFcp(fn) {
  l(function (metric) {
    var fcp = metric.value;
    fn({
      fcp: fcp
    });
  });
}
function enableNetwork(fn) {
  b(function (metric) {
    var _a;

    var requestTime = metric.value - ((_a = metric.entries[0]) === null || _a === void 0 ? void 0 : _a.requestStart);
    var ttfb = requestTime; // navigationTime

    var timing = performance === null || performance === void 0 ? void 0 : performance.timing;
    var props = {};

    if (timing.domainLookupStart && timing.domainLookupEnd) {
      Reflect.set(props, "dns", timing.domainLookupEnd - timing.domainLookupStart);
    }

    if (timing.connectEnd && timing.connectStart) {
      Reflect.set(props, "tcp", timing.connectEnd - timing.connectStart);
    }

    if (timing.connectEnd && timing.secureConnectionStart) {
      Reflect.set(props, "tls", timing.connectEnd - timing.secureConnectionStart);
    }

    if (timing.responseEnd && timing.responseStart) {
      Reflect.set(props, "response", timing.responseEnd - timing.responseStart);
    }

    fn(Object.assign({
      ttfb: ttfb
    }, props));
  });
}
function enableLcp(fn) {
  T(debounce(function (metric) {
    var _a;

    var lcp = metric.value;
    var entry = (_a = metric.entries[metric.entries.length - 1]) === null || _a === void 0 ? void 0 : _a.element;
    var target = {};

    if (entry) {
      target = {
        tag: entry.localName,
        className: entry.className
      };
    }

    fn({
      lcp: lcp,
      target: target
    });
  }, 3000), true);
}
function enableFid(fn) {
  L(function (metric) {
    var _a;

    var timing = metric.entries[0];
    var element = (_a = metric.entries[0]) === null || _a === void 0 ? void 0 : _a.target;
    var target = {};

    if (element) {
      target = {
        tag: element.localName,
        className: element.className
      };
    }

    fn({
      fid: metric.value,
      event: timing.name,
      target: target
    });
  }, true);
}
function enableCls(fn) {
  f(function (metric) {
    var value = metric.value;
    fn({
      cls: value
    });
  });
}
function enableMutationObserver(fn) {
  var origin = performance.timeOrigin;
  var onMutate = debounce(function () {
    var time = Date.now() - origin;
    observer.disconnect();
    fn({
      time: time
    });
  }, 5000);
  setTimeout(function () {
    observer.disconnect();
  }, 10000);
  var observer = new MutationObserver(onMutate);
  observer.observe(document.body, {
    childList: true,
    attributes: true,
    subtree: true
  });
}

var defaultAutoOptions = {
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
  fid: false
};
var autoKeys = Object.keys(defaultAutoOptions); // * urls
// collector will not collect these errors caused by itself

var urlMap = new Map();
var deps = new Map();
var uidToDepOptions = new Map();
/*
 * * Enable Data Catch
 */
// * watch script error

enableScriptError(function (message, source, lineno, colno, error) {
  var dep = deps.get("scriptError");
  if (dep === undefined) return;
  dep.forEach(function (_ref) {
    var options = _ref.options,
        schedular = _ref.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, {
        _type: "SCRIPT_ERROR",
        _level: "error",
        message: message,
        source: source,
        lineno: lineno,
        colno: colno,
        error: error
      })
    });
  });
}); // * watch resources error

enableResourcesError(function (tagName, sourceURL) {
  var dep = deps.get("resourcesError");
  if (dep === undefined) return;
  dep.forEach(function (_ref2) {
    var options = _ref2.options,
        schedular = _ref2.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, {
        _type: "RESOURCES_ERROR",
        _level: "error",
        tagName: tagName,
        sourceURL: sourceURL
      })
    });
  });
}); // * watch unhandledrejection

enableUnhandledRejection(function (reason) {
  var dep = deps.get("unhandledrejection");
  if (dep === undefined) return;
  dep.forEach(function (_ref3) {
    var options = _ref3.options,
        schedular = _ref3.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, {
        _type: "UNHANDLED_REJECTION",
        _level: "error",
        reason: reason
      })
    });
  });
}); // * watch xhr and fetch

enableXhrAndFetch(function (data) {
  var dep = deps.get("xhrAndFetchError");
  if (dep === undefined) return; // avoid circular report

  var errorUrl = data.url;
  var urls = Array.from(urlMap.values());
  if (urls.includes(errorUrl)) return;
  dep.forEach(function (_ref4) {
    var options = _ref4.options,
        schedular = _ref4.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "XHR_AND_FETCH_ERROR",
        _level: "error"
      }, data))
    });
  });
});
/*
 * * Enable Performance Catch
 */

enableFcp(function (data) {
  var dep = deps.get("fcp");
  if (dep === undefined) return;
  dep.forEach(function (_ref5) {
    var options = _ref5.options,
        schedular = _ref5.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "FCP",
        _level: "info"
      }, data))
    });
  });
});
enableLcp(function (data) {
  var dep = deps.get("lcp");
  if (dep === undefined) return;
  dep.forEach(function (_ref6) {
    var options = _ref6.options,
        schedular = _ref6.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "LCP",
        _level: "info"
      }, data))
    });
  });
});
enableNetwork(function (data) {
  var dep = deps.get("network");
  if (dep === undefined) return;
  dep.forEach(function (_ref7) {
    var options = _ref7.options,
        schedular = _ref7.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "NETWORK",
        _level: "info"
      }, data))
    });
  });
});
enableFid(function (data) {
  var dep = deps.get("fid");
  if (dep === undefined) return;
  dep.forEach(function (_ref8) {
    var options = _ref8.options,
        schedular = _ref8.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "FID",
        _level: "info"
      }, data))
    });
  });
});
enableCls(function (data) {
  var dep = deps.get("cls");
  if (dep === undefined) return;
  dep.forEach(function (_ref9) {
    var options = _ref9.options,
        schedular = _ref9.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "CLS",
        _level: "info"
      }, data))
    });
  });
});
enableMutationObserver(function (data) {
  var dep = deps.get("first");
  if (dep === undefined) return;
  dep.forEach(function (_ref10) {
    var options = _ref10.options,
        schedular = _ref10.schedular;
    var url = options.url,
        headers = options.headers,
        global = options.global;
    schedular.queueTask({
      url: url,
      headers: headers,
      properties: handleProperties(global, Object.assign({
        _type: "FIRST",
        _level: "info"
      }, data))
    });
  });
});
function createRegister(uid, url) {
  urlMap.set(uid, url);
  return function registerAutoCollector(depOption, autoOptions) {
    // reset url
    var newUrl = depOption.options.url;
    urlMap.set(uid, newUrl);
    var oldDepOption = uidToDepOptions.get(depOption.uid);
    uidToDepOptions.set(depOption.uid, depOption); // add DepOptions into Dep map

    autoKeys.forEach(function (key) {
      var dep = deps.get(key);
      if (dep === undefined) deps.set(key, dep = new Set());
      if (oldDepOption) dep.delete(oldDepOption);
      if (autoOptions[key] === true) dep.add(depOption);
    });
  };
}

function handleProperties(global, properties) {
  return Object.keys(global).reduce(function (t, c) {
    if (t[c] !== undefined) return t;
    var value = global[c];

    if (typeof value === "function") {
      try {
        value = value();
      } catch (_a) {
        value = undefined;
      }
    }

    t[c] = value;
    return t;
  }, Object.assign(Object.assign({}, properties), {
    _createTime: Date.now()
  }));
}

var _uid = 0;

function standardizeOpts(opts) {
  var _a, _b, _c;

  return merge(opts, {
    headers: {},
    global: {
      _path: location.href,
      _signalType: (_c = (_b = (_a = navigator) === null || _a === void 0 ? void 0 : _a.connection) === null || _b === void 0 ? void 0 : _b.effectiveType) !== null && _c !== void 0 ? _c : "unknown",
      _userAgent: navigator.userAgent
    },
    deprecateRate: 0
  });
}

function createCollector(opts) {
  var options = standardizeOpts(opts);
  var autoOptions;
  var uid = _uid++;
  var schedular = createSchedular(uid);
  var originalQueueTask = schedular.queueTask; // deprecate rate

  schedular.queueTask = function (args) {
    if (Math.random() < options.deprecateRate) return;
    originalQueueTask(args);
  };

  var queueTask = schedular.queueTask;
  var registerAutoCollector = createRegister(uid, options.url);

  function useAutoFn(autoOpts) {
    autoOptions = autoOpts ? merge(defaultAutoOptions, autoOpts) : autoOptions;
    registerAutoCollector({
      uid: uid,
      options: options,
      schedular: schedular
    }, autoOptions);
  }

  return {
    _uid: uid,
    useConfig: function useConfig(opts) {
      options = standardizeOpts(opts);
      autoOptions && useAutoFn();
    },
    useTransformer: function useTransformer(fn) {
      schedular.setTransformer(fn);
    },

    /**
     * * collect
     * tips: properties will override global config
     */
    collect: function collect(properties) {
      var _options = options,
          url = _options.url,
          headers = _options.headers,
          global = _options.global; // process global

      properties = Object.keys(global).reduce(function (t, c) {
        // property will be ignore
        // when user passed this property
        if (t[c] !== undefined) return t; // dynamic property

        var value = global[c];

        if (typeof value === "function") {
          try {
            value = value();
          } catch (_a) {
            value = undefined;
          }
        }

        t[c] = value;
        return t;
      }, Object.assign(Object.assign({}, properties), {
        _createTime: Date.now()
      }));
      var task = {
        url: url,
        headers: headers,
        properties: properties
      };
      queueTask(task);
    },
    useAuto: function useAuto(autoOpts) {
      useAutoFn(autoOpts);
    }
  };
}

export { createCollector };

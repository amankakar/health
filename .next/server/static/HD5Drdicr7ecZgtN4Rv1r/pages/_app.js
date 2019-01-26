module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "0Bsm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(__webpack_require__("cDcd"));
var prop_types_1 = __importDefault(__webpack_require__("rf6O"));
var hoist_non_react_statics_1 = __importDefault(__webpack_require__("2mql"));
var utils_1 = __webpack_require__("p8BD");
function withRouter(ComposedComponent) {
    var displayName = utils_1.getDisplayName(ComposedComponent);
    var WithRouteWrapper = /** @class */ (function (_super) {
        __extends(WithRouteWrapper, _super);
        function WithRouteWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithRouteWrapper.prototype.render = function () {
            return react_1.default.createElement(ComposedComponent, __assign({ router: this.context.router }, this.props));
        };
        WithRouteWrapper.contextTypes = {
            router: prop_types_1.default.object
        };
        WithRouteWrapper.displayName = "withRouter(" + displayName + ")";
        return WithRouteWrapper;
    }(react_1.Component));
    return hoist_non_react_statics_1.default(WithRouteWrapper, ComposedComponent);
}
exports.default = withRouter;


/***/ }),

/***/ "20a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("nOHt")


/***/ }),

/***/ "2mql":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__("UWCm");
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
        var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("B5Ud");


/***/ }),

/***/ "B5Ud":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(__webpack_require__("cDcd"));
var prop_types_1 = __importDefault(__webpack_require__("rf6O"));
var utils_1 = __webpack_require__("p8BD");
var router_1 = __webpack_require__("20a2");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.getInitialProps = function (_a) {
        var Component = _a.Component, router = _a.router, ctx = _a.ctx;
        return __awaiter(this, void 0, void 0, function () {
            var pageProps;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, utils_1.loadGetInitialProps(Component, ctx)];
                    case 1:
                        pageProps = _b.sent();
                        return [2 /*return*/, { pageProps: pageProps }];
                }
            });
        });
    };
    App.prototype.getChildContext = function () {
        return {
            router: router_1.makePublicRouterInstance(this.props.router)
        };
    };
    // Kept here for backwards compatibility.
    // When someone ended App they could call `super.componentDidCatch`. This is now deprecated.
    App.prototype.componentDidCatch = function (err) {
        throw err;
    };
    App.prototype.render = function () {
        var _a = this.props, router = _a.router, Component = _a.Component, pageProps = _a.pageProps;
        var url = createUrl(router);
        return (react_1.default.createElement(Container, null,
            react_1.default.createElement(Component, __assign({}, pageProps, { url: url }))));
    };
    App.childContextTypes = {
        router: prop_types_1.default.object
    };
    return App;
}(react_1.Component));
exports.default = App;
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Container.prototype.componentDidMount = function () {
        this.scrollToHash();
    };
    Container.prototype.componentDidUpdate = function () {
        this.scrollToHash();
    };
    Container.prototype.scrollToHash = function () {
        var hash = window.location.hash;
        hash = hash ? hash.substring(1) : false;
        if (!hash)
            return;
        var el = document.getElementById(hash);
        if (!el)
            return;
        // If we call scrollIntoView() in here without a setTimeout
        // it won't scroll properly.
        setTimeout(function () { return el.scrollIntoView(); }, 0);
    };
    Container.prototype.render = function () {
        return this.props.children;
    };
    return Container;
}(react_1.Component));
exports.Container = Container;
var warnUrl = utils_1.execOnce(function () {
    if (false) {}
});
function createUrl(router) {
    // This is to make sure we don't references the router object at call time
    var pathname = router.pathname, asPath = router.asPath, query = router.query;
    return {
        get query() {
            warnUrl();
            return query;
        },
        get pathname() {
            warnUrl();
            return pathname;
        },
        get asPath() {
            warnUrl();
            return asPath;
        },
        back: function () {
            warnUrl();
            router.back();
        },
        push: function (url, as) {
            warnUrl();
            return router.push(url, as);
        },
        pushTo: function (href, as) {
            warnUrl();
            var pushRoute = as ? href : null;
            var pushUrl = as || href;
            return router.push(pushRoute, pushUrl);
        },
        replace: function (url, as) {
            warnUrl();
            return router.replace(url, as);
        },
        replaceTo: function (href, as) {
            warnUrl();
            var replaceRoute = as ? href : null;
            var replaceUrl = as || href;
            return router.replace(replaceRoute, replaceUrl);
        }
    };
}
exports.createUrl = createUrl;


/***/ }),

/***/ "UWCm":
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "nOHt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* global window */
var router_1 = __importDefault(__webpack_require__("qxCs"));
var SingletonRouter = {
    router: null,
    readyCallbacks: [],
    ready: function (cb) {
        if (this.router)
            return cb();
        if (typeof window !== 'undefined') {
            this.readyCallbacks.push(cb);
        }
    }
};
// Create public properties and methods of the router in the SingletonRouter
var urlPropertyFields = ['pathname', 'route', 'query', 'asPath'];
var propertyFields = ['components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState'];
// Events is a static property on the router, the router doesn't have to be initialized to use it
Object.defineProperty(SingletonRouter, 'events', {
    get: function () {
        return router_1.default.events;
    }
});
propertyFields.concat(urlPropertyFields).forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    Object.defineProperty(SingletonRouter, field, {
        get: function () {
            throwIfNoRouter();
            return SingletonRouter.router[field];
        }
    });
});
coreMethodFields.forEach(function (field) {
    SingletonRouter[field] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        throwIfNoRouter();
        return (_a = SingletonRouter.router)[field].apply(_a, args);
    };
});
routerEvents.forEach(function (event) {
    SingletonRouter.ready(function () {
        router_1.default.events.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
            if (SingletonRouter[eventField]) {
                try {
                    SingletonRouter[eventField].apply(SingletonRouter, args);
                }
                catch (err) {
                    console.error("Error when running the Router event: " + eventField);
                    console.error(err.message + "\n" + err.stack);
                }
            }
        });
    });
});
function throwIfNoRouter() {
    if (!SingletonRouter.router) {
        var message = 'No router instance found.\n' +
            'You should only use "next/router" inside the client side of your app.\n';
        throw new Error(message);
    }
}
// Export the SingletonRouter and this is the public API.
exports.default = SingletonRouter;
// Reexport the withRoute HOC
var with_router_1 = __webpack_require__("0Bsm");
exports.withRouter = with_router_1.default;
// INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.
exports.createRouter = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    SingletonRouter.router = new (router_1.default.bind.apply(router_1.default, [void 0].concat(args)))();
    SingletonRouter.readyCallbacks.forEach(function (cb) { return cb(); });
    SingletonRouter.readyCallbacks = [];
    return SingletonRouter.router;
};
// Export the actual Router class, which is usually used inside the server
exports.Router = router_1.default;
// This function is used to create the `withRouter` router instance
function makePublicRouterInstance(router) {
    var instance = {};
    for (var _i = 0, urlPropertyFields_1 = urlPropertyFields; _i < urlPropertyFields_1.length; _i++) {
        var property = urlPropertyFields_1[_i];
        if (typeof router[property] === 'object') {
            instance[property] = __assign({}, router[property]); // makes sure query is not stateful
            continue;
        }
        instance[property] = router[property];
    }
    // Events is a static property on the router, the router doesn't have to be initialized to use it
    instance.events = router_1.default.events;
    propertyFields.forEach(function (field) {
        // Here we need to use Object.defineProperty because, we need to return
        // the property assigned to the actual router
        // The value might get changed as we change routes and this is the
        // proper way to access it
        Object.defineProperty(instance, field, {
            get: function () {
                return router[field];
            }
        });
    });
    coreMethodFields.forEach(function (field) {
        instance[field] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return router[field].apply(router, args);
        };
    });
    return instance;
}
exports.makePublicRouterInstance = makePublicRouterInstance;


/***/ }),

/***/ "p8BD":
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/utils");

/***/ }),

/***/ "qxCs":
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/router/router");

/***/ }),

/***/ "rf6O":
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ })

/******/ });
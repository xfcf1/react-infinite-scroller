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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var useState = React.useState, useEffect = React.useEffect;
var Scroller = function (props) {
    var itemHeight = props.itemHeight, height = props.height, data = props.data, styles = props.styles, className = props.className, itemCreater = props.itemCreater, rootId = props.rootId;
    var observer;
    var topHolderId = rootId + "_top_holder";
    var bottomHolderId = rootId + "_bottom_holder";
    var len = data.length;
    var pageSize = Math.ceil(height / itemHeight) * 2;
    var step = Math.ceil(pageSize / 2);
    var _a = useState(0), start = _a[0], setStart = _a[1];
    var _b = useState(pageSize), end = _b[0], setEnd = _b[1];
    var _c = useState(0), timer = _c[0], setTimer = _c[1];
    useEffect(function () {
        installObserver();
        checkViewport();
        return function () {
            uninstallObserver();
        };
    }, [start, end]);
    var installObserver = function () {
        var rootDom = document.getElementById(rootId);
        observer = new IntersectionObserver(obCallback, { root: rootDom });
        var topHolderDom = document.getElementById(topHolderId);
        var bottomHolderDom = document.getElementById(bottomHolderId);
        if (topHolderDom) {
            observer.observe(topHolderDom);
        }
        if (bottomHolderDom) {
            observer.observe(bottomHolderDom);
        }
    };
    var uninstallObserver = function () {
        if (observer) {
            var topHolderDom = document.getElementById(topHolderId);
            var bottomHolderDom = document.getElementById(bottomHolderId);
            if (topHolderDom) {
                observer.unobserve(topHolderDom);
            }
            if (bottomHolderDom) {
                observer.unobserve(bottomHolderDom);
            }
        }
    };
    var obCallback = function (entries) {
        if (entries.length === 1) {
            var entry = entries[0];
            if (entry.target.id === topHolderId) {
                // top
                if (entry.isIntersecting) {
                    minusStep();
                }
            }
            else if (entry.target.id === bottomHolderId) {
                // bottom
                if (entry.isIntersecting) {
                    addStep();
                }
            }
        }
    };
    var minusStep = function (num) {
        if (num === void 0) { num = step; }
        var newStart = start - num;
        var newEnd = end - num;
        if (start <= 0) {
            newStart = 0;
            newEnd = pageSize;
        }
        setStart(newStart);
        setEnd(newEnd);
    };
    var addStep = function (num) {
        if (num === void 0) { num = step; }
        var newStart = start + num;
        var newEnd = end + num;
        if (newEnd >= len) {
            newStart = start;
            newEnd = len;
        }
        setStart(newStart);
        setEnd(newEnd);
    };
    var checkViewport = function () {
        clearTimeout(timer);
        setTimer(setTimeout(function () {
            var topHolderDom = document.getElementById(topHolderId);
            var bottomHolderDom = document.getElementById(bottomHolderId);
            if (topHolderDom && bottomHolderDom) {
                var num = 0;
                var topOffset = topHolderDom.getBoundingClientRect().bottom;
                var bottomOffset = bottomHolderDom.getBoundingClientRect().top;
                if (topOffset > 0) {
                    num = Math.ceil(topOffset / itemHeight);
                    minusStep(num);
                }
                else if (bottomOffset < 0) {
                    num = Math.ceil(Math.abs(bottomOffset) / itemHeight);
                    addStep(num);
                }
            }
        }, 200));
    };
    var topHolderHeight = start * itemHeight;
    var bottomHolderHeight = (len - end) * itemHeight;
    var fragments = data.slice(start, end);
    var list = fragments.map(function (item, index) {
        if (index === 0) {
            return (React.createElement("div", { "data-key": item, key: index }, itemCreater(item)));
        }
        else if (index === fragments.length - 1) {
            return (React.createElement("div", { "data-key": item, key: index }, itemCreater(item)));
        }
        return (React.createElement("div", { "data-key": item, key: index }, itemCreater(item)));
    });
    return (React.createElement("div", { style: __assign({ height: height, overflow: 'auto' }, styles), className: className, id: rootId },
        React.createElement("div", { style: { height: topHolderHeight, minHeight: 1 }, id: topHolderId }),
        list,
        React.createElement("div", { style: { height: bottomHolderHeight, minHeight: 1 }, id: bottomHolderId })));
};
exports.default = Scroller;

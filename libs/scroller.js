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
    var step = Math.ceil(height / itemHeight);
    var _a = useState(0), start = _a[0], setStart = _a[1];
    var _b = useState(step * 2), end = _b[0], setEnd = _b[1];
    useEffect(function () {
        installObserver();
        return function () {
            uninstallObserver();
        };
    }, [data.length, start, end]);
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
                    var newStart = start - step;
                    var newEnd = end - step;
                    if (start <= 0) {
                        newStart = 0;
                        newEnd = step * 2;
                    }
                    setStart(newStart);
                    setEnd(newEnd);
                }
            }
            else if (entry.target.id === bottomHolderId) {
                // bottom
                if (entry.isIntersecting) {
                    var newStart = start + step;
                    var newEnd = end + step;
                    if (end >= len) {
                        newStart = start;
                        newEnd = len + 1;
                    }
                    setStart(newStart);
                    setEnd(newEnd);
                }
            }
        }
    };
    var topHolderHeight = start * itemHeight;
    var bottomHolderHeight = (len - end) * itemHeight;
    var fragments = data.slice(start, end);
    var list = fragments.map(function (item) { return itemCreater(item); });
    return (React.createElement("div", { style: __assign({ height: height, overflow: 'auto' }, styles), className: className, id: rootId },
        React.createElement("div", { style: { height: topHolderHeight, minHeight: 1 }, id: topHolderId }),
        list,
        React.createElement("div", { style: { height: bottomHolderHeight, minHeight: 1 }, id: bottomHolderId })));
};
exports.default = Scroller;

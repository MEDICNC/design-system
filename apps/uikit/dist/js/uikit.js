/*! UIkit 3.21.3 | https://www.getuikit.com | (c) 2014 - 2024 YOOtheme | MIT License */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('uikit', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.UIkit = factory());
})(this, (function () { 'use strict';

    const { hasOwnProperty, toString } = Object.prototype;
    function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
    }
    const hyphenateRe = /\B([A-Z])/g;
    const hyphenate = memoize((str) => str.replace(hyphenateRe, "-$1").toLowerCase());
    const camelizeRe = /-(\w)/g;
    const camelize = memoize(
      (str) => (str.charAt(0).toLowerCase() + str.slice(1)).replace(camelizeRe, (_, c) => c.toUpperCase())
    );
    const ucfirst = memoize((str) => str.charAt(0).toUpperCase() + str.slice(1));
    function startsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.startsWith) == null ? void 0 : _a.call(str, search);
    }
    function endsWith(str, search) {
      var _a;
      return (_a = str == null ? void 0 : str.endsWith) == null ? void 0 : _a.call(str, search);
    }
    function includes(obj, search) {
      var _a;
      return (_a = obj == null ? void 0 : obj.includes) == null ? void 0 : _a.call(obj, search);
    }
    function findIndex(array, predicate) {
      var _a;
      return (_a = array == null ? void 0 : array.findIndex) == null ? void 0 : _a.call(array, predicate);
    }
    const { isArray, from: toArray } = Array;
    const { assign } = Object;
    function isFunction(obj) {
      return typeof obj === "function";
    }
    function isObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function isPlainObject(obj) {
      return toString.call(obj) === "[object Object]";
    }
    function isWindow(obj) {
      return isObject(obj) && obj === obj.window;
    }
    function isDocument(obj) {
      return nodeType(obj) === 9;
    }
    function isNode(obj) {
      return nodeType(obj) >= 1;
    }
    function isElement(obj) {
      return nodeType(obj) === 1;
    }
    function nodeType(obj) {
      return !isWindow(obj) && isObject(obj) && obj.nodeType;
    }
    function isBoolean(value) {
      return typeof value === "boolean";
    }
    function isString(value) {
      return typeof value === "string";
    }
    function isNumber(value) {
      return typeof value === "number";
    }
    function isNumeric(value) {
      return isNumber(value) || isString(value) && !isNaN(value - parseFloat(value));
    }
    function isEmpty(obj) {
      return !(isArray(obj) ? obj.length : isObject(obj) ? Object.keys(obj).length : false);
    }
    function isUndefined(value) {
      return value === void 0;
    }
    function toBoolean(value) {
      return isBoolean(value) ? value : value === "true" || value === "1" || value === "" ? true : value === "false" || value === "0" ? false : value;
    }
    function toNumber(value) {
      const number = Number(value);
      return isNaN(number) ? false : number;
    }
    function toFloat(value) {
      return parseFloat(value) || 0;
    }
    function toNode(element) {
      return element && toNodes(element)[0];
    }
    function toNodes(element) {
      return isNode(element) ? [element] : Array.from(element || []).filter(isNode);
    }
    function toWindow(element) {
      if (isWindow(element)) {
        return element;
      }
      element = toNode(element);
      const document = isDocument(element) ? element : element == null ? void 0 : element.ownerDocument;
      return (document == null ? void 0 : document.defaultView) || window;
    }
    function isEqual(value, other) {
      return value === other || isObject(value) && isObject(other) && Object.keys(value).length === Object.keys(other).length && each(value, (val, key) => val === other[key]);
    }
    function swap(value, a, b) {
      return value.replace(new RegExp(`${a}|${b}`, "g"), (match) => match === a ? b : a);
    }
    function last(array) {
      return array[array.length - 1];
    }
    function each(obj, cb) {
      for (const key in obj) {
        if (false === cb(obj[key], key)) {
          return false;
        }
      }
      return true;
    }
    function sortBy(array, prop) {
      return array.slice().sort(
        ({ [prop]: propA = 0 }, { [prop]: propB = 0 }) => propA > propB ? 1 : propB > propA ? -1 : 0
      );
    }
    function sumBy(array, iteratee) {
      return array.reduce(
        (sum, item) => sum + toFloat(isFunction(iteratee) ? iteratee(item) : item[iteratee]),
        0
      );
    }
    function uniqueBy(array, prop) {
      const seen = /* @__PURE__ */ new Set();
      return array.filter(({ [prop]: check }) => seen.has(check) ? false : seen.add(check));
    }
    function pick(obj, props) {
      return props.reduce((res, prop) => ({ ...res, [prop]: obj[prop] }), {});
    }
    function clamp(number, min = 0, max = 1) {
      return Math.min(Math.max(toNumber(number) || 0, min), max);
    }
    function noop() {
    }
    function intersectRect(...rects) {
      return [
        ["bottom", "top"],
        ["right", "left"]
      ].every(
        ([minProp, maxProp]) => Math.min(...rects.map(({ [minProp]: min }) => min)) - Math.max(...rects.map(({ [maxProp]: max }) => max)) > 0
      );
    }
    function pointInRect(point, rect) {
      return point.x <= rect.right && point.x >= rect.left && point.y <= rect.bottom && point.y >= rect.top;
    }
    function ratio(dimensions, prop, value) {
      const aProp = prop === "width" ? "height" : "width";
      return {
        [aProp]: dimensions[prop] ? Math.round(value * dimensions[aProp] / dimensions[prop]) : dimensions[aProp],
        [prop]: value
      };
    }
    function contain(dimensions, maxDimensions) {
      dimensions = { ...dimensions };
      for (const prop in dimensions) {
        dimensions = dimensions[prop] > maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    function cover$1(dimensions, maxDimensions) {
      dimensions = contain(dimensions, maxDimensions);
      for (const prop in dimensions) {
        dimensions = dimensions[prop] < maxDimensions[prop] ? ratio(dimensions, prop, maxDimensions[prop]) : dimensions;
      }
      return dimensions;
    }
    const Dimensions = { ratio, contain, cover: cover$1 };
    function getIndex(i, elements, current = 0, finite = false) {
      elements = toNodes(elements);
      const { length } = elements;
      if (!length) {
        return -1;
      }
      i = isNumeric(i) ? toNumber(i) : i === "next" ? current + 1 : i === "previous" ? current - 1 : i === "last" ? length - 1 : elements.indexOf(toNode(i));
      if (finite) {
        return clamp(i, 0, length - 1);
      }
      i %= length;
      return i < 0 ? i + length : i;
    }
    function memoize(fn) {
      const cache = /* @__PURE__ */ Object.create(null);
      return (key, ...args) => cache[key] || (cache[key] = fn(key, ...args));
    }

    function addClass(element, ...classes) {
      for (const node of toNodes(element)) {
        const add = toClasses(classes).filter((cls) => !hasClass(node, cls));
        if (add.length) {
          node.classList.add(...add);
        }
      }
    }
    function removeClass(element, ...classes) {
      for (const node of toNodes(element)) {
        const remove = toClasses(classes).filter((cls) => hasClass(node, cls));
        if (remove.length) {
          node.classList.remove(...remove);
        }
      }
    }
    function replaceClass(element, oldClass, newClass) {
      newClass = toClasses(newClass);
      oldClass = toClasses(oldClass).filter((cls) => !includes(newClass, cls));
      removeClass(element, oldClass);
      addClass(element, newClass);
    }
    function hasClass(element, cls) {
      [cls] = toClasses(cls);
      return toNodes(element).some((node) => node.classList.contains(cls));
    }
    function toggleClass(element, cls, force) {
      const classes = toClasses(cls);
      if (!isUndefined(force)) {
        force = !!force;
      }
      for (const node of toNodes(element)) {
        for (const cls2 of classes) {
          node.classList.toggle(cls2, force);
        }
      }
    }
    function toClasses(str) {
      return str ? isArray(str) ? str.map(toClasses).flat() : String(str).split(" ").filter(Boolean) : [];
    }

    function attr(element, name, value) {
      var _a;
      if (isObject(name)) {
        for (const key in name) {
          attr(element, key, name[key]);
        }
        return;
      }
      if (isUndefined(value)) {
        return (_a = toNode(element)) == null ? void 0 : _a.getAttribute(name);
      } else {
        for (const el of toNodes(element)) {
          if (isFunction(value)) {
            value = value.call(el, attr(el, name));
          }
          if (value === null) {
            removeAttr(el, name);
          } else {
            el.setAttribute(name, value);
          }
        }
      }
    }
    function hasAttr(element, name) {
      return toNodes(element).some((element2) => element2.hasAttribute(name));
    }
    function removeAttr(element, name) {
      toNodes(element).forEach((element2) => element2.removeAttribute(name));
    }
    function data(element, attribute) {
      for (const name of [attribute, `data-${attribute}`]) {
        if (hasAttr(element, name)) {
          return attr(element, name);
        }
      }
    }

    const inBrowser = typeof window !== "undefined";
    const isRtl = inBrowser && document.dir === "rtl";
    const hasTouch = inBrowser && "ontouchstart" in window;
    const hasPointerEvents = inBrowser && window.PointerEvent;
    const pointerDown$1 = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove$1 = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp$1 = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
    const pointerEnter = hasPointerEvents ? "pointerenter" : hasTouch ? "" : "mouseenter";
    const pointerLeave = hasPointerEvents ? "pointerleave" : hasTouch ? "" : "mouseleave";
    const pointerCancel = hasPointerEvents ? "pointercancel" : "touchcancel";

    const voidElements = {
      area: true,
      base: true,
      br: true,
      col: true,
      embed: true,
      hr: true,
      img: true,
      input: true,
      keygen: true,
      link: true,
      meta: true,
      param: true,
      source: true,
      track: true,
      wbr: true
    };
    function isVoidElement(element) {
      return toNodes(element).some((element2) => voidElements[element2.tagName.toLowerCase()]);
    }
    const isVisibleFn = inBrowser && Element.prototype.checkVisibility || function() {
      return this.offsetWidth || this.offsetHeight || this.getClientRects().length;
    };
    function isVisible(element) {
      return toNodes(element).some((element2) => isVisibleFn.call(element2));
    }
    const selInput = "input,select,textarea,button";
    function isInput(element) {
      return toNodes(element).some((element2) => matches(element2, selInput));
    }
    const selFocusable = `${selInput},a[href],[tabindex]`;
    function isFocusable(element) {
      return matches(element, selFocusable);
    }
    function parent(element) {
      var _a;
      return (_a = toNode(element)) == null ? void 0 : _a.parentElement;
    }
    function filter$1(element, selector) {
      return toNodes(element).filter((element2) => matches(element2, selector));
    }
    function matches(element, selector) {
      return toNodes(element).some((element2) => element2.matches(selector));
    }
    function parents(element, selector) {
      const elements = [];
      while (element = parent(element)) {
        if (!selector || matches(element, selector)) {
          elements.push(element);
        }
      }
      return elements;
    }
    function children(element, selector) {
      element = toNode(element);
      const children2 = element ? toArray(element.children) : [];
      return selector ? filter$1(children2, selector) : children2;
    }
    function index(element, ref) {
      return ref ? toNodes(element).indexOf(toNode(ref)) : children(parent(element)).indexOf(element);
    }
    function isSameSiteAnchor(el) {
      el = toNode(el);
      return el && ["origin", "pathname", "search"].every((part) => el[part] === location[part]);
    }
    function getTargetedElement(el) {
      if (isSameSiteAnchor(el)) {
        const { hash, ownerDocument } = toNode(el);
        const id = decodeURIComponent(hash).slice(1);
        return ownerDocument.getElementById(id) || ownerDocument.getElementsByName(id)[0];
      }
    }

    function query(selector, context) {
      return find(selector, getContext(selector, context));
    }
    function queryAll(selector, context) {
      return findAll(selector, getContext(selector, context));
    }
    function find(selector, context) {
      return toNode(_query(selector, toNode(context), "querySelector"));
    }
    function findAll(selector, context) {
      return toNodes(_query(selector, toNode(context), "querySelectorAll"));
    }
    function getContext(selector, context = document) {
      return isString(selector) && parseSelector(selector).isContextSelector || isDocument(context) ? context : context.ownerDocument;
    }
    const addStarRe = /([!>+~-])(?=\s+[!>+~-]|\s*$)/g;
    const splitSelectorRe = /.*?[^\\](?![^(]*\))(?:,|$)/g;
    const trailingCommaRe = /\s*,$/;
    const parseSelector = memoize((selector) => {
      var _a;
      selector = selector.replace(addStarRe, "$1 *");
      let isContextSelector = false;
      const selectors = [];
      for (let sel of (_a = selector.match(splitSelectorRe)) != null ? _a : []) {
        sel = sel.replace(trailingCommaRe, "").trim();
        isContextSelector || (isContextSelector = ["!", "+", "~", "-", ">"].includes(sel[0]));
        selectors.push(sel);
      }
      return {
        selector: selectors.join(","),
        selectors,
        isContextSelector
      };
    });
    const parsePositionSelector = memoize((selector) => {
      selector = selector.slice(1).trim();
      const index2 = selector.indexOf(" ");
      return ~index2 ? [selector.slice(0, index2), selector.slice(index2 + 1)] : [selector, ""];
    });
    function _query(selector, context = document, queryFn) {
      if (!selector || !isString(selector)) {
        return selector;
      }
      const parsed = parseSelector(selector);
      if (!parsed.isContextSelector) {
        return _doQuery(context, queryFn, parsed.selector);
      }
      selector = "";
      const isSingle = parsed.selectors.length === 1;
      for (let sel of parsed.selectors) {
        let positionSel;
        let ctx = context;
        if (sel[0] === "!") {
          [positionSel, sel] = parsePositionSelector(sel);
          ctx = context.parentElement.closest(positionSel);
          if (!sel && isSingle) {
            return ctx;
          }
        }
        if (ctx && sel[0] === "-") {
          [positionSel, sel] = parsePositionSelector(sel);
          ctx = ctx.previousElementSibling;
          ctx = matches(ctx, positionSel) ? ctx : null;
          if (!sel && isSingle) {
            return ctx;
          }
        }
        if (!ctx) {
          continue;
        }
        if (isSingle) {
          if (sel[0] === "~" || sel[0] === "+") {
            sel = `:scope > :nth-child(${index(ctx) + 1}) ${sel}`;
            ctx = ctx.parentElement;
          } else if (sel[0] === ">") {
            sel = `:scope ${sel}`;
          }
          return _doQuery(ctx, queryFn, sel);
        }
        selector += `${selector ? "," : ""}${domPath(ctx)} ${sel}`;
      }
      if (!isDocument(context)) {
        context = context.ownerDocument;
      }
      return _doQuery(context, queryFn, selector);
    }
    function _doQuery(context, queryFn, selector) {
      try {
        return context[queryFn](selector);
      } catch (e) {
        return null;
      }
    }
    function domPath(element) {
      const names = [];
      while (element.parentNode) {
        const id = attr(element, "id");
        if (id) {
          names.unshift(`#${escape(id)}`);
          break;
        } else {
          let { tagName } = element;
          if (tagName !== "HTML") {
            tagName += `:nth-child(${index(element) + 1})`;
          }
          names.unshift(tagName);
          element = element.parentNode;
        }
      }
      return names.join(" > ");
    }
    function escape(css) {
      return isString(css) ? CSS.escape(css) : "";
    }

    function on(...args) {
      let [targets, types, selector, listener, useCapture = false] = getArgs(args);
      if (listener.length > 1) {
        listener = detail(listener);
      }
      if (useCapture == null ? void 0 : useCapture.self) {
        listener = selfFilter(listener);
      }
      if (selector) {
        listener = delegate(selector, listener);
      }
      for (const type of types) {
        for (const target of targets) {
          target.addEventListener(type, listener, useCapture);
        }
      }
      return () => off(targets, types, listener, useCapture);
    }
    function off(...args) {
      let [targets, types, , listener, useCapture = false] = getArgs(args);
      for (const type of types) {
        for (const target of targets) {
          target.removeEventListener(type, listener, useCapture);
        }
      }
    }
    function once(...args) {
      const [element, types, selector, listener, useCapture = false, condition] = getArgs(args);
      const off2 = on(
        element,
        types,
        selector,
        (e) => {
          const result = !condition || condition(e);
          if (result) {
            off2();
            listener(e, result);
          }
        },
        useCapture
      );
      return off2;
    }
    function trigger(targets, event, detail2) {
      return toEventTargets(targets).every(
        (target) => target.dispatchEvent(createEvent(event, true, true, detail2))
      );
    }
    function createEvent(e, bubbles = true, cancelable = false, detail2) {
      if (isString(e)) {
        e = new CustomEvent(e, { bubbles, cancelable, detail: detail2 });
      }
      return e;
    }
    function getArgs(args) {
      args[0] = toEventTargets(args[0]);
      if (isString(args[1])) {
        args[1] = args[1].split(" ");
      }
      if (isFunction(args[2])) {
        args.splice(2, 0, false);
      }
      return args;
    }
    function delegate(selector, listener) {
      return (e) => {
        const current = selector[0] === ">" ? findAll(selector, e.currentTarget).reverse().find((element) => element.contains(e.target)) : e.target.closest(selector);
        if (current) {
          e.current = current;
          listener.call(this, e);
          delete e.current;
        }
      };
    }
    function detail(listener) {
      return (e) => isArray(e.detail) ? listener(e, ...e.detail) : listener(e);
    }
    function selfFilter(listener) {
      return function(e) {
        if (e.target === e.currentTarget || e.target === e.current) {
          return listener.call(null, e);
        }
      };
    }
    function isEventTarget(target) {
      return target && "addEventListener" in target;
    }
    function toEventTarget(target) {
      return isEventTarget(target) ? target : toNode(target);
    }
    function toEventTargets(target) {
      return isArray(target) ? target.map(toEventTarget).filter(Boolean) : isString(target) ? findAll(target) : isEventTarget(target) ? [target] : toNodes(target);
    }
    function isTouch(e) {
      return e.pointerType === "touch" || !!e.touches;
    }
    function getEventPos(e) {
      var _a, _b;
      const { clientX: x, clientY: y } = ((_a = e.touches) == null ? void 0 : _a[0]) || ((_b = e.changedTouches) == null ? void 0 : _b[0]) || e;
      return { x, y };
    }

    const cssNumber = {
      "animation-iteration-count": true,
      "column-count": true,
      "fill-opacity": true,
      "flex-grow": true,
      "flex-shrink": true,
      "font-weight": true,
      "line-height": true,
      opacity: true,
      order: true,
      orphans: true,
      "stroke-dasharray": true,
      "stroke-dashoffset": true,
      widows: true,
      "z-index": true,
      zoom: true
    };
    function css(element, property, value, priority) {
      const elements = toNodes(element);
      for (const element2 of elements) {
        if (isString(property)) {
          property = propName(property);
          if (isUndefined(value)) {
            return getComputedStyle(element2).getPropertyValue(property);
          } else {
            element2.style.setProperty(
              property,
              isNumeric(value) && !cssNumber[property] ? `${value}px` : value || isNumber(value) ? value : "",
              priority
            );
          }
        } else if (isArray(property)) {
          const props = {};
          for (const prop of property) {
            props[prop] = css(element2, prop);
          }
          return props;
        } else if (isObject(property)) {
          for (const prop in property) {
            css(element2, prop, property[prop], value);
          }
        }
      }
      return elements[0];
    }
    const propName = memoize((name) => {
      if (startsWith(name, "--")) {
        return name;
      }
      name = hyphenate(name);
      const { style } = document.documentElement;
      if (name in style) {
        return name;
      }
      for (const prefix of ["webkit", "moz"]) {
        const prefixedName = `-${prefix}-${name}`;
        if (prefixedName in style) {
          return prefixedName;
        }
      }
    });

    const clsTransition = "uk-transition";
    const transitionEnd = "transitionend";
    const transitionCanceled = "transitioncanceled";
    function transition$1(element, props, duration = 400, timing = "linear") {
      duration = Math.round(duration);
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            for (const name in props) {
              css(element2, name);
            }
            const timer = setTimeout(() => trigger(element2, transitionEnd), duration);
            once(
              element2,
              [transitionEnd, transitionCanceled],
              ({ type }) => {
                clearTimeout(timer);
                removeClass(element2, clsTransition);
                css(element2, {
                  transitionProperty: "",
                  transitionDuration: "",
                  transitionTimingFunction: ""
                });
                type === transitionCanceled ? reject() : resolve(element2);
              },
              { self: true }
            );
            addClass(element2, clsTransition);
            css(element2, {
              transitionProperty: Object.keys(props).map(propName).join(","),
              transitionDuration: `${duration}ms`,
              transitionTimingFunction: timing,
              ...props
            });
          })
        )
      );
    }
    const Transition = {
      start: transition$1,
      async stop(element) {
        trigger(element, transitionEnd);
        await Promise.resolve();
      },
      async cancel(element) {
        trigger(element, transitionCanceled);
        await Promise.resolve();
      },
      inProgress(element) {
        return hasClass(element, clsTransition);
      }
    };
    const clsAnimation = "uk-animation";
    const animationEnd = "animationend";
    const animationCanceled = "animationcanceled";
    function animate$2(element, animation, duration = 200, origin, out) {
      return Promise.all(
        toNodes(element).map(
          (element2) => new Promise((resolve, reject) => {
            if (hasClass(element2, clsAnimation)) {
              trigger(element2, animationCanceled);
            }
            const classes = [
              animation,
              clsAnimation,
              `${clsAnimation}-${out ? "leave" : "enter"}`,
              origin && `uk-transform-origin-${origin}`,
              out && `${clsAnimation}-reverse`
            ];
            const timer = setTimeout(() => trigger(element2, animationEnd), duration);
            once(
              element2,
              [animationEnd, animationCanceled],
              ({ type }) => {
                clearTimeout(timer);
                type === animationCanceled ? reject() : resolve(element2);
                css(element2, "animationDuration", "");
                removeClass(element2, classes);
              },
              { self: true }
            );
            css(element2, "animationDuration", `${duration}ms`);
            addClass(element2, classes);
          })
        )
      );
    }
    const Animation = {
      in: animate$2,
      out(element, animation, duration, origin) {
        return animate$2(element, animation, duration, origin, true);
      },
      inProgress(element) {
        return hasClass(element, clsAnimation);
      },
      cancel(element) {
        trigger(element, animationCanceled);
      }
    };

    function ready(fn) {
      if (document.readyState !== "loading") {
        fn();
        return;
      }
      once(document, "DOMContentLoaded", fn);
    }
    function isTag(element, ...tagNames) {
      return tagNames.some((tagName) => {
        var _a;
        return ((_a = element == null ? void 0 : element.tagName) == null ? void 0 : _a.toLowerCase()) === tagName.toLowerCase();
      });
    }
    function empty(element) {
      element = $(element);
      element.innerHTML = "";
      return element;
    }
    function html(parent2, html2) {
      return isUndefined(html2) ? $(parent2).innerHTML : append(empty(parent2), html2);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
      return function(ref, element) {
        var _a;
        const nodes = toNodes(isString(element) ? fragment(element) : element);
        (_a = $(ref)) == null ? void 0 : _a[fn](...nodes);
        return unwrapSingle(nodes);
      };
    }
    function remove$1(element) {
      toNodes(element).forEach((element2) => element2.remove());
    }
    function wrapAll(element, structure) {
      structure = toNode(before(element, structure));
      while (structure.firstElementChild) {
        structure = structure.firstElementChild;
      }
      append(structure, element);
      return structure;
    }
    function wrapInner(element, structure) {
      return toNodes(
        toNodes(element).map(
          (element2) => element2.hasChildNodes() ? wrapAll(toArray(element2.childNodes), structure) : append(element2, structure)
        )
      );
    }
    function unwrap(element) {
      toNodes(element).map(parent).filter((value, index, self) => self.indexOf(value) === index).forEach((parent2) => parent2.replaceWith(...parent2.childNodes));
    }
    const singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    function fragment(html2) {
      const matches = singleTagRe.exec(html2);
      if (matches) {
        return document.createElement(matches[1]);
      }
      const container = document.createElement("template");
      container.innerHTML = html2.trim();
      return unwrapSingle(container.content.childNodes);
    }
    function unwrapSingle(nodes) {
      return nodes.length > 1 ? nodes : nodes[0];
    }
    function apply(node, fn) {
      if (!isElement(node)) {
        return;
      }
      fn(node);
      node = node.firstElementChild;
      while (node) {
        const next = node.nextElementSibling;
        apply(node, fn);
        node = next;
      }
    }
    function $(selector, context) {
      return isHtml(selector) ? toNode(fragment(selector)) : find(selector, context);
    }
    function $$(selector, context) {
      return isHtml(selector) ? toNodes(fragment(selector)) : findAll(selector, context);
    }
    function isHtml(str) {
      return isString(str) && startsWith(str.trim(), "<");
    }

    const dirs$1 = {
      width: ["left", "right"],
      height: ["top", "bottom"]
    };
    function dimensions$1(element) {
      const rect = isElement(element) ? toNode(element).getBoundingClientRect() : { height: height(element), width: width(element), top: 0, left: 0 };
      return {
        height: rect.height,
        width: rect.width,
        top: rect.top,
        left: rect.left,
        bottom: rect.top + rect.height,
        right: rect.left + rect.width
      };
    }
    function offset(element, coordinates) {
      if (coordinates) {
        css(element, { left: 0, top: 0 });
      }
      const currentOffset = dimensions$1(element);
      if (element) {
        const { scrollY, scrollX } = toWindow(element);
        const offsetBy = { height: scrollY, width: scrollX };
        for (const dir in dirs$1) {
          for (const prop of dirs$1[dir]) {
            currentOffset[prop] += offsetBy[dir];
          }
        }
      }
      if (!coordinates) {
        return currentOffset;
      }
      for (const prop of ["left", "top"]) {
        css(element, prop, coordinates[prop] - currentOffset[prop]);
      }
    }
    function position(element) {
      let { top, left } = offset(element);
      const {
        ownerDocument: { body, documentElement },
        offsetParent
      } = toNode(element);
      let parent = offsetParent || documentElement;
      while (parent && (parent === body || parent === documentElement) && css(parent, "position") === "static") {
        parent = parent.parentNode;
      }
      if (isElement(parent)) {
        const parentOffset = offset(parent);
        top -= parentOffset.top + toFloat(css(parent, "borderTopWidth"));
        left -= parentOffset.left + toFloat(css(parent, "borderLeftWidth"));
      }
      return {
        top: top - toFloat(css(element, "marginTop")),
        left: left - toFloat(css(element, "marginLeft"))
      };
    }
    function offsetPosition(element) {
      element = toNode(element);
      const offset2 = [element.offsetTop, element.offsetLeft];
      while (element = element.offsetParent) {
        offset2[0] += element.offsetTop + toFloat(css(element, `borderTopWidth`));
        offset2[1] += element.offsetLeft + toFloat(css(element, `borderLeftWidth`));
        if (css(element, "position") === "fixed") {
          const win = toWindow(element);
          offset2[0] += win.scrollY;
          offset2[1] += win.scrollX;
          return offset2;
        }
      }
      return offset2;
    }
    const height = dimension("height");
    const width = dimension("width");
    function dimension(prop) {
      const propName = ucfirst(prop);
      return (element, value) => {
        if (isUndefined(value)) {
          if (isWindow(element)) {
            return element[`inner${propName}`];
          }
          if (isDocument(element)) {
            const doc = element.documentElement;
            return Math.max(doc[`offset${propName}`], doc[`scroll${propName}`]);
          }
          element = toNode(element);
          value = css(element, prop);
          value = value === "auto" ? element[`offset${propName}`] : toFloat(value) || 0;
          return value - boxModelAdjust(element, prop);
        } else {
          return css(
            element,
            prop,
            !value && value !== 0 ? "" : +value + boxModelAdjust(element, prop) + "px"
          );
        }
      };
    }
    function boxModelAdjust(element, prop, sizing = "border-box") {
      return css(element, "boxSizing") === sizing ? sumBy(
        dirs$1[prop].map(ucfirst),
        (prop2) => toFloat(css(element, `padding${prop2}`)) + toFloat(css(element, `border${prop2}Width`))
      ) : 0;
    }
    function flipPosition(pos) {
      for (const dir in dirs$1) {
        for (const i in dirs$1[dir]) {
          if (dirs$1[dir][i] === pos) {
            return dirs$1[dir][1 - i];
          }
        }
      }
      return pos;
    }
    function toPx(value, property = "width", element = window, offsetDim = false) {
      if (!isString(value)) {
        return toFloat(value);
      }
      return sumBy(parseCalc(value), (value2) => {
        const unit = parseUnit(value2);
        return unit ? percent(
          unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions$1(element)[property],
          value2
        ) : value2;
      });
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize((calc) => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe$1 = /(?:v[hw]|%)$/;
    const parseUnit = memoize((str) => (str.match(unitRe$1) || [])[0]);
    function percent(base, value) {
      return base * toFloat(value) / 100;
    }
    let vh;
    let vhEl;
    function getViewportHeight() {
      if (vh) {
        return vh;
      }
      if (!vhEl) {
        vhEl = $("<div>");
        css(vhEl, {
          height: "100vh",
          position: "fixed"
        });
        on(window, "resize", () => vh = null);
      }
      append(document.body, vhEl);
      vh = vhEl.clientHeight;
      remove$1(vhEl);
      return vh;
    }

    const fastdom = { read, write, clear, flush };
    const reads = [];
    const writes = [];
    function read(task) {
      reads.push(task);
      scheduleFlush();
      return task;
    }
    function write(task) {
      writes.push(task);
      scheduleFlush();
      return task;
    }
    function clear(task) {
      remove(reads, task);
      remove(writes, task);
    }
    let scheduled = false;
    function flush() {
      runTasks(reads);
      runTasks(writes.splice(0));
      scheduled = false;
      if (reads.length || writes.length) {
        scheduleFlush();
      }
    }
    function scheduleFlush() {
      if (!scheduled) {
        scheduled = true;
        queueMicrotask(flush);
      }
    }
    function runTasks(tasks) {
      let task;
      while (task = tasks.shift()) {
        try {
          task();
        } catch (e) {
          console.error(e);
        }
      }
    }
    function remove(array, item) {
      const index = array.indexOf(item);
      return ~index && array.splice(index, 1);
    }

    class MouseTracker {
      init() {
        this.positions = [];
        let position;
        this.unbind = on(document, "mousemove", (e) => position = getEventPos(e));
        this.interval = setInterval(() => {
          if (!position) {
            return;
          }
          this.positions.push(position);
          if (this.positions.length > 5) {
            this.positions.shift();
          }
        }, 50);
      }
      cancel() {
        var _a;
        (_a = this.unbind) == null ? void 0 : _a.call(this);
        clearInterval(this.interval);
      }
      movesTo(target) {
        if (!this.positions || this.positions.length < 2) {
          return false;
        }
        const p = dimensions$1(target);
        const { left, right, top, bottom } = p;
        const [prevPosition] = this.positions;
        const position = last(this.positions);
        const path = [prevPosition, position];
        if (pointInRect(position, p)) {
          return false;
        }
        const diagonals = [
          [
            { x: left, y: top },
            { x: right, y: bottom }
          ],
          [
            { x: left, y: bottom },
            { x: right, y: top }
          ]
        ];
        return diagonals.some((diagonal) => {
          const intersection = intersect(path, diagonal);
          return intersection && pointInRect(intersection, p);
        });
      }
    }
    function intersect([{ x: x1, y: y1 }, { x: x2, y: y2 }], [{ x: x3, y: y3 }, { x: x4, y: y4 }]) {
      const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      if (denominator === 0) {
        return false;
      }
      const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
      if (ua < 0) {
        return false;
      }
      return { x: x1 + ua * (x2 - x1), y: y1 + ua * (y2 - y1) };
    }

    function observeIntersection(targets, cb, options = {}, { intersecting = true } = {}) {
      const observer = new IntersectionObserver(
        intersecting ? (entries, observer2) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            cb(entries, observer2);
          }
        } : cb,
        options
      );
      for (const el of toNodes(targets)) {
        observer.observe(el);
      }
      return observer;
    }
    const hasResizeObserver = inBrowser && window.ResizeObserver;
    function observeResize(targets, cb, options = { box: "border-box" }) {
      if (hasResizeObserver) {
        return observe$1(ResizeObserver, targets, cb, options);
      }
      const off = [on(window, "load resize", cb), on(document, "loadedmetadata load", cb, true)];
      return { disconnect: () => off.map((cb2) => cb2()) };
    }
    function observeViewportResize(cb) {
      return { disconnect: on([window, window.visualViewport], "resize", cb) };
    }
    function observeMutation(targets, cb, options) {
      return observe$1(MutationObserver, targets, cb, options);
    }
    function observe$1(Observer, targets, cb, options) {
      const observer = new Observer(cb);
      for (const el of toNodes(targets)) {
        observer.observe(el, options);
      }
      return observer;
    }

    function play(el) {
      if (isIFrame(el)) {
        call(el, { func: "playVideo", method: "play" });
      }
      if (isHTML5(el)) {
        el.play();
      }
    }
    function pause(el) {
      if (isIFrame(el)) {
        call(el, { func: "pauseVideo", method: "pause" });
      }
      if (isHTML5(el)) {
        el.pause();
      }
    }
    function mute(el) {
      if (isIFrame(el)) {
        call(el, { func: "mute", method: "setVolume", value: 0 });
      }
      if (isHTML5(el)) {
        el.muted = true;
      }
    }
    function isVideo(el) {
      return isHTML5(el) || isIFrame(el);
    }
    function isHTML5(el) {
      return isTag(el, "video");
    }
    function isIFrame(el) {
      return isTag(el, "iframe") && (isYoutube(el) || isVimeo(el));
    }
    function isYoutube(el) {
      return !!el.src.match(
        /\/\/.*?youtube(-nocookie)?\.[a-z]+\/(watch\?v=[^&\s]+|embed)|youtu\.be\/.*/
      );
    }
    function isVimeo(el) {
      return !!el.src.match(/vimeo\.com\/video\/.*/);
    }
    async function call(el, cmd) {
      await enableApi(el);
      post(el, cmd);
    }
    function post(el, cmd) {
      el.contentWindow.postMessage(JSON.stringify({ event: "command", ...cmd }), "*");
    }
    const stateKey = "_ukPlayer";
    let counter = 0;
    function enableApi(el) {
      if (el[stateKey]) {
        return el[stateKey];
      }
      const youtube = isYoutube(el);
      const vimeo = isVimeo(el);
      const id = ++counter;
      let poller;
      return el[stateKey] = new Promise((resolve) => {
        youtube && once(el, "load", () => {
          const listener = () => post(el, { event: "listening", id });
          poller = setInterval(listener, 100);
          listener();
        });
        once(window, "message", resolve, false, ({ data }) => {
          try {
            data = JSON.parse(data);
            return youtube && (data == null ? void 0 : data.id) === id && data.event === "onReady" || vimeo && Number(data == null ? void 0 : data.player_id) === id;
          } catch (e) {
          }
        });
        el.src = `${el.src}${includes(el.src, "?") ? "&" : "?"}${youtube ? "enablejsapi=1" : `api=1&player_id=${id}`}`;
      }).then(() => clearInterval(poller));
    }

    function isInView(element, offsetTop = 0, offsetLeft = 0) {
      if (!isVisible(element)) {
        return false;
      }
      return intersectRect(
        ...overflowParents(element).map((parent2) => {
          const { top, left, bottom, right } = offsetViewport(parent2);
          return {
            top: top - offsetTop,
            left: left - offsetLeft,
            bottom: bottom + offsetTop,
            right: right + offsetLeft
          };
        }).concat(offset(element))
      );
    }
    function scrollIntoView(element, { offset: offsetBy = 0 } = {}) {
      const parents2 = isVisible(element) ? scrollParents(element, false, ["hidden"]) : [];
      return parents2.reduce(
        (fn, scrollElement, i) => {
          const { scrollTop, scrollHeight, offsetHeight } = scrollElement;
          const viewport = offsetViewport(scrollElement);
          const maxScroll = scrollHeight - viewport.height;
          const { height: elHeight, top: elTop } = parents2[i - 1] ? offsetViewport(parents2[i - 1]) : offset(element);
          let top = Math.ceil(elTop - viewport.top - offsetBy + scrollTop);
          if (offsetBy > 0 && offsetHeight < elHeight + offsetBy) {
            top += offsetBy;
          } else {
            offsetBy = 0;
          }
          if (top > maxScroll) {
            offsetBy -= top - maxScroll;
            top = maxScroll;
          } else if (top < 0) {
            offsetBy -= top;
            top = 0;
          }
          return () => scrollTo(scrollElement, top - scrollTop, element, maxScroll).then(fn);
        },
        () => Promise.resolve()
      )();
      function scrollTo(element2, top, targetEl, maxScroll) {
        return new Promise((resolve) => {
          const scroll = element2.scrollTop;
          const duration = getDuration(Math.abs(top));
          const start = Date.now();
          const isScrollingElement = scrollingElement(element2) === element2;
          const targetTop = offset(targetEl).top + (isScrollingElement ? 0 : scroll);
          let prev = 0;
          let frames = 15;
          (function step() {
            const percent = ease(clamp((Date.now() - start) / duration));
            let diff = 0;
            if (parents2[0] === element2 && scroll + top < maxScroll) {
              diff = offset(targetEl).top + (isScrollingElement ? 0 : element2.scrollTop) - targetTop;
              const coverEl = getCoveringElement(targetEl);
              diff -= coverEl ? offset(coverEl).height : 0;
            }
            element2.scrollTop = scroll + (top + diff) * percent;
            if (percent === 1 && (prev === diff || !frames--)) {
              resolve();
            } else {
              prev = diff;
              requestAnimationFrame(step);
            }
          })();
        });
      }
      function getDuration(dist) {
        return 40 * Math.pow(dist, 0.375);
      }
      function ease(k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
      }
    }
    function scrolledOver(element, startOffset = 0, endOffset = 0) {
      if (!isVisible(element)) {
        return 0;
      }
      const scrollElement = scrollParent(element, true);
      const { scrollHeight, scrollTop } = scrollElement;
      const { height: viewportHeight } = offsetViewport(scrollElement);
      const maxScroll = scrollHeight - viewportHeight;
      const elementOffsetTop = offsetPosition(element)[0] - offsetPosition(scrollElement)[0];
      const start = Math.max(0, elementOffsetTop - viewportHeight + startOffset);
      const end = Math.min(maxScroll, elementOffsetTop + element.offsetHeight - endOffset);
      return start < end ? clamp((scrollTop - start) / (end - start)) : 1;
    }
    function scrollParents(element, scrollable = false, props = []) {
      const scrollEl = scrollingElement(element);
      let ancestors = parents(element).reverse();
      ancestors = ancestors.slice(ancestors.indexOf(scrollEl) + 1);
      const fixedIndex = findIndex(ancestors, (el) => css(el, "position") === "fixed");
      if (~fixedIndex) {
        ancestors = ancestors.slice(fixedIndex);
      }
      return [scrollEl].concat(
        ancestors.filter(
          (parent2) => css(parent2, "overflow").split(" ").some((prop) => includes(["auto", "scroll", ...props], prop)) && (!scrollable || parent2.scrollHeight > offsetViewport(parent2).height)
        )
      ).reverse();
    }
    function scrollParent(...args) {
      return scrollParents(...args)[0];
    }
    function overflowParents(element) {
      return scrollParents(element, false, ["hidden", "clip"]);
    }
    function offsetViewport(scrollElement) {
      const window = toWindow(scrollElement);
      let viewportElement = scrollElement === scrollingElement(scrollElement) ? window : scrollElement;
      if (isWindow(viewportElement) && window.visualViewport) {
        let { height, width, scale, pageTop: top, pageLeft: left } = window.visualViewport;
        height = Math.round(height * scale);
        width = Math.round(width * scale);
        return { height, width, top, left, bottom: top + height, right: left + width };
      }
      let rect = offset(viewportElement);
      if (css(viewportElement, "display") === "inline") {
        return rect;
      }
      for (let [prop, dir, start, end] of [
        ["width", "x", "left", "right"],
        ["height", "y", "top", "bottom"]
      ]) {
        if (isWindow(viewportElement)) {
          viewportElement = viewportElement.document;
        } else {
          rect[start] += toFloat(css(viewportElement, `border-${start}-width`));
        }
        const subpixel = rect[prop] % 1;
        rect[prop] = rect[dir] = viewportElement[`client${ucfirst(prop)}`] - (subpixel ? subpixel < 0.5 ? -subpixel : 1 - subpixel : 0);
        rect[end] = rect[prop] + rect[start];
      }
      return rect;
    }
    function getCoveringElement(target) {
      const { left, width, top } = dimensions$1(target);
      for (const position of top ? [0, top] : [0]) {
        for (const el of toWindow(target).document.elementsFromPoint(left + width / 2, position)) {
          if (!el.contains(target) && // If e.g. Offcanvas is not yet closed
          !hasClass(el, "uk-togglable-leave") && (hasPosition(el, "fixed") && zIndex(
            parents(target).reverse().find(
              (parent2) => !parent2.contains(el) && !hasPosition(parent2, "static")
            )
          ) < zIndex(el) || hasPosition(el, "sticky") && parent(el).contains(target))) {
            return el;
          }
        }
      }
    }
    function zIndex(element) {
      return toFloat(css(element, "zIndex"));
    }
    function hasPosition(element, position) {
      return css(element, "position") === position;
    }
    function scrollingElement(element) {
      return toWindow(element).document.scrollingElement;
    }

    const dirs = [
      ["width", "x", "left", "right"],
      ["height", "y", "top", "bottom"]
    ];
    function positionAt(element, target, options) {
      options = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        placement: [],
        ...options
      };
      if (!isArray(target)) {
        target = [target, target];
      }
      offset(element, getPosition(element, target, options));
    }
    function getPosition(element, target, options) {
      const position = attachTo(element, target, options);
      const { boundary, viewportOffset = 0, placement } = options;
      let offsetPosition = position;
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const viewport = getViewport(element, target[i], viewportOffset, boundary, i);
        if (isWithin(position, viewport, i)) {
          continue;
        }
        let offsetBy = 0;
        if (placement[i] === "flip") {
          const attach = options.attach.target[i];
          if (attach === end && position[end] <= viewport[end] || attach === start && position[start] >= viewport[start]) {
            continue;
          }
          offsetBy = flip(element, target, options, i)[start] - position[start];
          const scrollArea = getScrollArea(element, target[i], viewportOffset, i);
          if (!isWithin(applyOffset(position, offsetBy, i), scrollArea, i)) {
            if (isWithin(position, scrollArea, i)) {
              continue;
            }
            if (options.recursion) {
              return false;
            }
            const newPos = flipAxis(element, target, options);
            if (newPos && isWithin(newPos, scrollArea, 1 - i)) {
              return newPos;
            }
            continue;
          }
        } else if (placement[i] === "shift") {
          const targetDim = offset(target[i]);
          const { offset: elOffset } = options;
          offsetBy = clamp(
            clamp(position[start], viewport[start], viewport[end] - position[prop]),
            targetDim[start] - position[prop] + elOffset[i],
            targetDim[end] - elOffset[i]
          ) - position[start];
        }
        offsetPosition = applyOffset(offsetPosition, offsetBy, i);
      }
      return offsetPosition;
    }
    function attachTo(element, target, options) {
      let { attach, offset: offsetBy } = {
        attach: {
          element: ["left", "top"],
          target: ["left", "top"],
          ...options.attach
        },
        offset: [0, 0],
        ...options
      };
      let elOffset = offset(element);
      for (const [i, [prop, , start, end]] of Object.entries(dirs)) {
        const targetOffset = attach.target[i] === attach.element[i] ? offsetViewport(target[i]) : offset(target[i]);
        elOffset = applyOffset(
          elOffset,
          targetOffset[start] - elOffset[start] + moveBy(attach.target[i], end, targetOffset[prop]) - moveBy(attach.element[i], end, elOffset[prop]) + +offsetBy[i],
          i
        );
      }
      return elOffset;
    }
    function applyOffset(position, offset2, i) {
      const [, dir, start, end] = dirs[i];
      const newPos = { ...position };
      newPos[start] = position[dir] = position[start] + offset2;
      newPos[end] += offset2;
      return newPos;
    }
    function moveBy(attach, end, dim) {
      return attach === "center" ? dim / 2 : attach === end ? dim : 0;
    }
    function getViewport(element, target, viewportOffset, boundary, i) {
      let viewport = getIntersectionArea(...commonScrollParents(element, target).map(offsetViewport));
      if (viewportOffset) {
        viewport[dirs[i][2]] += viewportOffset;
        viewport[dirs[i][3]] -= viewportOffset;
      }
      if (boundary) {
        viewport = getIntersectionArea(
          viewport,
          offset(isArray(boundary) ? boundary[i] : boundary)
        );
      }
      return viewport;
    }
    function getScrollArea(element, target, viewportOffset, i) {
      const [prop, axis, start, end] = dirs[i];
      const [scrollElement] = commonScrollParents(element, target);
      const viewport = offsetViewport(scrollElement);
      if (["auto", "scroll"].includes(css(scrollElement, `overflow-${axis}`))) {
        viewport[start] -= scrollElement[`scroll${ucfirst(start)}`];
        viewport[end] = viewport[start] + scrollElement[`scroll${ucfirst(prop)}`];
      }
      viewport[start] += viewportOffset;
      viewport[end] -= viewportOffset;
      return viewport;
    }
    function commonScrollParents(element, target) {
      return overflowParents(target).filter((parent) => parent.contains(element));
    }
    function getIntersectionArea(...rects) {
      let area = {};
      for (const rect of rects) {
        for (const [, , start, end] of dirs) {
          area[start] = Math.max(area[start] || 0, rect[start]);
          area[end] = Math.min(...[area[end], rect[end]].filter(Boolean));
        }
      }
      return area;
    }
    function isWithin(positionA, positionB, i) {
      const [, , start, end] = dirs[i];
      return positionA[start] >= positionB[start] && positionA[end] <= positionB[end];
    }
    function flip(element, target, { offset: offset2, attach }, i) {
      return attachTo(element, target, {
        attach: {
          element: flipAttach(attach.element, i),
          target: flipAttach(attach.target, i)
        },
        offset: flipOffset(offset2, i)
      });
    }
    function flipAxis(element, target, options) {
      return getPosition(element, target, {
        ...options,
        attach: {
          element: options.attach.element.map(flipAttachAxis).reverse(),
          target: options.attach.target.map(flipAttachAxis).reverse()
        },
        offset: options.offset.reverse(),
        placement: options.placement.reverse(),
        recursion: true
      });
    }
    function flipAttach(attach, i) {
      const newAttach = [...attach];
      const index = dirs[i].indexOf(attach[i]);
      if (~index) {
        newAttach[i] = dirs[i][1 - index % 2 + 2];
      }
      return newAttach;
    }
    function flipAttachAxis(prop) {
      for (let i = 0; i < dirs.length; i++) {
        const index = dirs[i].indexOf(prop);
        if (~index) {
          return dirs[1 - i][index % 2 + 2];
        }
      }
    }
    function flipOffset(offset2, i) {
      offset2 = [...offset2];
      offset2[i] *= -1;
      return offset2;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        $: $,
        $$: $$,
        Animation: Animation,
        Dimensions: Dimensions,
        MouseTracker: MouseTracker,
        Transition: Transition,
        addClass: addClass,
        after: after,
        append: append,
        apply: apply,
        assign: assign,
        attr: attr,
        before: before,
        boxModelAdjust: boxModelAdjust,
        camelize: camelize,
        children: children,
        clamp: clamp,
        createEvent: createEvent,
        css: css,
        data: data,
        dimensions: dimensions$1,
        each: each,
        empty: empty,
        endsWith: endsWith,
        escape: escape,
        fastdom: fastdom,
        filter: filter$1,
        find: find,
        findAll: findAll,
        findIndex: findIndex,
        flipPosition: flipPosition,
        fragment: fragment,
        getCoveringElement: getCoveringElement,
        getEventPos: getEventPos,
        getIndex: getIndex,
        getTargetedElement: getTargetedElement,
        hasAttr: hasAttr,
        hasClass: hasClass,
        hasOwn: hasOwn,
        hasTouch: hasTouch,
        height: height,
        html: html,
        hyphenate: hyphenate,
        inBrowser: inBrowser,
        includes: includes,
        index: index,
        intersectRect: intersectRect,
        isArray: isArray,
        isBoolean: isBoolean,
        isDocument: isDocument,
        isElement: isElement,
        isEmpty: isEmpty,
        isEqual: isEqual,
        isFocusable: isFocusable,
        isFunction: isFunction,
        isInView: isInView,
        isInput: isInput,
        isNode: isNode,
        isNumber: isNumber,
        isNumeric: isNumeric,
        isObject: isObject,
        isPlainObject: isPlainObject,
        isRtl: isRtl,
        isSameSiteAnchor: isSameSiteAnchor,
        isString: isString,
        isTag: isTag,
        isTouch: isTouch,
        isUndefined: isUndefined,
        isVideo: isVideo,
        isVisible: isVisible,
        isVoidElement: isVoidElement,
        isWindow: isWindow,
        last: last,
        matches: matches,
        memoize: memoize,
        mute: mute,
        noop: noop,
        observeIntersection: observeIntersection,
        observeMutation: observeMutation,
        observeResize: observeResize,
        observeViewportResize: observeViewportResize,
        off: off,
        offset: offset,
        offsetPosition: offsetPosition,
        offsetViewport: offsetViewport,
        on: on,
        once: once,
        overflowParents: overflowParents,
        parent: parent,
        parents: parents,
        pause: pause,
        pick: pick,
        play: play,
        pointInRect: pointInRect,
        pointerCancel: pointerCancel,
        pointerDown: pointerDown$1,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove$1,
        pointerUp: pointerUp$1,
        position: position,
        positionAt: positionAt,
        prepend: prepend,
        propName: propName,
        query: query,
        queryAll: queryAll,
        ready: ready,
        remove: remove$1,
        removeAttr: removeAttr,
        removeClass: removeClass,
        replaceClass: replaceClass,
        scrollIntoView: scrollIntoView,
        scrollParent: scrollParent,
        scrollParents: scrollParents,
        scrolledOver: scrolledOver,
        selFocusable: selFocusable,
        selInput: selInput,
        sortBy: sortBy,
        startsWith: startsWith,
        sumBy: sumBy,
        swap: swap,
        toArray: toArray,
        toBoolean: toBoolean,
        toEventTargets: toEventTargets,
        toFloat: toFloat,
        toNode: toNode,
        toNodes: toNodes,
        toNumber: toNumber,
        toPx: toPx,
        toWindow: toWindow,
        toggleClass: toggleClass,
        trigger: trigger,
        ucfirst: ucfirst,
        uniqueBy: uniqueBy,
        unwrap: unwrap,
        width: width,
        wrapAll: wrapAll,
        wrapInner: wrapInner
    });

    var Class = {
      connected() {
        addClass(this.$el, this.$options.id);
      }
    };

    const units = ["days", "hours", "minutes", "seconds"];
    var countdown = {
      mixins: [Class],
      props: {
        date: String,
        clsWrapper: String,
        role: String
      },
      data: {
        date: "",
        clsWrapper: ".uk-countdown-%unit%",
        role: "timer"
      },
      connected() {
        attr(this.$el, "role", this.role);
        this.date = toFloat(Date.parse(this.$props.date));
        this.end = false;
        this.start();
      },
      disconnected() {
        this.stop();
      },
      events: {
        name: "visibilitychange",
        el: () => document,
        handler() {
          if (document.hidden) {
            this.stop();
          } else {
            this.start();
          }
        }
      },
      methods: {
        start() {
          this.stop();
          this.update();
          if (!this.timer) {
            trigger(this.$el, "countdownstart");
            this.timer = setInterval(this.update, 1e3);
          }
        },
        stop() {
          if (this.timer) {
            clearInterval(this.timer);
            trigger(this.$el, "countdownstop");
            this.timer = null;
          }
        },
        update() {
          const timespan = getTimeSpan(this.date);
          if (!timespan.total) {
            this.stop();
            if (!this.end) {
              trigger(this.$el, "countdownend");
              this.end = true;
            }
          }
          for (const unit of units) {
            const el = $(this.clsWrapper.replace("%unit%", unit), this.$el);
            if (!el) {
              continue;
            }
            let digits = Math.trunc(timespan[unit]).toString().padStart(2, "0");
            if (el.textContent !== digits) {
              digits = digits.split("");
              if (digits.length !== el.children.length) {
                html(el, digits.map(() => "<span></span>").join(""));
              }
              digits.forEach((digit, i) => el.children[i].textContent = digit);
            }
          }
        }
      }
    };
    function getTimeSpan(date) {
      const total = Math.max(0, date - Date.now()) / 1e3;
      return {
        total,
        seconds: total % 60,
        minutes: total / 60 % 60,
        hours: total / 60 / 60 % 24,
        days: total / 60 / 60 / 24
      };
    }

    const strats = {};
    strats.events = strats.watch = strats.observe = strats.created = strats.beforeConnect = strats.connected = strats.beforeDisconnect = strats.disconnected = strats.destroy = concatStrat;
    strats.args = function(parentVal, childVal) {
      return childVal !== false && concatStrat(childVal || parentVal);
    };
    strats.update = function(parentVal, childVal) {
      return sortBy(
        concatStrat(parentVal, isFunction(childVal) ? { read: childVal } : childVal),
        "order"
      );
    };
    strats.props = function(parentVal, childVal) {
      if (isArray(childVal)) {
        const value = {};
        for (const key of childVal) {
          value[key] = String;
        }
        childVal = value;
      }
      return strats.methods(parentVal, childVal);
    };
    strats.computed = strats.methods = function(parentVal, childVal) {
      return childVal ? parentVal ? { ...parentVal, ...childVal } : childVal : parentVal;
    };
    strats.i18n = strats.data = function(parentVal, childVal, vm) {
      if (!vm) {
        if (!childVal) {
          return parentVal;
        }
        if (!parentVal) {
          return childVal;
        }
        return function(vm2) {
          return mergeFnData(parentVal, childVal, vm2);
        };
      }
      return mergeFnData(parentVal, childVal, vm);
    };
    function mergeFnData(parentVal, childVal, vm) {
      return strats.computed(
        isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal,
        isFunction(childVal) ? childVal.call(vm, vm) : childVal
      );
    }
    function concatStrat(parentVal, childVal) {
      parentVal = parentVal && !isArray(parentVal) ? [parentVal] : parentVal;
      return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
    }
    function defaultStrat(parentVal, childVal) {
      return isUndefined(childVal) ? parentVal : childVal;
    }
    function mergeOptions(parent, child, vm) {
      const options = {};
      if (isFunction(child)) {
        child = child.options;
      }
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm);
      }
      if (child.mixins) {
        for (const mixin of child.mixins) {
          parent = mergeOptions(parent, mixin, vm);
        }
      }
      for (const key in parent) {
        mergeKey(key);
      }
      for (const key in child) {
        if (!hasOwn(parent, key)) {
          mergeKey(key);
        }
      }
      function mergeKey(key) {
        options[key] = (strats[key] || defaultStrat)(parent[key], child[key], vm);
      }
      return options;
    }
    function parseOptions(options, args = []) {
      try {
        return options ? startsWith(options, "{") ? JSON.parse(options) : args.length && !includes(options, ":") ? { [args[0]]: options } : options.split(";").reduce((options2, option) => {
          const [key, value] = option.split(/:(.*)/);
          if (key && !isUndefined(value)) {
            options2[key.trim()] = value.trim();
          }
          return options2;
        }, {}) : {};
      } catch (e) {
        return {};
      }
    }
    function coerce$1(type, value) {
      if (type === Boolean) {
        return toBoolean(value);
      } else if (type === Number) {
        return toNumber(value);
      } else if (type === "list") {
        return toList(value);
      } else if (type === Object && isString(value)) {
        return parseOptions(value);
      }
      return type ? type(value) : value;
    }
    const listRe = /,(?![^(]*\))/;
    function toList(value) {
      return isArray(value) ? value : isString(value) ? value.split(listRe).map((value2) => isNumeric(value2) ? toNumber(value2) : toBoolean(value2.trim())) : [value];
    }

    function initUpdates(instance) {
      instance._data = {};
      instance._updates = [...instance.$options.update || []];
    }
    function prependUpdate(instance, update) {
      instance._updates.unshift(update);
    }
    function clearUpdateData(instance) {
      instance._data = null;
    }
    function callUpdate(instance, e = "update") {
      if (!instance._connected) {
        return;
      }
      if (!instance._updates.length) {
        return;
      }
      if (!instance._queued) {
        instance._queued = /* @__PURE__ */ new Set();
        fastdom.read(() => {
          if (instance._connected) {
            runUpdates(instance, instance._queued);
          }
          instance._queued = null;
        });
      }
      instance._queued.add(e.type || e);
    }
    function runUpdates(instance, types) {
      for (const { read, write, events = [] } of instance._updates) {
        if (!types.has("update") && !events.some((type) => types.has(type))) {
          continue;
        }
        let result;
        if (read) {
          result = read.call(instance, instance._data, types);
          if (result && isPlainObject(result)) {
            assign(instance._data, result);
          }
        }
        if (write && result !== false) {
          fastdom.write(() => {
            if (instance._connected) {
              write.call(instance, instance._data, types);
            }
          });
        }
      }
    }

    function resize(options) {
      return observe(observeResize, options, "resize");
    }
    function intersection(options) {
      return observe(observeIntersection, options);
    }
    function mutation(options) {
      return observe(observeMutation, options);
    }
    function lazyload(options = {}) {
      return intersection({
        handler: function(entries, observer) {
          const { targets = this.$el, preload = 5 } = options;
          for (const el of toNodes(isFunction(targets) ? targets(this) : targets)) {
            $$('[loading="lazy"]', el).slice(0, preload - 1).forEach((el2) => removeAttr(el2, "loading"));
          }
          for (const el of entries.filter(({ isIntersecting }) => isIntersecting).map(({ target }) => target)) {
            observer.unobserve(el);
          }
        },
        ...options
      });
    }
    function viewport(options) {
      return observe((target, handler) => observeViewportResize(handler), options, "resize");
    }
    function scroll(options) {
      return observe(
        (target, handler) => ({
          disconnect: on(toScrollTargets(target), "scroll", handler, { passive: true })
        }),
        options,
        "scroll"
      );
    }
    function swipe(options) {
      return {
        observe(target, handler) {
          return {
            observe: noop,
            unobserve: noop,
            disconnect: on(target, pointerDown$1, handler, { passive: true })
          };
        },
        handler(e) {
          if (!isTouch(e)) {
            return;
          }
          const pos = getEventPos(e);
          const target = "tagName" in e.target ? e.target : parent(e.target);
          once(document, `${pointerUp$1} ${pointerCancel} scroll`, (e2) => {
            const { x, y } = getEventPos(e2);
            if (e2.type !== "scroll" && target && x && Math.abs(pos.x - x) > 100 || y && Math.abs(pos.y - y) > 100) {
              setTimeout(() => {
                trigger(target, "swipe");
                trigger(target, `swipe${swipeDirection(pos.x, pos.y, x, y)}`);
              });
            }
          });
        },
        ...options
      };
    }
    function observe(observe2, options, emit) {
      return {
        observe: observe2,
        handler() {
          callUpdate(this, emit);
        },
        ...options
      };
    }
    function swipeDirection(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? "Left" : "Right" : y1 - y2 > 0 ? "Up" : "Down";
    }
    function toScrollTargets(elements) {
      return toNodes(elements).map((node) => {
        const { ownerDocument } = node;
        const parent2 = scrollParent(node, true);
        return parent2 === ownerDocument.scrollingElement ? ownerDocument : parent2;
      });
    }

    ({
      props: {
        margin: String,
        firstColumn: Boolean
      },
      data: {
        margin: "uk-margin-small-top",
        firstColumn: "uk-first-column"
      },
      observe: [
        mutation({
          options: {
            childList: true
          }
        }),
        mutation({
          options: {
            attributes: true,
            attributeFilter: ["style"]
          },
          target: ({ $el }) => [$el, ...children($el)]
        }),
        resize({
          target: ({ $el }) => [$el, ...children($el)]
        })
      ],
      update: {
        read() {
          return {
            rows: getRows(children(this.$el))
          };
        },
        write({ rows }) {
          for (const row of rows) {
            for (const el of row) {
              toggleClass(el, this.margin, rows[0] !== row);
              toggleClass(el, this.firstColumn, row[isRtl ? row.length - 1 : 0] === el);
            }
          }
        },
        events: ["resize"]
      }
    });
    function getRows(elements) {
      const sorted = [[]];
      const withOffset = elements.some(
        (el, i) => i && elements[i - 1].offsetParent !== el.offsetParent
      );
      for (const el of elements) {
        if (!isVisible(el)) {
          continue;
        }
        const offset = getOffset(el, withOffset);
        for (let i = sorted.length - 1; i >= 0; i--) {
          const current = sorted[i];
          if (!current[0]) {
            current.push(el);
            break;
          }
          const offsetCurrent = getOffset(current[0], withOffset);
          if (offset.top >= offsetCurrent.bottom - 1 && offset.top !== offsetCurrent.top) {
            sorted.push([el]);
            break;
          }
          if (offset.bottom - 1 > offsetCurrent.top || offset.top === offsetCurrent.top) {
            let j = current.length - 1;
            for (; j >= 0; j--) {
              const offsetCurrent2 = getOffset(current[j], withOffset);
              if (offset.left >= offsetCurrent2.left) {
                break;
              }
            }
            current.splice(j + 1, 0, el);
            break;
          }
          if (i === 0) {
            sorted.unshift([el]);
            break;
          }
        }
      }
      return sorted;
    }
    function getOffset(element, offset = false) {
      let { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element;
      if (offset) {
        [offsetTop, offsetLeft] = offsetPosition(element);
      }
      return {
        top: offsetTop,
        left: offsetLeft,
        bottom: offsetTop + offsetHeight,
        right: offsetLeft + offsetWidth
      };
    }

    async function slide(action, target, duration) {
      await awaitFrame();
      let nodes = children(target);
      const currentProps = nodes.map((el) => getProps$1(el, true));
      const targetProps = { ...css(target, ["height", "padding"]), display: "block" };
      const targets = nodes.concat(target);
      await Promise.all(targets.map(Transition.cancel));
      css(targets, "transitionProperty", "none");
      await action();
      nodes = nodes.concat(children(target).filter((el) => !includes(nodes, el)));
      await Promise.resolve();
      css(targets, "transitionProperty", "");
      const targetStyle = attr(target, "style");
      const targetPropsTo = css(target, ["height", "padding"]);
      const [propsTo, propsFrom] = getTransitionProps(target, nodes, currentProps);
      const attrsTo = nodes.map((el) => ({ style: attr(el, "style") }));
      nodes.forEach((el, i) => propsFrom[i] && css(el, propsFrom[i]));
      css(target, targetProps);
      trigger(target, "scroll");
      await awaitFrame();
      const transitions = nodes.map((el, i) => parent(el) === target && Transition.start(el, propsTo[i], duration, "ease")).concat(Transition.start(target, targetPropsTo, duration, "ease"));
      try {
        await Promise.all(transitions);
        nodes.forEach((el, i) => {
          attr(el, attrsTo[i]);
          if (parent(el) === target) {
            css(el, "display", propsTo[i].opacity === 0 ? "none" : "");
          }
        });
        attr(target, "style", targetStyle);
      } catch (e) {
        attr(nodes, "style", "");
        resetProps(target, targetProps);
      }
    }
    function getProps$1(el, opacity) {
      const zIndex = css(el, "zIndex");
      return isVisible(el) ? {
        display: "",
        opacity: opacity ? css(el, "opacity") : "0",
        pointerEvents: "none",
        position: "absolute",
        zIndex: zIndex === "auto" ? index(el) : zIndex,
        ...getPositionWithMargin(el)
      } : false;
    }
    function getTransitionProps(target, nodes, currentProps) {
      const propsTo = nodes.map(
        (el, i) => parent(el) && i in currentProps ? currentProps[i] ? isVisible(el) ? getPositionWithMargin(el) : { opacity: 0 } : { opacity: isVisible(el) ? 1 : 0 } : false
      );
      const propsFrom = propsTo.map((props, i) => {
        const from = parent(nodes[i]) === target && (currentProps[i] || getProps$1(nodes[i]));
        if (!from) {
          return false;
        }
        if (!props) {
          delete from.opacity;
        } else if (!("opacity" in props)) {
          const { opacity } = from;
          if (opacity % 1) {
            props.opacity = 1;
          } else {
            delete from.opacity;
          }
        }
        return from;
      });
      return [propsTo, propsFrom];
    }
    function resetProps(el, props) {
      for (const prop in props) {
        css(el, prop, "");
      }
    }
    function getPositionWithMargin(el) {
      const { height, width } = offset(el);
      return {
        height,
        width,
        transform: "",
        ...position(el),
        ...css(el, ["marginTop", "marginLeft"])
      };
    }
    function awaitFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    const clsLeave = "uk-transition-leave";
    const clsEnter = "uk-transition-enter";
    function fade(action, target, duration, stagger = 0) {
      const index = transitionIndex(target, true);
      const propsIn = { opacity: 1 };
      const propsOut = { opacity: 0 };
      const wrapIndexFn = (fn) => () => index === transitionIndex(target) ? fn() : Promise.reject();
      const leaveFn = wrapIndexFn(async () => {
        addClass(target, clsLeave);
        await Promise.all(
          getTransitionNodes(target).map(
            (child, i) => new Promise(
              (resolve) => setTimeout(
                () => Transition.start(child, propsOut, duration / 2, "ease").then(
                  resolve
                ),
                i * stagger
              )
            )
          )
        );
        removeClass(target, clsLeave);
      });
      const enterFn = wrapIndexFn(async () => {
        const oldHeight = height(target);
        addClass(target, clsEnter);
        action();
        css(children(target), { opacity: 0 });
        await awaitFrame();
        const nodes = children(target);
        const newHeight = height(target);
        css(target, "alignContent", "flex-start");
        height(target, oldHeight);
        const transitionNodes = getTransitionNodes(target);
        css(nodes, propsOut);
        const transitions = transitionNodes.map(async (child, i) => {
          await awaitTimeout(i * stagger);
          await Transition.start(child, propsIn, duration / 2, "ease");
        });
        if (oldHeight !== newHeight) {
          transitions.push(
            Transition.start(
              target,
              { height: newHeight },
              duration / 2 + transitionNodes.length * stagger,
              "ease"
            )
          );
        }
        await Promise.all(transitions).then(() => {
          removeClass(target, clsEnter);
          if (index === transitionIndex(target)) {
            css(target, { height: "", alignContent: "" });
            css(nodes, { opacity: "" });
            delete target.dataset.transition;
          }
        });
      });
      return hasClass(target, clsLeave) ? waitTransitionend(target).then(enterFn) : hasClass(target, clsEnter) ? waitTransitionend(target).then(leaveFn).then(enterFn) : leaveFn().then(enterFn);
    }
    function transitionIndex(target, next) {
      if (next) {
        target.dataset.transition = 1 + transitionIndex(target);
      }
      return toNumber(target.dataset.transition) || 0;
    }
    function waitTransitionend(target) {
      return Promise.all(
        children(target).filter(Transition.inProgress).map(
          (el) => new Promise((resolve) => once(el, "transitionend transitioncanceled", resolve))
        )
      );
    }
    function getTransitionNodes(target) {
      return getRows(children(target)).flat().filter(isVisible);
    }
    function awaitTimeout(timeout) {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    }

    var Animate = {
      props: {
        duration: Number,
        animation: Boolean
      },
      data: {
        duration: 150,
        animation: "slide"
      },
      methods: {
        animate(action, target = this.$el) {
          const name = this.animation;
          const animationFn = name === "fade" ? fade : name === "delayed-fade" ? (...args) => fade(...args, 40) : name ? slide : () => {
            action();
            return Promise.resolve();
          };
          return animationFn(action, target, this.duration).catch(noop);
        }
      }
    };

    const keyMap = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      END: 35,
      HOME: 36,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };

    var filter = {
      mixins: [Animate],
      args: "target",
      props: {
        target: String,
        selActive: Boolean
      },
      data: {
        target: "",
        selActive: false,
        attrItem: "uk-filter-control",
        cls: "uk-active",
        duration: 250
      },
      computed: {
        children: ({ target }, $el) => $$(`${target} > *`, $el),
        toggles: ({ attrItem }, $el) => $$(`[${attrItem}],[data-${attrItem}]`, $el)
      },
      watch: {
        toggles(toggles) {
          this.updateState();
          const actives = $$(this.selActive, this.$el);
          for (const toggle of toggles) {
            if (this.selActive !== false) {
              toggleClass(toggle, this.cls, includes(actives, toggle));
            }
            const button = findButton(toggle);
            if (isTag(button, "a")) {
              attr(button, "role", "button");
            }
          }
        },
        children(list, prev) {
          if (prev) {
            this.updateState();
          }
        }
      },
      events: {
        name: "click keydown",
        delegate: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
        handler(e) {
          if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
            return;
          }
          if (e.target.closest("a,button")) {
            e.preventDefault();
            this.apply(e.current);
          }
        }
      },
      methods: {
        apply(el) {
          const prevState = this.getState();
          const newState = mergeState(el, this.attrItem, this.getState());
          if (!isEqualState(prevState, newState)) {
            this.setState(newState);
          }
        },
        getState() {
          return this.toggles.filter((item) => hasClass(item, this.cls)).reduce((state, el) => mergeState(el, this.attrItem, state), {
            filter: { "": "" },
            sort: []
          });
        },
        async setState(state, animate = true) {
          state = { filter: { "": "" }, sort: [], ...state };
          trigger(this.$el, "beforeFilter", [this, state]);
          for (const toggle of this.toggles) {
            toggleClass(toggle, this.cls, matchFilter(toggle, this.attrItem, state));
          }
          await Promise.all(
            $$(this.target, this.$el).map((target) => {
              const filterFn = () => applyState(state, target, children(target));
              return animate ? this.animate(filterFn, target) : filterFn();
            })
          );
          trigger(this.$el, "afterFilter", [this]);
        },
        updateState() {
          fastdom.write(() => this.setState(this.getState(), false));
        }
      }
    };
    function getFilter(el, attr2) {
      return parseOptions(data(el, attr2), ["filter"]);
    }
    function isEqualState(stateA, stateB) {
      return ["filter", "sort"].every((prop) => isEqual(stateA[prop], stateB[prop]));
    }
    function applyState(state, target, children) {
      const selector = Object.values(state.filter).join("");
      for (const el of children) {
        css(el, "display", selector && !matches(el, selector) ? "none" : "");
      }
      const [sort, order] = state.sort;
      if (sort) {
        const sorted = sortItems(children, sort, order);
        if (!isEqual(sorted, children)) {
          append(target, sorted);
        }
      }
    }
    function mergeState(el, attr2, state) {
      const { filter, group, sort, order = "asc" } = getFilter(el, attr2);
      if (filter || isUndefined(sort)) {
        if (group) {
          if (filter) {
            delete state.filter[""];
            state.filter[group] = filter;
          } else {
            delete state.filter[group];
            if (isEmpty(state.filter) || "" in state.filter) {
              state.filter = { "": filter || "" };
            }
          }
        } else {
          state.filter = { "": filter || "" };
        }
      }
      if (!isUndefined(sort)) {
        state.sort = [sort, order];
      }
      return state;
    }
    function matchFilter(el, attr2, { filter: stateFilter = { "": "" }, sort: [stateSort, stateOrder] }) {
      const { filter = "", group = "", sort, order = "asc" } = getFilter(el, attr2);
      return isUndefined(sort) ? group in stateFilter && filter === stateFilter[group] || !filter && group && !(group in stateFilter) && !stateFilter[""] : stateSort === sort && stateOrder === order;
    }
    function sortItems(nodes, sort, order) {
      return [...nodes].sort(
        (a, b) => data(a, sort).localeCompare(data(b, sort), void 0, { numeric: true }) * (order === "asc" || -1)
      );
    }
    function findButton(el) {
      return $("a,button", el) || el;
    }

    let prevented;
    function preventBackgroundScroll(el) {
      const off = on(el, "touchstart", (e) => {
        if (e.targetTouches.length !== 1 || matches(e.target, 'input[type="range"')) {
          return;
        }
        let prev = getEventPos(e).y;
        const offMove = on(
          el,
          "touchmove",
          (e2) => {
            const pos = getEventPos(e2).y;
            if (pos === prev) {
              return;
            }
            prev = pos;
            if (!scrollParents(e2.target).some((scrollParent) => {
              if (!el.contains(scrollParent)) {
                return false;
              }
              let { scrollHeight, clientHeight } = scrollParent;
              return clientHeight < scrollHeight;
            })) {
              e2.preventDefault();
            }
          },
          { passive: false }
        );
        once(el, "scroll touchend touchcanel", offMove, { capture: true });
      });
      if (prevented) {
        return off;
      }
      prevented = true;
      const { scrollingElement } = document;
      css(scrollingElement, {
        overflowY: CSS.supports("overflow", "clip") ? "clip" : "hidden",
        touchAction: "none",
        paddingRight: width(window) - scrollingElement.clientWidth || ""
      });
      return () => {
        prevented = false;
        off();
        css(scrollingElement, { overflowY: "", touchAction: "", paddingRight: "" });
      };
    }

    var Container = {
      props: {
        container: Boolean
      },
      data: {
        container: true
      },
      computed: {
        container({ container }) {
          return container === true && this.$container || container && $(container);
        }
      }
    };

    var Togglable = {
      props: {
        cls: Boolean,
        animation: "list",
        duration: Number,
        velocity: Number,
        origin: String,
        transition: String
      },
      data: {
        cls: false,
        animation: [false],
        duration: 200,
        velocity: 0.2,
        origin: false,
        transition: "ease",
        clsEnter: "uk-togglable-enter",
        clsLeave: "uk-togglable-leave"
      },
      computed: {
        hasAnimation: ({ animation }) => !!animation[0],
        hasTransition: ({ animation }) => ["slide", "reveal"].some((transition) => startsWith(animation[0], transition))
      },
      methods: {
        async toggleElement(targets, toggle, animate) {
          try {
            await Promise.all(
              toNodes(targets).map((el) => {
                const show = isBoolean(toggle) ? toggle : !this.isToggled(el);
                if (!trigger(el, `before${show ? "show" : "hide"}`, [this])) {
                  return Promise.reject();
                }
                const promise = (isFunction(animate) ? animate : animate === false || !this.hasAnimation ? toggleInstant : this.hasTransition ? toggleTransition : toggleAnimation)(el, show, this);
                const cls = show ? this.clsEnter : this.clsLeave;
                addClass(el, cls);
                trigger(el, show ? "show" : "hide", [this]);
                const done = () => {
                  removeClass(el, cls);
                  trigger(el, show ? "shown" : "hidden", [this]);
                };
                return promise ? promise.then(done, () => {
                  removeClass(el, cls);
                  return Promise.reject();
                }) : done();
              })
            );
            return true;
          } catch (e) {
            return false;
          }
        },
        isToggled(el = this.$el) {
          el = toNode(el);
          return hasClass(el, this.clsEnter) ? true : hasClass(el, this.clsLeave) ? false : this.cls ? hasClass(el, this.cls.split(" ")[0]) : isVisible(el);
        },
        _toggle(el, toggled) {
          if (!el) {
            return;
          }
          toggled = Boolean(toggled);
          let changed;
          if (this.cls) {
            changed = includes(this.cls, " ") || toggled !== hasClass(el, this.cls);
            changed && toggleClass(el, this.cls, includes(this.cls, " ") ? void 0 : toggled);
          } else {
            changed = toggled === el.hidden;
            changed && (el.hidden = !toggled);
          }
          $$("[autofocus]", el).some((el2) => isVisible(el2) ? el2.focus() || true : el2.blur());
          if (changed) {
            trigger(el, "toggled", [toggled, this]);
          }
        }
      }
    };
    function toggleInstant(el, show, { _toggle }) {
      Animation.cancel(el);
      Transition.cancel(el);
      return _toggle(el, show);
    }
    async function toggleTransition(el, show, { animation, duration, velocity, transition, _toggle }) {
      var _a;
      const [mode = "reveal", startProp = "top"] = ((_a = animation[0]) == null ? void 0 : _a.split("-")) || [];
      const dirs = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      const dir = dirs[includes(dirs[0], startProp) ? 0 : 1];
      const end = dir[1] === startProp;
      const props = ["width", "height"];
      const dimProp = props[dirs.indexOf(dir)];
      const marginProp = `margin-${dir[0]}`;
      const marginStartProp = `margin-${startProp}`;
      let currentDim = dimensions$1(el)[dimProp];
      const inProgress = Transition.inProgress(el);
      await Transition.cancel(el);
      if (show) {
        _toggle(el, true);
      }
      const prevProps = Object.fromEntries(
        [
          "padding",
          "border",
          "width",
          "height",
          "minWidth",
          "minHeight",
          "overflowY",
          "overflowX",
          marginProp,
          marginStartProp
        ].map((key) => [key, el.style[key]])
      );
      const dim = dimensions$1(el);
      const currentMargin = toFloat(css(el, marginProp));
      const marginStart = toFloat(css(el, marginStartProp));
      const endDim = dim[dimProp] + marginStart;
      if (!inProgress && !show) {
        currentDim += marginStart;
      }
      const [wrapper] = wrapInner(el, "<div>");
      css(wrapper, {
        boxSizing: "border-box",
        height: dim.height,
        width: dim.width,
        ...css(el, [
          "overflow",
          "padding",
          "borderTop",
          "borderRight",
          "borderBottom",
          "borderLeft",
          "borderImage",
          marginStartProp
        ])
      });
      css(el, {
        padding: 0,
        border: 0,
        minWidth: 0,
        minHeight: 0,
        [marginStartProp]: 0,
        width: dim.width,
        height: dim.height,
        overflow: "hidden",
        [dimProp]: currentDim
      });
      const percent = currentDim / endDim;
      duration = (velocity * endDim + duration) * (show ? 1 - percent : percent);
      const endProps = { [dimProp]: show ? endDim : 0 };
      if (end) {
        css(el, marginProp, endDim - currentDim + currentMargin);
        endProps[marginProp] = show ? currentMargin : endDim + currentMargin;
      }
      if (!end ^ mode === "reveal") {
        css(wrapper, marginProp, -endDim + currentDim);
        Transition.start(wrapper, { [marginProp]: show ? 0 : -endDim }, duration, transition);
      }
      try {
        await Transition.start(el, endProps, duration, transition);
      } finally {
        css(el, prevProps);
        unwrap(wrapper.firstChild);
        if (!show) {
          _toggle(el, false);
        }
      }
    }
    function toggleAnimation(el, show, cmp) {
      const { animation, duration, _toggle } = cmp;
      if (show) {
        _toggle(el, true);
        return Animation.in(el, animation[0], duration, cmp.origin);
      }
      return Animation.out(el, animation[1] || animation[0], duration, cmp.origin).then(
        () => _toggle(el, false)
      );
    }

    const active = [];
    var Modal = {
      mixins: [Class, Container, Togglable],
      props: {
        selPanel: String,
        selClose: String,
        escClose: Boolean,
        bgClose: Boolean,
        stack: Boolean,
        role: String
      },
      data: {
        cls: "uk-open",
        escClose: true,
        bgClose: false,
        overlay: true,
        stack: false,
        role: "dialog"
      },
      computed: {
        panel: ({ selPanel }, $el) => $(selPanel, $el),
        transitionElement() {
          return this.panel;
        },
        bgClose({ bgClose }) {
          return bgClose && this.panel;
        }
      },
      connected() {
        attr(this.panel || this.$el, "role", this.role);
        if (this.overlay) {
          attr(this.panel || this.$el, "aria-modal", true);
        }
      },
      beforeDisconnect() {
        if (includes(active, this)) {
          this.toggleElement(this.$el, false, false);
        }
      },
      events: [
        {
          name: "click",
          delegate: ({ selClose }) => `${selClose},a[href*="#"]`,
          handler(e) {
            const { current, defaultPrevented } = e;
            const { hash } = current;
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !this.$el.contains($(hash))) {
              this.hide();
            } else if (matches(current, this.selClose)) {
              e.preventDefault();
              this.hide();
            }
          }
        },
        {
          name: "toggle",
          self: true,
          handler(e) {
            if (e.defaultPrevented) {
              return;
            }
            e.preventDefault();
            if (this.isToggled() === includes(active, this)) {
              this.toggle();
            }
          }
        },
        {
          name: "beforeshow",
          self: true,
          handler(e) {
            if (includes(active, this)) {
              return false;
            }
            if (!this.stack && active.length) {
              Promise.all(active.map((modal) => modal.hide())).then(this.show);
              e.preventDefault();
            } else {
              active.push(this);
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (this.stack) {
              css(this.$el, "zIndex", toFloat(css(this.$el, "zIndex")) + active.length);
            }
            const handlers = [
              this.overlay && preventBackgroundFocus(this),
              this.overlay && preventBackgroundScroll(this.$el),
              this.bgClose && listenForBackgroundClose(this),
              this.escClose && listenForEscClose(this)
            ];
            once(
              this.$el,
              "hidden",
              () => handlers.forEach((handler) => handler && handler()),
              { self: true }
            );
            addClass(document.documentElement, this.clsPage);
          }
        },
        {
          name: "shown",
          self: true,
          handler() {
            if (!isFocusable(this.$el)) {
              attr(this.$el, "tabindex", "-1");
            }
            if (!matches(this.$el, ":focus-within")) {
              this.$el.focus();
            }
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            if (includes(active, this)) {
              active.splice(active.indexOf(this), 1);
            }
            css(this.$el, "zIndex", "");
            if (!active.some((modal) => modal.clsPage === this.clsPage)) {
              removeClass(document.documentElement, this.clsPage);
            }
          }
        }
      ],
      methods: {
        toggle() {
          return this.isToggled() ? this.hide() : this.show();
        },
        show() {
          if (this.container && parent(this.$el) !== this.container) {
            append(this.container, this.$el);
            return new Promise(
              (resolve) => requestAnimationFrame(() => this.show().then(resolve))
            );
          }
          return this.toggleElement(this.$el, true, animate$1);
        },
        hide() {
          return this.toggleElement(this.$el, false, animate$1);
        }
      }
    };
    function animate$1(el, show, { transitionElement, _toggle }) {
      return new Promise(
        (resolve, reject) => once(el, "show hide", () => {
          var _a;
          (_a = el._reject) == null ? void 0 : _a.call(el);
          el._reject = reject;
          _toggle(el, show);
          const off = once(
            transitionElement,
            "transitionstart",
            () => {
              once(transitionElement, "transitionend transitioncancel", resolve, {
                self: true
              });
              clearTimeout(timer);
            },
            { self: true }
          );
          const timer = setTimeout(
            () => {
              off();
              resolve();
            },
            toMs(css(transitionElement, "transitionDuration"))
          );
        })
      ).then(() => delete el._reject);
    }
    function toMs(time) {
      return time ? endsWith(time, "ms") ? toFloat(time) : toFloat(time) * 1e3 : 0;
    }
    function preventBackgroundFocus(modal) {
      return on(document, "focusin", (e) => {
        if (last(active) === modal && !modal.$el.contains(e.target)) {
          modal.$el.focus();
        }
      });
    }
    function listenForBackgroundClose(modal) {
      return on(document, pointerDown$1, ({ target }) => {
        if (last(active) !== modal || modal.overlay && !modal.$el.contains(target) || modal.panel.contains(target)) {
          return;
        }
        once(
          document,
          `${pointerUp$1} ${pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === pointerUp$1 && target === newTarget) {
              modal.hide();
            }
          },
          true
        );
      });
    }
    function listenForEscClose(modal) {
      return on(document, "keydown", (e) => {
        if (e.keyCode === 27 && last(active) === modal) {
          modal.hide();
        }
      });
    }

    var Animations$2 = {
      slide: {
        show(dir) {
          return [{ transform: translate(dir * -100) }, { transform: translate() }];
        },
        percent(current) {
          return translated(current);
        },
        translate(percent, dir) {
          return [
            { transform: translate(dir * -100 * percent) },
            { transform: translate(dir * 100 * (1 - percent)) }
          ];
        }
      }
    };
    function translated(el) {
      return Math.abs(new DOMMatrix(css(el, "transform")).m41 / el.offsetWidth);
    }
    function translate(value = 0, unit = "%") {
      value += value ? unit : "";
      return `translate3d(${value}, 0, 0)`;
    }
    function scale3d(value) {
      return `scale3d(${value}, ${value}, 1)`;
    }

    function Transitioner$1(prev, next, dir, { animation, easing }) {
      const { percent, translate, show = noop } = animation;
      const props = show(dir);
      let resolve;
      return {
        dir,
        show(duration, percent2 = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * clamp(percent2, -1, 1));
          this.translate(percent2);
          triggerUpdate$1(next, "itemin", { percent: percent2, duration, timing, dir });
          triggerUpdate$1(prev, "itemout", { percent: 1 - percent2, duration, timing, dir });
          return new Promise((res) => {
            resolve || (resolve = res);
            Promise.all([
              Transition.start(next, props[1], duration, timing),
              Transition.start(prev, props[0], duration, timing)
            ]).then(() => {
              this.reset();
              resolve();
            }, noop);
          });
        },
        cancel() {
          return Transition.cancel([next, prev]);
        },
        reset() {
          for (const prop in props[0]) {
            css([next, prev], prop, "");
          }
        },
        async forward(duration, percent2 = this.percent()) {
          await this.cancel();
          return this.show(duration, percent2, true);
        },
        translate(percent2) {
          this.reset();
          const props2 = translate(percent2, dir);
          css(next, props2[1]);
          css(prev, props2[0]);
          triggerUpdate$1(next, "itemtranslatein", { percent: percent2, dir });
          triggerUpdate$1(prev, "itemtranslateout", { percent: 1 - percent2, dir });
        },
        percent() {
          return percent(prev || next, next, dir);
        },
        getDistance() {
          return prev == null ? void 0 : prev.offsetWidth;
        }
      };
    }
    function triggerUpdate$1(el, type, data) {
      trigger(el, createEvent(type, false, false, data));
    }

    var I18n = {
      props: {
        i18n: Object
      },
      data: {
        i18n: null
      },
      methods: {
        t(key, ...params) {
          var _a, _b, _c;
          let i = 0;
          return ((_c = ((_a = this.i18n) == null ? void 0 : _a[key]) || ((_b = this.$options.i18n) == null ? void 0 : _b[key])) == null ? void 0 : _c.replace(
            /%s/g,
            () => params[i++] || ""
          )) || "";
        }
      }
    };

    var SliderAutoplay = {
      props: {
        autoplay: Boolean,
        autoplayInterval: Number,
        pauseOnHover: Boolean
      },
      data: {
        autoplay: false,
        autoplayInterval: 7e3,
        pauseOnHover: true
      },
      connected() {
        attr(this.list, "aria-live", this.autoplay ? "off" : "polite");
        this.autoplay && this.startAutoplay();
      },
      disconnected() {
        this.stopAutoplay();
      },
      update() {
        attr(this.slides, "tabindex", "-1");
      },
      events: [
        {
          name: "visibilitychange",
          el: () => document,
          filter: ({ autoplay }) => autoplay,
          handler() {
            if (document.hidden) {
              this.stopAutoplay();
            } else {
              this.startAutoplay();
            }
          }
        }
      ],
      methods: {
        startAutoplay() {
          this.stopAutoplay();
          this.interval = setInterval(() => {
            if (!(this.stack.length || this.draggable && matches(this.$el, ":focus-within") && !matches(this.$el, ":focus") || this.pauseOnHover && matches(this.$el, ":hover"))) {
              this.show("next");
            }
          }, this.autoplayInterval);
        },
        stopAutoplay() {
          clearInterval(this.interval);
        }
      }
    };

    const pointerOptions = { passive: false, capture: true };
    const pointerUpOptions = { passive: true, capture: true };
    const pointerDown = "touchstart mousedown";
    const pointerMove = "touchmove mousemove";
    const pointerUp = "touchend touchcancel mouseup click input scroll";
    const preventClick = (e) => e.preventDefault();
    var SliderDrag = {
      props: {
        draggable: Boolean
      },
      data: {
        draggable: true,
        threshold: 10
      },
      created() {
        for (const key of ["start", "move", "end"]) {
          const fn = this[key];
          this[key] = (e) => {
            const pos = getEventPos(e).x * (isRtl ? -1 : 1);
            this.prevPos = pos === this.pos ? this.prevPos : this.pos;
            this.pos = pos;
            fn(e);
          };
        }
      },
      events: [
        {
          name: pointerDown,
          passive: true,
          delegate: ({ selList }) => `${selList} > *`,
          handler(e) {
            if (!this.draggable || this.parallax || !isTouch(e) && hasSelectableText(e.target) || e.target.closest(selInput) || e.button > 0 || this.length < 2) {
              return;
            }
            this.start(e);
          }
        },
        {
          name: "dragstart",
          handler(e) {
            e.preventDefault();
          }
        },
        {
          // iOS workaround for slider stopping if swiping fast
          name: pointerMove,
          el: ({ list }) => list,
          handler: noop,
          ...pointerOptions
        }
      ],
      methods: {
        start() {
          this.drag = this.pos;
          if (this._transitioner) {
            this.percent = this._transitioner.percent();
            this.drag += this._transitioner.getDistance() * this.percent * this.dir;
            this._transitioner.cancel();
            this._transitioner.translate(this.percent);
            this.dragging = true;
            this.stack = [];
          } else {
            this.prevIndex = this.index;
          }
          on(document, pointerMove, this.move, pointerOptions);
          on(document, pointerUp, this.end, pointerUpOptions);
          css(this.list, "userSelect", "none");
        },
        move(e) {
          const distance = this.pos - this.drag;
          if (distance === 0 || this.prevPos === this.pos || !this.dragging && Math.abs(distance) < this.threshold) {
            return;
          }
          if (!this.dragging) {
            on(this.list, "click", preventClick, pointerOptions);
          }
          e.cancelable && e.preventDefault();
          this.dragging = true;
          this.dir = distance < 0 ? 1 : -1;
          let { slides, prevIndex } = this;
          let dis = Math.abs(distance);
          let nextIndex = this.getIndex(prevIndex + this.dir);
          let width = getDistance.call(this, prevIndex, nextIndex);
          while (nextIndex !== prevIndex && dis > width) {
            this.drag -= width * this.dir;
            prevIndex = nextIndex;
            dis -= width;
            nextIndex = this.getIndex(prevIndex + this.dir);
            width = getDistance.call(this, prevIndex, nextIndex);
          }
          this.percent = dis / width;
          const prev = slides[prevIndex];
          const next = slides[nextIndex];
          const changed = this.index !== nextIndex;
          const edge = prevIndex === nextIndex;
          let itemShown;
          for (const i of [this.index, this.prevIndex]) {
            if (!includes([nextIndex, prevIndex], i)) {
              trigger(slides[i], "itemhidden", [this]);
              if (edge) {
                itemShown = true;
                this.prevIndex = prevIndex;
              }
            }
          }
          if (this.index === prevIndex && this.prevIndex !== prevIndex || itemShown) {
            trigger(slides[this.index], "itemshown", [this]);
          }
          if (changed) {
            this.prevIndex = prevIndex;
            this.index = nextIndex;
            if (!edge) {
              trigger(prev, "beforeitemhide", [this]);
              trigger(prev, "itemhide", [this]);
            }
            trigger(next, "beforeitemshow", [this]);
            trigger(next, "itemshow", [this]);
          }
          this._transitioner = this._translate(Math.abs(this.percent), prev, !edge && next);
        },
        end() {
          off(document, pointerMove, this.move, pointerOptions);
          off(document, pointerUp, this.end, pointerUpOptions);
          if (this.dragging) {
            this.dragging = null;
            if (this.index === this.prevIndex) {
              this.percent = 1 - this.percent;
              this.dir *= -1;
              this._show(false, this.index, true);
              this._transitioner = null;
            } else {
              const dirChange = (isRtl ? this.dir * (isRtl ? 1 : -1) : this.dir) < 0 === this.prevPos > this.pos;
              this.index = dirChange ? this.index : this.prevIndex;
              if (dirChange) {
                this.percent = 1 - this.percent;
              }
              this.show(
                this.dir > 0 && !dirChange || this.dir < 0 && dirChange ? "next" : "previous",
                true
              );
            }
          }
          setTimeout(() => off(this.list, "click", preventClick, pointerOptions));
          css(this.list, { userSelect: "" });
          this.drag = this.percent = null;
        }
      }
    };
    function getDistance(prev, next) {
      return this._getTransitioner(prev, prev !== next && next).getDistance() || this.slides[prev].offsetWidth;
    }
    function hasSelectableText(el) {
      return css(el, "userSelect") !== "none" && toArray(el.childNodes).some((el2) => el2.nodeType === 3 && el2.textContent.trim());
    }

    function initWatches(instance) {
      instance._watches = [];
      for (const watches of instance.$options.watch || []) {
        for (const [name, watch] of Object.entries(watches)) {
          registerWatch(instance, watch, name);
        }
      }
      instance._initial = true;
    }
    function registerWatch(instance, watch, name) {
      instance._watches.push({
        name,
        ...isPlainObject(watch) ? watch : { handler: watch }
      });
    }
    function runWatches(instance, values) {
      for (const { name, handler, immediate = true } of instance._watches) {
        if (instance._initial && immediate || hasOwn(values, name) && !isEqual(values[name], instance[name])) {
          handler.call(instance, instance[name], values[name]);
        }
      }
      instance._initial = false;
    }

    function initComputed(instance) {
      const { computed } = instance.$options;
      instance._computed = {};
      if (computed) {
        for (const key in computed) {
          registerComputed(instance, key, computed[key]);
        }
      }
    }
    const mutationOptions = { subtree: true, childList: true };
    function registerComputed(instance, key, cb) {
      instance._hasComputed = true;
      Object.defineProperty(instance, key, {
        enumerable: true,
        get() {
          const { _computed, $props, $el } = instance;
          if (!hasOwn(_computed, key)) {
            _computed[key] = (cb.get || cb).call(instance, $props, $el);
            if (cb.observe && instance._computedObserver) {
              const selector = cb.observe.call(instance, $props);
              instance._computedObserver.observe(
                ["~", "+", "-"].includes(selector[0]) ? $el.parentElement : $el.getRootNode(),
                mutationOptions
              );
            }
          }
          return _computed[key];
        },
        set(value) {
          const { _computed } = instance;
          _computed[key] = cb.set ? cb.set.call(instance, value) : value;
          if (isUndefined(_computed[key])) {
            delete _computed[key];
          }
        }
      });
    }
    function initComputedUpdates(instance) {
      if (!instance._hasComputed) {
        return;
      }
      prependUpdate(instance, {
        read: () => runWatches(instance, resetComputed(instance)),
        events: ["resize", "computed"]
      });
      instance._computedObserver = observeMutation(
        instance.$el,
        () => callUpdate(instance, "computed"),
        mutationOptions
      );
    }
    function disconnectComputedUpdates(instance) {
      var _a;
      (_a = instance._computedObserver) == null ? void 0 : _a.disconnect();
      delete instance._computedObserver;
      resetComputed(instance);
    }
    function resetComputed(instance) {
      const values = { ...instance._computed };
      instance._computed = {};
      return values;
    }

    function initEvents(instance) {
      instance._events = [];
      for (const event of instance.$options.events || []) {
        if (hasOwn(event, "handler")) {
          registerEvent(instance, event);
        } else {
          for (const key in event) {
            registerEvent(instance, event[key], key);
          }
        }
      }
    }
    function unbindEvents(instance) {
      instance._events.forEach((unbind) => unbind());
      delete instance._events;
    }
    function registerEvent(instance, event, key) {
      let { name, el, handler, capture, passive, delegate, filter, self } = isPlainObject(event) ? event : { name: key, handler: event };
      el = isFunction(el) ? el.call(instance, instance) : el || instance.$el;
      if (!el || isArray(el) && !el.length || filter && !filter.call(instance, instance)) {
        return;
      }
      instance._events.push(
        on(
          el,
          name,
          delegate ? isString(delegate) ? delegate : delegate.call(instance, instance) : null,
          isString(handler) ? instance[handler] : handler.bind(instance),
          { passive, capture, self }
        )
      );
    }

    function initObservers(instance) {
      instance._observers = [];
      for (const observer of instance.$options.observe || []) {
        registerObservable(instance, observer);
      }
    }
    function registerObserver(instance, ...observer) {
      instance._observers.push(...observer);
    }
    function disconnectObservers(instance) {
      for (const observer of instance._observers) {
        observer.disconnect();
      }
    }
    function registerObservable(instance, observable) {
      let { observe, target = instance.$el, handler, options, filter, args } = observable;
      if (filter && !filter.call(instance, instance)) {
        return;
      }
      const key = `_observe${instance._observers.length}`;
      if (isFunction(target) && !hasOwn(instance, key)) {
        registerComputed(instance, key, () => {
          const targets2 = target.call(instance, instance);
          return isArray(targets2) ? toNodes(targets2) : targets2;
        });
      }
      handler = isString(handler) ? instance[handler] : handler.bind(instance);
      if (isFunction(options)) {
        options = options.call(instance, instance);
      }
      const targets = hasOwn(instance, key) ? instance[key] : target;
      const observer = observe(targets, handler, options, args);
      if (isFunction(target) && isArray(instance[key])) {
        registerWatch(
          instance,
          { handler: updateTargets(observer, options), immediate: false },
          key
        );
      }
      registerObserver(instance, observer);
    }
    function updateTargets(observer, options) {
      return (targets, prev) => {
        for (const target of prev) {
          if (!includes(targets, target)) {
            if (observer.unobserve) {
              observer.unobserve(target);
            } else if (observer.observe) {
              observer.disconnect();
            }
          }
        }
        for (const target of targets) {
          if (!includes(prev, target) || !observer.unobserve) {
            observer.observe(target, options);
          }
        }
      };
    }

    function initProps(instance) {
      const { $options, $props } = instance;
      const props = getProps($options);
      assign($props, props);
      const { computed, methods } = $options;
      for (let key in $props) {
        if (key in props && (!computed || !hasOwn(computed, key)) && (!methods || !hasOwn(methods, key))) {
          instance[key] = $props[key];
        }
      }
    }
    function getProps(opts) {
      const data$1 = {};
      const { args = [], props = {}, el, id } = opts;
      if (!props) {
        return data$1;
      }
      for (const key in props) {
        const prop = hyphenate(key);
        let value = data(el, prop);
        if (isUndefined(value)) {
          continue;
        }
        value = props[key] === Boolean && value === "" ? true : coerce$1(props[key], value);
        if (prop === "target" && startsWith(value, "_")) {
          continue;
        }
        data$1[key] = value;
      }
      const options = parseOptions(data(el, id), args);
      for (const key in options) {
        const prop = camelize(key);
        if (!isUndefined(props[prop])) {
          data$1[prop] = coerce$1(props[prop], options[key]);
        }
      }
      return data$1;
    }
    const getAttributes = memoize((id, props) => {
      const attributes = Object.keys(props);
      const filter = attributes.concat(id).map((key) => [hyphenate(key), `data-${hyphenate(key)}`]).flat();
      return { attributes, filter };
    });
    function initPropsObserver(instance) {
      const { $options, $props } = instance;
      const { id, props, el } = $options;
      if (!props) {
        return;
      }
      const { attributes, filter } = getAttributes(id, props);
      const observer = new MutationObserver((records) => {
        const data = getProps($options);
        if (records.some(({ attributeName }) => {
          const prop = attributeName.replace("data-", "");
          return (prop === id ? attributes : [camelize(prop), camelize(attributeName)]).some(
            (prop2) => !isUndefined(data[prop2]) && data[prop2] !== $props[prop2]
          );
        })) {
          instance.$reset();
        }
      });
      observer.observe(el, {
        attributes: true,
        attributeFilter: filter
      });
      registerObserver(instance, observer);
    }

    function callHook(instance, hook) {
      var _a;
      (_a = instance.$options[hook]) == null ? void 0 : _a.forEach((handler) => handler.call(instance));
    }
    function callConnected(instance) {
      if (instance._connected) {
        return;
      }
      initProps(instance);
      callHook(instance, "beforeConnect");
      instance._connected = true;
      initEvents(instance);
      initUpdates(instance);
      initWatches(instance);
      initObservers(instance);
      initPropsObserver(instance);
      initComputedUpdates(instance);
      callHook(instance, "connected");
      callUpdate(instance);
    }
    function callDisconnected(instance) {
      if (!instance._connected) {
        return;
      }
      callHook(instance, "beforeDisconnect");
      unbindEvents(instance);
      clearUpdateData(instance);
      disconnectObservers(instance);
      disconnectComputedUpdates(instance);
      callHook(instance, "disconnected");
      instance._connected = false;
    }

    let uid = 0;
    function init$1(instance, options = {}) {
      options.data = normalizeData(options, instance.constructor.options);
      instance.$options = mergeOptions(instance.constructor.options, options, instance);
      instance.$props = {};
      instance._uid = uid++;
      initData(instance);
      initMethods(instance);
      initComputed(instance);
      callHook(instance, "created");
      if (options.el) {
        instance.$mount(options.el);
      }
    }
    function initData(instance) {
      const { data = {} } = instance.$options;
      for (const key in data) {
        instance.$props[key] = instance[key] = data[key];
      }
    }
    function initMethods(instance) {
      const { methods } = instance.$options;
      if (methods) {
        for (const key in methods) {
          instance[key] = methods[key].bind(instance);
        }
      }
    }
    function normalizeData({ data = {} }, { args = [], props = {} }) {
      if (isArray(data)) {
        data = data.slice(0, args.length).reduce((data2, value, index) => {
          if (isPlainObject(value)) {
            assign(data2, value);
          } else {
            data2[args[index]] = value;
          }
          return data2;
        }, {});
      }
      for (const key in data) {
        if (isUndefined(data[key])) {
          delete data[key];
        } else if (props[key]) {
          data[key] = coerce$1(props[key], data[key]);
        }
      }
      return data;
    }

    const App = function(options) {
      init$1(this, options);
    };
    App.util = util;
    App.options = {};
    App.version = "3.21.3";

    const PREFIX = "uk-";
    const DATA = "__uikit__";
    const components$2 = {};
    function component(name, options) {
      var _a, _b;
      const id = PREFIX + hyphenate(name);
      if (!options) {
        if (!components$2[id].options) {
          components$2[id] = App.extend(components$2[id]);
        }
        return components$2[id];
      }
      name = camelize(name);
      App[name] = (element, data) => createComponent(name, element, data);
      const opt = (_a = options.options) != null ? _a : { ...options };
      opt.id = id;
      opt.name = name;
      (_b = opt.install) == null ? void 0 : _b.call(opt, App, opt, name);
      if (App._initialized && !opt.functional) {
        requestAnimationFrame(() => createComponent(name, `[${id}],[data-${id}]`));
      }
      return components$2[id] = opt;
    }
    function createComponent(name, element, data, ...args) {
      const Component = component(name);
      return Component.options.functional ? new Component({ data: isPlainObject(element) ? element : [element, data, ...args] }) : element ? findAll(element).map(init)[0] : init();
      function init(element2) {
        const instance = getComponent(element2, name);
        if (instance) {
          if (data) {
            instance.$destroy();
          } else {
            return instance;
          }
        }
        return new Component({ el: element2, data });
      }
    }
    function getComponents(element) {
      return (element == null ? void 0 : element[DATA]) || {};
    }
    function getComponent(element, name) {
      return getComponents(element)[name];
    }
    function attachToElement(element, instance) {
      if (!element[DATA]) {
        element[DATA] = {};
      }
      element[DATA][instance.$options.name] = instance;
    }
    function detachFromElement(element, instance) {
      var _a;
      (_a = element[DATA]) == null ? true : delete _a[instance.$options.name];
      if (isEmpty(element[DATA])) {
        delete element[DATA];
      }
    }

    function globalApi(App) {
      App.component = component;
      App.getComponents = getComponents;
      App.getComponent = getComponent;
      App.update = update;
      App.use = function(plugin) {
        if (plugin.installed) {
          return;
        }
        plugin.call(null, this);
        plugin.installed = true;
        return this;
      };
      App.mixin = function(mixin, component2) {
        component2 = (isString(component2) ? this.component(component2) : component2) || this;
        component2.options = mergeOptions(component2.options, mixin);
      };
      App.extend = function(options) {
        options || (options = {});
        const Super = this;
        const Sub = function UIkitComponent(options2) {
          init$1(this, options2);
        };
        Sub.prototype = Object.create(Super.prototype);
        Sub.prototype.constructor = Sub;
        Sub.options = mergeOptions(Super.options, options);
        Sub.super = Super;
        Sub.extend = Super.extend;
        return Sub;
      };
      let container;
      Object.defineProperty(App, "container", {
        get() {
          return container || document.body;
        },
        set(element) {
          container = $(element);
        }
      });
    }
    function update(element, e) {
      element = element ? toNode(element) : document.body;
      for (const parentEl of parents(element).reverse()) {
        updateElement(parentEl, e);
      }
      apply(element, (element2) => updateElement(element2, e));
    }
    function updateElement(element, e) {
      const components = getComponents(element);
      for (const name in components) {
        callUpdate(components[name], e);
      }
    }

    function instanceApi(App) {
      App.prototype.$mount = function(el) {
        const instance = this;
        attachToElement(el, instance);
        instance.$options.el = el;
        if (document.contains(el)) {
          callConnected(instance);
        }
      };
      App.prototype.$destroy = function(removeEl = false) {
        const instance = this;
        const { el } = instance.$options;
        if (el) {
          callDisconnected(instance);
        }
        callHook(instance, "destroy");
        detachFromElement(el, instance);
        if (removeEl) {
          remove$1(instance.$el);
        }
      };
      App.prototype.$create = createComponent;
      App.prototype.$emit = function(e) {
        callUpdate(this, e);
      };
      App.prototype.$update = function(element = this.$el, e) {
        update(element, e);
      };
      App.prototype.$reset = function() {
        callDisconnected(this);
        callConnected(this);
      };
      App.prototype.$getComponent = getComponent;
      Object.defineProperties(App.prototype, {
        $el: {
          get() {
            return this.$options.el;
          }
        },
        $container: Object.getOwnPropertyDescriptor(App, "container")
      });
    }
    let id = 1;
    function generateId(instance, el = null) {
      return (el == null ? void 0 : el.id) || `${instance.$options.id}-${id++}`;
    }

    var SliderNav = {
      i18n: {
        next: "Next slide",
        previous: "Previous slide",
        slideX: "Slide %s",
        slideLabel: "%s of %s",
        role: "String"
      },
      data: {
        selNav: false,
        role: "region"
      },
      computed: {
        nav: ({ selNav }, $el) => $(selNav, $el),
        navChildren() {
          return children(this.nav);
        },
        selNavItem: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
        navItems(_, $el) {
          return $$(this.selNavItem, $el);
        }
      },
      watch: {
        nav(nav, prev) {
          attr(nav, "role", "tablist");
          if (prev) {
            this.$emit();
          }
        },
        list(list) {
          if (isTag(list, "ul")) {
            attr(list, "role", "presentation");
          }
        },
        navChildren(children2) {
          attr(children2, "role", "presentation");
        },
        navItems(items) {
          for (const el of items) {
            const cmd = data(el, this.attrItem);
            const button = $("a,button", el) || el;
            let ariaLabel;
            let ariaControls = null;
            if (isNumeric(cmd)) {
              const item = toNumber(cmd);
              const slide = this.slides[item];
              if (slide) {
                if (!slide.id) {
                  slide.id = generateId(this, slide);
                }
                ariaControls = slide.id;
              }
              ariaLabel = this.t("slideX", toFloat(cmd) + 1);
              attr(button, "role", "tab");
            } else {
              if (this.list) {
                if (!this.list.id) {
                  this.list.id = generateId(this, this.list);
                }
                ariaControls = this.list.id;
              }
              ariaLabel = this.t(cmd);
            }
            attr(button, {
              "aria-controls": ariaControls,
              "aria-label": attr(button, "aria-label") || ariaLabel
            });
          }
        },
        slides(slides) {
          slides.forEach(
            (slide, i) => attr(slide, {
              role: this.nav ? "tabpanel" : "group",
              "aria-label": this.t("slideLabel", i + 1, this.length),
              "aria-roledescription": this.nav ? null : "slide"
            })
          );
        },
        length(length) {
          const navLength = this.navChildren.length;
          if (this.nav && length !== navLength) {
            empty(this.nav);
            for (let i = 0; i < length; i++) {
              append(this.nav, `<li ${this.attrItem}="${i}"><a href></a></li>`);
            }
          }
        }
      },
      connected() {
        attr(this.$el, {
          role: this.role,
          "aria-roledescription": "carousel"
        });
      },
      update: [
        {
          write() {
            this.navItems.concat(this.nav).forEach((el) => el && (el.hidden = !this.maxIndex));
            this.updateNav();
          },
          events: ["resize"]
        }
      ],
      events: [
        {
          name: "click keydown",
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
          handler(e) {
            if (e.target.closest("a,button") && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              this.show(data(e.current, this.attrItem));
            }
          }
        },
        {
          name: "itemshow",
          handler: "updateNav"
        },
        {
          name: "keydown",
          delegate: ({ selNavItem }) => selNavItem,
          filter: ({ parallax }) => !parallax,
          handler(e) {
            const { current, keyCode } = e;
            const cmd = data(current, this.attrItem);
            if (!isNumeric(cmd)) {
              return;
            }
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT ? "previous" : keyCode === keyMap.RIGHT ? "next" : -1;
            if (~i) {
              e.preventDefault();
              this.show(i);
            }
          }
        }
      ],
      methods: {
        updateNav() {
          const index = this.getValidIndex();
          for (const el of this.navItems) {
            const cmd = data(el, this.attrItem);
            const button = $("a,button", el) || el;
            if (isNumeric(cmd)) {
              const item = toNumber(cmd);
              const active = item === index;
              toggleClass(el, this.clsActive, active);
              toggleClass(button, "uk-disabled", this.parallax);
              attr(button, {
                "aria-selected": active,
                tabindex: active && !this.parallax ? null : -1
              });
              if (active && button && matches(parent(el), ":focus-within")) {
                button.focus();
              }
            } else {
              toggleClass(
                el,
                "uk-invisible",
                this.finite && (cmd === "previous" && index === 0 || cmd === "next" && index >= this.maxIndex)
              );
            }
          }
        }
      }
    };

    var Slider = {
      mixins: [SliderAutoplay, SliderDrag, SliderNav, I18n],
      props: {
        clsActivated: String,
        easing: String,
        index: Number,
        finite: Boolean,
        velocity: Number
      },
      data: () => ({
        easing: "ease",
        finite: false,
        velocity: 1,
        index: 0,
        prevIndex: -1,
        stack: [],
        percent: 0,
        clsActive: "uk-active",
        clsActivated: "",
        clsEnter: "uk-slide-enter",
        clsLeave: "uk-slide-leave",
        clsSlideActive: "uk-slide-active",
        Transitioner: false,
        transitionOptions: {}
      }),
      connected() {
        this.prevIndex = -1;
        this.index = this.getValidIndex(this.$props.index);
        this.stack = [];
      },
      disconnected() {
        removeClass(this.slides, this.clsActive);
      },
      computed: {
        duration: ({ velocity }, $el) => speedUp($el.offsetWidth / velocity),
        list: ({ selList }, $el) => $(selList, $el),
        maxIndex() {
          return this.length - 1;
        },
        slides() {
          return children(this.list);
        },
        length() {
          return this.slides.length;
        }
      },
      watch: {
        slides(slides, prev) {
          if (prev) {
            this.$emit();
          }
        }
      },
      events: {
        itemshow({ target }) {
          addClass(target, this.clsEnter, this.clsSlideActive);
        },
        itemshown({ target }) {
          removeClass(target, this.clsEnter);
        },
        itemhide({ target }) {
          addClass(target, this.clsLeave);
        },
        itemhidden({ target }) {
          removeClass(target, this.clsLeave, this.clsSlideActive);
        }
      },
      methods: {
        show(index, force = false) {
          var _a;
          if (this.dragging || !this.length || this.parallax) {
            return;
          }
          const { stack } = this;
          const queueIndex = force ? 0 : stack.length;
          const reset = () => {
            stack.splice(queueIndex, 1);
            if (stack.length) {
              this.show(stack.shift(), true);
            }
          };
          stack[force ? "unshift" : "push"](index);
          if (!force && stack.length > 1) {
            if (stack.length === 2) {
              (_a = this._transitioner) == null ? void 0 : _a.forward(Math.min(this.duration, 200));
            }
            return;
          }
          const prevIndex = this.getIndex(this.index);
          const prev = hasClass(this.slides, this.clsActive) && this.slides[prevIndex];
          const nextIndex = this.getIndex(index, this.index);
          const next = this.slides[nextIndex];
          if (prev === next) {
            reset();
            return;
          }
          this.dir = getDirection(index, prevIndex);
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          if (prev && !trigger(prev, "beforeitemhide", [this]) || !trigger(next, "beforeitemshow", [this, prev])) {
            this.index = this.prevIndex;
            reset();
            return;
          }
          const promise = this._show(prev, next, force).then(() => {
            prev && trigger(prev, "itemhidden", [this]);
            trigger(next, "itemshown", [this]);
            stack.shift();
            this._transitioner = null;
            if (stack.length) {
              requestAnimationFrame(() => stack.length && this.show(stack.shift(), true));
            }
          });
          prev && trigger(prev, "itemhide", [this]);
          trigger(next, "itemshow", [this]);
          return promise;
        },
        getIndex(index = this.index, prev = this.index) {
          return clamp(
            getIndex(index, this.slides, prev, this.finite),
            0,
            Math.max(0, this.maxIndex)
          );
        },
        getValidIndex(index = this.index, prevIndex = this.prevIndex) {
          return this.getIndex(index, prevIndex);
        },
        async _show(prev, next, force) {
          this._transitioner = this._getTransitioner(prev, next, this.dir, {
            easing: force ? next.offsetWidth < 600 ? "cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "cubic-bezier(0.165, 0.84, 0.44, 1)" : this.easing,
            ...this.transitionOptions
          });
          if (!force && !prev) {
            this._translate(1);
            return;
          }
          const { length } = this.stack;
          return this._transitioner[length > 1 ? "forward" : "show"](
            length > 1 ? Math.min(this.duration, 75 + 75 / (length - 1)) : this.duration,
            this.percent
          );
        },
        _translate(percent, prev = this.prevIndex, next = this.index) {
          const transitioner = this._getTransitioner(prev === next ? false : prev, next);
          transitioner.translate(percent);
          return transitioner;
        },
        _getTransitioner(prev = this.prevIndex, next = this.index, dir = this.dir || 1, options = this.transitionOptions) {
          return new this.Transitioner(
            isNumber(prev) ? this.slides[prev] : prev,
            isNumber(next) ? this.slides[next] : next,
            dir * (isRtl ? -1 : 1),
            options
          );
        }
      }
    };
    function getDirection(index, prevIndex) {
      return index === "next" ? 1 : index === "previous" ? -1 : index < prevIndex ? -1 : 1;
    }
    function speedUp(x) {
      return 0.5 * x + 300;
    }

    var Slideshow = {
      mixins: [Slider],
      props: {
        animation: String
      },
      data: {
        animation: "slide",
        clsActivated: "uk-transition-active",
        Animations: Animations$2,
        Transitioner: Transitioner$1
      },
      computed: {
        animation({ animation, Animations: Animations2 }) {
          return { ...Animations2[animation] || Animations2.slide, name: animation };
        },
        transitionOptions() {
          return { animation: this.animation };
        }
      },
      observe: resize(),
      events: {
        beforeitemshow({ target }) {
          addClass(target, this.clsActive);
        },
        itemshown({ target }) {
          addClass(target, this.clsActivated);
        },
        itemhidden({ target }) {
          removeClass(target, this.clsActive, this.clsActivated);
        }
      }
    };

    var Animations$1 = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0 }, { opacity: 1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent }, { opacity: percent }];
        }
      },
      scale: {
        show() {
          return [
            { opacity: 0, transform: scale3d(1 - 0.2) },
            { opacity: 1, transform: scale3d(1) }
          ];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 - 0.2 * percent) },
            { opacity: percent, transform: scale3d(1 - 0.2 + 0.2 * percent) }
          ];
        }
      }
    };

    var LightboxPanel = {
      mixins: [Modal, Slideshow],
      functional: true,
      props: {
        delayControls: Number,
        preload: Number,
        videoAutoplay: Boolean,
        template: String
      },
      data: () => ({
        preload: 1,
        videoAutoplay: false,
        delayControls: 3e3,
        items: [],
        cls: "uk-open",
        clsPage: "uk-lightbox-page",
        selList: ".uk-lightbox-items",
        attrItem: "uk-lightbox-item",
        selClose: ".uk-close-large",
        selCaption: ".uk-lightbox-caption",
        pauseOnHover: false,
        velocity: 2,
        Animations: Animations$1,
        template: `<div class="uk-lightbox uk-overflow-hidden"> <ul class="uk-lightbox-items"></ul> <div class="uk-lightbox-toolbar uk-position-top uk-text-right uk-transition-slide-top uk-transition-opaque"> <button class="uk-lightbox-toolbar-icon uk-close-large" type="button" uk-close></button> </div> <a class="uk-lightbox-button uk-position-center-left uk-position-medium uk-transition-fade" href uk-slidenav-previous uk-lightbox-item="previous"></a> <a class="uk-lightbox-button uk-position-center-right uk-position-medium uk-transition-fade" href uk-slidenav-next uk-lightbox-item="next"></a> <div class="uk-lightbox-toolbar uk-lightbox-caption uk-position-bottom uk-text-center uk-transition-slide-bottom uk-transition-opaque"></div> </div>`
      }),
      created() {
        const $el = $(this.template);
        const list = $(this.selList, $el);
        this.items.forEach(() => append(list, "<li>"));
        const close = $("[uk-close]", $el);
        const closeLabel = this.t("close");
        if (close && closeLabel) {
          close.dataset.i18n = JSON.stringify({ label: closeLabel });
        }
        this.$mount(append(this.container, $el));
      },
      computed: {
        caption: ({ selCaption }, $el) => $(selCaption, $el)
      },
      events: [
        {
          name: `${pointerMove$1} ${pointerDown$1} keydown`,
          handler: "showControls"
        },
        {
          name: "click",
          self: true,
          delegate: ({ selList }) => `${selList} > *`,
          handler(e) {
            if (!e.defaultPrevented) {
              this.hide();
            }
          }
        },
        {
          name: "shown",
          self: true,
          handler: "showControls"
        },
        {
          name: "hide",
          self: true,
          handler() {
            this.hideControls();
            removeClass(this.slides, this.clsActive);
            Transition.stop(this.slides);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            this.$destroy(true);
          }
        },
        {
          name: "keyup",
          el: () => document,
          handler({ keyCode }) {
            if (!this.isToggled(this.$el) || !this.draggable) {
              return;
            }
            let i = -1;
            if (keyCode === keyMap.LEFT) {
              i = "previous";
            } else if (keyCode === keyMap.RIGHT) {
              i = "next";
            } else if (keyCode === keyMap.HOME) {
              i = 0;
            } else if (keyCode === keyMap.END) {
              i = "last";
            }
            if (~i) {
              this.show(i);
            }
          }
        },
        {
          name: "beforeitemshow",
          handler(e) {
            if (this.isToggled()) {
              return;
            }
            this.draggable = false;
            e.preventDefault();
            this.toggleElement(this.$el, true, false);
            this.animation = Animations$1["scale"];
            removeClass(e.target, this.clsActive);
            this.stack.splice(1, 0, this.index);
          }
        },
        {
          name: "itemshow",
          handler() {
            html(this.caption, this.getItem().caption || "");
            for (let j = -this.preload; j <= this.preload; j++) {
              this.loadItem(this.index + j);
            }
          }
        },
        {
          name: "itemshown",
          handler() {
            this.draggable = this.$props.draggable;
          }
        },
        {
          name: "itemload",
          async handler(_, item) {
            const { source: src, type, alt = "", poster, attrs = {} } = item;
            this.setItem(item, "<span uk-spinner></span>");
            if (!src) {
              return;
            }
            let matches;
            const iframeAttrs = {
              allowfullscreen: "",
              style: "max-width: 100%; box-sizing: border-box;",
              "uk-responsive": "",
              "uk-video": `${this.videoAutoplay}`
            };
            if (type === "image" || src.match(/\.(avif|jpe?g|jfif|a?png|gif|svg|webp)($|\?)/i)) {
              const img = createEl("img", { src, alt, ...attrs });
              on(img, "load", () => this.setItem(item, img));
              on(img, "error", () => this.setError(item));
            } else if (type === "video" || src.match(/\.(mp4|webm|ogv)($|\?)/i)) {
              const video = createEl("video", {
                src,
                poster,
                controls: "",
                playsinline: "",
                "uk-video": `${this.videoAutoplay}`,
                ...attrs
              });
              on(video, "loadedmetadata", () => this.setItem(item, video));
              on(video, "error", () => this.setError(item));
            } else if (type === "iframe" || src.match(/\.(html|php)($|\?)/i)) {
              this.setItem(
                item,
                createEl("iframe", {
                  src,
                  allowfullscreen: "",
                  class: "uk-lightbox-iframe",
                  ...attrs
                })
              );
            } else if (matches = src.match(
              /\/\/(?:.*?youtube(-nocookie)?\..*?(?:[?&]v=|\/shorts\/)|youtu\.be\/)([\w-]{11})[&?]?(.*)?/
            )) {
              this.setItem(
                item,
                createEl("iframe", {
                  src: `https://www.youtube${matches[1] || ""}.com/embed/${matches[2]}${matches[3] ? `?${matches[3]}` : ""}`,
                  width: 1920,
                  height: 1080,
                  ...iframeAttrs,
                  ...attrs
                })
              );
            } else if (matches = src.match(/\/\/.*?vimeo\.[a-z]+\/(\d+)[&?]?(.*)?/)) {
              try {
                const { height, width } = await (await fetch(
                  `https://vimeo.com/api/oembed.json?maxwidth=1920&url=${encodeURI(
                src
              )}`,
                  { credentials: "omit" }
                )).json();
                this.setItem(
                  item,
                  createEl("iframe", {
                    src: `https://player.vimeo.com/video/${matches[1]}${matches[2] ? `?${matches[2]}` : ""}`,
                    width,
                    height,
                    ...iframeAttrs,
                    ...attrs
                  })
                );
              } catch (e) {
                this.setError(item);
              }
            }
          }
        }
      ],
      methods: {
        loadItem(index = this.index) {
          const item = this.getItem(index);
          if (!this.getSlide(item).childElementCount) {
            trigger(this.$el, "itemload", [item]);
          }
        },
        getItem(index = this.index) {
          return this.items[getIndex(index, this.slides)];
        },
        setItem(item, content) {
          trigger(this.$el, "itemloaded", [this, html(this.getSlide(item), content)]);
        },
        getSlide(item) {
          return this.slides[this.items.indexOf(item)];
        },
        setError(item) {
          this.setItem(item, '<span uk-icon="icon: bolt; ratio: 2"></span>');
        },
        showControls() {
          clearTimeout(this.controlsTimer);
          this.controlsTimer = setTimeout(this.hideControls, this.delayControls);
          addClass(this.$el, "uk-active", "uk-transition-active");
        },
        hideControls() {
          removeClass(this.$el, "uk-active", "uk-transition-active");
        }
      }
    };
    function createEl(tag, attrs) {
      const el = fragment(`<${tag}>`);
      attr(el, attrs);
      return el;
    }

    var lightbox = {
      install: install$3,
      props: { toggle: String },
      data: { toggle: "a" },
      computed: {
        toggles: ({ toggle }, $el) => $$(toggle, $el)
      },
      watch: {
        toggles(toggles) {
          this.hide();
          for (const toggle of toggles) {
            if (isTag(toggle, "a")) {
              attr(toggle, "role", "button");
            }
          }
        }
      },
      disconnected() {
        this.hide();
      },
      events: {
        name: "click",
        delegate: ({ toggle }) => `${toggle}:not(.uk-disabled)`,
        handler(e) {
          if (!e.defaultPrevented) {
            e.preventDefault();
            this.show(e.current);
          }
        }
      },
      methods: {
        show(index) {
          const items = uniqueBy(this.toggles.map(toItem), "source");
          if (isElement(index)) {
            const { source } = toItem(index);
            index = findIndex(items, ({ source: src }) => source === src);
          }
          this.panel = this.panel || this.$create("lightboxPanel", { ...this.$props, items });
          on(this.panel.$el, "hidden", () => this.panel = null);
          return this.panel.show(index);
        },
        hide() {
          var _a;
          return (_a = this.panel) == null ? void 0 : _a.hide();
        }
      }
    };
    function install$3(UIkit, Lightbox) {
      if (!UIkit.lightboxPanel) {
        UIkit.component("lightboxPanel", LightboxPanel);
      }
      assign(Lightbox.props, UIkit.component("lightboxPanel").options.props);
    }
    function toItem(el) {
      const item = {};
      for (const attr2 of ["href", "caption", "type", "poster", "alt", "attrs"]) {
        item[attr2 === "href" ? "source" : attr2] = data(el, attr2);
      }
      item.attrs = parseOptions(item.attrs);
      return item;
    }

    var notification = {
      mixins: [Container],
      functional: true,
      args: ["message", "status"],
      data: {
        message: "",
        status: "",
        timeout: 5e3,
        group: "",
        pos: "top-center",
        clsContainer: "uk-notification",
        clsClose: "uk-notification-close",
        clsMsg: "uk-notification-message"
      },
      install: install$2,
      computed: {
        marginProp: ({ pos }) => `margin-${pos.match(/[a-z]+(?=-)/)[0]}`,
        startProps() {
          return { opacity: 0, [this.marginProp]: -this.$el.offsetHeight };
        }
      },
      created() {
        const posClass = `${this.clsContainer}-${this.pos}`;
        const containerAttr = `data-${this.clsContainer}-container`;
        const container = $(`.${posClass}[${containerAttr}]`, this.container) || append(
          this.container,
          `<div class="${this.clsContainer} ${posClass}" ${containerAttr}></div>`
        );
        this.$mount(
          append(
            container,
            `<div class="${this.clsMsg}${this.status ? ` ${this.clsMsg}-${this.status}` : ""}" role="alert"> <a href class="${this.clsClose}" data-uk-close></a> <div>${this.message}</div> </div>`
          )
        );
      },
      async connected() {
        const margin = toFloat(css(this.$el, this.marginProp));
        await Transition.start(css(this.$el, this.startProps), {
          opacity: 1,
          [this.marginProp]: margin
        });
        if (this.timeout) {
          this.timer = setTimeout(this.close, this.timeout);
        }
      },
      events: {
        click(e) {
          if (e.target.closest('a[href="#"],a[href=""]')) {
            e.preventDefault();
          }
          this.close();
        },
        [pointerEnter]() {
          if (this.timer) {
            clearTimeout(this.timer);
          }
        },
        [pointerLeave]() {
          if (this.timeout) {
            this.timer = setTimeout(this.close, this.timeout);
          }
        }
      },
      methods: {
        async close(immediate) {
          const removeFn = (el) => {
            const container = parent(el);
            trigger(el, "close", [this]);
            remove$1(el);
            if (!(container == null ? void 0 : container.hasChildNodes())) {
              remove$1(container);
            }
          };
          if (this.timer) {
            clearTimeout(this.timer);
          }
          if (!immediate) {
            await Transition.start(this.$el, this.startProps);
          }
          removeFn(this.$el);
        }
      }
    };
    function install$2(UIkit) {
      UIkit.notification.closeAll = function(group, immediate) {
        apply(document.body, (el) => {
          const notification = UIkit.getComponent(el, "notification");
          if (notification && (!group || group === notification.group)) {
            notification.close(immediate);
          }
        });
      };
    }

    var Media = {
      props: {
        media: Boolean
      },
      data: {
        media: false
      },
      connected() {
        const media = toMedia(this.media, this.$el);
        this.matchMedia = true;
        if (media) {
          this.mediaObj = window.matchMedia(media);
          const handler = () => {
            this.matchMedia = this.mediaObj.matches;
            trigger(this.$el, createEvent("mediachange", false, true, [this.mediaObj]));
          };
          this.offMediaObj = on(this.mediaObj, "change", () => {
            handler();
            this.$emit("resize");
          });
          handler();
        }
      },
      disconnected() {
        var _a;
        (_a = this.offMediaObj) == null ? void 0 : _a.call(this);
      }
    };
    function toMedia(value, element) {
      if (isString(value)) {
        if (startsWith(value, "@")) {
          value = toFloat(css(element, `--uk-breakpoint-${value.slice(1)}`));
        } else if (isNaN(value)) {
          return value;
        }
      }
      return value && isNumeric(value) ? `(min-width: ${value}px)` : "";
    }

    function getMaxPathLength(el) {
      return isVisible(el) ? Math.ceil(Math.max(0, ...$$("[stroke]", el).map((stroke) => stroke.getTotalLength()))) : 0;
    }

    const props = {
      x: transformFn,
      y: transformFn,
      rotate: transformFn,
      scale: transformFn,
      color: colorFn,
      backgroundColor: colorFn,
      borderColor: colorFn,
      blur: filterFn,
      hue: filterFn,
      fopacity: filterFn,
      grayscale: filterFn,
      invert: filterFn,
      saturate: filterFn,
      sepia: filterFn,
      opacity: cssPropFn,
      stroke: strokeFn,
      bgx: backgroundFn,
      bgy: backgroundFn
    };
    const { keys } = Object;
    var Parallax = {
      mixins: [Media],
      props: fillObject(keys(props), "list"),
      data: fillObject(keys(props), void 0),
      computed: {
        props(properties, $el) {
          const stops = {};
          for (const prop in properties) {
            if (prop in props && !isUndefined(properties[prop])) {
              stops[prop] = properties[prop].slice();
            }
          }
          const result = {};
          for (const prop in stops) {
            result[prop] = props[prop](prop, $el, stops[prop], stops);
          }
          return result;
        }
      },
      events: {
        load() {
          this.$emit();
        }
      },
      methods: {
        reset() {
          for (const prop in this.getCss(0)) {
            css(this.$el, prop, "");
          }
        },
        getCss(percent) {
          const css2 = {};
          for (const prop in this.props) {
            this.props[prop](css2, clamp(percent));
          }
          css2.willChange = Object.keys(css2).map(propName).join(",");
          return css2;
        }
      }
    };
    function transformFn(prop, el, stops) {
      let unit = getUnit(stops) || { x: "px", y: "px", rotate: "deg" }[prop] || "";
      let transformFn2;
      if (prop === "x" || prop === "y") {
        prop = `translate${ucfirst(prop)}`;
        transformFn2 = (stop) => toFloat(toFloat(stop).toFixed(unit === "px" ? 0 : 6));
      } else if (prop === "scale") {
        unit = "";
        transformFn2 = (stop) => {
          var _a;
          return getUnit([stop]) ? toPx(stop, "width", el, true) / el[`offset${((_a = stop.endsWith) == null ? void 0 : _a.call(stop, "vh")) ? "Height" : "Width"}`] : toFloat(stop);
        };
      }
      if (stops.length === 1) {
        stops.unshift(prop === "scale" ? 1 : 0);
      }
      stops = parseStops(stops, transformFn2);
      return (css2, percent) => {
        css2.transform = `${css2.transform || ""} ${prop}(${getValue(stops, percent)}${unit})`;
      };
    }
    function colorFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops, (stop) => parseColor(el, stop));
      return (css2, percent) => {
        const [start, end, p] = getStop(stops, percent);
        const value = start.map((value2, i) => {
          value2 += p * (end[i] - value2);
          return i === 3 ? toFloat(value2) : parseInt(value2, 10);
        }).join(",");
        css2[prop] = `rgba(${value})`;
      };
    }
    function parseColor(el, color) {
      return getCssValue(el, "color", color).split(/[(),]/g).slice(1, -1).concat(1).slice(0, 4).map(toFloat);
    }
    function filterFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops) || { blur: "px", hue: "deg" }[prop] || "%";
      prop = { fopacity: "opacity", hue: "hue-rotate" }[prop] || prop;
      stops = parseStops(stops);
      return (css2, percent) => {
        const value = getValue(stops, percent);
        css2.filter = `${css2.filter || ""} ${prop}(${value + unit})`;
      };
    }
    function cssPropFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(getCssValue(el, prop, ""));
      }
      stops = parseStops(stops);
      return (css2, percent) => {
        css2[prop] = getValue(stops, percent);
      };
    }
    function strokeFn(prop, el, stops) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const unit = getUnit(stops);
      const length = getMaxPathLength(el);
      stops = parseStops(stops.reverse(), (stop) => {
        stop = toFloat(stop);
        return unit === "%" ? stop * length / 100 : stop;
      });
      if (!stops.some(([value]) => value)) {
        return noop;
      }
      css(el, "strokeDasharray", length);
      return (css2, percent) => {
        css2.strokeDashoffset = getValue(stops, percent);
      };
    }
    function backgroundFn(prop, el, stops, props2) {
      if (stops.length === 1) {
        stops.unshift(0);
      }
      const attr = prop === "bgy" ? "height" : "width";
      props2[prop] = parseStops(stops, (stop) => toPx(stop, attr, el));
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      if (bgProps.length === 2 && prop === "bgx") {
        return noop;
      }
      if (getCssValue(el, "backgroundSize", "") === "cover") {
        return backgroundCoverFn(prop, el, stops, props2);
      }
      const positions = {};
      for (const prop2 of bgProps) {
        positions[prop2] = getBackgroundPos(el, prop2);
      }
      return setBackgroundPosFn(bgProps, positions, props2);
    }
    function backgroundCoverFn(prop, el, stops, props2) {
      const dimImage = getBackgroundImageDimensions(el);
      if (!dimImage.width) {
        return noop;
      }
      const dimEl = {
        width: el.offsetWidth,
        height: el.offsetHeight
      };
      const bgProps = ["bgx", "bgy"].filter((prop2) => prop2 in props2);
      const positions = {};
      for (const prop2 of bgProps) {
        const values = props2[prop2].map(([value]) => value);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const down = values.indexOf(min) < values.indexOf(max);
        const diff = max - min;
        positions[prop2] = `${(down ? -diff : 0) - (down ? min : max)}px`;
        dimEl[prop2 === "bgy" ? "height" : "width"] += diff;
      }
      const dim = Dimensions.cover(dimImage, dimEl);
      for (const prop2 of bgProps) {
        const attr = prop2 === "bgy" ? "height" : "width";
        const overflow = dim[attr] - dimEl[attr];
        positions[prop2] = `max(${getBackgroundPos(el, prop2)},-${overflow}px) + ${positions[prop2]}`;
      }
      const fn = setBackgroundPosFn(bgProps, positions, props2);
      return (css2, percent) => {
        fn(css2, percent);
        css2.backgroundSize = `${dim.width}px ${dim.height}px`;
        css2.backgroundRepeat = "no-repeat";
      };
    }
    function getBackgroundPos(el, prop) {
      return getCssValue(el, `background-position-${prop.slice(-1)}`, "");
    }
    function setBackgroundPosFn(bgProps, positions, props2) {
      return function(css2, percent) {
        for (const prop of bgProps) {
          const value = getValue(props2[prop], percent);
          css2[`background-position-${prop.slice(-1)}`] = `calc(${positions[prop]} + ${value}px)`;
        }
      };
    }
    const loading = {};
    const dimensions = {};
    function getBackgroundImageDimensions(el) {
      const src = css(el, "backgroundImage").replace(/^none|url\(["']?(.+?)["']?\)$/, "$1");
      if (dimensions[src]) {
        return dimensions[src];
      }
      const image = new Image();
      if (src) {
        image.src = src;
        if (!image.naturalWidth && !loading[src]) {
          once(image, "error load", () => {
            dimensions[src] = toDimensions(image);
            trigger(el, createEvent("load", false));
          });
          loading[src] = true;
          return toDimensions(image);
        }
      }
      return dimensions[src] = toDimensions(image);
    }
    function toDimensions(image) {
      return {
        width: image.naturalWidth,
        height: image.naturalHeight
      };
    }
    function parseStops(stops, fn = toFloat) {
      const result = [];
      const { length } = stops;
      let nullIndex = 0;
      for (let i = 0; i < length; i++) {
        let [value, percent] = isString(stops[i]) ? stops[i].trim().split(/ (?![^(]*\))/) : [stops[i]];
        value = fn(value);
        percent = percent ? toFloat(percent) / 100 : null;
        if (i === 0) {
          if (percent === null) {
            percent = 0;
          } else if (percent) {
            result.push([value, 0]);
          }
        } else if (i === length - 1) {
          if (percent === null) {
            percent = 1;
          } else if (percent !== 1) {
            result.push([value, percent]);
            percent = 1;
          }
        }
        result.push([value, percent]);
        if (percent === null) {
          nullIndex++;
        } else if (nullIndex) {
          const leftPercent = result[i - nullIndex - 1][1];
          const p = (percent - leftPercent) / (nullIndex + 1);
          for (let j = nullIndex; j > 0; j--) {
            result[i - j][1] = leftPercent + p * (nullIndex - j + 1);
          }
          nullIndex = 0;
        }
      }
      return result;
    }
    function getStop(stops, percent) {
      const index = findIndex(stops.slice(1), ([, targetPercent]) => percent <= targetPercent) + 1;
      return [
        stops[index - 1][0],
        stops[index][0],
        (percent - stops[index - 1][1]) / (stops[index][1] - stops[index - 1][1])
      ];
    }
    function getValue(stops, percent) {
      const [start, end, p] = getStop(stops, percent);
      return start + Math.abs(start - end) * p * (start < end ? 1 : -1);
    }
    const unitRe = /^-?\d+(?:\.\d+)?(\S+)?/;
    function getUnit(stops, defaultUnit) {
      var _a;
      for (const stop of stops) {
        const match = (_a = stop.match) == null ? void 0 : _a.call(stop, unitRe);
        if (match) {
          return match[1];
        }
      }
      return defaultUnit;
    }
    function getCssValue(el, prop, value) {
      const prev = el.style[prop];
      const val = css(css(el, prop, value), prop);
      el.style[prop] = prev;
      return val;
    }
    function fillObject(keys2, value) {
      return keys2.reduce((data, prop) => {
        data[prop] = value;
        return data;
      }, {});
    }
    function ease(percent, easing) {
      return easing >= 0 ? Math.pow(percent, easing + 1) : 1 - Math.pow(1 - percent, 1 - easing);
    }

    var parallax = {
      mixins: [Parallax],
      props: {
        target: String,
        viewport: Number,
        // Deprecated
        easing: Number,
        start: String,
        end: String
      },
      data: {
        target: false,
        viewport: 1,
        easing: 1,
        start: 0,
        end: 0
      },
      computed: {
        target: ({ target }, $el) => getOffsetElement(target && query(target, $el) || $el),
        start({ start }) {
          return toPx(start, "height", this.target, true);
        },
        end({ end, viewport: viewport2 }) {
          return toPx(
            end || (viewport2 = (1 - viewport2) * 100) && `${viewport2}vh+${viewport2}%`,
            "height",
            this.target,
            true
          );
        }
      },
      observe: [
        viewport(),
        scroll({ target: ({ target }) => target }),
        resize({ target: ({ $el, target }) => [$el, target, scrollParent(target, true)] })
      ],
      update: {
        read({ percent }, types) {
          if (!types.has("scroll")) {
            percent = false;
          }
          if (!isVisible(this.$el)) {
            return false;
          }
          if (!this.matchMedia) {
            return;
          }
          const prev = percent;
          percent = ease(scrolledOver(this.target, this.start, this.end), this.easing);
          return {
            percent,
            style: prev === percent ? false : this.getCss(percent)
          };
        },
        write({ style }) {
          if (!this.matchMedia) {
            this.reset();
            return;
          }
          style && css(this.$el, style);
        },
        events: ["scroll", "resize"]
      }
    };
    function getOffsetElement(el) {
      return el ? "offsetTop" in el ? el : getOffsetElement(parent(el)) : document.documentElement;
    }

    var SliderParallax = {
      props: {
        parallax: Boolean,
        parallaxTarget: Boolean,
        parallaxStart: String,
        parallaxEnd: String,
        parallaxEasing: Number
      },
      data: {
        parallax: false,
        parallaxTarget: false,
        parallaxStart: 0,
        parallaxEnd: 0,
        parallaxEasing: 0
      },
      observe: [
        resize({
          target: ({ $el, parallaxTarget }) => [$el, parallaxTarget],
          filter: ({ parallax }) => parallax
        }),
        scroll({ filter: ({ parallax }) => parallax })
      ],
      computed: {
        parallaxTarget({ parallaxTarget }, $el) {
          return parallaxTarget && query(parallaxTarget, $el) || this.list;
        }
      },
      update: {
        read() {
          if (!this.parallax) {
            return false;
          }
          const target = this.parallaxTarget;
          if (!target) {
            return false;
          }
          const start = toPx(this.parallaxStart, "height", target, true);
          const end = toPx(this.parallaxEnd, "height", target, true);
          const percent = ease(scrolledOver(target, start, end), this.parallaxEasing);
          return { parallax: this.getIndexAt(percent) };
        },
        write({ parallax }) {
          const [prevIndex, slidePercent] = parallax;
          const nextIndex = this.getValidIndex(prevIndex + Math.ceil(slidePercent));
          const prev = this.slides[prevIndex];
          const next = this.slides[nextIndex];
          const { triggerShow, triggerShown, triggerHide, triggerHidden } = useTriggers(this);
          if (~this.prevIndex) {
            for (const i of /* @__PURE__ */ new Set([this.index, this.prevIndex])) {
              if (!includes([nextIndex, prevIndex], i)) {
                triggerHide(this.slides[i]);
                triggerHidden(this.slides[i]);
              }
            }
          }
          const changed = this.prevIndex !== prevIndex || this.index !== nextIndex;
          this.dir = 1;
          this.prevIndex = prevIndex;
          this.index = nextIndex;
          if (prev !== next) {
            triggerHide(prev);
          }
          triggerShow(next);
          if (changed) {
            triggerShown(prev);
          }
          this._translate(prev === next ? 1 : slidePercent, prev, next);
        },
        events: ["scroll", "resize"]
      },
      methods: {
        getIndexAt(percent) {
          const index = percent * (this.length - 1);
          return [Math.floor(index), index % 1];
        }
      }
    };
    function useTriggers(cmp) {
      const { clsSlideActive, clsEnter, clsLeave } = cmp;
      return { triggerShow, triggerShown, triggerHide, triggerHidden };
      function triggerShow(el) {
        if (hasClass(el, clsLeave)) {
          triggerHide(el);
          triggerHidden(el);
        }
        if (!hasClass(el, clsSlideActive)) {
          trigger(el, "beforeitemshow", [cmp]);
          trigger(el, "itemshow", [cmp]);
        }
      }
      function triggerShown(el) {
        if (hasClass(el, clsEnter)) {
          trigger(el, "itemshown", [cmp]);
        }
      }
      function triggerHide(el) {
        if (!hasClass(el, clsSlideActive)) {
          triggerShow(el);
        }
        if (hasClass(el, clsEnter)) {
          triggerShown(el);
        }
        if (!hasClass(el, clsLeave)) {
          trigger(el, "beforeitemhide", [cmp]);
          trigger(el, "itemhide", [cmp]);
        }
      }
      function triggerHidden(el) {
        if (hasClass(el, clsLeave)) {
          trigger(el, "itemhidden", [cmp]);
        }
      }
    }

    var SliderReactive = {
      update: {
        write() {
          if (this.stack.length || this.dragging || this.parallax) {
            return;
          }
          const index = this.getValidIndex();
          if (!~this.prevIndex || this.index !== index) {
            this.show(index);
          } else {
            this._translate(1);
          }
        },
        events: ["resize"]
      }
    };

    var SliderPreload = {
      observe: lazyload({
        target: ({ slides }) => slides,
        targets: (instance) => instance.getAdjacentSlides()
      }),
      methods: {
        getAdjacentSlides() {
          return [1, -1].map((i) => this.slides[this.getIndex(this.index + i)]);
        }
      }
    };

    function Transitioner(prev, next, dir, { center, easing, list }) {
      const from = prev ? getLeft(prev, list, center) : getLeft(next, list, center) + dimensions$1(next).width * dir;
      const to = next ? getLeft(next, list, center) : from + dimensions$1(prev).width * dir * (isRtl ? -1 : 1);
      let resolve;
      return {
        dir,
        show(duration, percent = 0, linear) {
          const timing = linear ? "linear" : easing;
          duration -= Math.round(duration * clamp(percent, -1, 1));
          css(list, "transitionProperty", "none");
          this.translate(percent);
          css(list, "transitionProperty", "");
          percent = prev ? percent : clamp(percent, 0, 1);
          triggerUpdate(this.getItemIn(), "itemin", { percent, duration, timing, dir });
          prev && triggerUpdate(this.getItemIn(true), "itemout", {
            percent: 1 - percent,
            duration,
            timing,
            dir
          });
          return new Promise((res) => {
            resolve || (resolve = res);
            Transition.start(
              list,
              { transform: translate(-to * (isRtl ? -1 : 1), "px") },
              duration,
              timing
            ).then(resolve, noop);
          });
        },
        cancel() {
          return Transition.cancel(list);
        },
        reset() {
          css(list, "transform", "");
        },
        async forward(duration, percent = this.percent()) {
          await this.cancel();
          return this.show(duration, percent, true);
        },
        translate(percent) {
          if (percent === this.percent()) {
            return;
          }
          const distance = this.getDistance() * dir * (isRtl ? -1 : 1);
          css(
            list,
            "transform",
            translate(
              clamp(
                -to + (distance - distance * percent),
                -getWidth(list),
                dimensions$1(list).width
              ) * (isRtl ? -1 : 1),
              "px"
            )
          );
          const actives = this.getActives();
          const itemIn = this.getItemIn();
          const itemOut = this.getItemIn(true);
          percent = prev ? clamp(percent, -1, 1) : 0;
          for (const slide of children(list)) {
            const isActive = includes(actives, slide);
            const isIn = slide === itemIn;
            const isOut = slide === itemOut;
            const translateIn = isIn || !isOut && (isActive || dir * (isRtl ? -1 : 1) === -1 ^ getElLeft(slide, list) > getElLeft(prev || next));
            triggerUpdate(slide, `itemtranslate${translateIn ? "in" : "out"}`, {
              dir,
              percent: isOut ? 1 - percent : isIn ? percent : isActive ? 1 : 0
            });
          }
        },
        percent() {
          return Math.abs(
            (new DOMMatrix(css(list, "transform")).m41 * (isRtl ? -1 : 1) + from) / (to - from)
          );
        },
        getDistance() {
          return Math.abs(to - from);
        },
        getItemIn(out = false) {
          let actives = this.getActives();
          let nextActives = inView(list, getLeft(next || prev, list, center));
          if (out) {
            const temp = actives;
            actives = nextActives;
            nextActives = temp;
          }
          return nextActives[findIndex(nextActives, (el) => !includes(actives, el))];
        },
        getActives() {
          return inView(list, getLeft(prev || next, list, center));
        }
      };
    }
    function getLeft(el, list, center) {
      const left = getElLeft(el, list);
      return center ? left - centerEl(el, list) : Math.min(left, getMax(list));
    }
    function getMax(list) {
      return Math.max(0, getWidth(list) - dimensions$1(list).width);
    }
    function getWidth(list, index) {
      return sumBy(children(list).slice(0, index), (el) => dimensions$1(el).width);
    }
    function centerEl(el, list) {
      return dimensions$1(list).width / 2 - dimensions$1(el).width / 2;
    }
    function getElLeft(el, list) {
      return el && (position(el).left + (isRtl ? dimensions$1(el).width - dimensions$1(list).width : 0)) * (isRtl ? -1 : 1) || 0;
    }
    function inView(list, listLeft) {
      listLeft -= 1;
      const listWidth = dimensions$1(list).width;
      const listRight = listLeft + listWidth + 2;
      return children(list).filter((slide) => {
        const slideLeft = getElLeft(slide, list);
        const slideRight = slideLeft + Math.min(dimensions$1(slide).width, listWidth);
        return slideLeft >= listLeft && slideRight <= listRight;
      });
    }
    function triggerUpdate(el, type, data) {
      trigger(el, createEvent(type, false, false, data));
    }

    var slider = {
      mixins: [Class, Slider, SliderReactive, SliderParallax, SliderPreload],
      props: {
        center: Boolean,
        sets: Boolean,
        active: String
      },
      data: {
        center: false,
        sets: false,
        attrItem: "uk-slider-item",
        selList: ".uk-slider-items",
        selNav: ".uk-slider-nav",
        clsContainer: "uk-slider-container",
        active: "all",
        Transitioner
      },
      computed: {
        finite({ finite }) {
          return finite || isFinite$1(this.list, this.center);
        },
        maxIndex() {
          if (!this.finite || this.center && !this.sets) {
            return this.length - 1;
          }
          if (this.center) {
            return last(this.sets);
          }
          let lft = 0;
          const max = getMax(this.list);
          const index = findIndex(this.slides, (el) => {
            if (lft >= max) {
              return true;
            }
            lft += dimensions$1(el).width;
          });
          return ~index ? index : this.length - 1;
        },
        sets({ sets: enabled }) {
          if (!enabled || this.parallax) {
            return;
          }
          let left = 0;
          const sets = [];
          const width = dimensions$1(this.list).width;
          for (let i = 0; i < this.length; i++) {
            const slideWidth = dimensions$1(this.slides[i]).width;
            if (left + slideWidth > width) {
              left = 0;
            }
            if (this.center) {
              if (left < width / 2 && left + slideWidth + dimensions$1(this.slides[getIndex(+i + 1, this.slides)]).width / 2 > width / 2) {
                sets.push(+i);
                left = width / 2 - slideWidth / 2;
              }
            } else if (left === 0) {
              sets.push(Math.min(+i, this.maxIndex));
            }
            left += slideWidth;
          }
          if (sets.length) {
            return sets;
          }
        },
        transitionOptions() {
          return {
            center: this.center,
            list: this.list
          };
        },
        slides() {
          return children(this.list).filter(isVisible);
        }
      },
      connected() {
        toggleClass(this.$el, this.clsContainer, !$(`.${this.clsContainer}`, this.$el));
      },
      observe: resize({
        target: ({ slides, $el }) => [$el, ...slides]
      }),
      update: {
        write() {
          for (const el of this.navItems) {
            const index = toNumber(data(el, this.attrItem));
            if (index !== false) {
              el.hidden = !this.maxIndex || index > this.maxIndex || this.sets && !includes(this.sets, index);
            }
          }
          this.reorder();
          if (!this.parallax) {
            this._translate(1);
          }
          this.updateActiveClasses();
        },
        events: ["resize"]
      },
      events: {
        beforeitemshow(e) {
          if (!this.dragging && this.sets && this.stack.length < 2 && !includes(this.sets, this.index)) {
            this.index = this.getValidIndex();
          }
          const diff = Math.abs(
            this.index - this.prevIndex + (this.dir > 0 && this.index < this.prevIndex || this.dir < 0 && this.index > this.prevIndex ? (this.maxIndex + 1) * this.dir : 0)
          );
          if (!this.dragging && diff > 1) {
            for (let i = 0; i < diff; i++) {
              this.stack.splice(1, 0, this.dir > 0 ? "next" : "previous");
            }
            e.preventDefault();
            return;
          }
          const index = this.dir < 0 || !this.slides[this.prevIndex] ? this.index : this.prevIndex;
          const avgWidth = getWidth(this.list) / this.length;
          this.duration = speedUp(avgWidth / this.velocity) * (dimensions$1(this.slides[index]).width / avgWidth);
          this.reorder();
        },
        itemshow() {
          if (~this.prevIndex) {
            addClass(this._getTransitioner().getItemIn(), this.clsActive);
          }
          this.updateActiveClasses(this.prevIndex);
        },
        itemshown() {
          this.updateActiveClasses();
        }
      },
      methods: {
        reorder() {
          if (this.finite) {
            css(this.slides, "order", "");
            return;
          }
          const index = this.dir > 0 && this.slides[this.prevIndex] ? this.prevIndex : this.index;
          this.slides.forEach(
            (slide, i) => css(
              slide,
              "order",
              this.dir > 0 && i < index ? 1 : this.dir < 0 && i >= this.index ? -1 : ""
            )
          );
          if (!this.center || !this.length) {
            return;
          }
          const next = this.slides[index];
          let width = dimensions$1(this.list).width / 2 - dimensions$1(next).width / 2;
          let j = 0;
          while (width > 0) {
            const slideIndex = this.getIndex(--j + index, index);
            const slide = this.slides[slideIndex];
            css(slide, "order", slideIndex > index ? -2 : -1);
            width -= dimensions$1(slide).width;
          }
        },
        updateActiveClasses(currentIndex = this.index) {
          let actives = this._getTransitioner(currentIndex).getActives();
          if (this.active !== "all") {
            actives = [this.slides[this.getValidIndex(currentIndex)]];
          }
          const activeClasses = [
            this.clsActive,
            !this.sets || includes(this.sets, toFloat(this.index)) ? this.clsActivated : ""
          ];
          for (const slide of this.slides) {
            const active = includes(actives, slide);
            toggleClass(slide, activeClasses, active);
            attr(slide, "aria-hidden", !active);
            for (const focusable of $$(selFocusable, slide)) {
              if (!hasOwn(focusable, "_tabindex")) {
                focusable._tabindex = attr(focusable, "tabindex");
              }
              attr(focusable, "tabindex", active ? focusable._tabindex : -1);
            }
          }
        },
        getValidIndex(index = this.index, prevIndex = this.prevIndex) {
          index = this.getIndex(index, prevIndex);
          if (!this.sets) {
            return index;
          }
          let prev;
          do {
            if (includes(this.sets, index)) {
              return index;
            }
            prev = index;
            index = this.getIndex(index + this.dir, prevIndex);
          } while (index !== prev);
          return index;
        },
        getAdjacentSlides() {
          const { width } = dimensions$1(this.list);
          const left = -width;
          const right = width * 2;
          const slideWidth = dimensions$1(this.slides[this.index]).width;
          const slideLeft = this.center ? width / 2 - slideWidth / 2 : 0;
          const slides = /* @__PURE__ */ new Set();
          for (const i of [-1, 1]) {
            let currentLeft = slideLeft + (i > 0 ? slideWidth : 0);
            let j = 0;
            do {
              const slide = this.slides[this.getIndex(this.index + i + j++ * i)];
              currentLeft += dimensions$1(slide).width * i;
              slides.add(slide);
            } while (this.length > j && currentLeft > left && currentLeft < right);
          }
          return Array.from(slides);
        },
        getIndexAt(percent) {
          let index = -1;
          const scrollDist = this.center ? getWidth(this.list) - (dimensions$1(this.slides[0]).width / 2 + dimensions$1(last(this.slides)).width / 2) : getWidth(this.list, this.maxIndex);
          let dist = percent * scrollDist;
          let slidePercent = 0;
          do {
            const slideWidth = dimensions$1(this.slides[++index]).width;
            const slideDist = this.center ? slideWidth / 2 + dimensions$1(this.slides[index + 1]).width / 2 : slideWidth;
            slidePercent = dist / slideDist % 1;
            dist -= slideDist;
          } while (dist >= 0 && index < this.maxIndex);
          return [index, slidePercent];
        }
      }
    };
    function isFinite$1(list, center) {
      if (!list || list.length < 2) {
        return true;
      }
      const { width: listWidth } = dimensions$1(list);
      if (!center) {
        return Math.ceil(getWidth(list)) < Math.trunc(listWidth + getMaxElWidth(list));
      }
      const slides = children(list);
      const listHalf = Math.trunc(listWidth / 2);
      for (const index in slides) {
        const slide = slides[index];
        const slideWidth = dimensions$1(slide).width;
        const slidesInView = /* @__PURE__ */ new Set([slide]);
        let diff = 0;
        for (const i of [-1, 1]) {
          let left = slideWidth / 2;
          let j = 0;
          while (left < listHalf) {
            const nextSlide = slides[getIndex(+index + i + j++ * i, slides)];
            if (slidesInView.has(nextSlide)) {
              return true;
            }
            left += dimensions$1(nextSlide).width;
            slidesInView.add(nextSlide);
          }
          diff = Math.max(
            diff,
            slideWidth / 2 + dimensions$1(slides[getIndex(+index + i, slides)]).width / 2 - (left - listHalf)
          );
        }
        if (Math.trunc(diff) > sumBy(
          slides.filter((slide2) => !slidesInView.has(slide2)),
          (slide2) => dimensions$1(slide2).width
        )) {
          return true;
        }
      }
      return false;
    }
    function getMaxElWidth(list) {
      return Math.max(0, ...children(list).map((el) => dimensions$1(el).width));
    }

    var sliderParallax = {
      mixins: [Parallax],
      beforeConnect() {
        this.item = this.$el.closest(`.${this.$options.id.replace("parallax", "items")} > *`);
      },
      disconnected() {
        this.item = null;
      },
      events: [
        {
          name: "itemin itemout",
          self: true,
          el: ({ item }) => item,
          handler({ type, detail: { percent, duration, timing, dir } }) {
            fastdom.read(() => {
              if (!this.matchMedia) {
                return;
              }
              const propsFrom = this.getCss(getCurrentPercent(type, dir, percent));
              const propsTo = this.getCss(isIn(type) ? 0.5 : dir > 0 ? 1 : 0);
              fastdom.write(() => {
                css(this.$el, propsFrom);
                Transition.start(this.$el, propsTo, duration, timing).catch(noop);
              });
            });
          }
        },
        {
          name: "transitioncanceled transitionend",
          self: true,
          el: ({ item }) => item,
          handler() {
            Transition.cancel(this.$el);
          }
        },
        {
          name: "itemtranslatein itemtranslateout",
          self: true,
          el: ({ item }) => item,
          handler({ type, detail: { percent, dir } }) {
            fastdom.read(() => {
              if (!this.matchMedia) {
                this.reset();
                return;
              }
              const props = this.getCss(getCurrentPercent(type, dir, percent));
              fastdom.write(() => css(this.$el, props));
            });
          }
        }
      ]
    };
    function isIn(type) {
      return endsWith(type, "in");
    }
    function getCurrentPercent(type, dir, percent) {
      percent /= 2;
      return isIn(type) ^ dir < 0 ? percent : 1 - percent;
    }

    var Animations = {
      ...Animations$2,
      fade: {
        show() {
          return [{ opacity: 0, zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [{ opacity: 1 - percent, zIndex: 0 }, { zIndex: -1 }];
        }
      },
      scale: {
        show() {
          return [{ opacity: 0, transform: scale3d(1 + 0.5), zIndex: 0 }, { zIndex: -1 }];
        },
        percent(current) {
          return 1 - css(current, "opacity");
        },
        translate(percent) {
          return [
            { opacity: 1 - percent, transform: scale3d(1 + 0.5 * percent), zIndex: 0 },
            { zIndex: -1 }
          ];
        }
      },
      pull: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ] : [
            { transform: translate(-100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ];
        },
        percent(current, next, dir) {
          return dir < 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(30 * percent), zIndex: -1 },
            { transform: translate(-100 * (1 - percent)), zIndex: 0 }
          ] : [
            { transform: translate(-percent * 100), zIndex: 0 },
            { transform: translate(30 * (1 - percent)), zIndex: -1 }
          ];
        }
      },
      push: {
        show(dir) {
          return dir < 0 ? [
            { transform: translate(100), zIndex: 0 },
            { transform: translate(), zIndex: -1 }
          ] : [
            { transform: translate(-30), zIndex: -1 },
            { transform: translate(), zIndex: 0 }
          ];
        },
        percent(current, next, dir) {
          return dir > 0 ? 1 - translated(next) : translated(current);
        },
        translate(percent, dir) {
          return dir < 0 ? [
            { transform: translate(percent * 100), zIndex: 0 },
            { transform: translate(-30 * (1 - percent)), zIndex: -1 }
          ] : [
            { transform: translate(-30 * percent), zIndex: -1 },
            { transform: translate(100 * (1 - percent)), zIndex: 0 }
          ];
        }
      }
    };

    var slideshow = {
      mixins: [Class, Slideshow, SliderReactive, SliderParallax, SliderPreload],
      props: {
        ratio: String,
        minHeight: String,
        maxHeight: String
      },
      data: {
        ratio: "16:9",
        minHeight: void 0,
        maxHeight: void 0,
        selList: ".uk-slideshow-items",
        attrItem: "uk-slideshow-item",
        selNav: ".uk-slideshow-nav",
        Animations
      },
      watch: {
        list(list) {
          css(list, {
            aspectRatio: this.ratio ? this.ratio.replace(":", "/") : void 0,
            minHeight: this.minHeight,
            maxHeight: this.maxHeight,
            minWidth: "100%",
            maxWidth: "100%"
          });
        }
      },
      methods: {
        getAdjacentSlides() {
          return [1, -1].map((i) => this.slides[this.getIndex(this.index + i)]);
        }
      }
    };

    var sortable = {
      mixins: [Class, Animate],
      props: {
        group: String,
        threshold: Number,
        clsItem: String,
        clsPlaceholder: String,
        clsDrag: String,
        clsDragState: String,
        clsBase: String,
        clsNoDrag: String,
        clsEmpty: String,
        clsCustom: String,
        handle: String
      },
      data: {
        group: false,
        threshold: 5,
        clsItem: "uk-sortable-item",
        clsPlaceholder: "uk-sortable-placeholder",
        clsDrag: "uk-sortable-drag",
        clsDragState: "uk-drag",
        clsBase: "uk-sortable",
        clsNoDrag: "uk-sortable-nodrag",
        clsEmpty: "uk-sortable-empty",
        clsCustom: "",
        handle: false,
        pos: {}
      },
      events: {
        name: pointerDown$1,
        passive: false,
        handler: "init"
      },
      computed: {
        target: (_, $el) => ($el.tBodies || [$el])[0],
        items() {
          return children(this.target);
        },
        isEmpty() {
          return !this.items.length;
        },
        handles({ handle }, $el) {
          return handle ? $$(handle, $el) : this.items;
        }
      },
      watch: {
        isEmpty(empty) {
          toggleClass(this.target, this.clsEmpty, empty);
        },
        handles(handles, prev) {
          css(prev, { touchAction: "", userSelect: "" });
          css(handles, { touchAction: "none", userSelect: "none" });
        }
      },
      update: {
        write(data) {
          if (!this.drag || !parent(this.placeholder)) {
            return;
          }
          const {
            pos: { x, y },
            origin: { offsetTop, offsetLeft },
            placeholder
          } = this;
          css(this.drag, {
            top: y - offsetTop,
            left: x - offsetLeft
          });
          const sortable = this.getSortable(document.elementFromPoint(x, y));
          if (!sortable) {
            return;
          }
          const { items } = sortable;
          if (items.some(Transition.inProgress)) {
            return;
          }
          const target = findTarget(items, { x, y });
          if (items.length && (!target || target === placeholder)) {
            return;
          }
          const previous = this.getSortable(placeholder);
          const insertTarget = findInsertTarget(
            sortable.target,
            target,
            placeholder,
            x,
            y,
            sortable === previous && data.moved !== target
          );
          if (insertTarget === false) {
            return;
          }
          if (insertTarget && placeholder === insertTarget) {
            return;
          }
          if (sortable !== previous) {
            previous.remove(placeholder);
            data.moved = target;
          } else {
            delete data.moved;
          }
          sortable.insert(placeholder, insertTarget);
          this.touched.add(sortable);
        },
        events: ["move"]
      },
      methods: {
        init(e) {
          const { target, button, defaultPrevented } = e;
          const [placeholder] = this.items.filter((el) => el.contains(target));
          if (!placeholder || defaultPrevented || button > 0 || isInput(target) || target.closest(`.${this.clsNoDrag}`) || this.handle && !target.closest(this.handle)) {
            return;
          }
          e.preventDefault();
          this.pos = getEventPos(e);
          this.touched = /* @__PURE__ */ new Set([this]);
          this.placeholder = placeholder;
          this.origin = { target, index: index(placeholder), ...this.pos };
          on(document, pointerMove$1, this.move);
          on(document, pointerUp$1, this.end);
          if (!this.threshold) {
            this.start(e);
          }
        },
        start(e) {
          this.drag = appendDrag(this.$container, this.placeholder);
          const { left, top } = dimensions$1(this.placeholder);
          assign(this.origin, { offsetLeft: this.pos.x - left, offsetTop: this.pos.y - top });
          addClass(this.drag, this.clsDrag, this.clsCustom);
          addClass(this.placeholder, this.clsPlaceholder);
          addClass(this.items, this.clsItem);
          addClass(document.documentElement, this.clsDragState);
          trigger(this.$el, "start", [this, this.placeholder]);
          trackScroll(this.pos);
          this.move(e);
        },
        move: throttle(function(e) {
          assign(this.pos, getEventPos(e));
          if (!this.drag && (Math.abs(this.pos.x - this.origin.x) > this.threshold || Math.abs(this.pos.y - this.origin.y) > this.threshold)) {
            this.start(e);
          }
          this.$emit("move");
        }),
        end() {
          off(document, pointerMove$1, this.move);
          off(document, pointerUp$1, this.end);
          if (!this.drag) {
            return;
          }
          untrackScroll();
          const sortable = this.getSortable(this.placeholder);
          if (this === sortable) {
            if (this.origin.index !== index(this.placeholder)) {
              trigger(this.$el, "moved", [this, this.placeholder]);
            }
          } else {
            trigger(sortable.$el, "added", [sortable, this.placeholder]);
            trigger(this.$el, "removed", [this, this.placeholder]);
          }
          trigger(this.$el, "stop", [this, this.placeholder]);
          remove$1(this.drag);
          this.drag = null;
          for (const { clsPlaceholder, clsItem } of this.touched) {
            for (const sortable2 of this.touched) {
              removeClass(sortable2.items, clsPlaceholder, clsItem);
            }
          }
          this.touched = null;
          removeClass(document.documentElement, this.clsDragState);
        },
        insert(element, target) {
          addClass(this.items, this.clsItem);
          if (target && target.previousElementSibling !== element) {
            this.animate(() => before(target, element));
          } else if (!target && this.target.lastElementChild !== element) {
            this.animate(() => append(this.target, element));
          }
        },
        remove(element) {
          if (this.target.contains(element)) {
            this.animate(() => remove$1(element));
          }
        },
        getSortable(element) {
          do {
            const sortable = this.$getComponent(element, "sortable");
            if (sortable && (sortable === this || this.group !== false && sortable.group === this.group)) {
              return sortable;
            }
          } while (element = parent(element));
        }
      }
    };
    let trackTimer;
    function trackScroll(pos) {
      let last = Date.now();
      trackTimer = setInterval(() => {
        let { x, y } = pos;
        y += document.scrollingElement.scrollTop;
        const dist = (Date.now() - last) * 0.3;
        last = Date.now();
        scrollParents(document.elementFromPoint(x, pos.y)).reverse().some((scrollEl) => {
          let { scrollTop: scroll, scrollHeight } = scrollEl;
          const { top, bottom, height: height2 } = offsetViewport(scrollEl);
          if (top < y && top + 35 > y) {
            scroll -= dist;
          } else if (bottom > y && bottom - 35 < y) {
            scroll += dist;
          } else {
            return;
          }
          if (scroll > 0 && scroll < scrollHeight - height2) {
            scrollEl.scrollTop = scroll;
            return true;
          }
        });
      }, 15);
    }
    function untrackScroll() {
      clearInterval(trackTimer);
    }
    function appendDrag(container, element) {
      let clone;
      if (isTag(element, "li", "tr")) {
        clone = $("<div>");
        append(clone, element.cloneNode(true).children);
        for (const attribute of element.getAttributeNames()) {
          attr(clone, attribute, element.getAttribute(attribute));
        }
      } else {
        clone = element.cloneNode(true);
      }
      append(container, clone);
      css(clone, "margin", "0", "important");
      css(clone, {
        boxSizing: "border-box",
        width: element.offsetWidth,
        height: element.offsetHeight,
        padding: css(element, "padding")
      });
      height(clone.firstElementChild, height(element.firstElementChild));
      return clone;
    }
    function findTarget(items, point) {
      return items[findIndex(items, (item) => pointInRect(point, dimensions$1(item)))];
    }
    function findInsertTarget(list, target, placeholder, x, y, sameList) {
      if (!children(list).length) {
        return;
      }
      const rect = dimensions$1(target);
      if (!sameList) {
        if (!isHorizontal(list, placeholder)) {
          return y < rect.top + rect.height / 2 ? target : target.nextElementSibling;
        }
        return target;
      }
      const placeholderRect = dimensions$1(placeholder);
      const sameRow = linesIntersect(
        [rect.top, rect.bottom],
        [placeholderRect.top, placeholderRect.bottom]
      );
      const [pointerPos, lengthProp, startProp, endProp] = sameRow ? [x, "width", "left", "right"] : [y, "height", "top", "bottom"];
      const diff = placeholderRect[lengthProp] < rect[lengthProp] ? rect[lengthProp] - placeholderRect[lengthProp] : 0;
      if (placeholderRect[startProp] < rect[startProp]) {
        if (diff && pointerPos < rect[startProp] + diff) {
          return false;
        }
        return target.nextElementSibling;
      }
      if (diff && pointerPos > rect[endProp] - diff) {
        return false;
      }
      return target;
    }
    function isHorizontal(list, placeholder) {
      const single = children(list).length === 1;
      if (single) {
        append(list, placeholder);
      }
      const items = children(list);
      const isHorizontal2 = items.some((el, i) => {
        const rectA = dimensions$1(el);
        return items.slice(i + 1).some((el2) => {
          const rectB = dimensions$1(el2);
          return !linesIntersect([rectA.left, rectA.right], [rectB.left, rectB.right]);
        });
      });
      if (single) {
        remove$1(placeholder);
      }
      return isHorizontal2;
    }
    function linesIntersect(lineA, lineB) {
      return lineA[1] > lineB[0] && lineB[1] > lineA[0];
    }
    function throttle(fn) {
      let throttled;
      return function(...args) {
        if (!throttled) {
          throttled = true;
          fn.call(this, ...args);
          requestAnimationFrame(() => throttled = false);
        }
      };
    }

    var Position = {
      props: {
        pos: String,
        offset: null,
        flip: Boolean,
        shift: Boolean,
        inset: Boolean
      },
      data: {
        pos: `bottom-${isRtl ? "right" : "left"}`,
        offset: false,
        flip: true,
        shift: true,
        inset: false
      },
      connected() {
        this.pos = this.$props.pos.split("-").concat("center").slice(0, 2);
        [this.dir, this.align] = this.pos;
        this.axis = includes(["top", "bottom"], this.dir) ? "y" : "x";
      },
      methods: {
        positionAt(element, target, boundary) {
          let offset = [this.getPositionOffset(element), this.getShiftOffset(element)];
          const placement = [this.flip && "flip", this.shift && "shift"];
          const attach = {
            element: [this.inset ? this.dir : flipPosition(this.dir), this.align],
            target: [this.dir, this.align]
          };
          if (this.axis === "y") {
            for (const prop in attach) {
              attach[prop].reverse();
            }
            offset.reverse();
            placement.reverse();
          }
          const restoreScrollPosition = storeScrollPosition(element);
          const elDim = dimensions$1(element);
          css(element, { top: -elDim.height, left: -elDim.width });
          positionAt(element, target, {
            attach,
            offset,
            boundary,
            placement,
            viewportOffset: this.getViewportOffset(element)
          });
          restoreScrollPosition();
        },
        getPositionOffset(element = this.$el) {
          return toPx(
            this.offset === false ? css(element, "--uk-position-offset") : this.offset,
            this.axis === "x" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.dir) ? -1 : 1) * (this.inset ? -1 : 1);
        },
        getShiftOffset(element = this.$el) {
          return this.align === "center" ? 0 : toPx(
            css(element, "--uk-position-shift-offset"),
            this.axis === "y" ? "width" : "height",
            element
          ) * (includes(["left", "top"], this.align) ? 1 : -1);
        },
        getViewportOffset(element) {
          return toPx(css(element, "--uk-position-viewport-offset"));
        }
      }
    };
    function storeScrollPosition(element) {
      const scrollElement = scrollParent(element);
      const { scrollTop } = scrollElement;
      return () => {
        if (scrollTop !== scrollElement.scrollTop) {
          scrollElement.scrollTop = scrollTop;
        }
      };
    }

    var tooltip = {
      mixins: [Container, Togglable, Position],
      data: {
        pos: "top",
        animation: ["uk-animation-scale-up"],
        duration: 100,
        cls: "uk-active"
      },
      connected() {
        makeFocusable(this.$el);
      },
      disconnected() {
        this.hide();
      },
      methods: {
        show() {
          if (this.isToggled(this.tooltip || null)) {
            return;
          }
          const { delay = 0, title } = parseProps(this.$options);
          if (!title) {
            return;
          }
          const titleAttr = attr(this.$el, "title");
          const off = on(this.$el, ["blur", pointerLeave], (e) => !isTouch(e) && this.hide());
          this.reset = () => {
            attr(this.$el, { title: titleAttr, "aria-describedby": null });
            off();
          };
          const id = generateId(this);
          attr(this.$el, { title: null, "aria-describedby": id });
          clearTimeout(this.showTimer);
          this.showTimer = setTimeout(() => this._show(title, id), delay);
        },
        async hide() {
          var _a;
          if (matches(this.$el, "input:focus")) {
            return;
          }
          clearTimeout(this.showTimer);
          if (this.isToggled(this.tooltip || null)) {
            await this.toggleElement(this.tooltip, false, false);
          }
          (_a = this.reset) == null ? void 0 : _a.call(this);
          remove$1(this.tooltip);
          this.tooltip = null;
        },
        async _show(title, id) {
          this.tooltip = append(
            this.container,
            `<div id="${id}" class="uk-${this.$options.name}" role="tooltip"> <div class="uk-${this.$options.name}-inner">${title}</div> </div>`
          );
          on(this.tooltip, "toggled", (e, toggled) => {
            if (!toggled) {
              return;
            }
            const update = () => this.positionAt(this.tooltip, this.$el);
            update();
            const [dir, align] = getAlignment(this.tooltip, this.$el, this.pos);
            this.origin = this.axis === "y" ? `${flipPosition(dir)}-${align}` : `${align}-${flipPosition(dir)}`;
            const handlers = [
              once(
                document,
                `keydown ${pointerDown$1}`,
                this.hide,
                false,
                (e2) => e2.type === pointerDown$1 && !this.$el.contains(e2.target) || e2.type === "keydown" && e2.keyCode === keyMap.ESC
              ),
              on([document, ...overflowParents(this.$el)], "scroll", update, {
                passive: true
              })
            ];
            once(this.tooltip, "hide", () => handlers.forEach((handler) => handler()), {
              self: true
            });
          });
          if (!await this.toggleElement(this.tooltip, true)) {
            this.hide();
          }
        }
      },
      events: {
        // Clicking a button does not give it focus on all browsers and platforms
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
        [`focus ${pointerEnter} ${pointerDown$1}`](e) {
          if (!isTouch(e) || e.type === pointerDown$1) {
            this.show();
          }
        }
      }
    };
    function makeFocusable(el) {
      if (!isFocusable(el)) {
        attr(el, "tabindex", "0");
      }
    }
    function getAlignment(el, target, [dir, align]) {
      const elOffset = offset(el);
      const targetOffset = offset(target);
      const properties = [
        ["left", "right"],
        ["top", "bottom"]
      ];
      for (const props2 of properties) {
        if (elOffset[props2[0]] >= targetOffset[props2[1]]) {
          dir = props2[1];
          break;
        }
        if (elOffset[props2[1]] <= targetOffset[props2[0]]) {
          dir = props2[0];
          break;
        }
      }
      const props = includes(properties[0], dir) ? properties[1] : properties[0];
      align = props.find((prop) => elOffset[prop] === targetOffset[prop]) || "center";
      return [dir, align];
    }
    function parseProps(options) {
      const { el, id, data: data$1 } = options;
      return ["delay", "title"].reduce((obj, key) => ({ [key]: data(el, key), ...obj }), {
        ...parseOptions(data(el, id), ["title"]),
        ...data$1
      });
    }

    var upload = {
      mixins: [I18n],
      i18n: {
        invalidMime: "Invalid File Type: %s",
        invalidName: "Invalid File Name: %s",
        invalidSize: "Invalid File Size: %s Kilobytes Max"
      },
      props: {
        allow: String,
        clsDragover: String,
        concurrent: Number,
        maxSize: Number,
        method: String,
        mime: String,
        multiple: Boolean,
        name: String,
        params: Object,
        type: String,
        url: String
      },
      data: {
        allow: false,
        clsDragover: "uk-dragover",
        concurrent: 1,
        maxSize: 0,
        method: "POST",
        mime: false,
        multiple: false,
        name: "files[]",
        params: {},
        type: "",
        url: "",
        abort: noop,
        beforeAll: noop,
        beforeSend: noop,
        complete: noop,
        completeAll: noop,
        error: noop,
        fail: noop,
        load: noop,
        loadEnd: noop,
        loadStart: noop,
        progress: noop
      },
      events: {
        change(e) {
          if (!matches(e.target, 'input[type="file"]')) {
            return;
          }
          e.preventDefault();
          if (e.target.files) {
            this.upload(e.target.files);
          }
          e.target.value = "";
        },
        drop(e) {
          stop(e);
          const transfer = e.dataTransfer;
          if (!(transfer == null ? void 0 : transfer.files)) {
            return;
          }
          removeClass(this.$el, this.clsDragover);
          this.upload(transfer.files);
        },
        dragenter(e) {
          stop(e);
        },
        dragover(e) {
          stop(e);
          addClass(this.$el, this.clsDragover);
        },
        dragleave(e) {
          stop(e);
          removeClass(this.$el, this.clsDragover);
        }
      },
      methods: {
        async upload(files) {
          files = toArray(files);
          if (!files.length) {
            return;
          }
          trigger(this.$el, "upload", [files]);
          for (const file of files) {
            if (this.maxSize && this.maxSize * 1e3 < file.size) {
              this.fail(this.t("invalidSize", this.maxSize));
              return;
            }
            if (this.allow && !match(this.allow, file.name)) {
              this.fail(this.t("invalidName", this.allow));
              return;
            }
            if (this.mime && !match(this.mime, file.type)) {
              this.fail(this.t("invalidMime", this.mime));
              return;
            }
          }
          if (!this.multiple) {
            files = files.slice(0, 1);
          }
          this.beforeAll(this, files);
          const chunks = chunk(files, this.concurrent);
          const upload = async (files2) => {
            const data = new FormData();
            files2.forEach((file) => data.append(this.name, file));
            for (const key in this.params) {
              data.append(key, this.params[key]);
            }
            try {
              const xhr = await ajax(this.url, {
                data,
                method: this.method,
                responseType: this.type,
                beforeSend: (env) => {
                  const { xhr: xhr2 } = env;
                  on(xhr2.upload, "progress", this.progress);
                  for (const type of ["loadStart", "load", "loadEnd", "abort"]) {
                    on(xhr2, type.toLowerCase(), this[type]);
                  }
                  return this.beforeSend(env);
                }
              });
              this.complete(xhr);
              if (chunks.length) {
                await upload(chunks.shift());
              } else {
                this.completeAll(xhr);
              }
            } catch (e) {
              this.error(e);
            }
          };
          await upload(chunks.shift());
        }
      }
    };
    function match(pattern, path) {
      return path.match(
        new RegExp(
          `^${pattern.replace(/\//g, "\\/").replace(/\*\*/g, "(\\/[^\\/]+)*").replace(/\*/g, "[^\\/]+").replace(/((?!\\))\?/g, "$1.")}$`,
          "i"
        )
      );
    }
    function chunk(files, size) {
      const chunks = [];
      for (let i = 0; i < files.length; i += size) {
        chunks.push(files.slice(i, i + size));
      }
      return chunks;
    }
    function stop(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    async function ajax(url, options) {
      const env = {
        data: null,
        method: "GET",
        headers: {},
        xhr: new XMLHttpRequest(),
        beforeSend: noop,
        responseType: "",
        ...options
      };
      await env.beforeSend(env);
      return send(url, env);
    }
    function send(url, env) {
      return new Promise((resolve, reject) => {
        const { xhr } = env;
        for (const prop in env) {
          if (prop in xhr) {
            try {
              xhr[prop] = env[prop];
            } catch (e) {
            }
          }
        }
        xhr.open(env.method.toUpperCase(), url);
        for (const header in env.headers) {
          xhr.setRequestHeader(header, env.headers[header]);
        }
        on(xhr, "load", () => {
          if (xhr.status === 0 || xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            resolve(xhr);
          } else {
            reject(
              assign(Error(xhr.statusText), {
                xhr,
                status: xhr.status
              })
            );
          }
        });
        on(xhr, "error", () => reject(assign(Error("Network Error"), { xhr })));
        on(xhr, "timeout", () => reject(assign(Error("Network Timeout"), { xhr })));
        xhr.send(env.data);
      });
    }

    var components$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Countdown: countdown,
        Filter: filter,
        Lightbox: lightbox,
        LightboxPanel: LightboxPanel,
        Notification: notification,
        Parallax: parallax,
        Slider: slider,
        SliderParallax: sliderParallax,
        Slideshow: slideshow,
        SlideshowParallax: sliderParallax,
        Sortable: sortable,
        Tooltip: tooltip,
        Upload: upload
    });

    function boot(App) {
      if (inBrowser && window.MutationObserver) {
        if (document.body) {
          requestAnimationFrame(() => init(App));
        } else {
          new MutationObserver((records, observer) => {
            if (document.body) {
              init(App);
              observer.disconnect();
            }
          }).observe(document.documentElement, { childList: true });
        }
      }
    }
    function init(App) {
      trigger(document, "uikit:init", App);
      if (document.body) {
        apply(document.body, connect);
      }
      new MutationObserver((records) => records.forEach(applyChildListMutation)).observe(document, {
        subtree: true,
        childList: true
      });
      new MutationObserver((records) => records.forEach(applyAttributeMutation)).observe(document, {
        subtree: true,
        attributes: true
      });
      App._initialized = true;
    }
    function applyChildListMutation({ addedNodes, removedNodes }) {
      for (const node of addedNodes) {
        apply(node, connect);
      }
      for (const node of removedNodes) {
        apply(node, disconnect);
      }
    }
    function applyAttributeMutation({ target, attributeName }) {
      var _a;
      const name = getComponentName(attributeName);
      if (name) {
        if (hasAttr(target, attributeName)) {
          createComponent(name, target);
        } else {
          (_a = getComponent(target, name)) == null ? void 0 : _a.$destroy();
        }
      }
    }
    function connect(node) {
      const components2 = getComponents(node);
      for (const name in components2) {
        callConnected(components2[name]);
      }
      for (const attributeName of node.getAttributeNames()) {
        const name = getComponentName(attributeName);
        name && createComponent(name, node);
      }
    }
    function disconnect(node) {
      const components2 = getComponents(node);
      for (const name in components2) {
        callDisconnected(components2[name]);
      }
    }
    function getComponentName(attribute) {
      if (startsWith(attribute, "data-")) {
        attribute = attribute.slice(5);
      }
      const cmp = components$2[attribute];
      return cmp && (cmp.options || cmp).name;
    }

    globalApi(App);
    instanceApi(App);

    var accordion = {
      mixins: [Class, Togglable],
      props: {
        animation: Boolean,
        targets: String,
        active: null,
        collapsible: Boolean,
        multiple: Boolean,
        toggle: String,
        content: String,
        offset: Number
      },
      data: {
        targets: "> *",
        active: false,
        animation: true,
        collapsible: true,
        multiple: false,
        clsOpen: "uk-open",
        toggle: "> .uk-accordion-title",
        content: "> .uk-accordion-content",
        offset: 0
      },
      computed: {
        items: ({ targets }, $el) => $$(targets, $el),
        toggles({ toggle }) {
          return this.items.map((item) => $(toggle, item));
        },
        contents({ content }) {
          return this.items.map((item) => {
            var _a;
            return ((_a = item._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, item);
          });
        }
      },
      watch: {
        items(items, prev) {
          if (prev || hasClass(items, this.clsOpen)) {
            return;
          }
          const active = this.active !== false && items[Number(this.active)] || !this.collapsible && items[0];
          if (active) {
            this.toggle(active, false);
          }
        },
        toggles() {
          this.$emit();
        },
        contents(items) {
          for (const el of items) {
            const isOpen = hasClass(
              this.items.find((item) => item.contains(el)),
              this.clsOpen
            );
            hide(el, !isOpen);
          }
          this.$emit();
        }
      },
      observe: lazyload(),
      events: [
        {
          name: "click keydown",
          delegate: ({ targets, $props }) => `${targets} ${$props.toggle}`,
          async handler(e) {
            var _a;
            if (e.type === "keydown" && e.keyCode !== keyMap.SPACE) {
              return;
            }
            e.preventDefault();
            (_a = this._off) == null ? void 0 : _a.call(this);
            this._off = keepScrollPosition(e.target);
            await this.toggle(index(this.toggles, e.current));
            this._off();
          }
        },
        {
          name: "shown hidden",
          self: true,
          delegate: ({ targets }) => targets,
          handler() {
            this.$emit();
          }
        }
      ],
      update() {
        const activeItems = filter$1(this.items, `.${this.clsOpen}`);
        for (const index2 in this.items) {
          const toggle = this.toggles[index2];
          const content = this.contents[index2];
          if (!toggle || !content) {
            continue;
          }
          toggle.id = generateId(this, toggle);
          content.id = generateId(this, content);
          const active = includes(activeItems, this.items[index2]);
          attr(toggle, {
            role: isTag(toggle, "a") ? "button" : null,
            "aria-controls": content.id,
            "aria-expanded": active,
            "aria-disabled": !this.collapsible && activeItems.length < 2 && active
          });
          attr(content, { role: "region", "aria-labelledby": toggle.id });
          if (isTag(content, "ul")) {
            attr(children(content), "role", "presentation");
          }
        }
      },
      methods: {
        toggle(item, animate) {
          item = this.items[getIndex(item, this.items)];
          let items = [item];
          const activeItems = filter$1(this.items, `.${this.clsOpen}`);
          if (!this.multiple && !includes(activeItems, items[0])) {
            items = items.concat(activeItems);
          }
          if (!this.collapsible && activeItems.length < 2 && includes(activeItems, item)) {
            return;
          }
          return Promise.all(
            items.map(
              (el) => this.toggleElement(el, !includes(activeItems, el), (el2, show) => {
                toggleClass(el2, this.clsOpen, show);
                if (animate === false || !this.animation) {
                  hide($(this.content, el2), !show);
                  return;
                }
                return transition(el2, show, this);
              })
            )
          );
        }
      }
    };
    function hide(el, hide2) {
      el && (el.hidden = hide2);
    }
    async function transition(el, show, { content, duration, velocity, transition: transition2 }) {
      var _a;
      content = ((_a = el._wrapper) == null ? void 0 : _a.firstElementChild) || $(content, el);
      if (!el._wrapper) {
        el._wrapper = wrapAll(content, "<div>");
      }
      const wrapper = el._wrapper;
      css(wrapper, "overflow", "hidden");
      const currentHeight = toFloat(css(wrapper, "height"));
      await Transition.cancel(wrapper);
      hide(content, false);
      const endHeight = sumBy(["marginTop", "marginBottom"], (prop) => css(content, prop)) + dimensions$1(content).height;
      const percent = currentHeight / endHeight;
      duration = (velocity * endHeight + duration) * (show ? 1 - percent : percent);
      css(wrapper, "height", currentHeight);
      await Transition.start(wrapper, { height: show ? endHeight : 0 }, duration, transition2);
      unwrap(content);
      delete el._wrapper;
      if (!show) {
        hide(content, true);
      }
    }
    function keepScrollPosition(el) {
      const scrollElement = scrollParent(el, true);
      let frame;
      (function scroll() {
        frame = requestAnimationFrame(() => {
          const { top } = dimensions$1(el);
          if (top < 0) {
            scrollElement.scrollTop += top;
          }
          scroll();
        });
      })();
      return () => requestAnimationFrame(() => cancelAnimationFrame(frame));
    }

    var alert = {
      mixins: [Class, Togglable],
      args: "animation",
      props: {
        animation: Boolean,
        close: String
      },
      data: {
        animation: true,
        selClose: ".uk-alert-close",
        duration: 150
      },
      events: {
        name: "click",
        delegate: ({ selClose }) => selClose,
        handler(e) {
          e.preventDefault();
          this.close();
        }
      },
      methods: {
        async close() {
          await this.toggleElement(this.$el, false, animate);
          this.$destroy(true);
        }
      }
    };
    function animate(el, show, { duration, transition, velocity }) {
      const height = toFloat(css(el, "height"));
      css(el, "height", height);
      return Transition.start(
        el,
        {
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderTop: 0,
          borderBottom: 0,
          opacity: 0
        },
        velocity * height + duration,
        transition
      );
    }

    var Video = {
      args: "autoplay",
      props: {
        automute: Boolean,
        autoplay: Boolean
      },
      data: {
        automute: false,
        autoplay: true
      },
      beforeConnect() {
        if (this.autoplay === "inview" && !hasAttr(this.$el, "preload")) {
          this.$el.preload = "none";
        }
        if (isTag(this.$el, "iframe") && !hasAttr(this.$el, "allow")) {
          this.$el.allow = "autoplay";
        }
        if (this.autoplay === "hover") {
          if (isTag(this.$el, "video")) {
            this.$el.tabindex = 0;
          } else {
            this.autoplay = true;
          }
        }
        if (this.automute) {
          mute(this.$el);
        }
      },
      events: [
        {
          name: `${pointerEnter} focusin`,
          filter: ({ autoplay }) => includes(autoplay, "hover"),
          handler(e) {
            if (!isTouch(e) || !isPlaying(this.$el)) {
              play(this.$el);
            } else {
              pause(this.$el);
            }
          }
        },
        {
          name: `${pointerLeave} focusout`,
          filter: ({ autoplay }) => includes(autoplay, "hover"),
          handler(e) {
            if (!isTouch(e)) {
              pause(this.$el);
            }
          }
        }
      ],
      observe: [
        intersection({
          filter: ({ $el, autoplay }) => autoplay && autoplay !== "hover" && isVideo($el),
          handler([{ isIntersecting }]) {
            if (!document.fullscreenElement) {
              if (isIntersecting) {
                play(this.$el);
              } else {
                pause(this.$el);
              }
            }
          },
          args: { intersecting: false },
          options: ({ $el, autoplay }) => ({ root: autoplay === "inview" ? null : parent($el) })
        })
      ]
    };
    function isPlaying(videoEl) {
      return !videoEl.paused && !videoEl.ended;
    }

    var cover = {
      mixins: [Video],
      props: {
        width: Number,
        height: Number
      },
      data: {
        automute: true
      },
      created() {
        this.useObjectFit = isTag(this.$el, "img", "video");
      },
      observe: resize({
        target: ({ $el }) => getPositionedParent($el) || parent($el),
        filter: ({ useObjectFit }) => !useObjectFit
      }),
      update: {
        read() {
          if (this.useObjectFit) {
            return false;
          }
          const { ratio, cover } = Dimensions;
          const { $el, width, height } = this;
          let dim = { width, height };
          if (!width || !height) {
            const intrinsic = {
              width: $el.naturalWidth || $el.videoWidth || $el.clientWidth,
              height: $el.naturalHeight || $el.videoHeight || $el.clientHeight
            };
            if (width) {
              dim = ratio(intrinsic, "width", width);
            } else if (height) {
              dim = ratio(intrinsic, "height", height);
            } else {
              dim = intrinsic;
            }
          }
          const { offsetHeight: coverHeight, offsetWidth: coverWidth } = getPositionedParent($el) || parent($el);
          const coverDim = cover(dim, {
            width: coverWidth + (coverWidth % 2 ? 1 : 0),
            height: coverHeight + (coverHeight % 2 ? 1 : 0)
          });
          if (!coverDim.width || !coverDim.height) {
            return false;
          }
          return coverDim;
        },
        write({ height, width }) {
          css(this.$el, { height, width });
        },
        events: ["resize"]
      }
    };
    function getPositionedParent(el) {
      while (el = parent(el)) {
        if (css(el, "position") !== "static") {
          return el;
        }
      }
    }

    var formCustom = {
      mixins: [Class],
      args: "target",
      props: {
        target: Boolean
      },
      data: {
        target: false
      },
      computed: {
        input: (_, $el) => $(selInput, $el),
        state() {
          return this.input.nextElementSibling;
        },
        target({ target }, $el) {
          return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $(target, $el));
        }
      },
      update() {
        var _a;
        const { target, input } = this;
        if (!target) {
          return;
        }
        let option;
        const prop = isInput(target) ? "value" : "textContent";
        const prev = target[prop];
        const value = ((_a = input.files) == null ? void 0 : _a[0]) ? input.files[0].name : matches(input, "select") && (option = $$("option", input).filter((el) => el.selected)[0]) ? option.textContent : input.value;
        if (prev !== value) {
          target[prop] = value;
        }
      },
      events: [
        {
          name: "change",
          handler() {
            this.$emit();
          }
        },
        {
          name: "reset",
          el: ({ $el }) => $el.closest("form"),
          handler() {
            this.$emit();
          }
        }
      ]
    };

    var closeIcon = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"1\" y1=\"1\" x2=\"13\" y2=\"13\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"13\" y1=\"1\" x2=\"1\" y2=\"13\"/></svg>";

    var closeLarge = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"1\" y1=\"1\" x2=\"19\" y2=\"19\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" x1=\"19\" y1=\"1\" x2=\"1\" y2=\"19\"/></svg>";

    var dropParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var marker = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><rect width=\"1\" height=\"11\" x=\"9\" y=\"4\"/><rect width=\"11\" height=\"1\" x=\"4\" y=\"9\"/></svg>";

    var navParentIconLarge = "<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 4 7 10 13 4\"/></svg>";

    var navParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navbarParentIcon = "<svg width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" points=\"1 3.5 6 8.5 11 3.5\"/></svg>";

    var navbarToggleIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><style>.uk-navbar-toggle-icon svg&gt;[class*=&quot;line-&quot;]{transition:0.2s ease-in-out;transition-property:transform, opacity;transform-origin:center;opacity:1}.uk-navbar-toggle-icon svg&gt;.line-3{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{opacity:1}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-2{transform:rotate(45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-3{transform:rotate(-45deg)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1,.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{opacity:0}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-1{transform:translateY(6px) scaleX(0)}.uk-navbar-toggle-animate[aria-expanded=&quot;true&quot;] svg&gt;.line-4{transform:translateY(-6px) scaleX(0)}</style><rect width=\"20\" height=\"2\" y=\"3\" class=\"line-1\"/><rect width=\"20\" height=\"2\" y=\"9\" class=\"line-2\"/><rect width=\"20\" height=\"2\" y=\"9\" class=\"line-3\"/><rect width=\"20\" height=\"2\" y=\"15\" class=\"line-4\"/></svg>";

    var overlayIcon = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><rect width=\"1\" height=\"40\" x=\"19\" y=\"0\"/><rect width=\"40\" height=\"1\" x=\"0\" y=\"19\"/></svg>";

    var paginationNext = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 1 6 6 1 11\"/></svg>";

    var paginationPrevious = "<svg width=\"7\" height=\"12\" viewBox=\"0 0 7 12\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"6 1 1 6 6 11\"/></svg>";

    var searchIcon = "<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"9\" cy=\"9\" r=\"7\"/><path fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" d=\"M14,14 L18,18 L14,14 Z\"/></svg>";

    var searchMedium = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" cx=\"10.5\" cy=\"10.5\" r=\"9.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.1\" x1=\"23\" y1=\"23\" x2=\"17\" y2=\"17\"/></svg>";

    var searchLarge = "<svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><circle fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" cx=\"17.5\" cy=\"17.5\" r=\"16.5\"/><line fill=\"none\" stroke=\"#000\" stroke-width=\"1.8\" x1=\"38\" y1=\"39\" x2=\"29\" y2=\"30\"/></svg>";

    var slidenavNextLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"4.002,38.547 22.527,20.024 4,1.5\"/></svg>";

    var slidenavNext = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"1.225,23 12.775,12 1.225,1\"/></svg>";

    var slidenavPreviousLarge = "<svg width=\"25\" height=\"40\" viewBox=\"0 0 25 40\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"2\" points=\"20.527,1.5 2,20.024 20.525,38.547\"/></svg>";

    var slidenavPrevious = "<svg width=\"14\" height=\"24\" viewBox=\"0 0 14 24\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.4\" points=\"12.775,1 1.225,12 12.775,23\"/></svg>";

    var spinner = "<svg width=\"30\" height=\"30\" viewBox=\"0 0 30 30\"><circle fill=\"none\" stroke=\"#000\" cx=\"15\" cy=\"15\" r=\"14\"/></svg>";

    var totop = "<svg width=\"18\" height=\"10\" viewBox=\"0 0 18 10\"><polyline fill=\"none\" stroke=\"#000\" stroke-width=\"1.2\" points=\"1 9 9 1 17 9\"/></svg>";

    var Svg = {
      args: "src",
      props: {
        width: Number,
        height: Number,
        ratio: Number
      },
      data: {
        ratio: 1
      },
      connected() {
        this.svg = this.getSvg().then((el) => {
          if (!this._connected) {
            return;
          }
          const svg = insertSVG(el, this.$el);
          if (this.svgEl && svg !== this.svgEl) {
            remove$1(this.svgEl);
          }
          applyWidthAndHeight.call(this, svg, el);
          return this.svgEl = svg;
        }, noop);
      },
      disconnected() {
        this.svg.then((svg) => {
          if (this._connected) {
            return;
          }
          if (isVoidElement(this.$el)) {
            this.$el.hidden = false;
          }
          remove$1(svg);
          this.svgEl = null;
        });
        this.svg = null;
      },
      methods: {
        async getSvg() {
        }
      }
    };
    function insertSVG(el, root) {
      if (isVoidElement(root) || isTag(root, "canvas")) {
        root.hidden = true;
        const next = root.nextElementSibling;
        return equals(el, next) ? next : after(root, el);
      }
      const last = root.lastElementChild;
      return equals(el, last) ? last : append(root, el);
    }
    function equals(el, other) {
      return isTag(el, "svg") && isTag(other, "svg") && el.innerHTML === other.innerHTML;
    }
    function applyWidthAndHeight(el, ref) {
      const props = ["width", "height"];
      let dimensions = props.map((prop) => this[prop]);
      if (!dimensions.some((val) => val)) {
        dimensions = props.map((prop) => attr(ref, prop));
      }
      const viewBox = attr(ref, "viewBox");
      if (viewBox && !dimensions.some((val) => val)) {
        dimensions = viewBox.split(" ").slice(2);
      }
      dimensions.forEach((val, i) => attr(el, props[i], toFloat(val) * this.ratio || null));
    }

    var svg = {
      mixins: [Svg],
      args: "src",
      props: {
        src: String,
        icon: String,
        attributes: "list",
        strokeAnimation: Boolean
      },
      data: {
        strokeAnimation: false
      },
      observe: [
        mutation({
          async handler() {
            const svg = await this.svg;
            if (svg) {
              applyAttributes.call(this, svg);
            }
          },
          options: {
            attributes: true,
            attributeFilter: ["id", "class", "style"]
          }
        })
      ],
      async connected() {
        if (includes(this.src, "#")) {
          [this.src, this.icon] = this.src.split("#");
        }
        const svg = await this.svg;
        if (svg) {
          applyAttributes.call(this, svg);
          if (this.strokeAnimation) {
            applyAnimation(svg);
          }
        }
      },
      methods: {
        async getSvg() {
          if (isTag(this.$el, "img") && !this.$el.complete && this.$el.loading === "lazy") {
            await new Promise((resolve) => once(this.$el, "load", resolve));
          }
          return parseSVG(await loadSVG(this.src), this.icon) || Promise.reject("SVG not found.");
        }
      }
    };
    function applyAttributes(el) {
      const { $el } = this;
      addClass(el, attr($el, "class"), "uk-svg");
      for (let i = 0; i < $el.style.length; i++) {
        const prop = $el.style[i];
        css(el, prop, css($el, prop));
      }
      for (const attribute in this.attributes) {
        const [prop, value] = this.attributes[attribute].split(":", 2);
        attr(el, prop, value);
      }
      if (!this.$el.id) {
        removeAttr(el, "id");
      }
    }
    const loadSVG = memoize(async (src) => {
      if (src) {
        if (startsWith(src, "data:")) {
          return decodeURIComponent(src.split(",")[1]);
        } else {
          return (await fetch(src)).text();
        }
      } else {
        return Promise.reject();
      }
    });
    function parseSVG(svg, icon) {
      if (icon && includes(svg, "<symbol")) {
        svg = parseSymbols(svg)[icon] || svg;
      }
      return stringToSvg(svg);
    }
    const symbolRe = /<symbol([^]*?id=(['"])(.+?)\2[^]*?<\/)symbol>/g;
    const parseSymbols = memoize(function(svg) {
      const symbols = {};
      symbolRe.lastIndex = 0;
      let match;
      while (match = symbolRe.exec(svg)) {
        symbols[match[3]] = `<svg ${match[1]}svg>`;
      }
      return symbols;
    });
    function applyAnimation(el) {
      const length = getMaxPathLength(el);
      if (length) {
        css(el, "--uk-animation-stroke", length);
      }
    }
    function stringToSvg(string) {
      const container = document.createElement("template");
      container.innerHTML = string;
      return container.content.firstElementChild;
    }

    const icons = {
      spinner,
      totop,
      marker,
      "close-icon": closeIcon,
      "close-large": closeLarge,
      "drop-parent-icon": dropParentIcon,
      "nav-parent-icon": navParentIcon,
      "nav-parent-icon-large": navParentIconLarge,
      "navbar-parent-icon": navbarParentIcon,
      "navbar-toggle-icon": navbarToggleIcon,
      "overlay-icon": overlayIcon,
      "pagination-next": paginationNext,
      "pagination-previous": paginationPrevious,
      "search-icon": searchIcon,
      "search-medium": searchMedium,
      "search-large": searchLarge,
      "search-toggle-icon": searchIcon,
      "slidenav-next": slidenavNext,
      "slidenav-next-large": slidenavNextLarge,
      "slidenav-previous": slidenavPrevious,
      "slidenav-previous-large": slidenavPreviousLarge
    };
    const Icon = {
      install: install$1,
      mixins: [Svg],
      args: "icon",
      props: { icon: String },
      isIcon: true,
      beforeConnect() {
        addClass(this.$el, "uk-icon");
      },
      methods: {
        async getSvg() {
          const icon = getIcon(this.icon);
          if (!icon) {
            throw "Icon not found.";
          }
          return icon;
        }
      }
    };
    const IconComponent = {
      args: false,
      extends: Icon,
      data: (vm) => ({
        icon: hyphenate(vm.constructor.options.name)
      }),
      beforeConnect() {
        addClass(this.$el, this.$options.id);
      }
    };
    const NavParentIcon = {
      extends: IconComponent,
      beforeConnect() {
        const icon = this.$props.icon;
        this.icon = this.$el.closest(".uk-nav-primary") ? `${icon}-large` : icon;
      }
    };
    const Search = {
      extends: IconComponent,
      mixins: [I18n],
      i18n: { toggle: "Open Search", submit: "Submit Search" },
      beforeConnect() {
        const isToggle = hasClass(this.$el, "uk-search-toggle") || hasClass(this.$el, "uk-navbar-toggle");
        this.icon = isToggle ? "search-toggle-icon" : hasClass(this.$el, "uk-search-icon") && this.$el.closest(".uk-search-large") ? "search-large" : this.$el.closest(".uk-search-medium") ? "search-medium" : this.$props.icon;
        if (hasAttr(this.$el, "aria-label")) {
          return;
        }
        if (isToggle) {
          const label = this.t("toggle");
          attr(this.$el, "aria-label", label);
        } else {
          const button = this.$el.closest("a,button");
          if (button) {
            const label = this.t("submit");
            attr(button, "aria-label", label);
          }
        }
      }
    };
    const Spinner = {
      extends: IconComponent,
      beforeConnect() {
        attr(this.$el, "role", "status");
      },
      methods: {
        async getSvg() {
          const icon = await Icon.methods.getSvg.call(this);
          if (this.ratio !== 1) {
            css($("circle", icon), "strokeWidth", 1 / this.ratio);
          }
          return icon;
        }
      }
    };
    const ButtonComponent = {
      extends: IconComponent,
      mixins: [I18n],
      beforeConnect() {
        const button = this.$el.closest("a,button");
        attr(button, "role", this.role !== null && isTag(button, "a") ? "button" : this.role);
        const label = this.t("label");
        if (label && !hasAttr(button, "aria-label")) {
          attr(button, "aria-label", label);
        }
      }
    };
    const Slidenav = {
      extends: ButtonComponent,
      beforeConnect() {
        addClass(this.$el, "uk-slidenav");
        const icon = this.$props.icon;
        this.icon = hasClass(this.$el, "uk-slidenav-large") ? `${icon}-large` : icon;
      }
    };
    const NavbarToggleIcon = {
      extends: ButtonComponent,
      i18n: { label: "Open menu" }
    };
    const Close = {
      extends: ButtonComponent,
      i18n: { label: "Close" },
      beforeConnect() {
        this.icon = `close-${hasClass(this.$el, "uk-close-large") ? "large" : "icon"}`;
      }
    };
    const Marker = {
      extends: ButtonComponent,
      i18n: { label: "Open" }
    };
    const Totop = {
      extends: ButtonComponent,
      i18n: { label: "Back to top" }
    };
    const PaginationNext = {
      extends: ButtonComponent,
      i18n: { label: "Next page" },
      data: { role: null }
    };
    const PaginationPrevious = {
      extends: ButtonComponent,
      i18n: { label: "Previous page" },
      data: { role: null }
    };
    const parsed = {};
    function install$1(UIkit) {
      UIkit.icon.add = (name, svg) => {
        const added = isString(name) ? { [name]: svg } : name;
        each(added, (svg2, name2) => {
          icons[name2] = svg2;
          delete parsed[name2];
        });
        if (UIkit._initialized) {
          apply(
            document.body,
            (el) => each(UIkit.getComponents(el), (cmp) => {
              cmp.$options.isIcon && cmp.icon in added && cmp.$reset();
            })
          );
        }
      };
    }
    const aliases = { twitter: "x" };
    function getIcon(icon) {
      icon = aliases[icon] || icon;
      if (!icons[icon]) {
        return null;
      }
      if (!parsed[icon]) {
        parsed[icon] = stringToSvg(icons[applyRtl(icon)] || icons[icon]);
      }
      return parsed[icon].cloneNode(true);
    }
    function applyRtl(icon) {
      return isRtl ? swap(swap(icon, "left", "right"), "previous", "next") : icon;
    }

    var img = {
      args: "dataSrc",
      props: {
        dataSrc: String,
        sources: String,
        margin: String,
        target: String,
        loading: String
      },
      data: {
        dataSrc: "",
        sources: false,
        margin: "50%",
        target: false,
        loading: "lazy"
      },
      connected() {
        if (this.loading !== "lazy") {
          this.load();
        } else if (isImg(this.$el)) {
          this.$el.loading = "lazy";
          setSrcAttrs(this.$el);
        }
      },
      disconnected() {
        if (this.img) {
          this.img.onload = "";
        }
        delete this.img;
      },
      observe: intersection({
        handler(entries, observer) {
          this.load();
          observer.disconnect();
        },
        options: ({ margin }) => ({ rootMargin: margin }),
        filter: ({ loading }) => loading === "lazy",
        target: ({ $el, $props }) => $props.target ? [$el, ...queryAll($props.target, $el)] : $el
      }),
      methods: {
        load() {
          if (this.img) {
            return this.img;
          }
          const image = isImg(this.$el) ? this.$el : getImageFromElement(this.$el, this.dataSrc, this.sources);
          removeAttr(image, "loading");
          setSrcAttrs(this.$el, image.currentSrc);
          return this.img = image;
        }
      }
    };
    function setSrcAttrs(el, src) {
      if (isImg(el)) {
        const parentNode = parent(el);
        const elements = isTag(parentNode, "picture") ? children(parentNode) : [el];
        elements.forEach((el2) => setSourceProps(el2, el2));
      } else if (src) {
        const change = !includes(el.style.backgroundImage, src);
        if (change) {
          css(el, "backgroundImage", `url(${escape(src)})`);
          trigger(el, createEvent("load", false));
        }
      }
    }
    const srcProps = ["data-src", "data-srcset", "sizes"];
    function setSourceProps(sourceEl, targetEl) {
      for (const prop of srcProps) {
        const value = data(sourceEl, prop);
        if (value) {
          attr(targetEl, prop.replace(/^(data-)+/, ""), value);
        }
      }
    }
    function getImageFromElement(el, src, sources) {
      const img = new Image();
      wrapInPicture(img, sources);
      setSourceProps(el, img);
      img.onload = () => {
        setSrcAttrs(el, img.currentSrc);
      };
      attr(img, "src", src);
      return img;
    }
    function wrapInPicture(img, sources) {
      sources = parseSources(sources);
      if (sources.length) {
        const picture = fragment("<picture>");
        for (const attrs of sources) {
          const source = fragment("<source>");
          attr(source, attrs);
          append(picture, source);
        }
        append(picture, img);
      }
    }
    function parseSources(sources) {
      if (!sources) {
        return [];
      }
      if (startsWith(sources, "[")) {
        try {
          sources = JSON.parse(sources);
        } catch (e) {
          sources = [];
        }
      } else {
        sources = parseOptions(sources);
      }
      if (!isArray(sources)) {
        sources = [sources];
      }
      return sources.filter((source) => !isEmpty(source));
    }
    function isImg(el) {
      return isTag(el, "img");
    }

    var leader = {
      mixins: [Class, Media],
      props: {
        fill: String
      },
      data: {
        fill: "",
        clsWrapper: "uk-leader-fill",
        clsHide: "uk-leader-hide",
        attrFill: "data-fill"
      },
      computed: {
        fill: ({ fill }, $el) => fill || css($el, "--uk-leader-fill-content")
      },
      connected() {
        [this.wrapper] = wrapInner(this.$el, `<span class="${this.clsWrapper}">`);
      },
      disconnected() {
        unwrap(this.wrapper.childNodes);
      },
      observe: resize(),
      update: {
        read() {
          const width = Math.trunc(this.$el.offsetWidth / 2);
          return {
            width,
            fill: this.fill,
            hide: !this.matchMedia
          };
        },
        write({ width, fill, hide }) {
          toggleClass(this.wrapper, this.clsHide, hide);
          attr(this.wrapper, this.attrFill, new Array(width).join(fill));
        },
        events: ["resize"]
      }
    };

    var modal = {
      install,
      mixins: [Modal],
      data: {
        clsPage: "uk-modal-page",
        selPanel: ".uk-modal-dialog",
        selClose: ".uk-modal-close, .uk-modal-footer button, .uk-modal-close-default, .uk-modal-close-outside, .uk-modal-close-full"
      },
      events: [
        {
          name: "fullscreenchange webkitendfullscreen",
          capture: true,
          handler(e) {
            if (isTag(e.target, "video") && this.isToggled() && !document.fullscreenElement) {
              this.hide();
            }
          }
        },
        {
          name: "show",
          self: true,
          handler() {
            if (hasClass(this.panel, "uk-margin-auto-vertical")) {
              addClass(this.$el, "uk-flex");
            } else {
              css(this.$el, "display", "flex");
            }
            height(this.$el);
          }
        },
        {
          name: "hidden",
          self: true,
          handler() {
            css(this.$el, "display", "");
            removeClass(this.$el, "uk-flex");
          }
        }
      ]
    };
    function install({ modal }) {
      modal.dialog = function(content, options) {
        const dialog = modal($(`<div><div class="uk-modal-dialog">${content}</div></div>`), {
          stack: true,
          role: "alertdialog",
          ...options
        });
        dialog.show();
        on(
          dialog.$el,
          "hidden",
          async () => {
            await Promise.resolve();
            dialog.$destroy(true);
          },
          { self: true }
        );
        return dialog;
      };
      modal.alert = function(options) {
        return openDialog(
          ({ i18n }) => `<div class="uk-dialog-body"> <p class="uk-dialog-title">${(options == null ? void 0 : options.title) || ""}</p> <p class="uk-dialog-text">${typeof options === "string" ? html(options) || "" : (options == null ? void 0 : options.text) || ""}</p> </div> <div class="uk-dialog-footer"> <button class="uk-btn uk-btn-fill uk-btn-primary uk-btn-lg uk-modal-close" autofocus>${(options == null ? void 0 : options.confirmButtonText) || i18n.ok}</button> </div>`,
          options
        );
      };
      modal.confirm = function(options) {
        return openDialog(
          ({ i18n }) => `<form> <div class="uk-dialog-body"> <p class="uk-dialog-title">${options == null ? void 0 : options.title}</p> <p class="uk-dialog-text">${isObject(options) ? (options == null ? void 0 : options.text) || "" : html(options) || ""}</p> </div> <div class="uk-dialog-footer"> <button class="uk-btn uk-btn-tonal uk-btn-dark uk-btn-lg uk-modal-close">${(options == null ? void 0 : options.cancelButtonText) || i18n.cancel}</button> <button class="uk-btn uk-btn-fill uk-btn-primary uk-btn-lg" autofocus>${(options == null ? void 0 : options.confirmButtonText) || i18n.ok}</button> </div> </form>`,
          options,
          () => Promise.reject()
        );
      };
      modal.prompt = function(message, value, options) {
        const promise = openDialog(
          ({ i18n }) => `<form class="uk-form-stacked"> <div class="uk-modal-body"> <label>${isString(message) ? message : html(message)}</label> <input class="uk-input" autofocus> </div> <div class="uk-modal-footer uk-text-right"> <button class="uk-button uk-button-default uk-modal-close" type="button">${i18n.cancel}</button> <button class="uk-button uk-button-primary">${i18n.ok}</button> </div> </form>`,
          options,
          () => null,
          () => input.value
        );
        const { $el } = promise.dialog;
        const input = $("input", $el);
        input.value = value || "";
        on($el, "show", () => input.select());
        return promise;
      };
      modal.i18n = {
        ok: "\uD655\uC778",
        cancel: "\uCDE8\uC18C"
      };
      function openDialog(tmpl, options, hideFn = noop, submitFn = noop) {
        options = {
          bgClose: false,
          escClose: true,
          ...options,
          i18n: { ...modal.i18n, ...options == null ? void 0 : options.i18n }
        };
        const dialog = modal.dialog(tmpl(options), options);
        return assign(
          new Promise((resolve) => {
            const off = on(dialog.$el, "hide", () => resolve(hideFn()));
            on(dialog.$el, "submit", "form", (e) => {
              e.preventDefault();
              resolve(submitFn(dialog));
              off();
              dialog.hide();
            });
          }),
          { dialog }
        );
      }
    }

    var sticky = {
      mixins: [Class, Media],
      props: {
        position: String,
        top: null,
        bottom: null,
        start: null,
        end: null,
        offset: String,
        overflowFlip: Boolean,
        animation: String,
        clsActive: String,
        clsInactive: String,
        clsFixed: String,
        clsBelow: String,
        selTarget: String,
        showOnUp: Boolean,
        targetOffset: Number
      },
      data: {
        position: "top",
        top: false,
        bottom: false,
        start: false,
        end: false,
        offset: 0,
        overflowFlip: false,
        animation: "",
        clsActive: "uk-active",
        clsInactive: "",
        clsFixed: "uk-sticky-fixed",
        clsBelow: "uk-sticky-below",
        selTarget: "",
        showOnUp: false,
        targetOffset: false
      },
      computed: {
        target: ({ selTarget }, $el) => selTarget && $(selTarget, $el) || $el
      },
      connected() {
        this.start = coerce(this.start || this.top);
        this.end = coerce(this.end || this.bottom);
        this.placeholder = $("+ .uk-sticky-placeholder", this.$el) || $('<div class="uk-sticky-placeholder"></div>');
        this.isFixed = false;
        this.setActive(false);
      },
      beforeDisconnect() {
        if (this.isFixed) {
          this.hide();
          removeClass(this.target, this.clsInactive);
        }
        reset(this.$el);
        remove$1(this.placeholder);
        this.placeholder = null;
      },
      observe: [
        viewport(),
        scroll({ target: () => document.scrollingElement }),
        resize({
          target: ({ $el }) => [$el, parent($el), document.scrollingElement],
          handler(entries) {
            this.$emit(
              this._data.resized && entries.some(({ target }) => target === parent(this.$el)) ? "update" : "resize"
            );
            this._data.resized = true;
          }
        })
      ],
      events: [
        {
          name: "load hashchange popstate",
          el: () => window,
          filter: ({ targetOffset }) => targetOffset !== false,
          handler() {
            const { scrollingElement } = document;
            if (!location.hash || scrollingElement.scrollTop === 0) {
              return;
            }
            setTimeout(() => {
              const targetOffset = offset($(location.hash));
              const elOffset = offset(this.$el);
              if (this.isFixed && intersectRect(targetOffset, elOffset)) {
                scrollingElement.scrollTop = Math.ceil(
                  targetOffset.top - elOffset.height - toPx(this.targetOffset, "height", this.placeholder) - toPx(this.offset, "height", this.placeholder)
                );
              }
            });
          }
        }
      ],
      update: [
        {
          read({ height: height$1, width, margin, sticky }, types) {
            this.inactive = !this.matchMedia || !isVisible(this.$el);
            if (this.inactive) {
              return;
            }
            const hide = this.isFixed && types.has("update");
            if (hide) {
              preventTransition(this.target);
              this.hide();
            }
            if (!this.active) {
              ({ height: height$1, width } = offset(this.$el));
              margin = css(this.$el, "margin");
            }
            if (hide) {
              this.show();
            }
            const viewport2 = toPx("100vh", "height");
            const dynamicViewport = height(window);
            const maxScrollHeight = Math.max(
              0,
              document.scrollingElement.scrollHeight - viewport2
            );
            let position = this.position;
            if (this.overflowFlip && height$1 > viewport2) {
              position = position === "top" ? "bottom" : "top";
            }
            const referenceElement = this.isFixed ? this.placeholder : this.$el;
            let offset$1 = toPx(this.offset, "height", sticky ? this.$el : referenceElement);
            if (position === "bottom" && (height$1 < dynamicViewport || this.overflowFlip)) {
              offset$1 += dynamicViewport - height$1;
            }
            const overflow = this.overflowFlip ? 0 : Math.max(0, height$1 + offset$1 - viewport2);
            const topOffset = offset(referenceElement).top;
            const elHeight = offset(this.$el).height;
            const start = (this.start === false ? topOffset : parseProp(this.start, this.$el, topOffset)) - offset$1;
            const end = this.end === false ? maxScrollHeight : Math.min(
              maxScrollHeight,
              parseProp(this.end, this.$el, topOffset + height$1, true) - elHeight - offset$1 + overflow
            );
            sticky = maxScrollHeight && !this.showOnUp && start + offset$1 === topOffset && end === Math.min(
              maxScrollHeight,
              parseProp(true, this.$el, 0, true) - elHeight - offset$1 + overflow
            ) && css(parent(this.$el), "overflowY") === "visible";
            return {
              start,
              end,
              offset: offset$1,
              overflow,
              height: height$1,
              elHeight,
              width,
              margin,
              top: offsetPosition(referenceElement)[0],
              sticky,
              viewport: viewport2,
              maxScrollHeight
            };
          },
          write({ height, width, margin, offset, sticky }) {
            if (this.inactive || sticky || !this.isFixed) {
              reset(this.$el);
            }
            if (this.inactive) {
              return;
            }
            if (sticky) {
              height = width = margin = 0;
              css(this.$el, { position: "sticky", top: offset });
            }
            const { placeholder } = this;
            css(placeholder, { height, width, margin });
            if (parent(placeholder) !== parent(this.$el) || sticky ^ index(placeholder) < index(this.$el)) {
              (sticky ? before : after)(this.$el, placeholder);
              placeholder.hidden = true;
            }
          },
          events: ["resize"]
        },
        {
          read({
            scroll: prevScroll = 0,
            dir: prevDir = "down",
            overflow,
            overflowScroll = 0,
            start,
            end,
            elHeight,
            height,
            sticky,
            maxScrollHeight
          }) {
            const scroll2 = Math.min(document.scrollingElement.scrollTop, maxScrollHeight);
            const dir = prevScroll <= scroll2 ? "down" : "up";
            const referenceElement = this.isFixed ? this.placeholder : this.$el;
            return {
              dir,
              prevDir,
              scroll: scroll2,
              prevScroll,
              below: scroll2 > offset(referenceElement).top + (sticky ? Math.min(height, elHeight) : height),
              offsetParentTop: offset(referenceElement.offsetParent).top,
              overflowScroll: clamp(
                overflowScroll + clamp(scroll2, start, end) - clamp(prevScroll, start, end),
                0,
                overflow
              )
            };
          },
          write(data, types) {
            const isScrollUpdate = types.has("scroll");
            const {
              initTimestamp = 0,
              dir,
              prevDir,
              scroll: scroll2,
              prevScroll = 0,
              top,
              start,
              below
            } = data;
            if (scroll2 < 0 || scroll2 === prevScroll && isScrollUpdate || this.showOnUp && !isScrollUpdate && !this.isFixed) {
              return;
            }
            const now = Date.now();
            if (now - initTimestamp > 300 || dir !== prevDir) {
              data.initScroll = scroll2;
              data.initTimestamp = now;
            }
            if (this.showOnUp && !this.isFixed && Math.abs(data.initScroll - scroll2) <= 30 && Math.abs(prevScroll - scroll2) <= 10) {
              return;
            }
            if (this.inactive || scroll2 < start || this.showOnUp && (scroll2 <= start || dir === "down" && isScrollUpdate || dir === "up" && !this.isFixed && !below)) {
              if (!this.isFixed) {
                if (Animation.inProgress(this.$el) && top > scroll2) {
                  Animation.cancel(this.$el);
                  this.hide();
                }
                return;
              }
              if (this.animation && below) {
                if (hasClass(this.$el, "uk-animation-leave")) {
                  return;
                }
                Animation.out(this.$el, this.animation).then(() => this.hide(), noop);
              } else {
                this.hide();
              }
            } else if (this.isFixed) {
              this.update();
            } else if (this.animation && below) {
              this.show();
              Animation.in(this.$el, this.animation).catch(noop);
            } else {
              preventTransition(this.target);
              this.show();
            }
          },
          events: ["resize", "resizeViewport", "scroll"]
        }
      ],
      methods: {
        show() {
          this.isFixed = true;
          this.update();
          this.placeholder.hidden = false;
        },
        hide() {
          const { offset, sticky } = this._data;
          this.setActive(false);
          removeClass(this.$el, this.clsFixed, this.clsBelow);
          if (sticky) {
            css(this.$el, "top", offset);
          } else {
            css(this.$el, {
              position: "",
              top: "",
              width: "",
              marginTop: ""
            });
          }
          this.placeholder.hidden = true;
          this.isFixed = false;
        },
        update() {
          let {
            width,
            scroll: scroll2 = 0,
            overflow,
            overflowScroll = 0,
            start,
            end,
            offset,
            offsetParentTop,
            sticky,
            below
          } = this._data;
          const active = start !== 0 || scroll2 > start;
          if (!sticky) {
            let position = "fixed";
            if (scroll2 > end) {
              offset += end - offsetParentTop + overflowScroll - overflow;
              position = "absolute";
            }
            css(this.$el, { position, width, marginTop: 0 }, "important");
          }
          css(this.$el, "top", offset - overflowScroll);
          this.setActive(active);
          toggleClass(this.$el, this.clsBelow, below);
          addClass(this.$el, this.clsFixed);
        },
        setActive(active) {
          const prev = this.active;
          this.active = active;
          if (active) {
            replaceClass(this.target, this.clsInactive, this.clsActive);
            prev !== active && trigger(this.$el, "active");
          } else {
            replaceClass(this.target, this.clsActive, this.clsInactive);
            if (prev !== active) {
              preventTransition(this.target);
              trigger(this.$el, "inactive");
            }
          }
        }
      }
    };
    function parseProp(value, el, propOffset, padding) {
      if (!value) {
        return 0;
      }
      if (isNumeric(value) || isString(value) && value.match(/^-?\d/)) {
        return propOffset + toPx(value, "height", el, true);
      } else {
        const refElement = value === true ? parent(el) : query(value, el);
        return offset(refElement).bottom - (padding && (refElement == null ? void 0 : refElement.contains(el)) ? toFloat(css(refElement, "paddingBottom")) : 0);
      }
    }
    function coerce(value) {
      if (value === "true") {
        return true;
      } else if (value === "false") {
        return false;
      }
      return value;
    }
    function reset(el) {
      css(el, { position: "", top: "", marginTop: "", width: "" });
    }
    const clsTransitionDisable = "uk-transition-disable";
    function preventTransition(element) {
      if (!hasClass(element, clsTransitionDisable)) {
        addClass(element, clsTransitionDisable);
        requestAnimationFrame(() => removeClass(element, clsTransitionDisable));
      }
    }

    const selDisabled = ".uk-disabled *, .uk-disabled, [disabled]";
    var Switcher = {
      mixins: [Togglable],
      args: "connect",
      props: {
        connect: String,
        toggle: String,
        itemNav: String,
        active: Number,
        followFocus: Boolean,
        swiping: Boolean
      },
      data: {
        connect: "~.uk-switcher",
        toggle: "> * > :first-child",
        itemNav: false,
        active: 0,
        cls: "uk-active",
        attrItem: "uk-switcher-item",
        selVertical: ".uk-nav",
        followFocus: false,
        swiping: true
      },
      computed: {
        connects: {
          get: ({ connect }, $el) => queryAll(connect, $el),
          observe: ({ connect }) => connect
        },
        connectChildren() {
          return this.connects.map((el) => children(el)).flat();
        },
        toggles: ({ toggle }, $el) => $$(toggle, $el),
        children(_, $el) {
          return children($el).filter(
            (child) => this.toggles.some((toggle) => child.contains(toggle))
          );
        }
      },
      watch: {
        connects(connects) {
          if (this.swiping) {
            css(connects, "touchAction", "pan-y pinch-zoom");
          }
          this.$emit();
        },
        connectChildren() {
          let index = Math.max(0, this.index());
          for (const el of this.connects) {
            children(el).forEach((child, i) => toggleClass(child, this.cls, i === index));
          }
          this.$emit();
        },
        toggles(toggles) {
          this.$emit();
          const active = this.index();
          this.show(~active ? active : toggles[this.active] || toggles[0]);
        }
      },
      connected() {
        attr(this.$el, "role", "tablist");
      },
      observe: [
        lazyload({ targets: ({ connectChildren }) => connectChildren }),
        swipe({ target: ({ connects }) => connects, filter: ({ swiping }) => swiping })
      ],
      events: [
        {
          name: "click keydown",
          delegate: ({ toggle }) => toggle,
          handler(e) {
            if (!matches(e.current, selDisabled) && (e.type === "click" || e.keyCode === keyMap.SPACE)) {
              e.preventDefault();
              this.show(e.current);
            }
          }
        },
        {
          name: "keydown",
          delegate: ({ toggle }) => toggle,
          handler(e) {
            const { current, keyCode } = e;
            const isVertical = matches(this.$el, this.selVertical);
            let i = keyCode === keyMap.HOME ? 0 : keyCode === keyMap.END ? "last" : keyCode === keyMap.LEFT && !isVertical || keyCode === keyMap.UP && isVertical ? "previous" : keyCode === keyMap.RIGHT && !isVertical || keyCode === keyMap.DOWN && isVertical ? "next" : -1;
            if (~i) {
              e.preventDefault();
              const toggles = this.toggles.filter((el) => !matches(el, selDisabled));
              const next = toggles[getIndex(i, toggles, toggles.indexOf(current))];
              next.focus();
              if (this.followFocus) {
                this.show(next);
              }
            }
          }
        },
        {
          name: "click",
          el: ({ $el, connects, itemNav }) => connects.concat(itemNav ? queryAll(itemNav, $el) : []),
          delegate: ({ attrItem }) => `[${attrItem}],[data-${attrItem}]`,
          handler(e) {
            if (e.target.closest("a,button")) {
              e.preventDefault();
              this.show(data(e.current, this.attrItem));
            }
          }
        },
        {
          name: "swipeRight swipeLeft",
          filter: ({ swiping }) => swiping,
          el: ({ connects }) => connects,
          handler({ type }) {
            this.show(endsWith(type, "Left") ? "next" : "previous");
          }
        }
      ],
      update() {
        var _a;
        for (const el of this.connects) {
          if (isTag(el, "ul")) {
            attr(el, "role", "presentation");
          }
        }
        attr(children(this.$el), "role", "presentation");
        for (const index in this.toggles) {
          const toggle = this.toggles[index];
          const item = (_a = this.connects[0]) == null ? void 0 : _a.children[index];
          attr(toggle, "role", "tab");
          if (!item) {
            continue;
          }
          toggle.id = generateId(this, toggle);
          item.id = generateId(this, item);
          attr(toggle, "aria-controls", item.id);
          attr(item, { role: "tabpanel", "aria-labelledby": toggle.id });
        }
        attr(this.$el, "aria-orientation", matches(this.$el, this.selVertical) ? "vertical" : null);
      },
      methods: {
        index() {
          return findIndex(this.children, (el) => hasClass(el, this.cls));
        },
        show(item) {
          const toggles = this.toggles.filter((el) => !matches(el, selDisabled));
          const prev = this.index();
          const next = getIndex(
            !isNode(item) || includes(toggles, item) ? item : 0,
            toggles,
            getIndex(this.toggles[prev], toggles)
          );
          const active = getIndex(toggles[next], this.toggles);
          this.children.forEach((child, i) => {
            toggleClass(child, this.cls, active === i);
            attr(this.toggles[i], {
              "aria-selected": active === i,
              tabindex: active === i ? null : -1
            });
          });
          const animate = prev >= 0 && prev !== next;
          this.connects.forEach(async ({ children: children2 }) => {
            const actives = toArray(children2).filter(
              (child, i) => i !== active && hasClass(child, this.cls)
            );
            if (await this.toggleElement(actives, false, animate)) {
              await this.toggleElement(children2[active], true, animate);
            }
          });
        }
      }
    };

    var tab = {
      mixins: [Class],
      extends: Switcher,
      props: {
        media: Boolean
      },
      data: {
        media: 960,
        attrItem: "uk-tab-item",
        selVertical: ".uk-tab-left,.uk-tab-right"
      },
      connected() {
        const cls = hasClass(this.$el, "uk-tab-left") ? "uk-tab-left" : hasClass(this.$el, "uk-tab-right") ? "uk-tab-right" : false;
        if (cls) {
          this.$create("toggle", this.$el, { cls, mode: "media", media: this.media });
        }
      }
    };

    const KEY_SPACE = 32;
    var toggle = {
      mixins: [Media, Togglable],
      args: "target",
      props: {
        href: String,
        target: null,
        mode: "list",
        queued: Boolean
      },
      data: {
        href: false,
        target: false,
        mode: "click",
        queued: true
      },
      computed: {
        target: {
          get: ({ target }, $el) => {
            target = queryAll(target || $el.hash, $el);
            return target.length ? target : [$el];
          },
          observe: ({ target }) => target
        }
      },
      connected() {
        if (!includes(this.mode, "media")) {
          if (!isFocusable(this.$el)) {
            attr(this.$el, "tabindex", "0");
          }
          if (!this.cls && isTag(this.$el, "a")) {
            attr(this.$el, "role", "button");
          }
        }
      },
      observe: lazyload({ targets: ({ target }) => target }),
      events: [
        {
          name: pointerDown$1,
          filter: ({ mode }) => includes(mode, "hover"),
          handler(e) {
            this._preventClick = null;
            if (!isTouch(e) || isBoolean(this._showState) || this.$el.disabled) {
              return;
            }
            trigger(this.$el, "focus");
            once(
              document,
              pointerDown$1,
              () => trigger(this.$el, "blur"),
              true,
              (e2) => !this.$el.contains(e2.target)
            );
            if (includes(this.mode, "click")) {
              this._preventClick = true;
            }
          }
        },
        {
          // mouseenter mouseleave are added because of Firefox bug,
          // where pointerleave is triggered immediately after pointerenter on scroll
          name: `mouseenter mouseleave ${pointerEnter} ${pointerLeave} focus blur`,
          filter: ({ mode }) => includes(mode, "hover"),
          handler(e) {
            if (isTouch(e) || this.$el.disabled) {
              return;
            }
            const show = includes(["mouseenter", pointerEnter, "focus"], e.type);
            const expanded = this.isToggled(this.target);
            if (!show && (!isBoolean(this._showState) || e.type !== "blur" && matches(this.$el, ":focus") || e.type === "blur" && matches(this.$el, ":hover"))) {
              if (expanded === this._showState) {
                this._showState = null;
              }
              return;
            }
            if (show && isBoolean(this._showState) && expanded !== this._showState) {
              return;
            }
            this._showState = show ? expanded : null;
            this.toggle(`toggle${show ? "show" : "hide"}`);
          }
        },
        {
          name: "keydown",
          filter: ({ $el, mode }) => includes(mode, "click") && !isTag($el, "input"),
          handler(e) {
            if (e.keyCode === KEY_SPACE) {
              e.preventDefault();
              this.$el.click();
            }
          }
        },
        {
          name: "click",
          filter: ({ mode }) => ["click", "hover"].some((m) => includes(mode, m)),
          handler(e) {
            let link;
            if (this._preventClick || e.target.closest('a[href="#"], a[href=""]') || (link = e.target.closest("a[href]")) && (!this.isToggled(this.target) || link.hash && matches(this.target, link.hash))) {
              e.preventDefault();
            }
            if (!this._preventClick && includes(this.mode, "click")) {
              this.toggle();
            }
          }
        },
        {
          name: "mediachange",
          filter: ({ mode }) => includes(mode, "media"),
          el: ({ target }) => target,
          handler(e, mediaObj) {
            if (mediaObj.matches ^ this.isToggled(this.target)) {
              this.toggle();
            }
          }
        }
      ],
      methods: {
        async toggle(type) {
          if (!trigger(this.target, type || "toggle", [this])) {
            return;
          }
          if (hasAttr(this.$el, "aria-expanded")) {
            attr(this.$el, "aria-expanded", !this.isToggled(this.target));
          }
          if (!this.queued) {
            return this.toggleElement(this.target);
          }
          const leaving = this.target.filter((el) => hasClass(el, this.clsLeave));
          if (leaving.length) {
            for (const el of this.target) {
              const isLeaving = includes(leaving, el);
              this.toggleElement(el, isLeaving, isLeaving);
            }
            return;
          }
          const toggled = this.target.filter(this.isToggled);
          if (await this.toggleElement(toggled, false)) {
            await this.toggleElement(
              this.target.filter((el) => !includes(toggled, el)),
              true
            );
          }
        }
      }
    };

    var components = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Accordion: accordion,
        Alert: alert,
        Close: Close,
        Cover: cover,
        DropParentIcon: IconComponent,
        FormCustom: formCustom,
        Icon: Icon,
        Img: img,
        Leader: leader,
        Marker: Marker,
        Modal: modal,
        NavParentIcon: NavParentIcon,
        NavbarParentIcon: IconComponent,
        NavbarToggleIcon: NavbarToggleIcon,
        OverlayIcon: IconComponent,
        PaginationNext: PaginationNext,
        PaginationPrevious: PaginationPrevious,
        SearchIcon: Search,
        SlidenavNext: Slidenav,
        SlidenavPrevious: Slidenav,
        Spinner: Spinner,
        Sticky: sticky,
        Svg: svg,
        Switcher: Switcher,
        Tab: tab,
        Toggle: toggle,
        Totop: Totop
    });

    /*! jQuery v3.7.1 | (c) OpenJS Foundation and other contributors | jquery.org/license */
    !function(e, t) {
      "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, true) : function(e2) {
        if (!e2.document) throw new Error("jQuery requires a window with a document");
        return t(e2);
      } : t(e);
    }("undefined" != typeof window ? window : undefined, function(ie, e) {
      var oe = [], r = Object.getPrototypeOf, ae = oe.slice, g = oe.flat ? function(e2) {
        return oe.flat.call(e2);
      } : function(e2) {
        return oe.concat.apply([], e2);
      }, s = oe.push, se = oe.indexOf, n = {}, i = n.toString, ue = n.hasOwnProperty, o = ue.toString, a = o.call(Object), le = {}, v = function(e2) {
        return "function" == typeof e2 && "number" != typeof e2.nodeType && "function" != typeof e2.item;
      }, y = function(e2) {
        return null != e2 && e2 === e2.window;
      }, C = ie.document, u = { type: true, src: true, nonce: true, noModule: true };
      function m(e2, t2, n2) {
        var r2, i2, o2 = (n2 = n2 || C).createElement("script");
        if (o2.text = e2, t2)
          for (r2 in u)
            (i2 = t2[r2] || t2.getAttribute && t2.getAttribute(r2)) && o2.setAttribute(r2, i2);
        n2.head.appendChild(o2).parentNode.removeChild(o2);
      }
      function x(e2) {
        return null == e2 ? e2 + "" : "object" == typeof e2 || "function" == typeof e2 ? n[i.call(e2)] || "object" : typeof e2;
      }
      var t = "3.7.1", l = /HTML$/i, ce = function(e2, t2) {
        return new ce.fn.init(e2, t2);
      };
      function c(e2) {
        var t2 = !!e2 && "length" in e2 && e2.length, n2 = x(e2);
        return !v(e2) && !y(e2) && ("array" === n2 || 0 === t2 || "number" == typeof t2 && 0 < t2 && t2 - 1 in e2);
      }
      function fe(e2, t2) {
        return e2.nodeName && e2.nodeName.toLowerCase() === t2.toLowerCase();
      }
      ce.fn = ce.prototype = {
        jquery: t,
        constructor: ce,
        length: 0,
        toArray: function() {
          return ae.call(this);
        },
        get: function(e2) {
          return null == e2 ? ae.call(this) : e2 < 0 ? this[e2 + this.length] : this[e2];
        },
        pushStack: function(e2) {
          var t2 = ce.merge(this.constructor(), e2);
          return t2.prevObject = this, t2;
        },
        each: function(e2) {
          return ce.each(this, e2);
        },
        map: function(n2) {
          return this.pushStack(
            ce.map(this, function(e2, t2) {
              return n2.call(e2, t2, e2);
            })
          );
        },
        slice: function() {
          return this.pushStack(ae.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(
            ce.grep(this, function(e2, t2) {
              return (t2 + 1) % 2;
            })
          );
        },
        odd: function() {
          return this.pushStack(
            ce.grep(this, function(e2, t2) {
              return t2 % 2;
            })
          );
        },
        eq: function(e2) {
          var t2 = this.length, n2 = +e2 + (e2 < 0 ? t2 : 0);
          return this.pushStack(0 <= n2 && n2 < t2 ? [this[n2]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        push: s,
        sort: oe.sort,
        splice: oe.splice
      }, ce.extend = ce.fn.extend = function() {
        var e2, t2, n2, r2, i2, o2, a2 = arguments[0] || {}, s2 = 1, u2 = arguments.length, l2 = false;
        for ("boolean" == typeof a2 && (l2 = a2, a2 = arguments[s2] || {}, s2++), "object" == typeof a2 || v(a2) || (a2 = {}), s2 === u2 && (a2 = this, s2--); s2 < u2; s2++)
          if (null != (e2 = arguments[s2]))
            for (t2 in e2)
              r2 = e2[t2], "__proto__" !== t2 && a2 !== r2 && (l2 && r2 && (ce.isPlainObject(r2) || (i2 = Array.isArray(r2))) ? (n2 = a2[t2], o2 = i2 && !Array.isArray(n2) ? [] : i2 || ce.isPlainObject(n2) ? n2 : {}, i2 = false, a2[t2] = ce.extend(l2, o2, r2)) : void 0 !== r2 && (a2[t2] = r2));
        return a2;
      }, ce.extend({
        expando: "jQuery" + (t + Math.random()).replace(/\D/g, ""),
        isReady: true,
        error: function(e2) {
          throw new Error(e2);
        },
        noop: function() {
        },
        isPlainObject: function(e2) {
          var t2, n2;
          return !(!e2 || "[object Object]" !== i.call(e2)) && (!(t2 = r(e2)) || "function" == typeof (n2 = ue.call(t2, "constructor") && t2.constructor) && o.call(n2) === a);
        },
        isEmptyObject: function(e2) {
          var t2;
          for (t2 in e2) return false;
          return true;
        },
        globalEval: function(e2, t2, n2) {
          m(e2, { nonce: t2 && t2.nonce }, n2);
        },
        each: function(e2, t2) {
          var n2, r2 = 0;
          if (c(e2)) {
            for (n2 = e2.length; r2 < n2; r2++) if (false === t2.call(e2[r2], r2, e2[r2])) break;
          } else for (r2 in e2) if (false === t2.call(e2[r2], r2, e2[r2])) break;
          return e2;
        },
        text: function(e2) {
          var t2, n2 = "", r2 = 0, i2 = e2.nodeType;
          if (!i2) while (t2 = e2[r2++]) n2 += ce.text(t2);
          return 1 === i2 || 11 === i2 ? e2.textContent : 9 === i2 ? e2.documentElement.textContent : 3 === i2 || 4 === i2 ? e2.nodeValue : n2;
        },
        makeArray: function(e2, t2) {
          var n2 = t2 || [];
          return null != e2 && (c(Object(e2)) ? ce.merge(n2, "string" == typeof e2 ? [e2] : e2) : s.call(n2, e2)), n2;
        },
        inArray: function(e2, t2, n2) {
          return null == t2 ? -1 : se.call(t2, e2, n2);
        },
        isXMLDoc: function(e2) {
          var t2 = e2 && e2.namespaceURI, n2 = e2 && (e2.ownerDocument || e2).documentElement;
          return !l.test(t2 || n2 && n2.nodeName || "HTML");
        },
        merge: function(e2, t2) {
          for (var n2 = +t2.length, r2 = 0, i2 = e2.length; r2 < n2; r2++) e2[i2++] = t2[r2];
          return e2.length = i2, e2;
        },
        grep: function(e2, t2, n2) {
          for (var r2 = [], i2 = 0, o2 = e2.length, a2 = !n2; i2 < o2; i2++)
            !t2(e2[i2], i2) !== a2 && r2.push(e2[i2]);
          return r2;
        },
        map: function(e2, t2, n2) {
          var r2, i2, o2 = 0, a2 = [];
          if (c(e2)) for (r2 = e2.length; o2 < r2; o2++) null != (i2 = t2(e2[o2], o2, n2)) && a2.push(i2);
          else for (o2 in e2) null != (i2 = t2(e2[o2], o2, n2)) && a2.push(i2);
          return g(a2);
        },
        guid: 1,
        support: le
      }), "function" == typeof Symbol && (ce.fn[Symbol.iterator] = oe[Symbol.iterator]), ce.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(e2, t2) {
          n["[object " + t2 + "]"] = t2.toLowerCase();
        }
      );
      var pe = oe.pop, de = oe.sort, he = oe.splice, ge = "[\\x20\\t\\r\\n\\f]", ve = new RegExp("^" + ge + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ge + "+$", "g");
      ce.contains = function(e2, t2) {
        var n2 = t2 && t2.parentNode;
        return e2 === n2 || !(!n2 || 1 !== n2.nodeType || !(e2.contains ? e2.contains(n2) : e2.compareDocumentPosition && 16 & e2.compareDocumentPosition(n2)));
      };
      var f = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
      function p(e2, t2) {
        return t2 ? "\0" === e2 ? "\uFFFD" : e2.slice(0, -1) + "\\" + e2.charCodeAt(e2.length - 1).toString(16) + " " : "\\" + e2;
      }
      ce.escapeSelector = function(e2) {
        return (e2 + "").replace(f, p);
      };
      var ye = C, me = s;
      !function() {
        var e2, b2, w2, o2, a2, T2, r2, C2, d2, i2, k2 = me, S2 = ce.expando, E2 = 0, n2 = 0, s2 = W2(), c2 = W2(), u2 = W2(), h2 = W2(), l2 = function(e3, t3) {
          return e3 === t3 && (a2 = true), 0;
        }, f2 = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", t2 = "(?:\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", p2 = "\\[" + ge + "*(" + t2 + ")(?:" + ge + "*([*^$|!~]?=)" + ge + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + t2 + "))|)" + ge + "*\\]", g2 = ":(" + t2 + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + p2 + ")*)|.*)\\)|)", v2 = new RegExp(ge + "+", "g"), y2 = new RegExp("^" + ge + "*," + ge + "*"), m2 = new RegExp("^" + ge + "*([>+~]|" + ge + ")" + ge + "*"), x2 = new RegExp(ge + "|>"), j2 = new RegExp(g2), A2 = new RegExp("^" + t2 + "$"), D2 = {
          ID: new RegExp("^#(" + t2 + ")"),
          CLASS: new RegExp("^\\.(" + t2 + ")"),
          TAG: new RegExp("^(" + t2 + "|[*])"),
          ATTR: new RegExp("^" + p2),
          PSEUDO: new RegExp("^" + g2),
          CHILD: new RegExp(
            "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ge + "*(even|odd|(([+-]|)(\\d*)n|)" + ge + "*(?:([+-]|)" + ge + "*(\\d+)|))" + ge + "*\\)|)",
            "i"
          ),
          bool: new RegExp("^(?:" + f2 + ")$", "i"),
          needsContext: new RegExp(
            "^" + ge + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ge + "*((?:-\\d)?\\d*)" + ge + "*\\)|)(?=[^-]|$)",
            "i"
          )
        }, N2 = /^(?:input|select|textarea|button)$/i, q2 = /^h\d$/i, L2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, H2 = /[+~]/, O2 = new RegExp("\\\\[\\da-fA-F]{1,6}" + ge + "?|\\\\([^\\r\\n\\f])", "g"), P2 = function(e3, t3) {
          var n3 = "0x" + e3.slice(1) - 65536;
          return t3 || (n3 < 0 ? String.fromCharCode(n3 + 65536) : String.fromCharCode(n3 >> 10 | 55296, 1023 & n3 | 56320));
        }, M2 = function() {
          V2();
        }, R2 = J2(
          function(e3) {
            return true === e3.disabled && fe(e3, "fieldset");
          },
          { dir: "parentNode", next: "legend" }
        );
        try {
          k2.apply(oe = ae.call(ye.childNodes), ye.childNodes), oe[ye.childNodes.length].nodeType;
        } catch (e3) {
          k2 = {
            apply: function(e4, t3) {
              me.apply(e4, ae.call(t3));
            },
            call: function(e4) {
              me.apply(e4, ae.call(arguments, 1));
            }
          };
        }
        function I2(t3, e3, n3, r3) {
          var i3, o3, a3, s3, u3, l3, c3, f3 = e3 && e3.ownerDocument, p3 = e3 ? e3.nodeType : 9;
          if (n3 = n3 || [], "string" != typeof t3 || !t3 || 1 !== p3 && 9 !== p3 && 11 !== p3)
            return n3;
          if (!r3 && (V2(e3), e3 = e3 || T2, C2)) {
            if (11 !== p3 && (u3 = L2.exec(t3)))
              if (i3 = u3[1]) {
                if (9 === p3) {
                  if (!(a3 = e3.getElementById(i3))) return n3;
                  if (a3.id === i3) return k2.call(n3, a3), n3;
                } else if (f3 && (a3 = f3.getElementById(i3)) && I2.contains(e3, a3) && a3.id === i3)
                  return k2.call(n3, a3), n3;
              } else {
                if (u3[2]) return k2.apply(n3, e3.getElementsByTagName(t3)), n3;
                if ((i3 = u3[3]) && e3.getElementsByClassName)
                  return k2.apply(n3, e3.getElementsByClassName(i3)), n3;
              }
            if (!(h2[t3 + " "] || d2 && d2.test(t3))) {
              if (c3 = t3, f3 = e3, 1 === p3 && (x2.test(t3) || m2.test(t3))) {
                (f3 = H2.test(t3) && U2(e3.parentNode) || e3) == e3 && le.scope || ((s3 = e3.getAttribute("id")) ? s3 = ce.escapeSelector(s3) : e3.setAttribute("id", s3 = S2)), o3 = (l3 = Y2(t3)).length;
                while (o3--) l3[o3] = (s3 ? "#" + s3 : ":scope") + " " + Q2(l3[o3]);
                c3 = l3.join(",");
              }
              try {
                return k2.apply(n3, f3.querySelectorAll(c3)), n3;
              } catch (e4) {
                h2(t3, true);
              } finally {
                s3 === S2 && e3.removeAttribute("id");
              }
            }
          }
          return re2(t3.replace(ve, "$1"), e3, n3, r3);
        }
        function W2() {
          var r3 = [];
          return function e3(t3, n3) {
            return r3.push(t3 + " ") > b2.cacheLength && delete e3[r3.shift()], e3[t3 + " "] = n3;
          };
        }
        function F2(e3) {
          return e3[S2] = true, e3;
        }
        function $2(e3) {
          var t3 = T2.createElement("fieldset");
          try {
            return !!e3(t3);
          } catch (e4) {
            return false;
          } finally {
            t3.parentNode && t3.parentNode.removeChild(t3), t3 = null;
          }
        }
        function B2(t3) {
          return function(e3) {
            return fe(e3, "input") && e3.type === t3;
          };
        }
        function _2(t3) {
          return function(e3) {
            return (fe(e3, "input") || fe(e3, "button")) && e3.type === t3;
          };
        }
        function z2(t3) {
          return function(e3) {
            return "form" in e3 ? e3.parentNode && false === e3.disabled ? "label" in e3 ? "label" in e3.parentNode ? e3.parentNode.disabled === t3 : e3.disabled === t3 : e3.isDisabled === t3 || e3.isDisabled !== !t3 && R2(e3) === t3 : e3.disabled === t3 : "label" in e3 && e3.disabled === t3;
          };
        }
        function X2(a3) {
          return F2(function(o3) {
            return o3 = +o3, F2(function(e3, t3) {
              var n3, r3 = a3([], e3.length, o3), i3 = r3.length;
              while (i3--) e3[n3 = r3[i3]] && (e3[n3] = !(t3[n3] = e3[n3]));
            });
          });
        }
        function U2(e3) {
          return e3 && "undefined" != typeof e3.getElementsByTagName && e3;
        }
        function V2(e3) {
          var t3, n3 = e3 ? e3.ownerDocument || e3 : ye;
          return n3 != T2 && 9 === n3.nodeType && n3.documentElement && (r2 = (T2 = n3).documentElement, C2 = !ce.isXMLDoc(T2), i2 = r2.matches || r2.webkitMatchesSelector || r2.msMatchesSelector, r2.msMatchesSelector && ye != T2 && (t3 = T2.defaultView) && t3.top !== t3 && t3.addEventListener("unload", M2), le.getById = $2(function(e4) {
            return r2.appendChild(e4).id = ce.expando, !T2.getElementsByName || !T2.getElementsByName(ce.expando).length;
          }), le.disconnectedMatch = $2(function(e4) {
            return i2.call(e4, "*");
          }), le.scope = $2(function() {
            return T2.querySelectorAll(":scope");
          }), le.cssHas = $2(function() {
            try {
              return T2.querySelector(":has(*,:jqfake)"), false;
            } catch (e4) {
              return true;
            }
          }), le.getById ? (b2.filter.ID = function(e4) {
            var t4 = e4.replace(O2, P2);
            return function(e5) {
              return e5.getAttribute("id") === t4;
            };
          }, b2.find.ID = function(e4, t4) {
            if ("undefined" != typeof t4.getElementById && C2) {
              var n4 = t4.getElementById(e4);
              return n4 ? [n4] : [];
            }
          }) : (b2.filter.ID = function(e4) {
            var n4 = e4.replace(O2, P2);
            return function(e5) {
              var t4 = "undefined" != typeof e5.getAttributeNode && e5.getAttributeNode("id");
              return t4 && t4.value === n4;
            };
          }, b2.find.ID = function(e4, t4) {
            if ("undefined" != typeof t4.getElementById && C2) {
              var n4, r3, i3, o3 = t4.getElementById(e4);
              if (o3) {
                if ((n4 = o3.getAttributeNode("id")) && n4.value === e4)
                  return [o3];
                i3 = t4.getElementsByName(e4), r3 = 0;
                while (o3 = i3[r3++])
                  if ((n4 = o3.getAttributeNode("id")) && n4.value === e4)
                    return [o3];
              }
              return [];
            }
          }), b2.find.TAG = function(e4, t4) {
            return "undefined" != typeof t4.getElementsByTagName ? t4.getElementsByTagName(e4) : t4.querySelectorAll(e4);
          }, b2.find.CLASS = function(e4, t4) {
            if ("undefined" != typeof t4.getElementsByClassName && C2)
              return t4.getElementsByClassName(e4);
          }, d2 = [], $2(function(e4) {
            var t4;
            r2.appendChild(e4).innerHTML = "<a id='" + S2 + "' href='' disabled='disabled'></a><select id='" + S2 + "-\r\\' disabled='disabled'><option selected=''></option></select>", e4.querySelectorAll("[selected]").length || d2.push("\\[" + ge + "*(?:value|" + f2 + ")"), e4.querySelectorAll("[id~=" + S2 + "-]").length || d2.push("~="), e4.querySelectorAll("a#" + S2 + "+*").length || d2.push(".#.+[+~]"), e4.querySelectorAll(":checked").length || d2.push(":checked"), (t4 = T2.createElement("input")).setAttribute("type", "hidden"), e4.appendChild(t4).setAttribute("name", "D"), r2.appendChild(e4).disabled = true, 2 !== e4.querySelectorAll(":disabled").length && d2.push(":enabled", ":disabled"), (t4 = T2.createElement("input")).setAttribute("name", ""), e4.appendChild(t4), e4.querySelectorAll("[name='']").length || d2.push("\\[" + ge + "*name" + ge + "*=" + ge + `*(?:''|"")`);
          }), le.cssHas || d2.push(":has"), d2 = d2.length && new RegExp(d2.join("|")), l2 = function(e4, t4) {
            if (e4 === t4) return a2 = true, 0;
            var n4 = !e4.compareDocumentPosition - !t4.compareDocumentPosition;
            return n4 || (1 & (n4 = (e4.ownerDocument || e4) == (t4.ownerDocument || t4) ? e4.compareDocumentPosition(t4) : 1) || !le.sortDetached && t4.compareDocumentPosition(e4) === n4 ? e4 === T2 || e4.ownerDocument == ye && I2.contains(ye, e4) ? -1 : t4 === T2 || t4.ownerDocument == ye && I2.contains(ye, t4) ? 1 : o2 ? se.call(o2, e4) - se.call(o2, t4) : 0 : 4 & n4 ? -1 : 1);
          }), T2;
        }
        for (e2 in I2.matches = function(e3, t3) {
          return I2(e3, null, null, t3);
        }, I2.matchesSelector = function(e3, t3) {
          if (V2(e3), C2 && !h2[t3 + " "] && (!d2 || !d2.test(t3)))
            try {
              var n3 = i2.call(e3, t3);
              if (n3 || le.disconnectedMatch || e3.document && 11 !== e3.document.nodeType)
                return n3;
            } catch (e4) {
              h2(t3, true);
            }
          return 0 < I2(t3, T2, null, [e3]).length;
        }, I2.contains = function(e3, t3) {
          return (e3.ownerDocument || e3) != T2 && V2(e3), ce.contains(e3, t3);
        }, I2.attr = function(e3, t3) {
          (e3.ownerDocument || e3) != T2 && V2(e3);
          var n3 = b2.attrHandle[t3.toLowerCase()], r3 = n3 && ue.call(b2.attrHandle, t3.toLowerCase()) ? n3(e3, t3, !C2) : void 0;
          return void 0 !== r3 ? r3 : e3.getAttribute(t3);
        }, I2.error = function(e3) {
          throw new Error("Syntax error, unrecognized expression: " + e3);
        }, ce.uniqueSort = function(e3) {
          var t3, n3 = [], r3 = 0, i3 = 0;
          if (a2 = !le.sortStable, o2 = !le.sortStable && ae.call(e3, 0), de.call(e3, l2), a2) {
            while (t3 = e3[i3++]) t3 === e3[i3] && (r3 = n3.push(i3));
            while (r3--) he.call(e3, n3[r3], 1);
          }
          return o2 = null, e3;
        }, ce.fn.uniqueSort = function() {
          return this.pushStack(ce.uniqueSort(ae.apply(this)));
        }, (b2 = ce.expr = {
          cacheLength: 50,
          createPseudo: F2,
          match: D2,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: true },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: true },
            "~": { dir: "previousSibling" }
          },
          preFilter: {
            ATTR: function(e3) {
              return e3[1] = e3[1].replace(O2, P2), e3[3] = (e3[3] || e3[4] || e3[5] || "").replace(O2, P2), "~=" === e3[2] && (e3[3] = " " + e3[3] + " "), e3.slice(0, 4);
            },
            CHILD: function(e3) {
              return e3[1] = e3[1].toLowerCase(), "nth" === e3[1].slice(0, 3) ? (e3[3] || I2.error(e3[0]), e3[4] = +(e3[4] ? e3[5] + (e3[6] || 1) : 2 * ("even" === e3[3] || "odd" === e3[3])), e3[5] = +(e3[7] + e3[8] || "odd" === e3[3])) : e3[3] && I2.error(e3[0]), e3;
            },
            PSEUDO: function(e3) {
              var t3, n3 = !e3[6] && e3[2];
              return D2.CHILD.test(e3[0]) ? null : (e3[3] ? e3[2] = e3[4] || e3[5] || "" : n3 && j2.test(n3) && (t3 = Y2(n3, true)) && (t3 = n3.indexOf(")", n3.length - t3) - n3.length) && (e3[0] = e3[0].slice(0, t3), e3[2] = n3.slice(0, t3)), e3.slice(0, 3));
            }
          },
          filter: {
            TAG: function(e3) {
              var t3 = e3.replace(O2, P2).toLowerCase();
              return "*" === e3 ? function() {
                return true;
              } : function(e4) {
                return fe(e4, t3);
              };
            },
            CLASS: function(e3) {
              var t3 = s2[e3 + " "];
              return t3 || (t3 = new RegExp("(^|" + ge + ")" + e3 + "(" + ge + "|$)")) && s2(e3, function(e4) {
                return t3.test(
                  "string" == typeof e4.className && e4.className || "undefined" != typeof e4.getAttribute && e4.getAttribute("class") || ""
                );
              });
            },
            ATTR: function(n3, r3, i3) {
              return function(e3) {
                var t3 = I2.attr(e3, n3);
                return null == t3 ? "!=" === r3 : !r3 || (t3 += "", "=" === r3 ? t3 === i3 : "!=" === r3 ? t3 !== i3 : "^=" === r3 ? i3 && 0 === t3.indexOf(i3) : "*=" === r3 ? i3 && -1 < t3.indexOf(i3) : "$=" === r3 ? i3 && t3.slice(-i3.length) === i3 : "~=" === r3 ? -1 < (" " + t3.replace(v2, " ") + " ").indexOf(i3) : "|=" === r3 && (t3 === i3 || t3.slice(0, i3.length + 1) === i3 + "-"));
              };
            },
            CHILD: function(d3, e3, t3, h3, g3) {
              var v3 = "nth" !== d3.slice(0, 3), y3 = "last" !== d3.slice(-4), m3 = "of-type" === e3;
              return 1 === h3 && 0 === g3 ? function(e4) {
                return !!e4.parentNode;
              } : function(e4, t4, n3) {
                var r3, i3, o3, a3, s3, u3 = v3 !== y3 ? "nextSibling" : "previousSibling", l3 = e4.parentNode, c3 = m3 && e4.nodeName.toLowerCase(), f3 = !n3 && !m3, p3 = false;
                if (l3) {
                  if (v3) {
                    while (u3) {
                      o3 = e4;
                      while (o3 = o3[u3])
                        if (m3 ? fe(o3, c3) : 1 === o3.nodeType) return false;
                      s3 = u3 = "only" === d3 && !s3 && "nextSibling";
                    }
                    return true;
                  }
                  if (s3 = [y3 ? l3.firstChild : l3.lastChild], y3 && f3) {
                    p3 = (a3 = (r3 = (i3 = l3[S2] || (l3[S2] = {}))[d3] || [])[0] === E2 && r3[1]) && r3[2], o3 = a3 && l3.childNodes[a3];
                    while (o3 = ++a3 && o3 && o3[u3] || (p3 = a3 = 0) || s3.pop())
                      if (1 === o3.nodeType && ++p3 && o3 === e4) {
                        i3[d3] = [E2, a3, p3];
                        break;
                      }
                  } else if (f3 && (p3 = a3 = (r3 = (i3 = e4[S2] || (e4[S2] = {}))[d3] || [])[0] === E2 && r3[1]), false === p3) {
                    while (o3 = ++a3 && o3 && o3[u3] || (p3 = a3 = 0) || s3.pop())
                      if ((m3 ? fe(o3, c3) : 1 === o3.nodeType) && ++p3 && (f3 && ((i3 = o3[S2] || (o3[S2] = {}))[d3] = [E2, p3]), o3 === e4))
                        break;
                  }
                  return (p3 -= g3) === h3 || p3 % h3 == 0 && 0 <= p3 / h3;
                }
              };
            },
            PSEUDO: function(e3, o3) {
              var t3, a3 = b2.pseudos[e3] || b2.setFilters[e3.toLowerCase()] || I2.error("unsupported pseudo: " + e3);
              return a3[S2] ? a3(o3) : 1 < a3.length ? (t3 = [e3, e3, "", o3], b2.setFilters.hasOwnProperty(e3.toLowerCase()) ? F2(function(e4, t4) {
                var n3, r3 = a3(e4, o3), i3 = r3.length;
                while (i3--) e4[n3 = se.call(e4, r3[i3])] = !(t4[n3] = r3[i3]);
              }) : function(e4) {
                return a3(e4, 0, t3);
              }) : a3;
            }
          },
          pseudos: {
            not: F2(function(e3) {
              var r3 = [], i3 = [], s3 = ne2(e3.replace(ve, "$1"));
              return s3[S2] ? F2(function(e4, t3, n3, r4) {
                var i4, o3 = s3(e4, null, r4, []), a3 = e4.length;
                while (a3--) (i4 = o3[a3]) && (e4[a3] = !(t3[a3] = i4));
              }) : function(e4, t3, n3) {
                return r3[0] = e4, s3(r3, null, n3, i3), r3[0] = null, !i3.pop();
              };
            }),
            has: F2(function(t3) {
              return function(e3) {
                return 0 < I2(t3, e3).length;
              };
            }),
            contains: F2(function(t3) {
              return t3 = t3.replace(O2, P2), function(e3) {
                return -1 < (e3.textContent || ce.text(e3)).indexOf(t3);
              };
            }),
            lang: F2(function(n3) {
              return A2.test(n3 || "") || I2.error("unsupported lang: " + n3), n3 = n3.replace(O2, P2).toLowerCase(), function(e3) {
                var t3;
                do {
                  if (t3 = C2 ? e3.lang : e3.getAttribute("xml:lang") || e3.getAttribute("lang"))
                    return (t3 = t3.toLowerCase()) === n3 || 0 === t3.indexOf(n3 + "-");
                } while ((e3 = e3.parentNode) && 1 === e3.nodeType);
                return false;
              };
            }),
            target: function(e3) {
              var t3 = ie.location && ie.location.hash;
              return t3 && t3.slice(1) === e3.id;
            },
            root: function(e3) {
              return e3 === r2;
            },
            focus: function(e3) {
              return e3 === function() {
                try {
                  return T2.activeElement;
                } catch (e4) {
                }
              }() && T2.hasFocus() && !!(e3.type || e3.href || ~e3.tabIndex);
            },
            enabled: z2(false),
            disabled: z2(true),
            checked: function(e3) {
              return fe(e3, "input") && !!e3.checked || fe(e3, "option") && !!e3.selected;
            },
            selected: function(e3) {
              return e3.parentNode && e3.parentNode.selectedIndex, true === e3.selected;
            },
            empty: function(e3) {
              for (e3 = e3.firstChild; e3; e3 = e3.nextSibling) if (e3.nodeType < 6) return false;
              return true;
            },
            parent: function(e3) {
              return !b2.pseudos.empty(e3);
            },
            header: function(e3) {
              return q2.test(e3.nodeName);
            },
            input: function(e3) {
              return N2.test(e3.nodeName);
            },
            button: function(e3) {
              return fe(e3, "input") && "button" === e3.type || fe(e3, "button");
            },
            text: function(e3) {
              var t3;
              return fe(e3, "input") && "text" === e3.type && (null == (t3 = e3.getAttribute("type")) || "text" === t3.toLowerCase());
            },
            first: X2(function() {
              return [0];
            }),
            last: X2(function(e3, t3) {
              return [t3 - 1];
            }),
            eq: X2(function(e3, t3, n3) {
              return [n3 < 0 ? n3 + t3 : n3];
            }),
            even: X2(function(e3, t3) {
              for (var n3 = 0; n3 < t3; n3 += 2) e3.push(n3);
              return e3;
            }),
            odd: X2(function(e3, t3) {
              for (var n3 = 1; n3 < t3; n3 += 2) e3.push(n3);
              return e3;
            }),
            lt: X2(function(e3, t3, n3) {
              var r3;
              for (r3 = n3 < 0 ? n3 + t3 : t3 < n3 ? t3 : n3; 0 <= --r3; ) e3.push(r3);
              return e3;
            }),
            gt: X2(function(e3, t3, n3) {
              for (var r3 = n3 < 0 ? n3 + t3 : n3; ++r3 < t3; ) e3.push(r3);
              return e3;
            })
          }
        }).pseudos.nth = b2.pseudos.eq, { radio: true, checkbox: true, file: true, password: true, image: true })
          b2.pseudos[e2] = B2(e2);
        for (e2 in { submit: true, reset: true }) b2.pseudos[e2] = _2(e2);
        function G2() {
        }
        function Y2(e3, t3) {
          var n3, r3, i3, o3, a3, s3, u3, l3 = c2[e3 + " "];
          if (l3) return t3 ? 0 : l3.slice(0);
          a3 = e3, s3 = [], u3 = b2.preFilter;
          while (a3) {
            for (o3 in n3 && !(r3 = y2.exec(a3)) || (r3 && (a3 = a3.slice(r3[0].length) || a3), s3.push(i3 = [])), n3 = false, (r3 = m2.exec(a3)) && (n3 = r3.shift(), i3.push({ value: n3, type: r3[0].replace(ve, " ") }), a3 = a3.slice(n3.length)), b2.filter)
              !(r3 = D2[o3].exec(a3)) || u3[o3] && !(r3 = u3[o3](r3)) || (n3 = r3.shift(), i3.push({ value: n3, type: o3, matches: r3 }), a3 = a3.slice(n3.length));
            if (!n3) break;
          }
          return t3 ? a3.length : a3 ? I2.error(e3) : c2(e3, s3).slice(0);
        }
        function Q2(e3) {
          for (var t3 = 0, n3 = e3.length, r3 = ""; t3 < n3; t3++) r3 += e3[t3].value;
          return r3;
        }
        function J2(a3, e3, t3) {
          var s3 = e3.dir, u3 = e3.next, l3 = u3 || s3, c3 = t3 && "parentNode" === l3, f3 = n2++;
          return e3.first ? function(e4, t4, n3) {
            while (e4 = e4[s3]) if (1 === e4.nodeType || c3) return a3(e4, t4, n3);
            return false;
          } : function(e4, t4, n3) {
            var r3, i3, o3 = [E2, f3];
            if (n3) {
              while (e4 = e4[s3]) if ((1 === e4.nodeType || c3) && a3(e4, t4, n3)) return true;
            } else
              while (e4 = e4[s3])
                if (1 === e4.nodeType || c3)
                  if (i3 = e4[S2] || (e4[S2] = {}), u3 && fe(e4, u3)) e4 = e4[s3] || e4;
                  else {
                    if ((r3 = i3[l3]) && r3[0] === E2 && r3[1] === f3)
                      return o3[2] = r3[2];
                    if ((i3[l3] = o3)[2] = a3(e4, t4, n3)) return true;
                  }
            return false;
          };
        }
        function K2(i3) {
          return 1 < i3.length ? function(e3, t3, n3) {
            var r3 = i3.length;
            while (r3--) if (!i3[r3](e3, t3, n3)) return false;
            return true;
          } : i3[0];
        }
        function Z2(e3, t3, n3, r3, i3) {
          for (var o3, a3 = [], s3 = 0, u3 = e3.length, l3 = null != t3; s3 < u3; s3++)
            (o3 = e3[s3]) && (n3 && !n3(o3, r3, i3) || (a3.push(o3), l3 && t3.push(s3)));
          return a3;
        }
        function ee2(d3, h3, g3, v3, y3, e3) {
          return v3 && !v3[S2] && (v3 = ee2(v3)), y3 && !y3[S2] && (y3 = ee2(y3, e3)), F2(function(e4, t3, n3, r3) {
            var i3, o3, a3, s3, u3 = [], l3 = [], c3 = t3.length, f3 = e4 || function(e5, t4, n4) {
              for (var r4 = 0, i4 = t4.length; r4 < i4; r4++) I2(e5, t4[r4], n4);
              return n4;
            }(h3 || "*", n3.nodeType ? [n3] : n3, []), p3 = !d3 || !e4 && h3 ? f3 : Z2(f3, u3, d3, n3, r3);
            if (g3 ? g3(p3, s3 = y3 || (e4 ? d3 : c3 || v3) ? [] : t3, n3, r3) : s3 = p3, v3) {
              i3 = Z2(s3, l3), v3(i3, [], n3, r3), o3 = i3.length;
              while (o3--) (a3 = i3[o3]) && (s3[l3[o3]] = !(p3[l3[o3]] = a3));
            }
            if (e4) {
              if (y3 || d3) {
                if (y3) {
                  i3 = [], o3 = s3.length;
                  while (o3--) (a3 = s3[o3]) && i3.push(p3[o3] = a3);
                  y3(null, s3 = [], i3, r3);
                }
                o3 = s3.length;
                while (o3--)
                  (a3 = s3[o3]) && -1 < (i3 = y3 ? se.call(e4, a3) : u3[o3]) && (e4[i3] = !(t3[i3] = a3));
              }
            } else
              s3 = Z2(s3 === t3 ? s3.splice(c3, s3.length) : s3), y3 ? y3(null, t3, s3, r3) : k2.apply(t3, s3);
          });
        }
        function te2(e3) {
          for (var i3, t3, n3, r3 = e3.length, o3 = b2.relative[e3[0].type], a3 = o3 || b2.relative[" "], s3 = o3 ? 1 : 0, u3 = J2(
            function(e4) {
              return e4 === i3;
            },
            a3,
            true
          ), l3 = J2(
            function(e4) {
              return -1 < se.call(i3, e4);
            },
            a3,
            true
          ), c3 = [
            function(e4, t4, n4) {
              var r4 = !o3 && (n4 || t4 != w2) || ((i3 = t4).nodeType ? u3(e4, t4, n4) : l3(e4, t4, n4));
              return i3 = null, r4;
            }
          ]; s3 < r3; s3++)
            if (t3 = b2.relative[e3[s3].type]) c3 = [J2(K2(c3), t3)];
            else {
              if ((t3 = b2.filter[e3[s3].type].apply(null, e3[s3].matches))[S2]) {
                for (n3 = ++s3; n3 < r3; n3++) if (b2.relative[e3[n3].type]) break;
                return ee2(
                  1 < s3 && K2(c3),
                  1 < s3 && Q2(
                    e3.slice(0, s3 - 1).concat({ value: " " === e3[s3 - 2].type ? "*" : "" })
                  ).replace(ve, "$1"),
                  t3,
                  s3 < n3 && te2(e3.slice(s3, n3)),
                  n3 < r3 && te2(e3 = e3.slice(n3)),
                  n3 < r3 && Q2(e3)
                );
              }
              c3.push(t3);
            }
          return K2(c3);
        }
        function ne2(e3, t3) {
          var n3, v3, y3, m3, x3, r3, i3 = [], o3 = [], a3 = u2[e3 + " "];
          if (!a3) {
            t3 || (t3 = Y2(e3)), n3 = t3.length;
            while (n3--) (a3 = te2(t3[n3]))[S2] ? i3.push(a3) : o3.push(a3);
            (a3 = u2(
              e3,
              (v3 = o3, m3 = 0 < (y3 = i3).length, x3 = 0 < v3.length, r3 = function(e4, t4, n4, r4, i4) {
                var o4, a4, s3, u3 = 0, l3 = "0", c3 = e4 && [], f3 = [], p3 = w2, d3 = e4 || x3 && b2.find.TAG("*", i4), h3 = E2 += null == p3 ? 1 : Math.random() || 0.1, g3 = d3.length;
                for (i4 && (w2 = t4 == T2 || t4 || i4); l3 !== g3 && null != (o4 = d3[l3]); l3++) {
                  if (x3 && o4) {
                    a4 = 0, t4 || o4.ownerDocument == T2 || (V2(o4), n4 = !C2);
                    while (s3 = v3[a4++])
                      if (s3(o4, t4 || T2, n4)) {
                        k2.call(r4, o4);
                        break;
                      }
                    i4 && (E2 = h3);
                  }
                  m3 && ((o4 = !s3 && o4) && u3--, e4 && c3.push(o4));
                }
                if (u3 += l3, m3 && l3 !== u3) {
                  a4 = 0;
                  while (s3 = y3[a4++]) s3(c3, f3, t4, n4);
                  if (e4) {
                    if (0 < u3) while (l3--) c3[l3] || f3[l3] || (f3[l3] = pe.call(r4));
                    f3 = Z2(f3);
                  }
                  k2.apply(r4, f3), i4 && !e4 && 0 < f3.length && 1 < u3 + y3.length && ce.uniqueSort(r4);
                }
                return i4 && (E2 = h3, w2 = p3), c3;
              }, m3 ? F2(r3) : r3)
            )).selector = e3;
          }
          return a3;
        }
        function re2(e3, t3, n3, r3) {
          var i3, o3, a3, s3, u3, l3 = "function" == typeof e3 && e3, c3 = !r3 && Y2(e3 = l3.selector || e3);
          if (n3 = n3 || [], 1 === c3.length) {
            if (2 < (o3 = c3[0] = c3[0].slice(0)).length && "ID" === (a3 = o3[0]).type && 9 === t3.nodeType && C2 && b2.relative[o3[1].type]) {
              if (!(t3 = (b2.find.ID(a3.matches[0].replace(O2, P2), t3) || [])[0])) return n3;
              l3 && (t3 = t3.parentNode), e3 = e3.slice(o3.shift().value.length);
            }
            i3 = D2.needsContext.test(e3) ? 0 : o3.length;
            while (i3--) {
              if (a3 = o3[i3], b2.relative[s3 = a3.type]) break;
              if ((u3 = b2.find[s3]) && (r3 = u3(
                a3.matches[0].replace(O2, P2),
                H2.test(o3[0].type) && U2(t3.parentNode) || t3
              ))) {
                if (o3.splice(i3, 1), !(e3 = r3.length && Q2(o3))) return k2.apply(n3, r3), n3;
                break;
              }
            }
          }
          return (l3 || ne2(e3, c3))(r3, t3, !C2, n3, !t3 || H2.test(e3) && U2(t3.parentNode) || t3), n3;
        }
        G2.prototype = b2.filters = b2.pseudos, b2.setFilters = new G2(), le.sortStable = S2.split("").sort(l2).join("") === S2, V2(), le.sortDetached = $2(function(e3) {
          return 1 & e3.compareDocumentPosition(T2.createElement("fieldset"));
        }), ce.find = I2, ce.expr[":"] = ce.expr.pseudos, ce.unique = ce.uniqueSort, I2.compile = ne2, I2.select = re2, I2.setDocument = V2, I2.tokenize = Y2, I2.escape = ce.escapeSelector, I2.getText = ce.text, I2.isXML = ce.isXMLDoc, I2.selectors = ce.expr, I2.support = ce.support, I2.uniqueSort = ce.uniqueSort;
      }();
      var d = function(e2, t2, n2) {
        var r2 = [], i2 = void 0 !== n2;
        while ((e2 = e2[t2]) && 9 !== e2.nodeType)
          if (1 === e2.nodeType) {
            if (i2 && ce(e2).is(n2)) break;
            r2.push(e2);
          }
        return r2;
      }, h = function(e2, t2) {
        for (var n2 = []; e2; e2 = e2.nextSibling) 1 === e2.nodeType && e2 !== t2 && n2.push(e2);
        return n2;
      }, b = ce.expr.match.needsContext, w = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function T(e2, n2, r2) {
        return v(n2) ? ce.grep(e2, function(e3, t2) {
          return !!n2.call(e3, t2, e3) !== r2;
        }) : n2.nodeType ? ce.grep(e2, function(e3) {
          return e3 === n2 !== r2;
        }) : "string" != typeof n2 ? ce.grep(e2, function(e3) {
          return -1 < se.call(n2, e3) !== r2;
        }) : ce.filter(n2, e2, r2);
      }
      ce.filter = function(e2, t2, n2) {
        var r2 = t2[0];
        return n2 && (e2 = ":not(" + e2 + ")"), 1 === t2.length && 1 === r2.nodeType ? ce.find.matchesSelector(r2, e2) ? [r2] : [] : ce.find.matches(
          e2,
          ce.grep(t2, function(e3) {
            return 1 === e3.nodeType;
          })
        );
      }, ce.fn.extend({
        find: function(e2) {
          var t2, n2, r2 = this.length, i2 = this;
          if ("string" != typeof e2)
            return this.pushStack(
              ce(e2).filter(function() {
                for (t2 = 0; t2 < r2; t2++) if (ce.contains(i2[t2], this)) return true;
              })
            );
          for (n2 = this.pushStack([]), t2 = 0; t2 < r2; t2++) ce.find(e2, i2[t2], n2);
          return 1 < r2 ? ce.uniqueSort(n2) : n2;
        },
        filter: function(e2) {
          return this.pushStack(T(this, e2 || [], false));
        },
        not: function(e2) {
          return this.pushStack(T(this, e2 || [], true));
        },
        is: function(e2) {
          return !!T(this, "string" == typeof e2 && b.test(e2) ? ce(e2) : e2 || [], false).length;
        }
      });
      var k, S = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
      (ce.fn.init = function(e2, t2, n2) {
        var r2, i2;
        if (!e2) return this;
        if (n2 = n2 || k, "string" == typeof e2) {
          if (!(r2 = "<" === e2[0] && ">" === e2[e2.length - 1] && 3 <= e2.length ? [null, e2, null] : S.exec(e2)) || !r2[1] && t2)
            return !t2 || t2.jquery ? (t2 || n2).find(e2) : this.constructor(t2).find(e2);
          if (r2[1]) {
            if (t2 = t2 instanceof ce ? t2[0] : t2, ce.merge(
              this,
              ce.parseHTML(r2[1], t2 && t2.nodeType ? t2.ownerDocument || t2 : C, true)
            ), w.test(r2[1]) && ce.isPlainObject(t2))
              for (r2 in t2) v(this[r2]) ? this[r2](t2[r2]) : this.attr(r2, t2[r2]);
            return this;
          }
          return (i2 = C.getElementById(r2[2])) && (this[0] = i2, this.length = 1), this;
        }
        return e2.nodeType ? (this[0] = e2, this.length = 1, this) : v(e2) ? void 0 !== n2.ready ? n2.ready(e2) : e2(ce) : ce.makeArray(e2, this);
      }).prototype = ce.fn, k = ce(C);
      var E = /^(?:parents|prev(?:Until|All))/, j = { children: true, contents: true, next: true, prev: true };
      function A(e2, t2) {
        while ((e2 = e2[t2]) && 1 !== e2.nodeType) ;
        return e2;
      }
      ce.fn.extend({
        has: function(e2) {
          var t2 = ce(e2, this), n2 = t2.length;
          return this.filter(function() {
            for (var e3 = 0; e3 < n2; e3++) if (ce.contains(this, t2[e3])) return true;
          });
        },
        closest: function(e2, t2) {
          var n2, r2 = 0, i2 = this.length, o2 = [], a2 = "string" != typeof e2 && ce(e2);
          if (!b.test(e2)) {
            for (; r2 < i2; r2++)
              for (n2 = this[r2]; n2 && n2 !== t2; n2 = n2.parentNode)
                if (n2.nodeType < 11 && (a2 ? -1 < a2.index(n2) : 1 === n2.nodeType && ce.find.matchesSelector(n2, e2))) {
                  o2.push(n2);
                  break;
                }
          }
          return this.pushStack(1 < o2.length ? ce.uniqueSort(o2) : o2);
        },
        index: function(e2) {
          return e2 ? "string" == typeof e2 ? se.call(ce(e2), this[0]) : se.call(this, e2.jquery ? e2[0] : e2) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        },
        add: function(e2, t2) {
          return this.pushStack(ce.uniqueSort(ce.merge(this.get(), ce(e2, t2))));
        },
        addBack: function(e2) {
          return this.add(null == e2 ? this.prevObject : this.prevObject.filter(e2));
        }
      }), ce.each(
        {
          parent: function(e2) {
            var t2 = e2.parentNode;
            return t2 && 11 !== t2.nodeType ? t2 : null;
          },
          parents: function(e2) {
            return d(e2, "parentNode");
          },
          parentsUntil: function(e2, t2, n2) {
            return d(e2, "parentNode", n2);
          },
          next: function(e2) {
            return A(e2, "nextSibling");
          },
          prev: function(e2) {
            return A(e2, "previousSibling");
          },
          nextAll: function(e2) {
            return d(e2, "nextSibling");
          },
          prevAll: function(e2) {
            return d(e2, "previousSibling");
          },
          nextUntil: function(e2, t2, n2) {
            return d(e2, "nextSibling", n2);
          },
          prevUntil: function(e2, t2, n2) {
            return d(e2, "previousSibling", n2);
          },
          siblings: function(e2) {
            return h((e2.parentNode || {}).firstChild, e2);
          },
          children: function(e2) {
            return h(e2.firstChild);
          },
          contents: function(e2) {
            return null != e2.contentDocument && r(e2.contentDocument) ? e2.contentDocument : (fe(e2, "template") && (e2 = e2.content || e2), ce.merge([], e2.childNodes));
          }
        },
        function(r2, i2) {
          ce.fn[r2] = function(e2, t2) {
            var n2 = ce.map(this, i2, e2);
            return "Until" !== r2.slice(-5) && (t2 = e2), t2 && "string" == typeof t2 && (n2 = ce.filter(t2, n2)), 1 < this.length && (j[r2] || ce.uniqueSort(n2), E.test(r2) && n2.reverse()), this.pushStack(n2);
          };
        }
      );
      var D = /[^\x20\t\r\n\f]+/g;
      function N(e2) {
        return e2;
      }
      function q(e2) {
        throw e2;
      }
      function L(e2, t2, n2, r2) {
        var i2;
        try {
          e2 && v(i2 = e2.promise) ? i2.call(e2).done(t2).fail(n2) : e2 && v(i2 = e2.then) ? i2.call(e2, t2, n2) : t2.apply(void 0, [e2].slice(r2));
        } catch (e3) {
          n2.apply(void 0, [e3]);
        }
      }
      ce.Callbacks = function(r2) {
        var e2, n2;
        r2 = "string" == typeof r2 ? (e2 = r2, n2 = {}, ce.each(e2.match(D) || [], function(e3, t3) {
          n2[t3] = true;
        }), n2) : ce.extend({}, r2);
        var i2, t2, o2, a2, s2 = [], u2 = [], l2 = -1, c2 = function() {
          for (a2 = a2 || r2.once, o2 = i2 = true; u2.length; l2 = -1) {
            t2 = u2.shift();
            while (++l2 < s2.length)
              false === s2[l2].apply(t2[0], t2[1]) && r2.stopOnFalse && (l2 = s2.length, t2 = false);
          }
          r2.memory || (t2 = false), i2 = false, a2 && (s2 = t2 ? [] : "");
        }, f2 = {
          add: function() {
            return s2 && (t2 && !i2 && (l2 = s2.length - 1, u2.push(t2)), function n3(e3) {
              ce.each(e3, function(e4, t3) {
                v(t3) ? r2.unique && f2.has(t3) || s2.push(t3) : t3 && t3.length && "string" !== x(t3) && n3(t3);
              });
            }(arguments), t2 && !i2 && c2()), this;
          },
          remove: function() {
            return ce.each(arguments, function(e3, t3) {
              var n3;
              while (-1 < (n3 = ce.inArray(t3, s2, n3))) s2.splice(n3, 1), n3 <= l2 && l2--;
            }), this;
          },
          has: function(e3) {
            return e3 ? -1 < ce.inArray(e3, s2) : 0 < s2.length;
          },
          empty: function() {
            return s2 && (s2 = []), this;
          },
          disable: function() {
            return a2 = u2 = [], s2 = t2 = "", this;
          },
          disabled: function() {
            return !s2;
          },
          lock: function() {
            return a2 = u2 = [], t2 || i2 || (s2 = t2 = ""), this;
          },
          locked: function() {
            return !!a2;
          },
          fireWith: function(e3, t3) {
            return a2 || (t3 = [e3, (t3 = t3 || []).slice ? t3.slice() : t3], u2.push(t3), i2 || c2()), this;
          },
          fire: function() {
            return f2.fireWith(this, arguments), this;
          },
          fired: function() {
            return !!o2;
          }
        };
        return f2;
      }, ce.extend({
        Deferred: function(e2) {
          var o2 = [
            ["notify", "progress", ce.Callbacks("memory"), ce.Callbacks("memory"), 2],
            [
              "resolve",
              "done",
              ce.Callbacks("once memory"),
              ce.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              ce.Callbacks("once memory"),
              ce.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], i2 = "pending", a2 = {
            state: function() {
              return i2;
            },
            always: function() {
              return s2.done(arguments).fail(arguments), this;
            },
            catch: function(e3) {
              return a2.then(null, e3);
            },
            pipe: function() {
              var i3 = arguments;
              return ce.Deferred(function(r2) {
                ce.each(o2, function(e3, t2) {
                  var n2 = v(i3[t2[4]]) && i3[t2[4]];
                  s2[t2[1]](function() {
                    var e4 = n2 && n2.apply(this, arguments);
                    e4 && v(e4.promise) ? e4.promise().progress(r2.notify).done(r2.resolve).fail(r2.reject) : r2[t2[0] + "With"](this, n2 ? [e4] : arguments);
                  });
                }), i3 = null;
              }).promise();
            },
            then: function(t2, n2, r2) {
              var u2 = 0;
              function l2(i3, o3, a3, s3) {
                return function() {
                  var n3 = this, r3 = arguments, e3 = function() {
                    var e4, t4;
                    if (!(i3 < u2)) {
                      if ((e4 = a3.apply(n3, r3)) === o3.promise())
                        throw new TypeError("Thenable self-resolution");
                      t4 = e4 && ("object" == typeof e4 || "function" == typeof e4) && e4.then, v(t4) ? s3 ? t4.call(
                        e4,
                        l2(u2, o3, N, s3),
                        l2(u2, o3, q, s3)
                      ) : (u2++, t4.call(
                        e4,
                        l2(u2, o3, N, s3),
                        l2(u2, o3, q, s3),
                        l2(u2, o3, N, o3.notifyWith)
                      )) : (a3 !== N && (n3 = void 0, r3 = [e4]), (s3 || o3.resolveWith)(n3, r3));
                    }
                  }, t3 = s3 ? e3 : function() {
                    try {
                      e3();
                    } catch (e4) {
                      ce.Deferred.exceptionHook && ce.Deferred.exceptionHook(e4, t3.error), u2 <= i3 + 1 && (a3 !== q && (n3 = void 0, r3 = [e4]), o3.rejectWith(n3, r3));
                    }
                  };
                  i3 ? t3() : (ce.Deferred.getErrorHook ? t3.error = ce.Deferred.getErrorHook() : ce.Deferred.getStackHook && (t3.error = ce.Deferred.getStackHook()), ie.setTimeout(t3));
                };
              }
              return ce.Deferred(function(e3) {
                o2[0][3].add(l2(0, e3, v(r2) ? r2 : N, e3.notifyWith)), o2[1][3].add(l2(0, e3, v(t2) ? t2 : N)), o2[2][3].add(l2(0, e3, v(n2) ? n2 : q));
              }).promise();
            },
            promise: function(e3) {
              return null != e3 ? ce.extend(e3, a2) : a2;
            }
          }, s2 = {};
          return ce.each(o2, function(e3, t2) {
            var n2 = t2[2], r2 = t2[5];
            a2[t2[1]] = n2.add, r2 && n2.add(
              function() {
                i2 = r2;
              },
              o2[3 - e3][2].disable,
              o2[3 - e3][3].disable,
              o2[0][2].lock,
              o2[0][3].lock
            ), n2.add(t2[3].fire), s2[t2[0]] = function() {
              return s2[t2[0] + "With"](this === s2 ? void 0 : this, arguments), this;
            }, s2[t2[0] + "With"] = n2.fireWith;
          }), a2.promise(s2), e2 && e2.call(s2, s2), s2;
        },
        when: function(e2) {
          var n2 = arguments.length, t2 = n2, r2 = Array(t2), i2 = ae.call(arguments), o2 = ce.Deferred(), a2 = function(t3) {
            return function(e3) {
              r2[t3] = this, i2[t3] = 1 < arguments.length ? ae.call(arguments) : e3, --n2 || o2.resolveWith(r2, i2);
            };
          };
          if (n2 <= 1 && (L(e2, o2.done(a2(t2)).resolve, o2.reject, !n2), "pending" === o2.state() || v(i2[t2] && i2[t2].then)))
            return o2.then();
          while (t2--) L(i2[t2], a2(t2), o2.reject);
          return o2.promise();
        }
      });
      var H = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      ce.Deferred.exceptionHook = function(e2, t2) {
        ie.console && ie.console.warn && e2 && H.test(e2.name) && ie.console.warn("jQuery.Deferred exception: " + e2.message, e2.stack, t2);
      }, ce.readyException = function(e2) {
        ie.setTimeout(function() {
          throw e2;
        });
      };
      var O = ce.Deferred();
      function P() {
        C.removeEventListener("DOMContentLoaded", P), ie.removeEventListener("load", P), ce.ready();
      }
      ce.fn.ready = function(e2) {
        return O.then(e2)["catch"](function(e3) {
          ce.readyException(e3);
        }), this;
      }, ce.extend({
        isReady: false,
        readyWait: 1,
        ready: function(e2) {
          (true === e2 ? --ce.readyWait : ce.isReady) || (ce.isReady = true) !== e2 && 0 < --ce.readyWait || O.resolveWith(C, [ce]);
        }
      }), ce.ready.then = O.then, "complete" === C.readyState || "loading" !== C.readyState && !C.documentElement.doScroll ? ie.setTimeout(ce.ready) : (C.addEventListener("DOMContentLoaded", P), ie.addEventListener("load", P));
      var M = function(e2, t2, n2, r2, i2, o2, a2) {
        var s2 = 0, u2 = e2.length, l2 = null == n2;
        if ("object" === x(n2)) for (s2 in i2 = true, n2) M(e2, t2, s2, n2[s2], true, o2, a2);
        else if (void 0 !== r2 && (i2 = true, v(r2) || (a2 = true), l2 && (a2 ? (t2.call(e2, r2), t2 = null) : (l2 = t2, t2 = function(e3, t3, n3) {
          return l2.call(ce(e3), n3);
        })), t2))
          for (; s2 < u2; s2++) t2(e2[s2], n2, a2 ? r2 : r2.call(e2[s2], s2, t2(e2[s2], n2)));
        return i2 ? e2 : l2 ? t2.call(e2) : u2 ? t2(e2[0], n2) : o2;
      }, R = /^-ms-/, I = /-([a-z])/g;
      function W(e2, t2) {
        return t2.toUpperCase();
      }
      function F(e2) {
        return e2.replace(R, "ms-").replace(I, W);
      }
      var $ = function(e2) {
        return 1 === e2.nodeType || 9 === e2.nodeType || !+e2.nodeType;
      };
      function B() {
        this.expando = ce.expando + B.uid++;
      }
      B.uid = 1, B.prototype = {
        cache: function(e2) {
          var t2 = e2[this.expando];
          return t2 || (t2 = {}, $(e2) && (e2.nodeType ? e2[this.expando] = t2 : Object.defineProperty(e2, this.expando, {
            value: t2,
            configurable: true
          }))), t2;
        },
        set: function(e2, t2, n2) {
          var r2, i2 = this.cache(e2);
          if ("string" == typeof t2) i2[F(t2)] = n2;
          else for (r2 in t2) i2[F(r2)] = t2[r2];
          return i2;
        },
        get: function(e2, t2) {
          return void 0 === t2 ? this.cache(e2) : e2[this.expando] && e2[this.expando][F(t2)];
        },
        access: function(e2, t2, n2) {
          return void 0 === t2 || t2 && "string" == typeof t2 && void 0 === n2 ? this.get(e2, t2) : (this.set(e2, t2, n2), void 0 !== n2 ? n2 : t2);
        },
        remove: function(e2, t2) {
          var n2, r2 = e2[this.expando];
          if (void 0 !== r2) {
            if (void 0 !== t2) {
              n2 = (t2 = Array.isArray(t2) ? t2.map(F) : (t2 = F(t2)) in r2 ? [t2] : t2.match(D) || []).length;
              while (n2--) delete r2[t2[n2]];
            }
            (void 0 === t2 || ce.isEmptyObject(r2)) && (e2.nodeType ? e2[this.expando] = void 0 : delete e2[this.expando]);
          }
        },
        hasData: function(e2) {
          var t2 = e2[this.expando];
          return void 0 !== t2 && !ce.isEmptyObject(t2);
        }
      };
      var _ = new B(), z = new B(), X = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, U = /[A-Z]/g;
      function V(e2, t2, n2) {
        var r2, i2;
        if (void 0 === n2 && 1 === e2.nodeType)
          if (r2 = "data-" + t2.replace(U, "-$&").toLowerCase(), "string" == typeof (n2 = e2.getAttribute(r2))) {
            try {
              n2 = "true" === (i2 = n2) || "false" !== i2 && ("null" === i2 ? null : i2 === +i2 + "" ? +i2 : X.test(i2) ? JSON.parse(i2) : i2);
            } catch (e3) {
            }
            z.set(e2, t2, n2);
          } else n2 = void 0;
        return n2;
      }
      ce.extend({
        hasData: function(e2) {
          return z.hasData(e2) || _.hasData(e2);
        },
        data: function(e2, t2, n2) {
          return z.access(e2, t2, n2);
        },
        removeData: function(e2, t2) {
          z.remove(e2, t2);
        },
        _data: function(e2, t2, n2) {
          return _.access(e2, t2, n2);
        },
        _removeData: function(e2, t2) {
          _.remove(e2, t2);
        }
      }), ce.fn.extend({
        data: function(n2, e2) {
          var t2, r2, i2, o2 = this[0], a2 = o2 && o2.attributes;
          if (void 0 === n2) {
            if (this.length && (i2 = z.get(o2), 1 === o2.nodeType && !_.get(o2, "hasDataAttrs"))) {
              t2 = a2.length;
              while (t2--)
                a2[t2] && 0 === (r2 = a2[t2].name).indexOf("data-") && (r2 = F(r2.slice(5)), V(o2, r2, i2[r2]));
              _.set(o2, "hasDataAttrs", true);
            }
            return i2;
          }
          return "object" == typeof n2 ? this.each(function() {
            z.set(this, n2);
          }) : M(
            this,
            function(e3) {
              var t3;
              if (o2 && void 0 === e3)
                return void 0 !== (t3 = z.get(o2, n2)) ? t3 : void 0 !== (t3 = V(o2, n2)) ? t3 : void 0;
              this.each(function() {
                z.set(this, n2, e3);
              });
            },
            null,
            e2,
            1 < arguments.length,
            null,
            true
          );
        },
        removeData: function(e2) {
          return this.each(function() {
            z.remove(this, e2);
          });
        }
      }), ce.extend({
        queue: function(e2, t2, n2) {
          var r2;
          if (e2)
            return t2 = (t2 || "fx") + "queue", r2 = _.get(e2, t2), n2 && (!r2 || Array.isArray(n2) ? r2 = _.access(e2, t2, ce.makeArray(n2)) : r2.push(n2)), r2 || [];
        },
        dequeue: function(e2, t2) {
          t2 = t2 || "fx";
          var n2 = ce.queue(e2, t2), r2 = n2.length, i2 = n2.shift(), o2 = ce._queueHooks(e2, t2);
          "inprogress" === i2 && (i2 = n2.shift(), r2--), i2 && ("fx" === t2 && n2.unshift("inprogress"), delete o2.stop, i2.call(
            e2,
            function() {
              ce.dequeue(e2, t2);
            },
            o2
          )), !r2 && o2 && o2.empty.fire();
        },
        _queueHooks: function(e2, t2) {
          var n2 = t2 + "queueHooks";
          return _.get(e2, n2) || _.access(e2, n2, {
            empty: ce.Callbacks("once memory").add(function() {
              _.remove(e2, [t2 + "queue", n2]);
            })
          });
        }
      }), ce.fn.extend({
        queue: function(t2, n2) {
          var e2 = 2;
          return "string" != typeof t2 && (n2 = t2, t2 = "fx", e2--), arguments.length < e2 ? ce.queue(this[0], t2) : void 0 === n2 ? this : this.each(function() {
            var e3 = ce.queue(this, t2, n2);
            ce._queueHooks(this, t2), "fx" === t2 && "inprogress" !== e3[0] && ce.dequeue(this, t2);
          });
        },
        dequeue: function(e2) {
          return this.each(function() {
            ce.dequeue(this, e2);
          });
        },
        clearQueue: function(e2) {
          return this.queue(e2 || "fx", []);
        },
        promise: function(e2, t2) {
          var n2, r2 = 1, i2 = ce.Deferred(), o2 = this, a2 = this.length, s2 = function() {
            --r2 || i2.resolveWith(o2, [o2]);
          };
          "string" != typeof e2 && (t2 = e2, e2 = void 0), e2 = e2 || "fx";
          while (a2--) (n2 = _.get(o2[a2], e2 + "queueHooks")) && n2.empty && (r2++, n2.empty.add(s2));
          return s2(), i2.promise(t2);
        }
      });
      var G = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Y = new RegExp("^(?:([+-])=|)(" + G + ")([a-z%]*)$", "i"), Q = ["Top", "Right", "Bottom", "Left"], J = C.documentElement, K = function(e2) {
        return ce.contains(e2.ownerDocument, e2);
      }, Z = { composed: true };
      J.getRootNode && (K = function(e2) {
        return ce.contains(e2.ownerDocument, e2) || e2.getRootNode(Z) === e2.ownerDocument;
      });
      var ee = function(e2, t2) {
        return "none" === (e2 = t2 || e2).style.display || "" === e2.style.display && K(e2) && "none" === ce.css(e2, "display");
      };
      function te(e2, t2, n2, r2) {
        var i2, o2, a2 = 20, s2 = r2 ? function() {
          return r2.cur();
        } : function() {
          return ce.css(e2, t2, "");
        }, u2 = s2(), l2 = n2 && n2[3] || (ce.cssNumber[t2] ? "" : "px"), c2 = e2.nodeType && (ce.cssNumber[t2] || "px" !== l2 && +u2) && Y.exec(ce.css(e2, t2));
        if (c2 && c2[3] !== l2) {
          u2 /= 2, l2 = l2 || c2[3], c2 = +u2 || 1;
          while (a2--)
            ce.style(e2, t2, c2 + l2), (1 - o2) * (1 - (o2 = s2() / u2 || 0.5)) <= 0 && (a2 = 0), c2 /= o2;
          c2 *= 2, ce.style(e2, t2, c2 + l2), n2 = n2 || [];
        }
        return n2 && (c2 = +c2 || +u2 || 0, i2 = n2[1] ? c2 + (n2[1] + 1) * n2[2] : +n2[2], r2 && (r2.unit = l2, r2.start = c2, r2.end = i2)), i2;
      }
      var ne = {};
      function re(e2, t2) {
        for (var n2, r2, i2, o2, a2, s2, u2, l2 = [], c2 = 0, f2 = e2.length; c2 < f2; c2++)
          (r2 = e2[c2]).style && (n2 = r2.style.display, t2 ? ("none" === n2 && (l2[c2] = _.get(r2, "display") || null, l2[c2] || (r2.style.display = "")), "" === r2.style.display && ee(r2) && (l2[c2] = (u2 = a2 = o2 = void 0, a2 = (i2 = r2).ownerDocument, s2 = i2.nodeName, (u2 = ne[s2]) || (o2 = a2.body.appendChild(a2.createElement(s2)), u2 = ce.css(o2, "display"), o2.parentNode.removeChild(o2), "none" === u2 && (u2 = "block"), ne[s2] = u2)))) : "none" !== n2 && (l2[c2] = "none", _.set(r2, "display", n2)));
        for (c2 = 0; c2 < f2; c2++) null != l2[c2] && (e2[c2].style.display = l2[c2]);
        return e2;
      }
      ce.fn.extend({
        show: function() {
          return re(this, true);
        },
        hide: function() {
          return re(this);
        },
        toggle: function(e2) {
          return "boolean" == typeof e2 ? e2 ? this.show() : this.hide() : this.each(function() {
            ee(this) ? ce(this).show() : ce(this).hide();
          });
        }
      });
      var xe, be, we = /^(?:checkbox|radio)$/i, Te = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, Ce = /^$|^module$|\/(?:java|ecma)script/i;
      xe = C.createDocumentFragment().appendChild(C.createElement("div")), (be = C.createElement("input")).setAttribute("type", "radio"), be.setAttribute("checked", "checked"), be.setAttribute("name", "t"), xe.appendChild(be), le.checkClone = xe.cloneNode(true).cloneNode(true).lastChild.checked, xe.innerHTML = "<textarea>x</textarea>", le.noCloneChecked = !!xe.cloneNode(true).lastChild.defaultValue, xe.innerHTML = "<option></option>", le.option = !!xe.lastChild;
      var ke = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      function Se(e2, t2) {
        var n2;
        return n2 = "undefined" != typeof e2.getElementsByTagName ? e2.getElementsByTagName(t2 || "*") : "undefined" != typeof e2.querySelectorAll ? e2.querySelectorAll(t2 || "*") : [], void 0 === t2 || t2 && fe(e2, t2) ? ce.merge([e2], n2) : n2;
      }
      function Ee(e2, t2) {
        for (var n2 = 0, r2 = e2.length; n2 < r2; n2++)
          _.set(e2[n2], "globalEval", !t2 || _.get(t2[n2], "globalEval"));
      }
      ke.tbody = ke.tfoot = ke.colgroup = ke.caption = ke.thead, ke.th = ke.td, le.option || (ke.optgroup = ke.option = [1, "<select multiple='multiple'>", "</select>"]);
      var je = /<|&#?\w+;/;
      function Ae(e2, t2, n2, r2, i2) {
        for (var o2, a2, s2, u2, l2, c2, f2 = t2.createDocumentFragment(), p2 = [], d2 = 0, h2 = e2.length; d2 < h2; d2++)
          if ((o2 = e2[d2]) || 0 === o2)
            if ("object" === x(o2)) ce.merge(p2, o2.nodeType ? [o2] : o2);
            else if (je.test(o2)) {
              a2 = a2 || f2.appendChild(t2.createElement("div")), s2 = (Te.exec(o2) || ["", ""])[1].toLowerCase(), u2 = ke[s2] || ke._default, a2.innerHTML = u2[1] + ce.htmlPrefilter(o2) + u2[2], c2 = u2[0];
              while (c2--) a2 = a2.lastChild;
              ce.merge(p2, a2.childNodes), (a2 = f2.firstChild).textContent = "";
            } else p2.push(t2.createTextNode(o2));
        f2.textContent = "", d2 = 0;
        while (o2 = p2[d2++])
          if (r2 && -1 < ce.inArray(o2, r2)) i2 && i2.push(o2);
          else if (l2 = K(o2), a2 = Se(f2.appendChild(o2), "script"), l2 && Ee(a2), n2) {
            c2 = 0;
            while (o2 = a2[c2++]) Ce.test(o2.type || "") && n2.push(o2);
          }
        return f2;
      }
      var De = /^([^.]*)(?:\.(.+)|)/;
      function Ne() {
        return true;
      }
      function qe() {
        return false;
      }
      function Le(e2, t2, n2, r2, i2, o2) {
        var a2, s2;
        if ("object" == typeof t2) {
          for (s2 in "string" != typeof n2 && (r2 = r2 || n2, n2 = void 0), t2)
            Le(e2, s2, n2, r2, t2[s2], o2);
          return e2;
        }
        if (null == r2 && null == i2 ? (i2 = n2, r2 = n2 = void 0) : null == i2 && ("string" == typeof n2 ? (i2 = r2, r2 = void 0) : (i2 = r2, r2 = n2, n2 = void 0)), false === i2)
          i2 = qe;
        else if (!i2) return e2;
        return 1 === o2 && (a2 = i2, (i2 = function(e3) {
          return ce().off(e3), a2.apply(this, arguments);
        }).guid = a2.guid || (a2.guid = ce.guid++)), e2.each(function() {
          ce.event.add(this, t2, i2, r2, n2);
        });
      }
      function He(e2, r2, t2) {
        t2 ? (_.set(e2, r2, false), ce.event.add(e2, r2, {
          namespace: false,
          handler: function(e3) {
            var t3, n2 = _.get(this, r2);
            if (1 & e3.isTrigger && this[r2]) {
              if (n2) (ce.event.special[r2] || {}).delegateType && e3.stopPropagation();
              else if (n2 = ae.call(arguments), _.set(this, r2, n2), this[r2](), t3 = _.get(this, r2), _.set(this, r2, false), n2 !== t3)
                return e3.stopImmediatePropagation(), e3.preventDefault(), t3;
            } else
              n2 && (_.set(this, r2, ce.event.trigger(n2[0], n2.slice(1), this)), e3.stopPropagation(), e3.isImmediatePropagationStopped = Ne);
          }
        })) : void 0 === _.get(e2, r2) && ce.event.add(e2, r2, Ne);
      }
      ce.event = {
        global: {},
        add: function(t2, e2, n2, r2, i2) {
          var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = _.get(t2);
          if ($(t2)) {
            n2.handler && (n2 = (o2 = n2).handler, i2 = o2.selector), i2 && ce.find.matchesSelector(J, i2), n2.guid || (n2.guid = ce.guid++), (u2 = v2.events) || (u2 = v2.events = /* @__PURE__ */ Object.create(null)), (a2 = v2.handle) || (a2 = v2.handle = function(e3) {
              return "undefined" != typeof ce && ce.event.triggered !== e3.type ? ce.event.dispatch.apply(t2, arguments) : void 0;
            }), l2 = (e2 = (e2 || "").match(D) || [""]).length;
            while (l2--)
              d2 = g2 = (s2 = De.exec(e2[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), d2 && (f2 = ce.event.special[d2] || {}, d2 = (i2 ? f2.delegateType : f2.bindType) || d2, f2 = ce.event.special[d2] || {}, c2 = ce.extend(
                {
                  type: d2,
                  origType: g2,
                  data: r2,
                  handler: n2,
                  guid: n2.guid,
                  selector: i2,
                  needsContext: i2 && ce.expr.match.needsContext.test(i2),
                  namespace: h2.join(".")
                },
                o2
              ), (p2 = u2[d2]) || ((p2 = u2[d2] = []).delegateCount = 0, f2.setup && false !== f2.setup.call(t2, r2, h2, a2) || t2.addEventListener && t2.addEventListener(d2, a2)), f2.add && (f2.add.call(t2, c2), c2.handler.guid || (c2.handler.guid = n2.guid)), i2 ? p2.splice(p2.delegateCount++, 0, c2) : p2.push(c2), ce.event.global[d2] = true);
          }
        },
        remove: function(e2, t2, n2, r2, i2) {
          var o2, a2, s2, u2, l2, c2, f2, p2, d2, h2, g2, v2 = _.hasData(e2) && _.get(e2);
          if (v2 && (u2 = v2.events)) {
            l2 = (t2 = (t2 || "").match(D) || [""]).length;
            while (l2--)
              if (d2 = g2 = (s2 = De.exec(t2[l2]) || [])[1], h2 = (s2[2] || "").split(".").sort(), d2) {
                f2 = ce.event.special[d2] || {}, p2 = u2[d2 = (r2 ? f2.delegateType : f2.bindType) || d2] || [], s2 = s2[2] && new RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)"), a2 = o2 = p2.length;
                while (o2--)
                  c2 = p2[o2], !i2 && g2 !== c2.origType || n2 && n2.guid !== c2.guid || s2 && !s2.test(c2.namespace) || r2 && r2 !== c2.selector && ("**" !== r2 || !c2.selector) || (p2.splice(o2, 1), c2.selector && p2.delegateCount--, f2.remove && f2.remove.call(e2, c2));
                a2 && !p2.length && (f2.teardown && false !== f2.teardown.call(e2, h2, v2.handle) || ce.removeEvent(e2, d2, v2.handle), delete u2[d2]);
              } else for (d2 in u2) ce.event.remove(e2, d2 + t2[l2], n2, r2, true);
            ce.isEmptyObject(u2) && _.remove(e2, "handle events");
          }
        },
        dispatch: function(e2) {
          var t2, n2, r2, i2, o2, a2, s2 = new Array(arguments.length), u2 = ce.event.fix(e2), l2 = (_.get(this, "events") || /* @__PURE__ */ Object.create(null))[u2.type] || [], c2 = ce.event.special[u2.type] || {};
          for (s2[0] = u2, t2 = 1; t2 < arguments.length; t2++) s2[t2] = arguments[t2];
          if (u2.delegateTarget = this, !c2.preDispatch || false !== c2.preDispatch.call(this, u2)) {
            a2 = ce.event.handlers.call(this, u2, l2), t2 = 0;
            while ((i2 = a2[t2++]) && !u2.isPropagationStopped()) {
              u2.currentTarget = i2.elem, n2 = 0;
              while ((o2 = i2.handlers[n2++]) && !u2.isImmediatePropagationStopped())
                u2.rnamespace && false !== o2.namespace && !u2.rnamespace.test(o2.namespace) || (u2.handleObj = o2, u2.data = o2.data, void 0 !== (r2 = ((ce.event.special[o2.origType] || {}).handle || o2.handler).apply(i2.elem, s2)) && false === (u2.result = r2) && (u2.preventDefault(), u2.stopPropagation()));
            }
            return c2.postDispatch && c2.postDispatch.call(this, u2), u2.result;
          }
        },
        handlers: function(e2, t2) {
          var n2, r2, i2, o2, a2, s2 = [], u2 = t2.delegateCount, l2 = e2.target;
          if (u2 && l2.nodeType && !("click" === e2.type && 1 <= e2.button)) {
            for (; l2 !== this; l2 = l2.parentNode || this)
              if (1 === l2.nodeType && ("click" !== e2.type || true !== l2.disabled)) {
                for (o2 = [], a2 = {}, n2 = 0; n2 < u2; n2++)
                  void 0 === a2[i2 = (r2 = t2[n2]).selector + " "] && (a2[i2] = r2.needsContext ? -1 < ce(i2, this).index(l2) : ce.find(i2, this, null, [l2]).length), a2[i2] && o2.push(r2);
                o2.length && s2.push({ elem: l2, handlers: o2 });
              }
          }
          return l2 = this, u2 < t2.length && s2.push({ elem: l2, handlers: t2.slice(u2) }), s2;
        },
        addProp: function(t2, e2) {
          Object.defineProperty(ce.Event.prototype, t2, {
            enumerable: true,
            configurable: true,
            get: v(e2) ? function() {
              if (this.originalEvent) return e2(this.originalEvent);
            } : function() {
              if (this.originalEvent) return this.originalEvent[t2];
            },
            set: function(e3) {
              Object.defineProperty(this, t2, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: e3
              });
            }
          });
        },
        fix: function(e2) {
          return e2[ce.expando] ? e2 : new ce.Event(e2);
        },
        special: {
          load: { noBubble: true },
          click: {
            setup: function(e2) {
              var t2 = this || e2;
              return we.test(t2.type) && t2.click && fe(t2, "input") && He(t2, "click", true), false;
            },
            trigger: function(e2) {
              var t2 = this || e2;
              return we.test(t2.type) && t2.click && fe(t2, "input") && He(t2, "click"), true;
            },
            _default: function(e2) {
              var t2 = e2.target;
              return we.test(t2.type) && t2.click && fe(t2, "input") && _.get(t2, "click") || fe(t2, "a");
            }
          },
          beforeunload: {
            postDispatch: function(e2) {
              void 0 !== e2.result && e2.originalEvent && (e2.originalEvent.returnValue = e2.result);
            }
          }
        }
      }, ce.removeEvent = function(e2, t2, n2) {
        e2.removeEventListener && e2.removeEventListener(t2, n2);
      }, ce.Event = function(e2, t2) {
        if (!(this instanceof ce.Event)) return new ce.Event(e2, t2);
        e2 && e2.type ? (this.originalEvent = e2, this.type = e2.type, this.isDefaultPrevented = e2.defaultPrevented || void 0 === e2.defaultPrevented && false === e2.returnValue ? Ne : qe, this.target = e2.target && 3 === e2.target.nodeType ? e2.target.parentNode : e2.target, this.currentTarget = e2.currentTarget, this.relatedTarget = e2.relatedTarget) : this.type = e2, t2 && ce.extend(this, t2), this.timeStamp = e2 && e2.timeStamp || Date.now(), this[ce.expando] = true;
      }, ce.Event.prototype = {
        constructor: ce.Event,
        isDefaultPrevented: qe,
        isPropagationStopped: qe,
        isImmediatePropagationStopped: qe,
        isSimulated: false,
        preventDefault: function() {
          var e2 = this.originalEvent;
          this.isDefaultPrevented = Ne, e2 && !this.isSimulated && e2.preventDefault();
        },
        stopPropagation: function() {
          var e2 = this.originalEvent;
          this.isPropagationStopped = Ne, e2 && !this.isSimulated && e2.stopPropagation();
        },
        stopImmediatePropagation: function() {
          var e2 = this.originalEvent;
          this.isImmediatePropagationStopped = Ne, e2 && !this.isSimulated && e2.stopImmediatePropagation(), this.stopPropagation();
        }
      }, ce.each(
        {
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          char: true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        },
        ce.event.addProp
      ), ce.each({ focus: "focusin", blur: "focusout" }, function(r2, i2) {
        function o2(e2) {
          if (C.documentMode) {
            var t2 = _.get(this, "handle"), n2 = ce.event.fix(e2);
            n2.type = "focusin" === e2.type ? "focus" : "blur", n2.isSimulated = true, t2(e2), n2.target === n2.currentTarget && t2(n2);
          } else ce.event.simulate(i2, e2.target, ce.event.fix(e2));
        }
        ce.event.special[r2] = {
          setup: function() {
            var e2;
            if (He(this, r2, true), !C.documentMode) return false;
            (e2 = _.get(this, i2)) || this.addEventListener(i2, o2), _.set(this, i2, (e2 || 0) + 1);
          },
          trigger: function() {
            return He(this, r2), true;
          },
          teardown: function() {
            var e2;
            if (!C.documentMode) return false;
            (e2 = _.get(this, i2) - 1) ? _.set(this, i2, e2) : (this.removeEventListener(i2, o2), _.remove(this, i2));
          },
          _default: function(e2) {
            return _.get(e2.target, r2);
          },
          delegateType: i2
        }, ce.event.special[i2] = {
          setup: function() {
            var e2 = this.ownerDocument || this.document || this, t2 = C.documentMode ? this : e2, n2 = _.get(t2, i2);
            n2 || (C.documentMode ? this.addEventListener(i2, o2) : e2.addEventListener(r2, o2, true)), _.set(t2, i2, (n2 || 0) + 1);
          },
          teardown: function() {
            var e2 = this.ownerDocument || this.document || this, t2 = C.documentMode ? this : e2, n2 = _.get(t2, i2) - 1;
            n2 ? _.set(t2, i2, n2) : (C.documentMode ? this.removeEventListener(i2, o2) : e2.removeEventListener(r2, o2, true), _.remove(t2, i2));
          }
        };
      }), ce.each(
        {
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        },
        function(e2, i2) {
          ce.event.special[e2] = {
            delegateType: i2,
            bindType: i2,
            handle: function(e3) {
              var t2, n2 = e3.relatedTarget, r2 = e3.handleObj;
              return n2 && (n2 === this || ce.contains(this, n2)) || (e3.type = r2.origType, t2 = r2.handler.apply(this, arguments), e3.type = i2), t2;
            }
          };
        }
      ), ce.fn.extend({
        on: function(e2, t2, n2, r2) {
          return Le(this, e2, t2, n2, r2);
        },
        one: function(e2, t2, n2, r2) {
          return Le(this, e2, t2, n2, r2, 1);
        },
        off: function(e2, t2, n2) {
          var r2, i2;
          if (e2 && e2.preventDefault && e2.handleObj)
            return r2 = e2.handleObj, ce(e2.delegateTarget).off(
              r2.namespace ? r2.origType + "." + r2.namespace : r2.origType,
              r2.selector,
              r2.handler
            ), this;
          if ("object" == typeof e2) {
            for (i2 in e2) this.off(i2, t2, e2[i2]);
            return this;
          }
          return false !== t2 && "function" != typeof t2 || (n2 = t2, t2 = void 0), false === n2 && (n2 = qe), this.each(function() {
            ce.event.remove(this, e2, n2, t2);
          });
        }
      });
      var Oe = /<script|<style|<link/i, Pe = /checked\s*(?:[^=]|=\s*.checked.)/i, Me = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function Re(e2, t2) {
        return fe(e2, "table") && fe(11 !== t2.nodeType ? t2 : t2.firstChild, "tr") && ce(e2).children("tbody")[0] || e2;
      }
      function Ie(e2) {
        return e2.type = (null !== e2.getAttribute("type")) + "/" + e2.type, e2;
      }
      function We(e2) {
        return "true/" === (e2.type || "").slice(0, 5) ? e2.type = e2.type.slice(5) : e2.removeAttribute("type"), e2;
      }
      function Fe(e2, t2) {
        var n2, r2, i2, o2, a2, s2;
        if (1 === t2.nodeType) {
          if (_.hasData(e2) && (s2 = _.get(e2).events))
            for (i2 in _.remove(t2, "handle events"), s2)
              for (n2 = 0, r2 = s2[i2].length; n2 < r2; n2++) ce.event.add(t2, i2, s2[i2][n2]);
          z.hasData(e2) && (o2 = z.access(e2), a2 = ce.extend({}, o2), z.set(t2, a2));
        }
      }
      function $e(n2, r2, i2, o2) {
        r2 = g(r2);
        var e2, t2, a2, s2, u2, l2, c2 = 0, f2 = n2.length, p2 = f2 - 1, d2 = r2[0], h2 = v(d2);
        if (h2 || 1 < f2 && "string" == typeof d2 && !le.checkClone && Pe.test(d2))
          return n2.each(function(e3) {
            var t3 = n2.eq(e3);
            h2 && (r2[0] = d2.call(this, e3, t3.html())), $e(t3, r2, i2, o2);
          });
        if (f2 && (t2 = (e2 = Ae(r2, n2[0].ownerDocument, false, n2, o2)).firstChild, 1 === e2.childNodes.length && (e2 = t2), t2 || o2)) {
          for (s2 = (a2 = ce.map(Se(e2, "script"), Ie)).length; c2 < f2; c2++)
            u2 = e2, c2 !== p2 && (u2 = ce.clone(u2, true, true), s2 && ce.merge(a2, Se(u2, "script"))), i2.call(n2[c2], u2, c2);
          if (s2)
            for (l2 = a2[a2.length - 1].ownerDocument, ce.map(a2, We), c2 = 0; c2 < s2; c2++)
              u2 = a2[c2], Ce.test(u2.type || "") && !_.access(u2, "globalEval") && ce.contains(l2, u2) && (u2.src && "module" !== (u2.type || "").toLowerCase() ? ce._evalUrl && !u2.noModule && ce._evalUrl(
                u2.src,
                { nonce: u2.nonce || u2.getAttribute("nonce") },
                l2
              ) : m(u2.textContent.replace(Me, ""), u2, l2));
        }
        return n2;
      }
      function Be(e2, t2, n2) {
        for (var r2, i2 = t2 ? ce.filter(t2, e2) : e2, o2 = 0; null != (r2 = i2[o2]); o2++)
          n2 || 1 !== r2.nodeType || ce.cleanData(Se(r2)), r2.parentNode && (n2 && K(r2) && Ee(Se(r2, "script")), r2.parentNode.removeChild(r2));
        return e2;
      }
      ce.extend({
        htmlPrefilter: function(e2) {
          return e2;
        },
        clone: function(e2, t2, n2) {
          var r2, i2, o2, a2, s2, u2, l2, c2 = e2.cloneNode(true), f2 = K(e2);
          if (!(le.noCloneChecked || 1 !== e2.nodeType && 11 !== e2.nodeType || ce.isXMLDoc(e2)))
            for (a2 = Se(c2), r2 = 0, i2 = (o2 = Se(e2)).length; r2 < i2; r2++)
              s2 = o2[r2], u2 = a2[r2], "input" === (l2 = u2.nodeName.toLowerCase()) && we.test(s2.type) ? u2.checked = s2.checked : "input" !== l2 && "textarea" !== l2 || (u2.defaultValue = s2.defaultValue);
          if (t2)
            if (n2)
              for (o2 = o2 || Se(e2), a2 = a2 || Se(c2), r2 = 0, i2 = o2.length; r2 < i2; r2++)
                Fe(o2[r2], a2[r2]);
            else Fe(e2, c2);
          return 0 < (a2 = Se(c2, "script")).length && Ee(a2, !f2 && Se(e2, "script")), c2;
        },
        cleanData: function(e2) {
          for (var t2, n2, r2, i2 = ce.event.special, o2 = 0; void 0 !== (n2 = e2[o2]); o2++)
            if ($(n2)) {
              if (t2 = n2[_.expando]) {
                if (t2.events)
                  for (r2 in t2.events)
                    i2[r2] ? ce.event.remove(n2, r2) : ce.removeEvent(n2, r2, t2.handle);
                n2[_.expando] = void 0;
              }
              n2[z.expando] && (n2[z.expando] = void 0);
            }
        }
      }), ce.fn.extend({
        detach: function(e2) {
          return Be(this, e2, true);
        },
        remove: function(e2) {
          return Be(this, e2);
        },
        text: function(e2) {
          return M(
            this,
            function(e3) {
              return void 0 === e3 ? ce.text(this) : this.empty().each(function() {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e3);
              });
            },
            null,
            e2,
            arguments.length
          );
        },
        append: function() {
          return $e(this, arguments, function(e2) {
            1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || Re(this, e2).appendChild(e2);
          });
        },
        prepend: function() {
          return $e(this, arguments, function(e2) {
            if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
              var t2 = Re(this, e2);
              t2.insertBefore(e2, t2.firstChild);
            }
          });
        },
        before: function() {
          return $e(this, arguments, function(e2) {
            this.parentNode && this.parentNode.insertBefore(e2, this);
          });
        },
        after: function() {
          return $e(this, arguments, function(e2) {
            this.parentNode && this.parentNode.insertBefore(e2, this.nextSibling);
          });
        },
        empty: function() {
          for (var e2, t2 = 0; null != (e2 = this[t2]); t2++)
            1 === e2.nodeType && (ce.cleanData(Se(e2, false)), e2.textContent = "");
          return this;
        },
        clone: function(e2, t2) {
          return e2 = null != e2 && e2, t2 = null == t2 ? e2 : t2, this.map(function() {
            return ce.clone(this, e2, t2);
          });
        },
        html: function(e2) {
          return M(
            this,
            function(e3) {
              var t2 = this[0] || {}, n2 = 0, r2 = this.length;
              if (void 0 === e3 && 1 === t2.nodeType) return t2.innerHTML;
              if ("string" == typeof e3 && !Oe.test(e3) && !ke[(Te.exec(e3) || ["", ""])[1].toLowerCase()]) {
                e3 = ce.htmlPrefilter(e3);
                try {
                  for (; n2 < r2; n2++)
                    1 === (t2 = this[n2] || {}).nodeType && (ce.cleanData(Se(t2, false)), t2.innerHTML = e3);
                  t2 = 0;
                } catch (e4) {
                }
              }
              t2 && this.empty().append(e3);
            },
            null,
            e2,
            arguments.length
          );
        },
        replaceWith: function() {
          var n2 = [];
          return $e(
            this,
            arguments,
            function(e2) {
              var t2 = this.parentNode;
              ce.inArray(this, n2) < 0 && (ce.cleanData(Se(this)), t2 && t2.replaceChild(e2, this));
            },
            n2
          );
        }
      }), ce.each(
        {
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        },
        function(e2, a2) {
          ce.fn[e2] = function(e3) {
            for (var t2, n2 = [], r2 = ce(e3), i2 = r2.length - 1, o2 = 0; o2 <= i2; o2++)
              t2 = o2 === i2 ? this : this.clone(true), ce(r2[o2])[a2](t2), s.apply(n2, t2.get());
            return this.pushStack(n2);
          };
        }
      );
      var _e = new RegExp("^(" + G + ")(?!px)[a-z%]+$", "i"), ze = /^--/, Xe = function(e2) {
        var t2 = e2.ownerDocument.defaultView;
        return t2 && t2.opener || (t2 = ie), t2.getComputedStyle(e2);
      }, Ue = function(e2, t2, n2) {
        var r2, i2, o2 = {};
        for (i2 in t2) o2[i2] = e2.style[i2], e2.style[i2] = t2[i2];
        for (i2 in r2 = n2.call(e2), t2) e2.style[i2] = o2[i2];
        return r2;
      }, Ve = new RegExp(Q.join("|"), "i");
      function Ge(e2, t2, n2) {
        var r2, i2, o2, a2, s2 = ze.test(t2), u2 = e2.style;
        return (n2 = n2 || Xe(e2)) && (a2 = n2.getPropertyValue(t2) || n2[t2], s2 && a2 && (a2 = a2.replace(ve, "$1") || void 0), "" !== a2 || K(e2) || (a2 = ce.style(e2, t2)), !le.pixelBoxStyles() && _e.test(a2) && Ve.test(t2) && (r2 = u2.width, i2 = u2.minWidth, o2 = u2.maxWidth, u2.minWidth = u2.maxWidth = u2.width = a2, a2 = n2.width, u2.width = r2, u2.minWidth = i2, u2.maxWidth = o2)), void 0 !== a2 ? a2 + "" : a2;
      }
      function Ye(e2, t2) {
        return {
          get: function() {
            if (!e2()) return (this.get = t2).apply(this, arguments);
            delete this.get;
          }
        };
      }
      !function() {
        function e2() {
          if (l2) {
            u2.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0", l2.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%", J.appendChild(u2).appendChild(l2);
            var e3 = ie.getComputedStyle(l2);
            n2 = "1%" !== e3.top, s2 = 12 === t2(e3.marginLeft), l2.style.right = "60%", o2 = 36 === t2(e3.right), r2 = 36 === t2(e3.width), l2.style.position = "absolute", i2 = 12 === t2(l2.offsetWidth / 3), J.removeChild(u2), l2 = null;
          }
        }
        function t2(e3) {
          return Math.round(parseFloat(e3));
        }
        var n2, r2, i2, o2, a2, s2, u2 = C.createElement("div"), l2 = C.createElement("div");
        l2.style && (l2.style.backgroundClip = "content-box", l2.cloneNode(true).style.backgroundClip = "", le.clearCloneStyle = "content-box" === l2.style.backgroundClip, ce.extend(le, {
          boxSizingReliable: function() {
            return e2(), r2;
          },
          pixelBoxStyles: function() {
            return e2(), o2;
          },
          pixelPosition: function() {
            return e2(), n2;
          },
          reliableMarginLeft: function() {
            return e2(), s2;
          },
          scrollboxSize: function() {
            return e2(), i2;
          },
          reliableTrDimensions: function() {
            var e3, t3, n3, r3;
            return null == a2 && (e3 = C.createElement("table"), t3 = C.createElement("tr"), n3 = C.createElement("div"), e3.style.cssText = "position:absolute;left:-11111px;border-collapse:separate", t3.style.cssText = "box-sizing:content-box;border:1px solid", t3.style.height = "1px", n3.style.height = "9px", n3.style.display = "block", J.appendChild(e3).appendChild(t3).appendChild(n3), r3 = ie.getComputedStyle(t3), a2 = parseInt(r3.height, 10) + parseInt(r3.borderTopWidth, 10) + parseInt(r3.borderBottomWidth, 10) === t3.offsetHeight, J.removeChild(e3)), a2;
          }
        }));
      }();
      var Qe = ["Webkit", "Moz", "ms"], Je = C.createElement("div").style, Ke = {};
      function Ze(e2) {
        var t2 = ce.cssProps[e2] || Ke[e2];
        return t2 || (e2 in Je ? e2 : Ke[e2] = function(e3) {
          var t3 = e3[0].toUpperCase() + e3.slice(1), n2 = Qe.length;
          while (n2--) if ((e3 = Qe[n2] + t3) in Je) return e3;
        }(e2) || e2);
      }
      var et = /^(none|table(?!-c[ea]).+)/, tt = { position: "absolute", visibility: "hidden", display: "block" }, nt = { letterSpacing: "0", fontWeight: "400" };
      function rt(e2, t2, n2) {
        var r2 = Y.exec(t2);
        return r2 ? Math.max(0, r2[2] - (n2 || 0)) + (r2[3] || "px") : t2;
      }
      function it(e2, t2, n2, r2, i2, o2) {
        var a2 = "width" === t2 ? 1 : 0, s2 = 0, u2 = 0, l2 = 0;
        if (n2 === (r2 ? "border" : "content")) return 0;
        for (; a2 < 4; a2 += 2)
          "margin" === n2 && (l2 += ce.css(e2, n2 + Q[a2], true, i2)), r2 ? ("content" === n2 && (u2 -= ce.css(e2, "padding" + Q[a2], true, i2)), "margin" !== n2 && (u2 -= ce.css(e2, "border" + Q[a2] + "Width", true, i2))) : (u2 += ce.css(e2, "padding" + Q[a2], true, i2), "padding" !== n2 ? u2 += ce.css(e2, "border" + Q[a2] + "Width", true, i2) : s2 += ce.css(e2, "border" + Q[a2] + "Width", true, i2));
        return !r2 && 0 <= o2 && (u2 += Math.max(
          0,
          Math.ceil(e2["offset" + t2[0].toUpperCase() + t2.slice(1)] - o2 - u2 - s2 - 0.5)
        ) || 0), u2 + l2;
      }
      function ot(e2, t2, n2) {
        var r2 = Xe(e2), i2 = (!le.boxSizingReliable() || n2) && "border-box" === ce.css(e2, "boxSizing", false, r2), o2 = i2, a2 = Ge(e2, t2, r2), s2 = "offset" + t2[0].toUpperCase() + t2.slice(1);
        if (_e.test(a2)) {
          if (!n2) return a2;
          a2 = "auto";
        }
        return (!le.boxSizingReliable() && i2 || !le.reliableTrDimensions() && fe(e2, "tr") || "auto" === a2 || !parseFloat(a2) && "inline" === ce.css(e2, "display", false, r2)) && e2.getClientRects().length && (i2 = "border-box" === ce.css(e2, "boxSizing", false, r2), (o2 = s2 in e2) && (a2 = e2[s2])), (a2 = parseFloat(a2) || 0) + it(e2, t2, n2 || (i2 ? "border" : "content"), o2, r2, a2) + "px";
      }
      function at(e2, t2, n2, r2, i2) {
        return new at.prototype.init(e2, t2, n2, r2, i2);
      }
      ce.extend({
        cssHooks: {
          opacity: {
            get: function(e2, t2) {
              if (t2) {
                var n2 = Ge(e2, "opacity");
                return "" === n2 ? "1" : n2;
              }
            }
          }
        },
        cssNumber: {
          animationIterationCount: true,
          aspectRatio: true,
          borderImageSlice: true,
          columnCount: true,
          flexGrow: true,
          flexShrink: true,
          fontWeight: true,
          gridArea: true,
          gridColumn: true,
          gridColumnEnd: true,
          gridColumnStart: true,
          gridRow: true,
          gridRowEnd: true,
          gridRowStart: true,
          lineHeight: true,
          opacity: true,
          order: true,
          orphans: true,
          scale: true,
          widows: true,
          zIndex: true,
          zoom: true,
          fillOpacity: true,
          floodOpacity: true,
          stopOpacity: true,
          strokeMiterlimit: true,
          strokeOpacity: true
        },
        cssProps: {},
        style: function(e2, t2, n2, r2) {
          if (e2 && 3 !== e2.nodeType && 8 !== e2.nodeType && e2.style) {
            var i2, o2, a2, s2 = F(t2), u2 = ze.test(t2), l2 = e2.style;
            if (u2 || (t2 = Ze(s2)), a2 = ce.cssHooks[t2] || ce.cssHooks[s2], void 0 === n2)
              return a2 && "get" in a2 && void 0 !== (i2 = a2.get(e2, false, r2)) ? i2 : l2[t2];
            "string" === (o2 = typeof n2) && (i2 = Y.exec(n2)) && i2[1] && (n2 = te(e2, t2, i2), o2 = "number"), null != n2 && n2 == n2 && ("number" !== o2 || u2 || (n2 += i2 && i2[3] || (ce.cssNumber[s2] ? "" : "px")), le.clearCloneStyle || "" !== n2 || 0 !== t2.indexOf("background") || (l2[t2] = "inherit"), a2 && "set" in a2 && void 0 === (n2 = a2.set(e2, n2, r2)) || (u2 ? l2.setProperty(t2, n2) : l2[t2] = n2));
          }
        },
        css: function(e2, t2, n2, r2) {
          var i2, o2, a2, s2 = F(t2);
          return ze.test(t2) || (t2 = Ze(s2)), (a2 = ce.cssHooks[t2] || ce.cssHooks[s2]) && "get" in a2 && (i2 = a2.get(e2, true, n2)), void 0 === i2 && (i2 = Ge(e2, t2, r2)), "normal" === i2 && t2 in nt && (i2 = nt[t2]), "" === n2 || n2 ? (o2 = parseFloat(i2), true === n2 || isFinite(o2) ? o2 || 0 : i2) : i2;
        }
      }), ce.each(["height", "width"], function(e2, u2) {
        ce.cssHooks[u2] = {
          get: function(e3, t2, n2) {
            if (t2)
              return !et.test(ce.css(e3, "display")) || e3.getClientRects().length && e3.getBoundingClientRect().width ? ot(e3, u2, n2) : Ue(e3, tt, function() {
                return ot(e3, u2, n2);
              });
          },
          set: function(e3, t2, n2) {
            var r2, i2 = Xe(e3), o2 = !le.scrollboxSize() && "absolute" === i2.position, a2 = (o2 || n2) && "border-box" === ce.css(e3, "boxSizing", false, i2), s2 = n2 ? it(e3, u2, n2, a2, i2) : 0;
            return a2 && o2 && (s2 -= Math.ceil(
              e3["offset" + u2[0].toUpperCase() + u2.slice(1)] - parseFloat(i2[u2]) - it(e3, u2, "border", false, i2) - 0.5
            )), s2 && (r2 = Y.exec(t2)) && "px" !== (r2[3] || "px") && (e3.style[u2] = t2, t2 = ce.css(e3, u2)), rt(0, t2, s2);
          }
        };
      }), ce.cssHooks.marginLeft = Ye(le.reliableMarginLeft, function(e2, t2) {
        if (t2)
          return (parseFloat(Ge(e2, "marginLeft")) || e2.getBoundingClientRect().left - Ue(e2, { marginLeft: 0 }, function() {
            return e2.getBoundingClientRect().left;
          })) + "px";
      }), ce.each({ margin: "", padding: "", border: "Width" }, function(i2, o2) {
        ce.cssHooks[i2 + o2] = {
          expand: function(e2) {
            for (var t2 = 0, n2 = {}, r2 = "string" == typeof e2 ? e2.split(" ") : [e2]; t2 < 4; t2++)
              n2[i2 + Q[t2] + o2] = r2[t2] || r2[t2 - 2] || r2[0];
            return n2;
          }
        }, "margin" !== i2 && (ce.cssHooks[i2 + o2].set = rt);
      }), ce.fn.extend({
        css: function(e2, t2) {
          return M(
            this,
            function(e3, t3, n2) {
              var r2, i2, o2 = {}, a2 = 0;
              if (Array.isArray(t3)) {
                for (r2 = Xe(e3), i2 = t3.length; a2 < i2; a2++)
                  o2[t3[a2]] = ce.css(e3, t3[a2], false, r2);
                return o2;
              }
              return void 0 !== n2 ? ce.style(e3, t3, n2) : ce.css(e3, t3);
            },
            e2,
            t2,
            1 < arguments.length
          );
        }
      }), ((ce.Tween = at).prototype = {
        constructor: at,
        init: function(e2, t2, n2, r2, i2, o2) {
          this.elem = e2, this.prop = n2, this.easing = i2 || ce.easing._default, this.options = t2, this.start = this.now = this.cur(), this.end = r2, this.unit = o2 || (ce.cssNumber[n2] ? "" : "px");
        },
        cur: function() {
          var e2 = at.propHooks[this.prop];
          return e2 && e2.get ? e2.get(this) : at.propHooks._default.get(this);
        },
        run: function(e2) {
          var t2, n2 = at.propHooks[this.prop];
          return this.options.duration ? this.pos = t2 = ce.easing[this.easing](
            e2,
            this.options.duration * e2,
            0,
            1,
            this.options.duration
          ) : this.pos = t2 = e2, this.now = (this.end - this.start) * t2 + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n2 && n2.set ? n2.set(this) : at.propHooks._default.set(this), this;
        }
      }).init.prototype = at.prototype, (at.propHooks = {
        _default: {
          get: function(e2) {
            var t2;
            return 1 !== e2.elem.nodeType || null != e2.elem[e2.prop] && null == e2.elem.style[e2.prop] ? e2.elem[e2.prop] : (t2 = ce.css(e2.elem, e2.prop, "")) && "auto" !== t2 ? t2 : 0;
          },
          set: function(e2) {
            ce.fx.step[e2.prop] ? ce.fx.step[e2.prop](e2) : 1 !== e2.elem.nodeType || !ce.cssHooks[e2.prop] && null == e2.elem.style[Ze(e2.prop)] ? e2.elem[e2.prop] = e2.now : ce.style(e2.elem, e2.prop, e2.now + e2.unit);
          }
        }
      }).scrollTop = at.propHooks.scrollLeft = {
        set: function(e2) {
          e2.elem.nodeType && e2.elem.parentNode && (e2.elem[e2.prop] = e2.now);
        }
      }, ce.easing = {
        linear: function(e2) {
          return e2;
        },
        swing: function(e2) {
          return 0.5 - Math.cos(e2 * Math.PI) / 2;
        },
        _default: "swing"
      }, ce.fx = at.prototype.init, ce.fx.step = {};
      var st, ut, lt, ct, ft = /^(?:toggle|show|hide)$/, pt = /queueHooks$/;
      function dt() {
        ut && (false === C.hidden && ie.requestAnimationFrame ? ie.requestAnimationFrame(dt) : ie.setTimeout(dt, ce.fx.interval), ce.fx.tick());
      }
      function ht() {
        return ie.setTimeout(function() {
          st = void 0;
        }), st = Date.now();
      }
      function gt(e2, t2) {
        var n2, r2 = 0, i2 = { height: e2 };
        for (t2 = t2 ? 1 : 0; r2 < 4; r2 += 2 - t2) i2["margin" + (n2 = Q[r2])] = i2["padding" + n2] = e2;
        return t2 && (i2.opacity = i2.width = e2), i2;
      }
      function vt(e2, t2, n2) {
        for (var r2, i2 = (yt.tweeners[t2] || []).concat(yt.tweeners["*"]), o2 = 0, a2 = i2.length; o2 < a2; o2++)
          if (r2 = i2[o2].call(n2, t2, e2)) return r2;
      }
      function yt(o2, e2, t2) {
        var n2, a2, r2 = 0, i2 = yt.prefilters.length, s2 = ce.Deferred().always(function() {
          delete u2.elem;
        }), u2 = function() {
          if (a2) return false;
          for (var e3 = st || ht(), t3 = Math.max(0, l2.startTime + l2.duration - e3), n3 = 1 - (t3 / l2.duration || 0), r3 = 0, i3 = l2.tweens.length; r3 < i3; r3++)
            l2.tweens[r3].run(n3);
          return s2.notifyWith(o2, [l2, n3, t3]), n3 < 1 && i3 ? t3 : (i3 || s2.notifyWith(o2, [l2, 1, 0]), s2.resolveWith(o2, [l2]), false);
        }, l2 = s2.promise({
          elem: o2,
          props: ce.extend({}, e2),
          opts: ce.extend(true, { specialEasing: {}, easing: ce.easing._default }, t2),
          originalProperties: e2,
          originalOptions: t2,
          startTime: st || ht(),
          duration: t2.duration,
          tweens: [],
          createTween: function(e3, t3) {
            var n3 = ce.Tween(o2, l2.opts, e3, t3, l2.opts.specialEasing[e3] || l2.opts.easing);
            return l2.tweens.push(n3), n3;
          },
          stop: function(e3) {
            var t3 = 0, n3 = e3 ? l2.tweens.length : 0;
            if (a2) return this;
            for (a2 = true; t3 < n3; t3++) l2.tweens[t3].run(1);
            return e3 ? (s2.notifyWith(o2, [l2, 1, 0]), s2.resolveWith(o2, [l2, e3])) : s2.rejectWith(o2, [l2, e3]), this;
          }
        }), c2 = l2.props;
        for (!function(e3, t3) {
          var n3, r3, i3, o3, a3;
          for (n3 in e3)
            if (i3 = t3[r3 = F(n3)], o3 = e3[n3], Array.isArray(o3) && (i3 = o3[1], o3 = e3[n3] = o3[0]), n3 !== r3 && (e3[r3] = o3, delete e3[n3]), (a3 = ce.cssHooks[r3]) && "expand" in a3)
              for (n3 in o3 = a3.expand(o3), delete e3[r3], o3)
                n3 in e3 || (e3[n3] = o3[n3], t3[n3] = i3);
            else t3[r3] = i3;
        }(c2, l2.opts.specialEasing); r2 < i2; r2++)
          if (n2 = yt.prefilters[r2].call(l2, o2, c2, l2.opts))
            return v(n2.stop) && (ce._queueHooks(l2.elem, l2.opts.queue).stop = n2.stop.bind(n2)), n2;
        return ce.map(c2, vt, l2), v(l2.opts.start) && l2.opts.start.call(o2, l2), l2.progress(l2.opts.progress).done(l2.opts.done, l2.opts.complete).fail(l2.opts.fail).always(l2.opts.always), ce.fx.timer(ce.extend(u2, { elem: o2, anim: l2, queue: l2.opts.queue })), l2;
      }
      ce.Animation = ce.extend(yt, {
        tweeners: {
          "*": [
            function(e2, t2) {
              var n2 = this.createTween(e2, t2);
              return te(n2.elem, e2, Y.exec(t2), n2), n2;
            }
          ]
        },
        tweener: function(e2, t2) {
          v(e2) ? (t2 = e2, e2 = ["*"]) : e2 = e2.match(D);
          for (var n2, r2 = 0, i2 = e2.length; r2 < i2; r2++)
            n2 = e2[r2], yt.tweeners[n2] = yt.tweeners[n2] || [], yt.tweeners[n2].unshift(t2);
        },
        prefilters: [
          function(e2, t2, n2) {
            var r2, i2, o2, a2, s2, u2, l2, c2, f2 = "width" in t2 || "height" in t2, p2 = this, d2 = {}, h2 = e2.style, g2 = e2.nodeType && ee(e2), v2 = _.get(e2, "fxshow");
            for (r2 in n2.queue || (null == (a2 = ce._queueHooks(e2, "fx")).unqueued && (a2.unqueued = 0, s2 = a2.empty.fire, a2.empty.fire = function() {
              a2.unqueued || s2();
            }), a2.unqueued++, p2.always(function() {
              p2.always(function() {
                a2.unqueued--, ce.queue(e2, "fx").length || a2.empty.fire();
              });
            })), t2)
              if (i2 = t2[r2], ft.test(i2)) {
                if (delete t2[r2], o2 = o2 || "toggle" === i2, i2 === (g2 ? "hide" : "show")) {
                  if ("show" !== i2 || !v2 || void 0 === v2[r2]) continue;
                  g2 = true;
                }
                d2[r2] = v2 && v2[r2] || ce.style(e2, r2);
              }
            if ((u2 = !ce.isEmptyObject(t2)) || !ce.isEmptyObject(d2))
              for (r2 in f2 && 1 === e2.nodeType && (n2.overflow = [h2.overflow, h2.overflowX, h2.overflowY], null == (l2 = v2 && v2.display) && (l2 = _.get(e2, "display")), "none" === (c2 = ce.css(e2, "display")) && (l2 ? c2 = l2 : (re([e2], true), l2 = e2.style.display || l2, c2 = ce.css(e2, "display"), re([e2]))), ("inline" === c2 || "inline-block" === c2 && null != l2) && "none" === ce.css(e2, "float") && (u2 || (p2.done(function() {
                h2.display = l2;
              }), null == l2 && (c2 = h2.display, l2 = "none" === c2 ? "" : c2)), h2.display = "inline-block")), n2.overflow && (h2.overflow = "hidden", p2.always(function() {
                h2.overflow = n2.overflow[0], h2.overflowX = n2.overflow[1], h2.overflowY = n2.overflow[2];
              })), u2 = false, d2)
                u2 || (v2 ? "hidden" in v2 && (g2 = v2.hidden) : v2 = _.access(e2, "fxshow", { display: l2 }), o2 && (v2.hidden = !g2), g2 && re([e2], true), p2.done(function() {
                  for (r2 in g2 || re([e2]), _.remove(e2, "fxshow"), d2)
                    ce.style(e2, r2, d2[r2]);
                })), u2 = vt(g2 ? v2[r2] : 0, r2, p2), r2 in v2 || (v2[r2] = u2.start, g2 && (u2.end = u2.start, u2.start = 0));
          }
        ],
        prefilter: function(e2, t2) {
          t2 ? yt.prefilters.unshift(e2) : yt.prefilters.push(e2);
        }
      }), ce.speed = function(e2, t2, n2) {
        var r2 = e2 && "object" == typeof e2 ? ce.extend({}, e2) : {
          complete: n2 || !n2 && t2 || v(e2) && e2,
          duration: e2,
          easing: n2 && t2 || t2 && !v(t2) && t2
        };
        return ce.fx.off ? r2.duration = 0 : "number" != typeof r2.duration && (r2.duration in ce.fx.speeds ? r2.duration = ce.fx.speeds[r2.duration] : r2.duration = ce.fx.speeds._default), null != r2.queue && true !== r2.queue || (r2.queue = "fx"), r2.old = r2.complete, r2.complete = function() {
          v(r2.old) && r2.old.call(this), r2.queue && ce.dequeue(this, r2.queue);
        }, r2;
      }, ce.fn.extend({
        fadeTo: function(e2, t2, n2, r2) {
          return this.filter(ee).css("opacity", 0).show().end().animate({ opacity: t2 }, e2, n2, r2);
        },
        animate: function(t2, e2, n2, r2) {
          var i2 = ce.isEmptyObject(t2), o2 = ce.speed(e2, n2, r2), a2 = function() {
            var e3 = yt(this, ce.extend({}, t2), o2);
            (i2 || _.get(this, "finish")) && e3.stop(true);
          };
          return a2.finish = a2, i2 || false === o2.queue ? this.each(a2) : this.queue(o2.queue, a2);
        },
        stop: function(i2, e2, o2) {
          var a2 = function(e3) {
            var t2 = e3.stop;
            delete e3.stop, t2(o2);
          };
          return "string" != typeof i2 && (o2 = e2, e2 = i2, i2 = void 0), e2 && this.queue(i2 || "fx", []), this.each(function() {
            var e3 = true, t2 = null != i2 && i2 + "queueHooks", n2 = ce.timers, r2 = _.get(this);
            if (t2) r2[t2] && r2[t2].stop && a2(r2[t2]);
            else for (t2 in r2) r2[t2] && r2[t2].stop && pt.test(t2) && a2(r2[t2]);
            for (t2 = n2.length; t2--; )
              n2[t2].elem !== this || null != i2 && n2[t2].queue !== i2 || (n2[t2].anim.stop(o2), e3 = false, n2.splice(t2, 1));
            !e3 && o2 || ce.dequeue(this, i2);
          });
        },
        finish: function(a2) {
          return false !== a2 && (a2 = a2 || "fx"), this.each(function() {
            var e2, t2 = _.get(this), n2 = t2[a2 + "queue"], r2 = t2[a2 + "queueHooks"], i2 = ce.timers, o2 = n2 ? n2.length : 0;
            for (t2.finish = true, ce.queue(this, a2, []), r2 && r2.stop && r2.stop.call(this, true), e2 = i2.length; e2--; )
              i2[e2].elem === this && i2[e2].queue === a2 && (i2[e2].anim.stop(true), i2.splice(e2, 1));
            for (e2 = 0; e2 < o2; e2++) n2[e2] && n2[e2].finish && n2[e2].finish.call(this);
            delete t2.finish;
          });
        }
      }), ce.each(["toggle", "show", "hide"], function(e2, r2) {
        var i2 = ce.fn[r2];
        ce.fn[r2] = function(e3, t2, n2) {
          return null == e3 || "boolean" == typeof e3 ? i2.apply(this, arguments) : this.animate(gt(r2, true), e3, t2, n2);
        };
      }), ce.each(
        {
          slideDown: gt("show"),
          slideUp: gt("hide"),
          slideToggle: gt("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        },
        function(e2, r2) {
          ce.fn[e2] = function(e3, t2, n2) {
            return this.animate(r2, e3, t2, n2);
          };
        }
      ), ce.timers = [], ce.fx.tick = function() {
        var e2, t2 = 0, n2 = ce.timers;
        for (st = Date.now(); t2 < n2.length; t2++) (e2 = n2[t2])() || n2[t2] !== e2 || n2.splice(t2--, 1);
        n2.length || ce.fx.stop(), st = void 0;
      }, ce.fx.timer = function(e2) {
        ce.timers.push(e2), ce.fx.start();
      }, ce.fx.interval = 13, ce.fx.start = function() {
        ut || (ut = true, dt());
      }, ce.fx.stop = function() {
        ut = null;
      }, ce.fx.speeds = { slow: 600, fast: 200, _default: 400 }, ce.fn.delay = function(r2, e2) {
        return r2 = ce.fx && ce.fx.speeds[r2] || r2, e2 = e2 || "fx", this.queue(e2, function(e3, t2) {
          var n2 = ie.setTimeout(e3, r2);
          t2.stop = function() {
            ie.clearTimeout(n2);
          };
        });
      }, lt = C.createElement("input"), ct = C.createElement("select").appendChild(C.createElement("option")), lt.type = "checkbox", le.checkOn = "" !== lt.value, le.optSelected = ct.selected, (lt = C.createElement("input")).value = "t", lt.type = "radio", le.radioValue = "t" === lt.value;
      var mt, xt = ce.expr.attrHandle;
      ce.fn.extend({
        attr: function(e2, t2) {
          return M(this, ce.attr, e2, t2, 1 < arguments.length);
        },
        removeAttr: function(e2) {
          return this.each(function() {
            ce.removeAttr(this, e2);
          });
        }
      }), ce.extend({
        attr: function(e2, t2, n2) {
          var r2, i2, o2 = e2.nodeType;
          if (3 !== o2 && 8 !== o2 && 2 !== o2)
            return "undefined" == typeof e2.getAttribute ? ce.prop(e2, t2, n2) : (1 === o2 && ce.isXMLDoc(e2) || (i2 = ce.attrHooks[t2.toLowerCase()] || (ce.expr.match.bool.test(t2) ? mt : void 0)), void 0 !== n2 ? null === n2 ? void ce.removeAttr(e2, t2) : i2 && "set" in i2 && void 0 !== (r2 = i2.set(e2, n2, t2)) ? r2 : (e2.setAttribute(t2, n2 + ""), n2) : i2 && "get" in i2 && null !== (r2 = i2.get(e2, t2)) ? r2 : null == (r2 = ce.find.attr(e2, t2)) ? void 0 : r2);
        },
        attrHooks: {
          type: {
            set: function(e2, t2) {
              if (!le.radioValue && "radio" === t2 && fe(e2, "input")) {
                var n2 = e2.value;
                return e2.setAttribute("type", t2), n2 && (e2.value = n2), t2;
              }
            }
          }
        },
        removeAttr: function(e2, t2) {
          var n2, r2 = 0, i2 = t2 && t2.match(D);
          if (i2 && 1 === e2.nodeType) while (n2 = i2[r2++]) e2.removeAttribute(n2);
        }
      }), mt = {
        set: function(e2, t2, n2) {
          return false === t2 ? ce.removeAttr(e2, n2) : e2.setAttribute(n2, n2), n2;
        }
      }, ce.each(ce.expr.match.bool.source.match(/\w+/g), function(e2, t2) {
        var a2 = xt[t2] || ce.find.attr;
        xt[t2] = function(e3, t3, n2) {
          var r2, i2, o2 = t3.toLowerCase();
          return n2 || (i2 = xt[o2], xt[o2] = r2, r2 = null != a2(e3, t3, n2) ? o2 : null, xt[o2] = i2), r2;
        };
      });
      var bt = /^(?:input|select|textarea|button)$/i, wt = /^(?:a|area)$/i;
      function Tt(e2) {
        return (e2.match(D) || []).join(" ");
      }
      function Ct(e2) {
        return e2.getAttribute && e2.getAttribute("class") || "";
      }
      function kt(e2) {
        return Array.isArray(e2) ? e2 : "string" == typeof e2 && e2.match(D) || [];
      }
      ce.fn.extend({
        prop: function(e2, t2) {
          return M(this, ce.prop, e2, t2, 1 < arguments.length);
        },
        removeProp: function(e2) {
          return this.each(function() {
            delete this[ce.propFix[e2] || e2];
          });
        }
      }), ce.extend({
        prop: function(e2, t2, n2) {
          var r2, i2, o2 = e2.nodeType;
          if (3 !== o2 && 8 !== o2 && 2 !== o2)
            return 1 === o2 && ce.isXMLDoc(e2) || (t2 = ce.propFix[t2] || t2, i2 = ce.propHooks[t2]), void 0 !== n2 ? i2 && "set" in i2 && void 0 !== (r2 = i2.set(e2, n2, t2)) ? r2 : e2[t2] = n2 : i2 && "get" in i2 && null !== (r2 = i2.get(e2, t2)) ? r2 : e2[t2];
        },
        propHooks: {
          tabIndex: {
            get: function(e2) {
              var t2 = ce.find.attr(e2, "tabindex");
              return t2 ? parseInt(t2, 10) : bt.test(e2.nodeName) || wt.test(e2.nodeName) && e2.href ? 0 : -1;
            }
          }
        },
        propFix: { for: "htmlFor", class: "className" }
      }), le.optSelected || (ce.propHooks.selected = {
        get: function(e2) {
          var t2 = e2.parentNode;
          return t2 && t2.parentNode && t2.parentNode.selectedIndex, null;
        },
        set: function(e2) {
          var t2 = e2.parentNode;
          t2 && (t2.selectedIndex, t2.parentNode && t2.parentNode.selectedIndex);
        }
      }), ce.each(
        [
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ],
        function() {
          ce.propFix[this.toLowerCase()] = this;
        }
      ), ce.fn.extend({
        addClass: function(t2) {
          var e2, n2, r2, i2, o2, a2;
          return v(t2) ? this.each(function(e3) {
            ce(this).addClass(t2.call(this, e3, Ct(this)));
          }) : (e2 = kt(t2)).length ? this.each(function() {
            if (r2 = Ct(this), n2 = 1 === this.nodeType && " " + Tt(r2) + " ") {
              for (o2 = 0; o2 < e2.length; o2++)
                i2 = e2[o2], n2.indexOf(" " + i2 + " ") < 0 && (n2 += i2 + " ");
              a2 = Tt(n2), r2 !== a2 && this.setAttribute("class", a2);
            }
          }) : this;
        },
        removeClass: function(t2) {
          var e2, n2, r2, i2, o2, a2;
          return v(t2) ? this.each(function(e3) {
            ce(this).removeClass(t2.call(this, e3, Ct(this)));
          }) : arguments.length ? (e2 = kt(t2)).length ? this.each(function() {
            if (r2 = Ct(this), n2 = 1 === this.nodeType && " " + Tt(r2) + " ") {
              for (o2 = 0; o2 < e2.length; o2++) {
                i2 = e2[o2];
                while (-1 < n2.indexOf(" " + i2 + " "))
                  n2 = n2.replace(" " + i2 + " ", " ");
              }
              a2 = Tt(n2), r2 !== a2 && this.setAttribute("class", a2);
            }
          }) : this : this.attr("class", "");
        },
        toggleClass: function(t2, n2) {
          var e2, r2, i2, o2, a2 = typeof t2, s2 = "string" === a2 || Array.isArray(t2);
          return v(t2) ? this.each(function(e3) {
            ce(this).toggleClass(t2.call(this, e3, Ct(this), n2), n2);
          }) : "boolean" == typeof n2 && s2 ? n2 ? this.addClass(t2) : this.removeClass(t2) : (e2 = kt(t2), this.each(function() {
            if (s2)
              for (o2 = ce(this), i2 = 0; i2 < e2.length; i2++)
                r2 = e2[i2], o2.hasClass(r2) ? o2.removeClass(r2) : o2.addClass(r2);
            else
              void 0 !== t2 && "boolean" !== a2 || ((r2 = Ct(this)) && _.set(this, "__className__", r2), this.setAttribute && this.setAttribute(
                "class",
                r2 || false === t2 ? "" : _.get(this, "__className__") || ""
              ));
          }));
        },
        hasClass: function(e2) {
          var t2, n2, r2 = 0;
          t2 = " " + e2 + " ";
          while (n2 = this[r2++])
            if (1 === n2.nodeType && -1 < (" " + Tt(Ct(n2)) + " ").indexOf(t2)) return true;
          return false;
        }
      });
      var St = /\r/g;
      ce.fn.extend({
        val: function(n2) {
          var r2, e2, i2, t2 = this[0];
          return arguments.length ? (i2 = v(n2), this.each(function(e3) {
            var t3;
            1 === this.nodeType && (null == (t3 = i2 ? n2.call(this, e3, ce(this).val()) : n2) ? t3 = "" : "number" == typeof t3 ? t3 += "" : Array.isArray(t3) && (t3 = ce.map(t3, function(e4) {
              return null == e4 ? "" : e4 + "";
            })), (r2 = ce.valHooks[this.type] || ce.valHooks[this.nodeName.toLowerCase()]) && "set" in r2 && void 0 !== r2.set(this, t3, "value") || (this.value = t3));
          })) : t2 ? (r2 = ce.valHooks[t2.type] || ce.valHooks[t2.nodeName.toLowerCase()]) && "get" in r2 && void 0 !== (e2 = r2.get(t2, "value")) ? e2 : "string" == typeof (e2 = t2.value) ? e2.replace(St, "") : null == e2 ? "" : e2 : void 0;
        }
      }), ce.extend({
        valHooks: {
          option: {
            get: function(e2) {
              var t2 = ce.find.attr(e2, "value");
              return null != t2 ? t2 : Tt(ce.text(e2));
            }
          },
          select: {
            get: function(e2) {
              var t2, n2, r2, i2 = e2.options, o2 = e2.selectedIndex, a2 = "select-one" === e2.type, s2 = a2 ? null : [], u2 = a2 ? o2 + 1 : i2.length;
              for (r2 = o2 < 0 ? u2 : a2 ? o2 : 0; r2 < u2; r2++)
                if (((n2 = i2[r2]).selected || r2 === o2) && !n2.disabled && (!n2.parentNode.disabled || !fe(n2.parentNode, "optgroup"))) {
                  if (t2 = ce(n2).val(), a2) return t2;
                  s2.push(t2);
                }
              return s2;
            },
            set: function(e2, t2) {
              var n2, r2, i2 = e2.options, o2 = ce.makeArray(t2), a2 = i2.length;
              while (a2--)
                ((r2 = i2[a2]).selected = -1 < ce.inArray(ce.valHooks.option.get(r2), o2)) && (n2 = true);
              return n2 || (e2.selectedIndex = -1), o2;
            }
          }
        }
      }), ce.each(["radio", "checkbox"], function() {
        ce.valHooks[this] = {
          set: function(e2, t2) {
            if (Array.isArray(t2)) return e2.checked = -1 < ce.inArray(ce(e2).val(), t2);
          }
        }, le.checkOn || (ce.valHooks[this].get = function(e2) {
          return null === e2.getAttribute("value") ? "on" : e2.value;
        });
      });
      var Et = ie.location, jt = { guid: Date.now() }, At = /\?/;
      ce.parseXML = function(e2) {
        var t2, n2;
        if (!e2 || "string" != typeof e2) return null;
        try {
          t2 = new ie.DOMParser().parseFromString(e2, "text/xml");
        } catch (e3) {
        }
        return n2 = t2 && t2.getElementsByTagName("parsererror")[0], t2 && !n2 || ce.error(
          "Invalid XML: " + (n2 ? ce.map(n2.childNodes, function(e3) {
            return e3.textContent;
          }).join("\n") : e2)
        ), t2;
      };
      var Dt = /^(?:focusinfocus|focusoutblur)$/, Nt = function(e2) {
        e2.stopPropagation();
      };
      ce.extend(ce.event, {
        trigger: function(e2, t2, n2, r2) {
          var i2, o2, a2, s2, u2, l2, c2, f2, p2 = [n2 || C], d2 = ue.call(e2, "type") ? e2.type : e2, h2 = ue.call(e2, "namespace") ? e2.namespace.split(".") : [];
          if (o2 = f2 = a2 = n2 = n2 || C, 3 !== n2.nodeType && 8 !== n2.nodeType && !Dt.test(d2 + ce.event.triggered) && (-1 < d2.indexOf(".") && (d2 = (h2 = d2.split(".")).shift(), h2.sort()), u2 = d2.indexOf(":") < 0 && "on" + d2, (e2 = e2[ce.expando] ? e2 : new ce.Event(d2, "object" == typeof e2 && e2)).isTrigger = r2 ? 2 : 3, e2.namespace = h2.join("."), e2.rnamespace = e2.namespace ? new RegExp("(^|\\.)" + h2.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e2.result = void 0, e2.target || (e2.target = n2), t2 = null == t2 ? [e2] : ce.makeArray(t2, [e2]), c2 = ce.event.special[d2] || {}, r2 || !c2.trigger || false !== c2.trigger.apply(n2, t2))) {
            if (!r2 && !c2.noBubble && !y(n2)) {
              for (s2 = c2.delegateType || d2, Dt.test(s2 + d2) || (o2 = o2.parentNode); o2; o2 = o2.parentNode)
                p2.push(o2), a2 = o2;
              a2 === (n2.ownerDocument || C) && p2.push(a2.defaultView || a2.parentWindow || ie);
            }
            i2 = 0;
            while ((o2 = p2[i2++]) && !e2.isPropagationStopped())
              f2 = o2, e2.type = 1 < i2 ? s2 : c2.bindType || d2, (l2 = (_.get(o2, "events") || /* @__PURE__ */ Object.create(null))[e2.type] && _.get(o2, "handle")) && l2.apply(o2, t2), (l2 = u2 && o2[u2]) && l2.apply && $(o2) && (e2.result = l2.apply(o2, t2), false === e2.result && e2.preventDefault());
            return e2.type = d2, r2 || e2.isDefaultPrevented() || c2._default && false !== c2._default.apply(p2.pop(), t2) || !$(n2) || u2 && v(n2[d2]) && !y(n2) && ((a2 = n2[u2]) && (n2[u2] = null), ce.event.triggered = d2, e2.isPropagationStopped() && f2.addEventListener(d2, Nt), n2[d2](), e2.isPropagationStopped() && f2.removeEventListener(d2, Nt), ce.event.triggered = void 0, a2 && (n2[u2] = a2)), e2.result;
          }
        },
        simulate: function(e2, t2, n2) {
          var r2 = ce.extend(new ce.Event(), n2, { type: e2, isSimulated: true });
          ce.event.trigger(r2, null, t2);
        }
      }), ce.fn.extend({
        trigger: function(e2, t2) {
          return this.each(function() {
            ce.event.trigger(e2, t2, this);
          });
        },
        triggerHandler: function(e2, t2) {
          var n2 = this[0];
          if (n2) return ce.event.trigger(e2, t2, n2, true);
        }
      });
      var qt = /\[\]$/, Lt = /\r?\n/g, Ht = /^(?:submit|button|image|reset|file)$/i, Ot = /^(?:input|select|textarea|keygen)/i;
      function Pt(n2, e2, r2, i2) {
        var t2;
        if (Array.isArray(e2))
          ce.each(e2, function(e3, t3) {
            r2 || qt.test(n2) ? i2(n2, t3) : Pt(n2 + "[" + ("object" == typeof t3 && null != t3 ? e3 : "") + "]", t3, r2, i2);
          });
        else if (r2 || "object" !== x(e2)) i2(n2, e2);
        else for (t2 in e2) Pt(n2 + "[" + t2 + "]", e2[t2], r2, i2);
      }
      ce.param = function(e2, t2) {
        var n2, r2 = [], i2 = function(e3, t3) {
          var n3 = v(t3) ? t3() : t3;
          r2[r2.length] = encodeURIComponent(e3) + "=" + encodeURIComponent(null == n3 ? "" : n3);
        };
        if (null == e2) return "";
        if (Array.isArray(e2) || e2.jquery && !ce.isPlainObject(e2))
          ce.each(e2, function() {
            i2(this.name, this.value);
          });
        else for (n2 in e2) Pt(n2, e2[n2], t2, i2);
        return r2.join("&");
      }, ce.fn.extend({
        serialize: function() {
          return ce.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var e2 = ce.prop(this, "elements");
            return e2 ? ce.makeArray(e2) : this;
          }).filter(function() {
            var e2 = this.type;
            return this.name && !ce(this).is(":disabled") && Ot.test(this.nodeName) && !Ht.test(e2) && (this.checked || !we.test(e2));
          }).map(function(e2, t2) {
            var n2 = ce(this).val();
            return null == n2 ? null : Array.isArray(n2) ? ce.map(n2, function(e3) {
              return { name: t2.name, value: e3.replace(Lt, "\r\n") };
            }) : { name: t2.name, value: n2.replace(Lt, "\r\n") };
          }).get();
        }
      });
      var Mt = /%20/g, Rt = /#.*$/, It = /([?&])_=[^&]*/, Wt = /^(.*?):[ \t]*([^\r\n]*)$/gm, Ft = /^(?:GET|HEAD)$/, $t = /^\/\//, Bt = {}, _t = {}, zt = "*/".concat("*"), Xt = C.createElement("a");
      function Ut(o2) {
        return function(e2, t2) {
          "string" != typeof e2 && (t2 = e2, e2 = "*");
          var n2, r2 = 0, i2 = e2.toLowerCase().match(D) || [];
          if (v(t2))
            while (n2 = i2[r2++])
              "+" === n2[0] ? (n2 = n2.slice(1) || "*", (o2[n2] = o2[n2] || []).unshift(t2)) : (o2[n2] = o2[n2] || []).push(t2);
        };
      }
      function Vt(t2, i2, o2, a2) {
        var s2 = {}, u2 = t2 === _t;
        function l2(e2) {
          var r2;
          return s2[e2] = true, ce.each(t2[e2] || [], function(e3, t3) {
            var n2 = t3(i2, o2, a2);
            return "string" != typeof n2 || u2 || s2[n2] ? u2 ? !(r2 = n2) : void 0 : (i2.dataTypes.unshift(n2), l2(n2), false);
          }), r2;
        }
        return l2(i2.dataTypes[0]) || !s2["*"] && l2("*");
      }
      function Gt(e2, t2) {
        var n2, r2, i2 = ce.ajaxSettings.flatOptions || {};
        for (n2 in t2) void 0 !== t2[n2] && ((i2[n2] ? e2 : r2 || (r2 = {}))[n2] = t2[n2]);
        return r2 && ce.extend(true, e2, r2), e2;
      }
      Xt.href = Et.href, ce.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: Et.href,
          type: "GET",
          isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
            Et.protocol
          ),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          accepts: {
            "*": zt,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
          responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
          converters: {
            "* text": String,
            "text html": true,
            "text json": JSON.parse,
            "text xml": ce.parseXML
          },
          flatOptions: { url: true, context: true }
        },
        ajaxSetup: function(e2, t2) {
          return t2 ? Gt(Gt(e2, ce.ajaxSettings), t2) : Gt(ce.ajaxSettings, e2);
        },
        ajaxPrefilter: Ut(Bt),
        ajaxTransport: Ut(_t),
        ajax: function(e2, t2) {
          "object" == typeof e2 && (t2 = e2, e2 = void 0), t2 = t2 || {};
          var c2, f2, p2, n2, d2, r2, h2, g2, i2, o2, v2 = ce.ajaxSetup({}, t2), y2 = v2.context || v2, m2 = v2.context && (y2.nodeType || y2.jquery) ? ce(y2) : ce.event, x2 = ce.Deferred(), b2 = ce.Callbacks("once memory"), w2 = v2.statusCode || {}, a2 = {}, s2 = {}, u2 = "canceled", T2 = {
            readyState: 0,
            getResponseHeader: function(e3) {
              var t3;
              if (h2) {
                if (!n2) {
                  n2 = {};
                  while (t3 = Wt.exec(p2))
                    n2[t3[1].toLowerCase() + " "] = (n2[t3[1].toLowerCase() + " "] || []).concat(t3[2]);
                }
                t3 = n2[e3.toLowerCase() + " "];
              }
              return null == t3 ? null : t3.join(", ");
            },
            getAllResponseHeaders: function() {
              return h2 ? p2 : null;
            },
            setRequestHeader: function(e3, t3) {
              return null == h2 && (e3 = s2[e3.toLowerCase()] = s2[e3.toLowerCase()] || e3, a2[e3] = t3), this;
            },
            overrideMimeType: function(e3) {
              return null == h2 && (v2.mimeType = e3), this;
            },
            statusCode: function(e3) {
              var t3;
              if (e3)
                if (h2) T2.always(e3[T2.status]);
                else for (t3 in e3) w2[t3] = [w2[t3], e3[t3]];
              return this;
            },
            abort: function(e3) {
              var t3 = e3 || u2;
              return c2 && c2.abort(t3), l2(0, t3), this;
            }
          };
          if (x2.promise(T2), v2.url = ((e2 || v2.url || Et.href) + "").replace($t, Et.protocol + "//"), v2.type = t2.method || t2.type || v2.method || v2.type, v2.dataTypes = (v2.dataType || "*").toLowerCase().match(D) || [""], null == v2.crossDomain) {
            r2 = C.createElement("a");
            try {
              r2.href = v2.url, r2.href = r2.href, v2.crossDomain = Xt.protocol + "//" + Xt.host != r2.protocol + "//" + r2.host;
            } catch (e3) {
              v2.crossDomain = true;
            }
          }
          if (v2.data && v2.processData && "string" != typeof v2.data && (v2.data = ce.param(v2.data, v2.traditional)), Vt(Bt, v2, t2, T2), h2)
            return T2;
          for (i2 in (g2 = ce.event && v2.global) && 0 == ce.active++ && ce.event.trigger("ajaxStart"), v2.type = v2.type.toUpperCase(), v2.hasContent = !Ft.test(v2.type), f2 = v2.url.replace(Rt, ""), v2.hasContent ? v2.data && v2.processData && 0 === (v2.contentType || "").indexOf("application/x-www-form-urlencoded") && (v2.data = v2.data.replace(Mt, "+")) : (o2 = v2.url.slice(f2.length), v2.data && (v2.processData || "string" == typeof v2.data) && (f2 += (At.test(f2) ? "&" : "?") + v2.data, delete v2.data), false === v2.cache && (f2 = f2.replace(It, "$1"), o2 = (At.test(f2) ? "&" : "?") + "_=" + jt.guid++ + o2), v2.url = f2 + o2), v2.ifModified && (ce.lastModified[f2] && T2.setRequestHeader("If-Modified-Since", ce.lastModified[f2]), ce.etag[f2] && T2.setRequestHeader("If-None-Match", ce.etag[f2])), (v2.data && v2.hasContent && false !== v2.contentType || t2.contentType) && T2.setRequestHeader("Content-Type", v2.contentType), T2.setRequestHeader(
            "Accept",
            v2.dataTypes[0] && v2.accepts[v2.dataTypes[0]] ? v2.accepts[v2.dataTypes[0]] + ("*" !== v2.dataTypes[0] ? ", " + zt + "; q=0.01" : "") : v2.accepts["*"]
          ), v2.headers)
            T2.setRequestHeader(i2, v2.headers[i2]);
          if (v2.beforeSend && (false === v2.beforeSend.call(y2, T2, v2) || h2)) return T2.abort();
          if (u2 = "abort", b2.add(v2.complete), T2.done(v2.success), T2.fail(v2.error), c2 = Vt(_t, v2, t2, T2)) {
            if (T2.readyState = 1, g2 && m2.trigger("ajaxSend", [T2, v2]), h2) return T2;
            v2.async && 0 < v2.timeout && (d2 = ie.setTimeout(function() {
              T2.abort("timeout");
            }, v2.timeout));
            try {
              h2 = false, c2.send(a2, l2);
            } catch (e3) {
              if (h2) throw e3;
              l2(-1, e3);
            }
          } else l2(-1, "No Transport");
          function l2(e3, t3, n3, r3) {
            var i3, o3, a3, s3, u3, l3 = t3;
            h2 || (h2 = true, d2 && ie.clearTimeout(d2), c2 = void 0, p2 = r3 || "", T2.readyState = 0 < e3 ? 4 : 0, i3 = 200 <= e3 && e3 < 300 || 304 === e3, n3 && (s3 = function(e4, t4, n4) {
              var r4, i4, o4, a4, s4 = e4.contents, u4 = e4.dataTypes;
              while ("*" === u4[0])
                u4.shift(), void 0 === r4 && (r4 = e4.mimeType || t4.getResponseHeader("Content-Type"));
              if (r4) {
                for (i4 in s4)
                  if (s4[i4] && s4[i4].test(r4)) {
                    u4.unshift(i4);
                    break;
                  }
              }
              if (u4[0] in n4) o4 = u4[0];
              else {
                for (i4 in n4) {
                  if (!u4[0] || e4.converters[i4 + " " + u4[0]]) {
                    o4 = i4;
                    break;
                  }
                  a4 || (a4 = i4);
                }
                o4 = o4 || a4;
              }
              if (o4) return o4 !== u4[0] && u4.unshift(o4), n4[o4];
            }(v2, T2, n3)), !i3 && -1 < ce.inArray("script", v2.dataTypes) && ce.inArray("json", v2.dataTypes) < 0 && (v2.converters["text script"] = function() {
            }), s3 = function(e4, t4, n4, r4) {
              var i4, o4, a4, s4, u4, l4 = {}, c3 = e4.dataTypes.slice();
              if (c3[1]) for (a4 in e4.converters) l4[a4.toLowerCase()] = e4.converters[a4];
              o4 = c3.shift();
              while (o4)
                if (e4.responseFields[o4] && (n4[e4.responseFields[o4]] = t4), !u4 && r4 && e4.dataFilter && (t4 = e4.dataFilter(t4, e4.dataType)), u4 = o4, o4 = c3.shift()) {
                  if ("*" === o4) o4 = u4;
                  else if ("*" !== u4 && u4 !== o4) {
                    if (!(a4 = l4[u4 + " " + o4] || l4["* " + o4])) {
                      for (i4 in l4)
                        if ((s4 = i4.split(" "))[1] === o4 && (a4 = l4[u4 + " " + s4[0]] || l4["* " + s4[0]])) {
                          true === a4 ? a4 = l4[i4] : true !== l4[i4] && (o4 = s4[0], c3.unshift(s4[1]));
                          break;
                        }
                    }
                    if (true !== a4)
                      if (a4 && e4["throws"]) t4 = a4(t4);
                      else
                        try {
                          t4 = a4(t4);
                        } catch (e5) {
                          return {
                            state: "parsererror",
                            error: a4 ? e5 : "No conversion from " + u4 + " to " + o4
                          };
                        }
                  }
                }
              return { state: "success", data: t4 };
            }(v2, s3, T2, i3), i3 ? (v2.ifModified && ((u3 = T2.getResponseHeader("Last-Modified")) && (ce.lastModified[f2] = u3), (u3 = T2.getResponseHeader("etag")) && (ce.etag[f2] = u3)), 204 === e3 || "HEAD" === v2.type ? l3 = "nocontent" : 304 === e3 ? l3 = "notmodified" : (l3 = s3.state, o3 = s3.data, i3 = !(a3 = s3.error))) : (a3 = l3, !e3 && l3 || (l3 = "error", e3 < 0 && (e3 = 0))), T2.status = e3, T2.statusText = (t3 || l3) + "", i3 ? x2.resolveWith(y2, [o3, l3, T2]) : x2.rejectWith(y2, [T2, l3, a3]), T2.statusCode(w2), w2 = void 0, g2 && m2.trigger(i3 ? "ajaxSuccess" : "ajaxError", [T2, v2, i3 ? o3 : a3]), b2.fireWith(y2, [T2, l3]), g2 && (m2.trigger("ajaxComplete", [T2, v2]), --ce.active || ce.event.trigger("ajaxStop")));
          }
          return T2;
        },
        getJSON: function(e2, t2, n2) {
          return ce.get(e2, t2, n2, "json");
        },
        getScript: function(e2, t2) {
          return ce.get(e2, void 0, t2, "script");
        }
      }), ce.each(["get", "post"], function(e2, i2) {
        ce[i2] = function(e3, t2, n2, r2) {
          return v(t2) && (r2 = r2 || n2, n2 = t2, t2 = void 0), ce.ajax(
            ce.extend(
              { url: e3, type: i2, dataType: r2, data: t2, success: n2 },
              ce.isPlainObject(e3) && e3
            )
          );
        };
      }), ce.ajaxPrefilter(function(e2) {
        var t2;
        for (t2 in e2.headers)
          "content-type" === t2.toLowerCase() && (e2.contentType = e2.headers[t2] || "");
      }), ce._evalUrl = function(e2, t2, n2) {
        return ce.ajax({
          url: e2,
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          converters: { "text script": function() {
          } },
          dataFilter: function(e3) {
            ce.globalEval(e3, t2, n2);
          }
        });
      }, ce.fn.extend({
        wrapAll: function(e2) {
          var t2;
          return this[0] && (v(e2) && (e2 = e2.call(this[0])), t2 = ce(e2, this[0].ownerDocument).eq(0).clone(true), this[0].parentNode && t2.insertBefore(this[0]), t2.map(function() {
            var e3 = this;
            while (e3.firstElementChild) e3 = e3.firstElementChild;
            return e3;
          }).append(this)), this;
        },
        wrapInner: function(n2) {
          return v(n2) ? this.each(function(e2) {
            ce(this).wrapInner(n2.call(this, e2));
          }) : this.each(function() {
            var e2 = ce(this), t2 = e2.contents();
            t2.length ? t2.wrapAll(n2) : e2.append(n2);
          });
        },
        wrap: function(t2) {
          var n2 = v(t2);
          return this.each(function(e2) {
            ce(this).wrapAll(n2 ? t2.call(this, e2) : t2);
          });
        },
        unwrap: function(e2) {
          return this.parent(e2).not("body").each(function() {
            ce(this).replaceWith(this.childNodes);
          }), this;
        }
      }), ce.expr.pseudos.hidden = function(e2) {
        return !ce.expr.pseudos.visible(e2);
      }, ce.expr.pseudos.visible = function(e2) {
        return !!(e2.offsetWidth || e2.offsetHeight || e2.getClientRects().length);
      }, ce.ajaxSettings.xhr = function() {
        try {
          return new ie.XMLHttpRequest();
        } catch (e2) {
        }
      };
      var Yt = { 0: 200, 1223: 204 }, Qt = ce.ajaxSettings.xhr();
      le.cors = !!Qt && "withCredentials" in Qt, le.ajax = Qt = !!Qt, ce.ajaxTransport(function(i2) {
        var o2, a2;
        if (le.cors || Qt && !i2.crossDomain)
          return {
            send: function(e2, t2) {
              var n2, r2 = i2.xhr();
              if (r2.open(i2.type, i2.url, i2.async, i2.username, i2.password), i2.xhrFields)
                for (n2 in i2.xhrFields) r2[n2] = i2.xhrFields[n2];
              for (n2 in i2.mimeType && r2.overrideMimeType && r2.overrideMimeType(i2.mimeType), i2.crossDomain || e2["X-Requested-With"] || (e2["X-Requested-With"] = "XMLHttpRequest"), e2)
                r2.setRequestHeader(n2, e2[n2]);
              o2 = function(e3) {
                return function() {
                  o2 && (o2 = a2 = r2.onload = r2.onerror = r2.onabort = r2.ontimeout = r2.onreadystatechange = null, "abort" === e3 ? r2.abort() : "error" === e3 ? "number" != typeof r2.status ? t2(0, "error") : t2(r2.status, r2.statusText) : t2(
                    Yt[r2.status] || r2.status,
                    r2.statusText,
                    "text" !== (r2.responseType || "text") || "string" != typeof r2.responseText ? { binary: r2.response } : { text: r2.responseText },
                    r2.getAllResponseHeaders()
                  ));
                };
              }, r2.onload = o2(), a2 = r2.onerror = r2.ontimeout = o2("error"), void 0 !== r2.onabort ? r2.onabort = a2 : r2.onreadystatechange = function() {
                4 === r2.readyState && ie.setTimeout(function() {
                  o2 && a2();
                });
              }, o2 = o2("abort");
              try {
                r2.send(i2.hasContent && i2.data || null);
              } catch (e3) {
                if (o2) throw e3;
              }
            },
            abort: function() {
              o2 && o2();
            }
          };
      }), ce.ajaxPrefilter(function(e2) {
        e2.crossDomain && (e2.contents.script = false);
      }), ce.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
          "text script": function(e2) {
            return ce.globalEval(e2), e2;
          }
        }
      }), ce.ajaxPrefilter("script", function(e2) {
        void 0 === e2.cache && (e2.cache = false), e2.crossDomain && (e2.type = "GET");
      }), ce.ajaxTransport("script", function(n2) {
        var r2, i2;
        if (n2.crossDomain || n2.scriptAttrs)
          return {
            send: function(e2, t2) {
              r2 = ce("<script>").attr(n2.scriptAttrs || {}).prop({ charset: n2.scriptCharset, src: n2.url }).on(
                "load error",
                i2 = function(e3) {
                  r2.remove(), i2 = null, e3 && t2("error" === e3.type ? 404 : 200, e3.type);
                }
              ), C.head.appendChild(r2[0]);
            },
            abort: function() {
              i2 && i2();
            }
          };
      });
      var Jt, Kt = [], Zt = /(=)\?(?=&|$)|\?\?/;
      ce.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var e2 = Kt.pop() || ce.expando + "_" + jt.guid++;
          return this[e2] = true, e2;
        }
      }), ce.ajaxPrefilter("json jsonp", function(e2, t2, n2) {
        var r2, i2, o2, a2 = false !== e2.jsonp && (Zt.test(e2.url) ? "url" : "string" == typeof e2.data && 0 === (e2.contentType || "").indexOf("application/x-www-form-urlencoded") && Zt.test(e2.data) && "data");
        if (a2 || "jsonp" === e2.dataTypes[0])
          return r2 = e2.jsonpCallback = v(e2.jsonpCallback) ? e2.jsonpCallback() : e2.jsonpCallback, a2 ? e2[a2] = e2[a2].replace(Zt, "$1" + r2) : false !== e2.jsonp && (e2.url += (At.test(e2.url) ? "&" : "?") + e2.jsonp + "=" + r2), e2.converters["script json"] = function() {
            return o2 || ce.error(r2 + " was not called"), o2[0];
          }, e2.dataTypes[0] = "json", i2 = ie[r2], ie[r2] = function() {
            o2 = arguments;
          }, n2.always(function() {
            void 0 === i2 ? ce(ie).removeProp(r2) : ie[r2] = i2, e2[r2] && (e2.jsonpCallback = t2.jsonpCallback, Kt.push(r2)), o2 && v(i2) && i2(o2[0]), o2 = i2 = void 0;
          }), "script";
      }), le.createHTMLDocument = ((Jt = C.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === Jt.childNodes.length), ce.parseHTML = function(e2, t2, n2) {
        return "string" != typeof e2 ? [] : ("boolean" == typeof t2 && (n2 = t2, t2 = false), t2 || (le.createHTMLDocument ? ((r2 = (t2 = C.implementation.createHTMLDocument("")).createElement(
          "base"
        )).href = C.location.href, t2.head.appendChild(r2)) : t2 = C), o2 = !n2 && [], (i2 = w.exec(e2)) ? [t2.createElement(i2[1])] : (i2 = Ae([e2], t2, o2), o2 && o2.length && ce(o2).remove(), ce.merge([], i2.childNodes)));
        var r2, i2, o2;
      }, ce.fn.load = function(e2, t2, n2) {
        var r2, i2, o2, a2 = this, s2 = e2.indexOf(" ");
        return -1 < s2 && (r2 = Tt(e2.slice(s2)), e2 = e2.slice(0, s2)), v(t2) ? (n2 = t2, t2 = void 0) : t2 && "object" == typeof t2 && (i2 = "POST"), 0 < a2.length && ce.ajax({ url: e2, type: i2 || "GET", dataType: "html", data: t2 }).done(function(e3) {
          o2 = arguments, a2.html(r2 ? ce("<div>").append(ce.parseHTML(e3)).find(r2) : e3);
        }).always(
          n2 && function(e3, t3) {
            a2.each(function() {
              n2.apply(this, o2 || [e3.responseText, t3, e3]);
            });
          }
        ), this;
      }, ce.expr.pseudos.animated = function(t2) {
        return ce.grep(ce.timers, function(e2) {
          return t2 === e2.elem;
        }).length;
      }, ce.offset = {
        setOffset: function(e2, t2, n2) {
          var r2, i2, o2, a2, s2, u2, l2 = ce.css(e2, "position"), c2 = ce(e2), f2 = {};
          "static" === l2 && (e2.style.position = "relative"), s2 = c2.offset(), o2 = ce.css(e2, "top"), u2 = ce.css(e2, "left"), ("absolute" === l2 || "fixed" === l2) && -1 < (o2 + u2).indexOf("auto") ? (a2 = (r2 = c2.position()).top, i2 = r2.left) : (a2 = parseFloat(o2) || 0, i2 = parseFloat(u2) || 0), v(t2) && (t2 = t2.call(e2, n2, ce.extend({}, s2))), null != t2.top && (f2.top = t2.top - s2.top + a2), null != t2.left && (f2.left = t2.left - s2.left + i2), "using" in t2 ? t2.using.call(e2, f2) : c2.css(f2);
        }
      }, ce.fn.extend({
        offset: function(t2) {
          if (arguments.length)
            return void 0 === t2 ? this : this.each(function(e3) {
              ce.offset.setOffset(this, t2, e3);
            });
          var e2, n2, r2 = this[0];
          return r2 ? r2.getClientRects().length ? (e2 = r2.getBoundingClientRect(), n2 = r2.ownerDocument.defaultView, { top: e2.top + n2.pageYOffset, left: e2.left + n2.pageXOffset }) : { top: 0, left: 0 } : void 0;
        },
        position: function() {
          if (this[0]) {
            var e2, t2, n2, r2 = this[0], i2 = { top: 0, left: 0 };
            if ("fixed" === ce.css(r2, "position")) t2 = r2.getBoundingClientRect();
            else {
              t2 = this.offset(), n2 = r2.ownerDocument, e2 = r2.offsetParent || n2.documentElement;
              while (e2 && (e2 === n2.body || e2 === n2.documentElement) && "static" === ce.css(e2, "position"))
                e2 = e2.parentNode;
              e2 && e2 !== r2 && 1 === e2.nodeType && ((i2 = ce(e2).offset()).top += ce.css(e2, "borderTopWidth", true), i2.left += ce.css(e2, "borderLeftWidth", true));
            }
            return {
              top: t2.top - i2.top - ce.css(r2, "marginTop", true),
              left: t2.left - i2.left - ce.css(r2, "marginLeft", true)
            };
          }
        },
        offsetParent: function() {
          return this.map(function() {
            var e2 = this.offsetParent;
            while (e2 && "static" === ce.css(e2, "position")) e2 = e2.offsetParent;
            return e2 || J;
          });
        }
      }), ce.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(t2, i2) {
        var o2 = "pageYOffset" === i2;
        ce.fn[t2] = function(e2) {
          return M(
            this,
            function(e3, t3, n2) {
              var r2;
              if (y(e3) ? r2 = e3 : 9 === e3.nodeType && (r2 = e3.defaultView), void 0 === n2)
                return r2 ? r2[i2] : e3[t3];
              r2 ? r2.scrollTo(o2 ? r2.pageXOffset : n2, o2 ? n2 : r2.pageYOffset) : e3[t3] = n2;
            },
            t2,
            e2,
            arguments.length
          );
        };
      }), ce.each(["top", "left"], function(e2, n2) {
        ce.cssHooks[n2] = Ye(le.pixelPosition, function(e3, t2) {
          if (t2) return t2 = Ge(e3, n2), _e.test(t2) ? ce(e3).position()[n2] + "px" : t2;
        });
      }), ce.each({ Height: "height", Width: "width" }, function(a2, s2) {
        ce.each({ padding: "inner" + a2, content: s2, "": "outer" + a2 }, function(r2, o2) {
          ce.fn[o2] = function(e2, t2) {
            var n2 = arguments.length && (r2 || "boolean" != typeof e2), i2 = r2 || (true === e2 || true === t2 ? "margin" : "border");
            return M(
              this,
              function(e3, t3, n3) {
                var r3;
                return y(e3) ? 0 === o2.indexOf("outer") ? e3["inner" + a2] : e3.document.documentElement["client" + a2] : 9 === e3.nodeType ? (r3 = e3.documentElement, Math.max(
                  e3.body["scroll" + a2],
                  r3["scroll" + a2],
                  e3.body["offset" + a2],
                  r3["offset" + a2],
                  r3["client" + a2]
                )) : void 0 === n3 ? ce.css(e3, t3, i2) : ce.style(e3, t3, n3, i2);
              },
              s2,
              n2 ? e2 : void 0,
              n2
            );
          };
        });
      }), ce.each(
        ["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"],
        function(e2, t2) {
          ce.fn[t2] = function(e3) {
            return this.on(t2, e3);
          };
        }
      ), ce.fn.extend({
        bind: function(e2, t2, n2) {
          return this.on(e2, null, t2, n2);
        },
        unbind: function(e2, t2) {
          return this.off(e2, null, t2);
        },
        delegate: function(e2, t2, n2, r2) {
          return this.on(t2, e2, n2, r2);
        },
        undelegate: function(e2, t2, n2) {
          return 1 === arguments.length ? this.off(e2, "**") : this.off(t2, e2 || "**", n2);
        },
        hover: function(e2, t2) {
          return this.on("mouseenter", e2).on("mouseleave", t2 || e2);
        }
      }), ce.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
          " "
        ),
        function(e2, n2) {
          ce.fn[n2] = function(e3, t2) {
            return 0 < arguments.length ? this.on(n2, null, e3, t2) : this.trigger(n2);
          };
        }
      );
      var en = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      ce.proxy = function(e2, t2) {
        var n2, r2, i2;
        if ("string" == typeof t2 && (n2 = e2[t2], t2 = e2, e2 = n2), v(e2))
          return r2 = ae.call(arguments, 2), (i2 = function() {
            return e2.apply(t2 || this, r2.concat(ae.call(arguments)));
          }).guid = e2.guid = e2.guid || ce.guid++, i2;
      }, ce.holdReady = function(e2) {
        e2 ? ce.readyWait++ : ce.ready(true);
      }, ce.isArray = Array.isArray, ce.parseJSON = JSON.parse, ce.nodeName = fe, ce.isFunction = v, ce.isWindow = y, ce.camelCase = F, ce.type = x, ce.now = Date.now, ce.isNumeric = function(e2) {
        var t2 = ce.type(e2);
        return ("number" === t2 || "string" === t2) && !isNaN(e2 - parseFloat(e2));
      }, ce.trim = function(e2) {
        return null == e2 ? "" : (e2 + "").replace(en, "$1");
      }, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ce;
      });
      var tn = ie.jQuery, nn = ie.$;
      return ce.noConflict = function(e2) {
        return ie.$ === ce && (ie.$ = nn), e2 && ie.jQuery === ce && (ie.jQuery = tn), ce;
      }, "undefined" == typeof e && (ie.jQuery = ie.$ = ce), ce;
    });

    each(components, (component, name) => App.component(name, component));
    boot(App);

    each(components$1, (component, name) => App.component(name, component));

    return App;

}));

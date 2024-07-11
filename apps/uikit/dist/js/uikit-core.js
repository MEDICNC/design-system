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
    const pointerDown = hasPointerEvents ? "pointerdown" : hasTouch ? "touchstart" : "mousedown";
    const pointerMove = hasPointerEvents ? "pointermove" : hasTouch ? "touchmove" : "mousemove";
    const pointerUp = hasPointerEvents ? "pointerup" : hasTouch ? "touchend" : "mouseup";
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
    function filter(element, selector) {
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
      return selector ? filter(children2, selector) : children2;
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
      element = $$1(element);
      element.innerHTML = "";
      return element;
    }
    function html(parent2, html2) {
      return isUndefined(html2) ? $$1(parent2).innerHTML : append(empty(parent2), html2);
    }
    const prepend = applyFn("prepend");
    const append = applyFn("append");
    const before = applyFn("before");
    const after = applyFn("after");
    function applyFn(fn) {
      return function(ref, element) {
        var _a;
        const nodes = toNodes(isString(element) ? fragment(element) : element);
        (_a = $$1(ref)) == null ? void 0 : _a[fn](...nodes);
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
    function $$1(selector, context) {
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
    function dimensions(element) {
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
      const currentOffset = dimensions(element);
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
          unit === "vh" ? getViewportHeight() : unit === "vw" ? width(toWindow(element)) : offsetDim ? element[`offset${ucfirst(property)}`] : dimensions(element)[property],
          value2
        ) : value2;
      });
    }
    const calcRe = /-?\d+(?:\.\d+)?(?:v[wh]|%|px)?/g;
    const parseCalc = memoize((calc) => calc.toString().replace(/\s/g, "").match(calcRe) || []);
    const unitRe = /(?:v[hw]|%)$/;
    const parseUnit = memoize((str) => (str.match(unitRe) || [])[0]);
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
        vhEl = $$1("<div>");
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
        const p = dimensions(target);
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
      const { left, width, top } = dimensions(target);
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
        $: $$1,
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
        dimensions: dimensions,
        each: each,
        empty: empty,
        endsWith: endsWith,
        escape: escape,
        fastdom: fastdom,
        filter: filter,
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
        pointerDown: pointerDown,
        pointerEnter: pointerEnter,
        pointerLeave: pointerLeave,
        pointerMove: pointerMove,
        pointerUp: pointerUp,
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
    const components$1 = {};
    function component(name, options) {
      var _a, _b;
      const id = PREFIX + hyphenate(name);
      if (!options) {
        if (!components$1[id].options) {
          components$1[id] = App.extend(components$1[id]);
        }
        return components$1[id];
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
      return components$1[id] = opt;
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
      const cmp = components$1[attribute];
      return cmp && (cmp.options || cmp).name;
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
          container = $$1(element);
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

    globalApi(App);
    instanceApi(App);

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
            disconnect: on(target, pointerDown, handler, { passive: true })
          };
        },
        handler(e) {
          if (!isTouch(e)) {
            return;
          }
          const pos = getEventPos(e);
          const target = "tagName" in e.target ? e.target : parent(e.target);
          once(document, `${pointerUp} ${pointerCancel} scroll`, (e2) => {
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

    var Class = {
      connected() {
        addClass(this.$el, this.$options.id);
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
      let currentDim = dimensions(el)[dimProp];
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
      const dim = dimensions(el);
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
          return this.items.map((item) => $$1(toggle, item));
        },
        contents({ content }) {
          return this.items.map((item) => {
            var _a;
            return ((_a = item._wrapper) == null ? void 0 : _a.firstElementChild) || $$1(content, item);
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
        const activeItems = filter(this.items, `.${this.clsOpen}`);
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
          const activeItems = filter(this.items, `.${this.clsOpen}`);
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
                  hide($$1(this.content, el2), !show);
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
      content = ((_a = el._wrapper) == null ? void 0 : _a.firstElementChild) || $$1(content, el);
      if (!el._wrapper) {
        el._wrapper = wrapAll(content, "<div>");
      }
      const wrapper = el._wrapper;
      css(wrapper, "overflow", "hidden");
      const currentHeight = toFloat(css(wrapper, "height"));
      await Transition.cancel(wrapper);
      hide(content, false);
      const endHeight = sumBy(["marginTop", "marginBottom"], (prop) => css(content, prop)) + dimensions(content).height;
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
          const { top } = dimensions(el);
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
          await this.toggleElement(this.$el, false, animate$1);
          this.$destroy(true);
        }
      }
    };
    function animate$1(el, show, { duration, transition, velocity }) {
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
        input: (_, $el) => $$1(selInput, $el),
        state() {
          return this.input.nextElementSibling;
        },
        target({ target }, $el) {
          return target && (target === true && parent(this.input) === $el && this.input.nextElementSibling || $$1(target, $el));
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

    function getMaxPathLength(el) {
      return isVisible(el) ? Math.ceil(Math.max(0, ...$$("[stroke]", el).map((stroke) => stroke.getTotalLength()))) : 0;
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
            css($$1("circle", icon), "strokeWidth", 1 / this.ratio);
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
          return container === true && this.$container || container && $$1(container);
        }
      }
    };

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
        panel: ({ selPanel }, $el) => $$1(selPanel, $el),
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
            if (!defaultPrevented && hash && isSameSiteAnchor(current) && !this.$el.contains($$1(hash))) {
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
          return this.toggleElement(this.$el, true, animate);
        },
        hide() {
          return this.toggleElement(this.$el, false, animate);
        }
      }
    };
    function animate(el, show, { transitionElement, _toggle }) {
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
      return on(document, pointerDown, ({ target }) => {
        if (last(active) !== modal || modal.overlay && !modal.$el.contains(target) || modal.panel.contains(target)) {
          return;
        }
        once(
          document,
          `${pointerUp} ${pointerCancel} scroll`,
          ({ defaultPrevented, type, target: newTarget }) => {
            if (!defaultPrevented && type === pointerUp && target === newTarget) {
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
        const dialog = modal($$1(`<div><div class="uk-modal-dialog">${content}</div></div>`), {
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
        const input = $$1("input", $el);
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
        target: ({ selTarget }, $el) => selTarget && $$1(selTarget, $el) || $el
      },
      connected() {
        this.start = coerce(this.start || this.top);
        this.end = coerce(this.end || this.bottom);
        this.placeholder = $$1("+ .uk-sticky-placeholder", this.$el) || $$1('<div class="uk-sticky-placeholder"></div>');
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
              const targetOffset = offset($$1(location.hash));
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
          name: pointerDown,
          filter: ({ mode }) => includes(mode, "hover"),
          handler(e) {
            this._preventClick = null;
            if (!isTouch(e) || isBoolean(this._showState) || this.$el.disabled) {
              return;
            }
            trigger(this.$el, "focus");
            once(
              document,
              pointerDown,
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

    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(require("jquery")) : typeof define === "function" && define.amd ? define(["jquery"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.jQuery));
    })(undefined, function($$e) {
      function _iterableToArrayLimit(arr, i) {
        var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
        if (null != _i) {
          var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
          try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) ; else
              for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
          } catch (err) {
            _d = true, _e = err;
          } finally {
            try {
              if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
      }
      function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
          return typeof obj2;
        } : function(obj2) {
          return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
        }, _typeof(obj);
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
          Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
      }
      function _toConsumableArray(arr) {
        return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
      }
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
      }
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
      }
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return _arrayLikeToArray(o, minLen);
      }
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }
      function _nonIterableSpread() {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      function _nonIterableRest() {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      }
      function _createForOfIteratorHelper(o, allowArrayLike) {
        var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
        if (!it) {
          if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike  ) {
            if (it) o = it;
            var i = 0;
            var F = function() {
            };
            return {
              s: F,
              n: function() {
                if (i >= o.length)
                  return {
                    done: true
                  };
                return {
                  done: false,
                  value: o[i++]
                };
              },
              e: function(e) {
                throw e;
              },
              f: F
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var normalCompletion = true, didErr = false, err;
        return {
          s: function() {
            it = it.call(o);
          },
          n: function() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
          },
          e: function(e) {
            didErr = true;
            err = e;
          },
          f: function() {
            try {
              if (!normalCompletion && it.return != null) it.return();
            } finally {
              if (didErr) throw err;
            }
          }
        };
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint );
          if (typeof res !== "object") return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (String )(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
      var check = function(it) {
        return it && it.Math == Math && it;
      };
      var global$f = (
        // eslint-disable-next-line es/no-global-this -- safe
        check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
        check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
        /* @__PURE__ */ function() {
          return this;
        }() || commonjsGlobal || Function("return this")()
      );
      var objectGetOwnPropertyDescriptor = {};
      var fails$n = function(exec2) {
        try {
          return !!exec2();
        } catch (error) {
          return true;
        }
      };
      var fails$m = fails$n;
      var descriptors = !fails$m(function() {
        return Object.defineProperty({}, 1, {
          get: function() {
            return 7;
          }
        })[1] != 7;
      });
      var fails$l = fails$n;
      var functionBindNative = !fails$l(function() {
        var test2 = (function() {
        }).bind();
        return typeof test2 != "function" || test2.hasOwnProperty("prototype");
      });
      var NATIVE_BIND$3 = functionBindNative;
      var call$c = Function.prototype.call;
      var functionCall = NATIVE_BIND$3 ? call$c.bind(call$c) : function() {
        return call$c.apply(call$c, arguments);
      };
      var objectPropertyIsEnumerable = {};
      var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
      var NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);
      objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable2(V) {
        var descriptor = getOwnPropertyDescriptor$1(this, V);
        return !!descriptor && descriptor.enumerable;
      } : $propertyIsEnumerable$1;
      var createPropertyDescriptor$3 = function(bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value
        };
      };
      var NATIVE_BIND$2 = functionBindNative;
      var FunctionPrototype$3 = Function.prototype;
      var call$b = FunctionPrototype$3.call;
      var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$3.bind.bind(call$b, call$b);
      var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function(fn) {
        return function() {
          return call$b.apply(fn, arguments);
        };
      };
      var uncurryThis$p = functionUncurryThis;
      var toString$a = uncurryThis$p({}.toString);
      var stringSlice$6 = uncurryThis$p("".slice);
      var classofRaw$2 = function(it) {
        return stringSlice$6(toString$a(it), 8, -1);
      };
      var uncurryThis$o = functionUncurryThis;
      var fails$k = fails$n;
      var classof$8 = classofRaw$2;
      var $Object$3 = Object;
      var split = uncurryThis$o("".split);
      var indexedObject = fails$k(function() {
        return !$Object$3("z").propertyIsEnumerable(0);
      }) ? function(it) {
        return classof$8(it) == "String" ? split(it, "") : $Object$3(it);
      } : $Object$3;
      var isNullOrUndefined$6 = function(it) {
        return it === null || it === void 0;
      };
      var isNullOrUndefined$5 = isNullOrUndefined$6;
      var $TypeError$a = TypeError;
      var requireObjectCoercible$8 = function(it) {
        if (isNullOrUndefined$5(it)) throw $TypeError$a("Can't call method on " + it);
        return it;
      };
      var IndexedObject$4 = indexedObject;
      var requireObjectCoercible$7 = requireObjectCoercible$8;
      var toIndexedObject$7 = function(it) {
        return IndexedObject$4(requireObjectCoercible$7(it));
      };
      var documentAll$2 = typeof document == "object" && document.all;
      var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
      var documentAll_1 = {
        all: documentAll$2,
        IS_HTMLDDA
      };
      var $documentAll$1 = documentAll_1;
      var documentAll$1 = $documentAll$1.all;
      var isCallable$e = $documentAll$1.IS_HTMLDDA ? function(argument) {
        return typeof argument == "function" || argument === documentAll$1;
      } : function(argument) {
        return typeof argument == "function";
      };
      var isCallable$d = isCallable$e;
      var $documentAll = documentAll_1;
      var documentAll = $documentAll.all;
      var isObject$9 = $documentAll.IS_HTMLDDA ? function(it) {
        return typeof it == "object" ? it !== null : isCallable$d(it) || it === documentAll;
      } : function(it) {
        return typeof it == "object" ? it !== null : isCallable$d(it);
      };
      var global$e = global$f;
      var isCallable$c = isCallable$e;
      var aFunction = function(argument) {
        return isCallable$c(argument) ? argument : void 0;
      };
      var getBuiltIn$4 = function(namespace, method) {
        return arguments.length < 2 ? aFunction(global$e[namespace]) : global$e[namespace] && global$e[namespace][method];
      };
      var uncurryThis$n = functionUncurryThis;
      var objectIsPrototypeOf = uncurryThis$n({}.isPrototypeOf);
      var engineUserAgent = typeof navigator != "undefined" && String(navigator.userAgent) || "";
      var global$d = global$f;
      var userAgent = engineUserAgent;
      var process$1 = global$d.process;
      var Deno = global$d.Deno;
      var versions = process$1 && process$1.versions || Deno && Deno.version;
      var v8 = versions && versions.v8;
      var match, version;
      if (v8) {
        match = v8.split(".");
        version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
      }
      if (!version && userAgent) {
        match = userAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = userAgent.match(/Chrome\/(\d+)/);
          if (match) version = +match[1];
        }
      }
      var engineV8Version = version;
      var V8_VERSION$2 = engineV8Version;
      var fails$j = fails$n;
      var global$c = global$f;
      var $String$4 = global$c.String;
      var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$j(function() {
        var symbol = Symbol();
        return !$String$4(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
        !Symbol.sham && V8_VERSION$2 && V8_VERSION$2 < 41;
      });
      var NATIVE_SYMBOL$1 = symbolConstructorDetection;
      var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && typeof Symbol.iterator == "symbol";
      var getBuiltIn$3 = getBuiltIn$4;
      var isCallable$b = isCallable$e;
      var isPrototypeOf$1 = objectIsPrototypeOf;
      var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
      var $Object$2 = Object;
      var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(it) {
        return typeof it == "symbol";
      } : function(it) {
        var $Symbol = getBuiltIn$3("Symbol");
        return isCallable$b($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
      };
      var $String$3 = String;
      var tryToString$2 = function(argument) {
        try {
          return $String$3(argument);
        } catch (error) {
          return "Object";
        }
      };
      var isCallable$a = isCallable$e;
      var tryToString$1 = tryToString$2;
      var $TypeError$9 = TypeError;
      var aCallable$3 = function(argument) {
        if (isCallable$a(argument)) return argument;
        throw $TypeError$9(tryToString$1(argument) + " is not a function");
      };
      var aCallable$2 = aCallable$3;
      var isNullOrUndefined$4 = isNullOrUndefined$6;
      var getMethod$4 = function(V, P) {
        var func = V[P];
        return isNullOrUndefined$4(func) ? void 0 : aCallable$2(func);
      };
      var call$a = functionCall;
      var isCallable$9 = isCallable$e;
      var isObject$8 = isObject$9;
      var $TypeError$8 = TypeError;
      var ordinaryToPrimitive$1 = function(input, pref) {
        var fn, val;
        if (pref === "string" && isCallable$9(fn = input.toString) && !isObject$8(val = call$a(fn, input)))
          return val;
        if (isCallable$9(fn = input.valueOf) && !isObject$8(val = call$a(fn, input)))
          return val;
        if (pref !== "string" && isCallable$9(fn = input.toString) && !isObject$8(val = call$a(fn, input)))
          return val;
        throw $TypeError$8("Can't convert object to primitive value");
      };
      var shared$4 = { exports: {} };
      var global$b = global$f;
      var defineProperty$4 = Object.defineProperty;
      var defineGlobalProperty$3 = function(key, value) {
        try {
          defineProperty$4(global$b, key, { value, configurable: true, writable: true });
        } catch (error) {
          global$b[key] = value;
        }
        return value;
      };
      var global$a = global$f;
      var defineGlobalProperty$2 = defineGlobalProperty$3;
      var SHARED = "__core-js_shared__";
      var store$3 = global$a[SHARED] || defineGlobalProperty$2(SHARED, {});
      var sharedStore = store$3;
      var store$2 = sharedStore;
      (shared$4.exports = function(key, value) {
        return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
      })("versions", []).push({
        version: "3.30.2",
        mode: "global",
        copyright: "\xA9 2014-2023 Denis Pushkarev (zloirock.ru)",
        license: "https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE",
        source: "https://github.com/zloirock/core-js"
      });
      var sharedExports = shared$4.exports;
      var requireObjectCoercible$6 = requireObjectCoercible$8;
      var $Object$1 = Object;
      var toObject$7 = function(argument) {
        return $Object$1(requireObjectCoercible$6(argument));
      };
      var uncurryThis$m = functionUncurryThis;
      var toObject$6 = toObject$7;
      var hasOwnProperty = uncurryThis$m({}.hasOwnProperty);
      var hasOwnProperty_1 = Object.hasOwn || function hasOwn2(it, key) {
        return hasOwnProperty(toObject$6(it), key);
      };
      var uncurryThis$l = functionUncurryThis;
      var id = 0;
      var postfix = Math.random();
      var toString$9 = uncurryThis$l(1 .toString);
      var uid$2 = function(key) {
        return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$9(++id + postfix, 36);
      };
      var global$9 = global$f;
      var shared$3 = sharedExports;
      var hasOwn$7 = hasOwnProperty_1;
      var uid$1 = uid$2;
      var NATIVE_SYMBOL = symbolConstructorDetection;
      var USE_SYMBOL_AS_UID = useSymbolAsUid;
      var Symbol$1 = global$9.Symbol;
      var WellKnownSymbolsStore = shared$3("wks");
      var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1["for"] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;
      var wellKnownSymbol$d = function(name) {
        if (!hasOwn$7(WellKnownSymbolsStore, name)) {
          WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$7(Symbol$1, name) ? Symbol$1[name] : createWellKnownSymbol("Symbol." + name);
        }
        return WellKnownSymbolsStore[name];
      };
      var call$9 = functionCall;
      var isObject$7 = isObject$9;
      var isSymbol$1 = isSymbol$2;
      var getMethod$3 = getMethod$4;
      var ordinaryToPrimitive = ordinaryToPrimitive$1;
      var wellKnownSymbol$c = wellKnownSymbol$d;
      var $TypeError$7 = TypeError;
      var TO_PRIMITIVE = wellKnownSymbol$c("toPrimitive");
      var toPrimitive$1 = function(input, pref) {
        if (!isObject$7(input) || isSymbol$1(input)) return input;
        var exoticToPrim = getMethod$3(input, TO_PRIMITIVE);
        var result;
        if (exoticToPrim) {
          if (pref === void 0) pref = "default";
          result = call$9(exoticToPrim, input, pref);
          if (!isObject$7(result) || isSymbol$1(result)) return result;
          throw $TypeError$7("Can't convert object to primitive value");
        }
        if (pref === void 0) pref = "number";
        return ordinaryToPrimitive(input, pref);
      };
      var toPrimitive = toPrimitive$1;
      var isSymbol = isSymbol$2;
      var toPropertyKey$3 = function(argument) {
        var key = toPrimitive(argument, "string");
        return isSymbol(key) ? key : key + "";
      };
      var global$8 = global$f;
      var isObject$6 = isObject$9;
      var document$1 = global$8.document;
      var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);
      var documentCreateElement$2 = function(it) {
        return EXISTS$1 ? document$1.createElement(it) : {};
      };
      var DESCRIPTORS$a = descriptors;
      var fails$i = fails$n;
      var createElement = documentCreateElement$2;
      var ie8DomDefine = !DESCRIPTORS$a && !fails$i(function() {
        return Object.defineProperty(createElement("div"), "a", {
          get: function() {
            return 7;
          }
        }).a != 7;
      });
      var DESCRIPTORS$9 = descriptors;
      var call$8 = functionCall;
      var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
      var createPropertyDescriptor$2 = createPropertyDescriptor$3;
      var toIndexedObject$6 = toIndexedObject$7;
      var toPropertyKey$2 = toPropertyKey$3;
      var hasOwn$6 = hasOwnProperty_1;
      var IE8_DOM_DEFINE$1 = ie8DomDefine;
      var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
      objectGetOwnPropertyDescriptor.f = DESCRIPTORS$9 ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor2(O, P) {
        O = toIndexedObject$6(O);
        P = toPropertyKey$2(P);
        if (IE8_DOM_DEFINE$1)
          try {
            return $getOwnPropertyDescriptor$1(O, P);
          } catch (error) {
          }
        if (hasOwn$6(O, P))
          return createPropertyDescriptor$2(
            !call$8(propertyIsEnumerableModule$1.f, O, P),
            O[P]
          );
      };
      var objectDefineProperty = {};
      var DESCRIPTORS$8 = descriptors;
      var fails$h = fails$n;
      var v8PrototypeDefineBug = DESCRIPTORS$8 && fails$h(function() {
        return Object.defineProperty(
          function() {
          },
          "prototype",
          {
            value: 42,
            writable: false
          }
        ).prototype != 42;
      });
      var isObject$5 = isObject$9;
      var $String$2 = String;
      var $TypeError$6 = TypeError;
      var anObject$b = function(argument) {
        if (isObject$5(argument)) return argument;
        throw $TypeError$6($String$2(argument) + " is not an object");
      };
      var DESCRIPTORS$7 = descriptors;
      var IE8_DOM_DEFINE = ie8DomDefine;
      var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
      var anObject$a = anObject$b;
      var toPropertyKey$1 = toPropertyKey$3;
      var $TypeError$5 = TypeError;
      var $defineProperty = Object.defineProperty;
      var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      var ENUMERABLE = "enumerable";
      var CONFIGURABLE$1 = "configurable";
      var WRITABLE = "writable";
      objectDefineProperty.f = DESCRIPTORS$7 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty2(O, P, Attributes) {
        anObject$a(O);
        P = toPropertyKey$1(P);
        anObject$a(Attributes);
        if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
          var current = $getOwnPropertyDescriptor(O, P);
          if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
              configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
              enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
              writable: false
            };
          }
        }
        return $defineProperty(O, P, Attributes);
      } : $defineProperty : function defineProperty2(O, P, Attributes) {
        anObject$a(O);
        P = toPropertyKey$1(P);
        anObject$a(Attributes);
        if (IE8_DOM_DEFINE)
          try {
            return $defineProperty(O, P, Attributes);
          } catch (error) {
          }
        if ("get" in Attributes || "set" in Attributes)
          throw $TypeError$5("Accessors not supported");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };
      var DESCRIPTORS$6 = descriptors;
      var definePropertyModule$4 = objectDefineProperty;
      var createPropertyDescriptor$1 = createPropertyDescriptor$3;
      var createNonEnumerableProperty$4 = DESCRIPTORS$6 ? function(object, key, value) {
        return definePropertyModule$4.f(object, key, createPropertyDescriptor$1(1, value));
      } : function(object, key, value) {
        object[key] = value;
        return object;
      };
      var makeBuiltIn$3 = { exports: {} };
      var DESCRIPTORS$5 = descriptors;
      var hasOwn$5 = hasOwnProperty_1;
      var FunctionPrototype$2 = Function.prototype;
      var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;
      var EXISTS = hasOwn$5(FunctionPrototype$2, "name");
      var PROPER = EXISTS && (function something() {
      }).name === "something";
      var CONFIGURABLE = EXISTS && (!DESCRIPTORS$5 || DESCRIPTORS$5 && getDescriptor(FunctionPrototype$2, "name").configurable);
      var functionName = {
        EXISTS,
        PROPER,
        CONFIGURABLE
      };
      var uncurryThis$k = functionUncurryThis;
      var isCallable$8 = isCallable$e;
      var store$1 = sharedStore;
      var functionToString$1 = uncurryThis$k(Function.toString);
      if (!isCallable$8(store$1.inspectSource)) {
        store$1.inspectSource = function(it) {
          return functionToString$1(it);
        };
      }
      var inspectSource$2 = store$1.inspectSource;
      var global$7 = global$f;
      var isCallable$7 = isCallable$e;
      var WeakMap$1 = global$7.WeakMap;
      var weakMapBasicDetection = isCallable$7(WeakMap$1) && /native code/.test(String(WeakMap$1));
      var shared$2 = sharedExports;
      var uid = uid$2;
      var keys = shared$2("keys");
      var sharedKey$2 = function(key) {
        return keys[key] || (keys[key] = uid(key));
      };
      var hiddenKeys$4 = {};
      var NATIVE_WEAK_MAP = weakMapBasicDetection;
      var global$6 = global$f;
      var isObject$4 = isObject$9;
      var createNonEnumerableProperty$3 = createNonEnumerableProperty$4;
      var hasOwn$4 = hasOwnProperty_1;
      var shared$1 = sharedStore;
      var sharedKey$1 = sharedKey$2;
      var hiddenKeys$3 = hiddenKeys$4;
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var TypeError$1 = global$6.TypeError;
      var WeakMap = global$6.WeakMap;
      var set, get, has;
      var enforce = function(it) {
        return has(it) ? get(it) : set(it, {});
      };
      var getterFor = function(TYPE) {
        return function(it) {
          var state;
          if (!isObject$4(it) || (state = get(it)).type !== TYPE) {
            throw TypeError$1("Incompatible receiver, " + TYPE + " required");
          }
          return state;
        };
      };
      if (NATIVE_WEAK_MAP || shared$1.state) {
        var store = shared$1.state || (shared$1.state = new WeakMap());
        store.get = store.get;
        store.has = store.has;
        store.set = store.set;
        set = function(it, metadata) {
          if (store.has(it)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          store.set(it, metadata);
          return metadata;
        };
        get = function(it) {
          return store.get(it) || {};
        };
        has = function(it) {
          return store.has(it);
        };
      } else {
        var STATE = sharedKey$1("state");
        hiddenKeys$3[STATE] = true;
        set = function(it, metadata) {
          if (hasOwn$4(it, STATE)) throw TypeError$1(OBJECT_ALREADY_INITIALIZED);
          metadata.facade = it;
          createNonEnumerableProperty$3(it, STATE, metadata);
          return metadata;
        };
        get = function(it) {
          return hasOwn$4(it, STATE) ? it[STATE] : {};
        };
        has = function(it) {
          return hasOwn$4(it, STATE);
        };
      }
      var internalState = {
        set,
        get,
        has,
        enforce,
        getterFor
      };
      var uncurryThis$j = functionUncurryThis;
      var fails$g = fails$n;
      var isCallable$6 = isCallable$e;
      var hasOwn$3 = hasOwnProperty_1;
      var DESCRIPTORS$4 = descriptors;
      var CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE;
      var inspectSource$1 = inspectSource$2;
      var InternalStateModule = internalState;
      var enforceInternalState = InternalStateModule.enforce;
      var getInternalState$1 = InternalStateModule.get;
      var $String$1 = String;
      var defineProperty$3 = Object.defineProperty;
      var stringSlice$5 = uncurryThis$j("".slice);
      var replace$3 = uncurryThis$j("".replace);
      var join = uncurryThis$j([].join);
      var CONFIGURABLE_LENGTH = DESCRIPTORS$4 && !fails$g(function() {
        return defineProperty$3(
          function() {
          },
          "length",
          { value: 8 }
        ).length !== 8;
      });
      var TEMPLATE = String(String).split("String");
      var makeBuiltIn$2 = makeBuiltIn$3.exports = function(value, name, options) {
        if (stringSlice$5($String$1(name), 0, 7) === "Symbol(") {
          name = "[" + replace$3($String$1(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
        }
        if (options && options.getter) name = "get " + name;
        if (options && options.setter) name = "set " + name;
        if (!hasOwn$3(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
          if (DESCRIPTORS$4) defineProperty$3(value, "name", { value: name, configurable: true });
          else value.name = name;
        }
        if (CONFIGURABLE_LENGTH && options && hasOwn$3(options, "arity") && value.length !== options.arity) {
          defineProperty$3(value, "length", { value: options.arity });
        }
        try {
          if (options && hasOwn$3(options, "constructor") && options.constructor) {
            if (DESCRIPTORS$4) defineProperty$3(value, "prototype", { writable: false });
          } else if (value.prototype) value.prototype = void 0;
        } catch (error) {
        }
        var state = enforceInternalState(value);
        if (!hasOwn$3(state, "source")) {
          state.source = join(TEMPLATE, typeof name == "string" ? name : "");
        }
        return value;
      };
      Function.prototype.toString = makeBuiltIn$2(function toString2() {
        return isCallable$6(this) && getInternalState$1(this).source || inspectSource$1(this);
      }, "toString");
      var makeBuiltInExports = makeBuiltIn$3.exports;
      var isCallable$5 = isCallable$e;
      var definePropertyModule$3 = objectDefineProperty;
      var makeBuiltIn$1 = makeBuiltInExports;
      var defineGlobalProperty$1 = defineGlobalProperty$3;
      var defineBuiltIn$4 = function(O, key, value, options) {
        if (!options) options = {};
        var simple = options.enumerable;
        var name = options.name !== void 0 ? options.name : key;
        if (isCallable$5(value)) makeBuiltIn$1(value, name, options);
        if (options.global) {
          if (simple) O[key] = value;
          else defineGlobalProperty$1(key, value);
        } else {
          try {
            if (!options.unsafe) delete O[key];
            else if (O[key]) simple = true;
          } catch (error) {
          }
          if (simple) O[key] = value;
          else
            definePropertyModule$3.f(O, key, {
              value,
              enumerable: false,
              configurable: !options.nonConfigurable,
              writable: !options.nonWritable
            });
        }
        return O;
      };
      var objectGetOwnPropertyNames = {};
      var ceil = Math.ceil;
      var floor$1 = Math.floor;
      var mathTrunc = Math.trunc || function trunc2(x) {
        var n = +x;
        return (n > 0 ? floor$1 : ceil)(n);
      };
      var trunc = mathTrunc;
      var toIntegerOrInfinity$4 = function(argument) {
        var number = +argument;
        return number !== number || number === 0 ? 0 : trunc(number);
      };
      var toIntegerOrInfinity$3 = toIntegerOrInfinity$4;
      var max$3 = Math.max;
      var min$3 = Math.min;
      var toAbsoluteIndex$3 = function(index, length) {
        var integer = toIntegerOrInfinity$3(index);
        return integer < 0 ? max$3(integer + length, 0) : min$3(integer, length);
      };
      var toIntegerOrInfinity$2 = toIntegerOrInfinity$4;
      var min$2 = Math.min;
      var toLength$3 = function(argument) {
        return argument > 0 ? min$2(toIntegerOrInfinity$2(argument), 9007199254740991) : 0;
      };
      var toLength$2 = toLength$3;
      var lengthOfArrayLike$6 = function(obj) {
        return toLength$2(obj.length);
      };
      var toIndexedObject$5 = toIndexedObject$7;
      var toAbsoluteIndex$2 = toAbsoluteIndex$3;
      var lengthOfArrayLike$5 = lengthOfArrayLike$6;
      var createMethod$5 = function(IS_INCLUDES) {
        return function($this, el, fromIndex) {
          var O = toIndexedObject$5($this);
          var length = lengthOfArrayLike$5(O);
          var index = toAbsoluteIndex$2(fromIndex, length);
          var value;
          if (IS_INCLUDES && el != el)
            while (length > index) {
              value = O[index++];
              if (value != value) return true;
            }
          else
            for (; length > index; index++) {
              if ((IS_INCLUDES || index in O) && O[index] === el)
                return IS_INCLUDES || index || 0;
            }
          return !IS_INCLUDES && -1;
        };
      };
      var arrayIncludes = {
        // `Array.prototype.includes` method
        // https://tc39.es/ecma262/#sec-array.prototype.includes
        includes: createMethod$5(true),
        // `Array.prototype.indexOf` method
        // https://tc39.es/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod$5(false)
      };
      var uncurryThis$i = functionUncurryThis;
      var hasOwn$2 = hasOwnProperty_1;
      var toIndexedObject$4 = toIndexedObject$7;
      var indexOf$1 = arrayIncludes.indexOf;
      var hiddenKeys$2 = hiddenKeys$4;
      var push$4 = uncurryThis$i([].push);
      var objectKeysInternal = function(object, names) {
        var O = toIndexedObject$4(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) !hasOwn$2(hiddenKeys$2, key) && hasOwn$2(O, key) && push$4(result, key);
        while (names.length > i)
          if (hasOwn$2(O, key = names[i++])) {
            ~indexOf$1(result, key) || push$4(result, key);
          }
        return result;
      };
      var enumBugKeys$3 = [
        "constructor",
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toLocaleString",
        "toString",
        "valueOf"
      ];
      var internalObjectKeys$1 = objectKeysInternal;
      var enumBugKeys$2 = enumBugKeys$3;
      var hiddenKeys$1 = enumBugKeys$2.concat("length", "prototype");
      objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return internalObjectKeys$1(O, hiddenKeys$1);
      };
      var objectGetOwnPropertySymbols = {};
      objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
      var getBuiltIn$2 = getBuiltIn$4;
      var uncurryThis$h = functionUncurryThis;
      var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
      var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
      var anObject$9 = anObject$b;
      var concat$2 = uncurryThis$h([].concat);
      var ownKeys$1 = getBuiltIn$2("Reflect", "ownKeys") || function ownKeys2(it) {
        var keys2 = getOwnPropertyNamesModule.f(anObject$9(it));
        var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
        return getOwnPropertySymbols ? concat$2(keys2, getOwnPropertySymbols(it)) : keys2;
      };
      var hasOwn$1 = hasOwnProperty_1;
      var ownKeys = ownKeys$1;
      var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
      var definePropertyModule$2 = objectDefineProperty;
      var copyConstructorProperties$1 = function(target, source, exceptions) {
        var keys2 = ownKeys(source);
        var defineProperty2 = definePropertyModule$2.f;
        var getOwnPropertyDescriptor2 = getOwnPropertyDescriptorModule.f;
        for (var i = 0; i < keys2.length; i++) {
          var key = keys2[i];
          if (!hasOwn$1(target, key) && !(exceptions && hasOwn$1(exceptions, key))) {
            defineProperty2(target, key, getOwnPropertyDescriptor2(source, key));
          }
        }
      };
      var fails$f = fails$n;
      var isCallable$4 = isCallable$e;
      var replacement = /#|\.prototype\./;
      var isForced$1 = function(feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : isCallable$4(detection) ? fails$f(detection) : !!detection;
      };
      var normalize = isForced$1.normalize = function(string) {
        return String(string).replace(replacement, ".").toLowerCase();
      };
      var data = isForced$1.data = {};
      var NATIVE = isForced$1.NATIVE = "N";
      var POLYFILL = isForced$1.POLYFILL = "P";
      var isForced_1 = isForced$1;
      var global$5 = global$f;
      var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
      var createNonEnumerableProperty$2 = createNonEnumerableProperty$4;
      var defineBuiltIn$3 = defineBuiltIn$4;
      var defineGlobalProperty = defineGlobalProperty$3;
      var copyConstructorProperties = copyConstructorProperties$1;
      var isForced = isForced_1;
      var _export = function(options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED2, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global$5;
        } else if (STATIC) {
          target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
        } else {
          target = (global$5[TARGET] || {}).prototype;
        }
        if (target)
          for (key in source) {
            sourceProperty = source[key];
            if (options.dontCallGetSet) {
              descriptor = getOwnPropertyDescriptor(target, key);
              targetProperty = descriptor && descriptor.value;
            } else targetProperty = target[key];
            FORCED2 = isForced(
              GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
              options.forced
            );
            if (!FORCED2 && targetProperty !== void 0) {
              if (typeof sourceProperty == typeof targetProperty) continue;
              copyConstructorProperties(sourceProperty, targetProperty);
            }
            if (options.sham || targetProperty && targetProperty.sham) {
              createNonEnumerableProperty$2(sourceProperty, "sham", true);
            }
            defineBuiltIn$3(target, key, sourceProperty, options);
          }
      };
      var wellKnownSymbol$b = wellKnownSymbol$d;
      var TO_STRING_TAG$1 = wellKnownSymbol$b("toStringTag");
      var test = {};
      test[TO_STRING_TAG$1] = "z";
      var toStringTagSupport = String(test) === "[object z]";
      var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
      var isCallable$3 = isCallable$e;
      var classofRaw$1 = classofRaw$2;
      var wellKnownSymbol$a = wellKnownSymbol$d;
      var TO_STRING_TAG = wellKnownSymbol$a("toStringTag");
      var $Object = Object;
      var CORRECT_ARGUMENTS = classofRaw$1(
        /* @__PURE__ */ function() {
          return arguments;
        }()
      ) == "Arguments";
      var tryGet = function(it, key) {
        try {
          return it[key];
        } catch (error) {
        }
      };
      var classof$7 = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function(it) {
        var O, tag, result;
        return it === void 0 ? "Undefined" : it === null ? "Null" : (
          // @@toStringTag case
          typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : (
            // builtinTag case
            CORRECT_ARGUMENTS ? classofRaw$1(O) : (
              // ES3 arguments fallback
              (result = classofRaw$1(O)) == "Object" && isCallable$3(O.callee) ? "Arguments" : result
            )
          )
        );
      };
      var classof$6 = classof$7;
      var $String = String;
      var toString$8 = function(argument) {
        if (classof$6(argument) === "Symbol")
          throw TypeError("Cannot convert a Symbol value to a string");
        return $String(argument);
      };
      var anObject$8 = anObject$b;
      var regexpFlags$1 = function() {
        var that = anObject$8(this);
        var result = "";
        if (that.hasIndices) result += "d";
        if (that.global) result += "g";
        if (that.ignoreCase) result += "i";
        if (that.multiline) result += "m";
        if (that.dotAll) result += "s";
        if (that.unicode) result += "u";
        if (that.unicodeSets) result += "v";
        if (that.sticky) result += "y";
        return result;
      };
      var fails$e = fails$n;
      var global$4 = global$f;
      var $RegExp$2 = global$4.RegExp;
      var UNSUPPORTED_Y$2 = fails$e(function() {
        var re = $RegExp$2("a", "y");
        re.lastIndex = 2;
        return re.exec("abcd") != null;
      });
      var MISSED_STICKY = UNSUPPORTED_Y$2 || fails$e(function() {
        return !$RegExp$2("a", "y").sticky;
      });
      var BROKEN_CARET = UNSUPPORTED_Y$2 || fails$e(function() {
        var re = $RegExp$2("^r", "gy");
        re.lastIndex = 2;
        return re.exec("str") != null;
      });
      var regexpStickyHelpers = {
        BROKEN_CARET,
        MISSED_STICKY,
        UNSUPPORTED_Y: UNSUPPORTED_Y$2
      };
      var objectDefineProperties = {};
      var internalObjectKeys = objectKeysInternal;
      var enumBugKeys$1 = enumBugKeys$3;
      var objectKeys$3 = Object.keys || function keys2(O) {
        return internalObjectKeys(O, enumBugKeys$1);
      };
      var DESCRIPTORS$3 = descriptors;
      var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
      var definePropertyModule$1 = objectDefineProperty;
      var anObject$7 = anObject$b;
      var toIndexedObject$3 = toIndexedObject$7;
      var objectKeys$2 = objectKeys$3;
      objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject$7(O);
        var props = toIndexedObject$3(Properties);
        var keys2 = objectKeys$2(Properties);
        var length = keys2.length;
        var index = 0;
        var key;
        while (length > index)
          definePropertyModule$1.f(O, key = keys2[index++], props[key]);
        return O;
      };
      var getBuiltIn$1 = getBuiltIn$4;
      var html$1 = getBuiltIn$1("document", "documentElement");
      var anObject$6 = anObject$b;
      var definePropertiesModule = objectDefineProperties;
      var enumBugKeys = enumBugKeys$3;
      var hiddenKeys = hiddenKeys$4;
      var html = html$1;
      var documentCreateElement$1 = documentCreateElement$2;
      var sharedKey = sharedKey$2;
      var GT = ">";
      var LT = "<";
      var PROTOTYPE = "prototype";
      var SCRIPT = "script";
      var IE_PROTO = sharedKey("IE_PROTO");
      var EmptyConstructor = function() {
      };
      var scriptTag = function(content) {
        return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
      };
      var NullProtoObjectViaActiveX = function(activeXDocument2) {
        activeXDocument2.write(scriptTag(""));
        activeXDocument2.close();
        var temp = activeXDocument2.parentWindow.Object;
        activeXDocument2 = null;
        return temp;
      };
      var NullProtoObjectViaIFrame = function() {
        var iframe = documentCreateElement$1("iframe");
        var JS = "java" + SCRIPT + ":";
        var iframeDocument;
        iframe.style.display = "none";
        html.appendChild(iframe);
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag("document.F=Object"));
        iframeDocument.close();
        return iframeDocument.F;
      };
      var activeXDocument;
      var NullProtoObject = function() {
        try {
          activeXDocument = new ActiveXObject("htmlfile");
        } catch (error) {
        }
        NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
        var length = enumBugKeys.length;
        while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        return NullProtoObject();
      };
      hiddenKeys[IE_PROTO] = true;
      var objectCreate = Object.create || function create2(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE] = anObject$6(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE] = null;
          result[IE_PROTO] = O;
        } else result = NullProtoObject();
        return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
      };
      var fails$d = fails$n;
      var global$3 = global$f;
      var $RegExp$1 = global$3.RegExp;
      var regexpUnsupportedDotAll = fails$d(function() {
        var re = $RegExp$1(".", "s");
        return !(re.dotAll && re.exec("\n") && re.flags === "s");
      });
      var fails$c = fails$n;
      var global$2 = global$f;
      var $RegExp = global$2.RegExp;
      var regexpUnsupportedNcg = fails$c(function() {
        var re = $RegExp("(?<a>b)", "g");
        return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
      });
      var call$7 = functionCall;
      var uncurryThis$g = functionUncurryThis;
      var toString$7 = toString$8;
      var regexpFlags = regexpFlags$1;
      var stickyHelpers$1 = regexpStickyHelpers;
      var shared = sharedExports;
      var create$1 = objectCreate;
      var getInternalState = internalState.get;
      var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
      var UNSUPPORTED_NCG = regexpUnsupportedNcg;
      var nativeReplace = shared("native-string-replace", String.prototype.replace);
      var nativeExec = RegExp.prototype.exec;
      var patchedExec = nativeExec;
      var charAt$3 = uncurryThis$g("".charAt);
      var indexOf = uncurryThis$g("".indexOf);
      var replace$2 = uncurryThis$g("".replace);
      var stringSlice$4 = uncurryThis$g("".slice);
      var UPDATES_LAST_INDEX_WRONG = function() {
        var re1 = /a/;
        var re2 = /b*/g;
        call$7(nativeExec, re1, "a");
        call$7(nativeExec, re2, "a");
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      }();
      var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;
      var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
      if (PATCH) {
        patchedExec = function exec2(string) {
          var re = this;
          var state = getInternalState(re);
          var str = toString$7(string);
          var raw = state.raw;
          var result, reCopy, lastIndex, match2, i, object, group;
          if (raw) {
            raw.lastIndex = re.lastIndex;
            result = call$7(patchedExec, raw, str);
            re.lastIndex = raw.lastIndex;
            return result;
          }
          var groups = state.groups;
          var sticky = UNSUPPORTED_Y$1 && re.sticky;
          var flags = call$7(regexpFlags, re);
          var source = re.source;
          var charsAdded = 0;
          var strCopy = str;
          if (sticky) {
            flags = replace$2(flags, "y", "");
            if (indexOf(flags, "g") === -1) {
              flags += "g";
            }
            strCopy = stringSlice$4(str, re.lastIndex);
            if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$3(str, re.lastIndex - 1) !== "\n")) {
              source = "(?: " + source + ")";
              strCopy = " " + strCopy;
              charsAdded++;
            }
            reCopy = new RegExp("^(?:" + source + ")", flags);
          }
          if (NPCG_INCLUDED) {
            reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
          }
          if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
          match2 = call$7(nativeExec, sticky ? reCopy : re, strCopy);
          if (sticky) {
            if (match2) {
              match2.input = stringSlice$4(match2.input, charsAdded);
              match2[0] = stringSlice$4(match2[0], charsAdded);
              match2.index = re.lastIndex;
              re.lastIndex += match2[0].length;
            } else re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match2) {
            re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
          }
          if (NPCG_INCLUDED && match2 && match2.length > 1) {
            call$7(nativeReplace, match2[0], reCopy, function() {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === void 0) match2[i] = void 0;
              }
            });
          }
          if (match2 && groups) {
            match2.groups = object = create$1(null);
            for (i = 0; i < groups.length; i++) {
              group = groups[i];
              object[group[0]] = match2[group[1]];
            }
          }
          return match2;
        };
      }
      var regexpExec$3 = patchedExec;
      var $$d = _export;
      var exec$2 = regexpExec$3;
      $$d(
        { target: "RegExp", proto: true, forced: /./.exec !== exec$2 },
        {
          exec: exec$2
        }
      );
      var classofRaw = classofRaw$2;
      var uncurryThis$f = functionUncurryThis;
      var functionUncurryThisClause = function(fn) {
        if (classofRaw(fn) === "Function") return uncurryThis$f(fn);
      };
      var uncurryThis$e = functionUncurryThisClause;
      var defineBuiltIn$2 = defineBuiltIn$4;
      var regexpExec$2 = regexpExec$3;
      var fails$b = fails$n;
      var wellKnownSymbol$9 = wellKnownSymbol$d;
      var createNonEnumerableProperty$1 = createNonEnumerableProperty$4;
      var SPECIES$4 = wellKnownSymbol$9("species");
      var RegExpPrototype$2 = RegExp.prototype;
      var fixRegexpWellKnownSymbolLogic = function(KEY, exec2, FORCED2, SHAM) {
        var SYMBOL = wellKnownSymbol$9(KEY);
        var DELEGATES_TO_SYMBOL = !fails$b(function() {
          var O = {};
          O[SYMBOL] = function() {
            return 7;
          };
          return ""[KEY](O) != 7;
        });
        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$b(function() {
          var execCalled = false;
          var re = /a/;
          if (KEY === "split") {
            re = {};
            re.constructor = {};
            re.constructor[SPECIES$4] = function() {
              return re;
            };
            re.flags = "";
            re[SYMBOL] = /./[SYMBOL];
          }
          re.exec = function() {
            execCalled = true;
            return null;
          };
          re[SYMBOL]("");
          return !execCalled;
        });
        if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || FORCED2) {
          var uncurriedNativeRegExpMethod = uncurryThis$e(/./[SYMBOL]);
          var methods = exec2(
            SYMBOL,
            ""[KEY],
            function(nativeMethod, regexp, str, arg2, forceStringMethod) {
              var uncurriedNativeMethod = uncurryThis$e(nativeMethod);
              var $exec = regexp.exec;
              if ($exec === regexpExec$2 || $exec === RegExpPrototype$2.exec) {
                if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                  return {
                    done: true,
                    value: uncurriedNativeRegExpMethod(regexp, str, arg2)
                  };
                }
                return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
              }
              return { done: false };
            }
          );
          defineBuiltIn$2(String.prototype, KEY, methods[0]);
          defineBuiltIn$2(RegExpPrototype$2, SYMBOL, methods[1]);
        }
        if (SHAM) createNonEnumerableProperty$1(RegExpPrototype$2[SYMBOL], "sham", true);
      };
      var sameValue$1 = Object.is || function is(x, y) {
        return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
      };
      var call$6 = functionCall;
      var anObject$5 = anObject$b;
      var isCallable$2 = isCallable$e;
      var classof$5 = classofRaw$2;
      var regexpExec$1 = regexpExec$3;
      var $TypeError$4 = TypeError;
      var regexpExecAbstract = function(R, S) {
        var exec2 = R.exec;
        if (isCallable$2(exec2)) {
          var result = call$6(exec2, R, S);
          if (result !== null) anObject$5(result);
          return result;
        }
        if (classof$5(R) === "RegExp") return call$6(regexpExec$1, R, S);
        throw $TypeError$4("RegExp#exec called on incompatible receiver");
      };
      var call$5 = functionCall;
      var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
      var anObject$4 = anObject$b;
      var isNullOrUndefined$3 = isNullOrUndefined$6;
      var requireObjectCoercible$5 = requireObjectCoercible$8;
      var sameValue = sameValue$1;
      var toString$6 = toString$8;
      var getMethod$2 = getMethod$4;
      var regExpExec$2 = regexpExecAbstract;
      fixRegExpWellKnownSymbolLogic$2("search", function(SEARCH, nativeSearch, maybeCallNative) {
        return [
          // `String.prototype.search` method
          // https://tc39.es/ecma262/#sec-string.prototype.search
          function search(regexp) {
            var O = requireObjectCoercible$5(this);
            var searcher = isNullOrUndefined$3(regexp) ? void 0 : getMethod$2(regexp, SEARCH);
            return searcher ? call$5(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$6(O));
          },
          // `RegExp.prototype[@@search]` method
          // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
          function(string) {
            var rx = anObject$4(this);
            var S = toString$6(string);
            var res = maybeCallNative(nativeSearch, rx, S);
            if (res.done) return res.value;
            var previousLastIndex = rx.lastIndex;
            if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
            var result = regExpExec$2(rx, S);
            if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
            return result === null ? -1 : result.index;
          }
        ];
      });
      var wellKnownSymbol$8 = wellKnownSymbol$d;
      var create = objectCreate;
      var defineProperty$2 = objectDefineProperty.f;
      var UNSCOPABLES = wellKnownSymbol$8("unscopables");
      var ArrayPrototype = Array.prototype;
      if (ArrayPrototype[UNSCOPABLES] == void 0) {
        defineProperty$2(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: create(null)
        });
      }
      var addToUnscopables$2 = function(key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };
      var $$c = _export;
      var $includes = arrayIncludes.includes;
      var fails$a = fails$n;
      var addToUnscopables$1 = addToUnscopables$2;
      var BROKEN_ON_SPARSE = fails$a(function() {
        return !Array(1).includes();
      });
      $$c(
        { target: "Array", proto: true, forced: BROKEN_ON_SPARSE },
        {
          includes: function includes(el) {
            return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      );
      addToUnscopables$1("includes");
      var isObject$3 = isObject$9;
      var classof$4 = classofRaw$2;
      var wellKnownSymbol$7 = wellKnownSymbol$d;
      var MATCH$1 = wellKnownSymbol$7("match");
      var isRegexp = function(it) {
        var isRegExp2;
        return isObject$3(it) && ((isRegExp2 = it[MATCH$1]) !== void 0 ? !!isRegExp2 : classof$4(it) == "RegExp");
      };
      var isRegExp$1 = isRegexp;
      var $TypeError$3 = TypeError;
      var notARegexp = function(it) {
        if (isRegExp$1(it)) {
          throw $TypeError$3("The method doesn't accept regular expressions");
        }
        return it;
      };
      var wellKnownSymbol$6 = wellKnownSymbol$d;
      var MATCH = wellKnownSymbol$6("match");
      var correctIsRegexpLogic = function(METHOD_NAME) {
        var regexp = /./;
        try {
          "/./"[METHOD_NAME](regexp);
        } catch (error1) {
          try {
            regexp[MATCH] = false;
            return "/./"[METHOD_NAME](regexp);
          } catch (error2) {
          }
        }
        return false;
      };
      var $$b = _export;
      var uncurryThis$d = functionUncurryThis;
      var notARegExp = notARegexp;
      var requireObjectCoercible$4 = requireObjectCoercible$8;
      var toString$5 = toString$8;
      var correctIsRegExpLogic = correctIsRegexpLogic;
      var stringIndexOf$1 = uncurryThis$d("".indexOf);
      $$b(
        { target: "String", proto: true, forced: !correctIsRegExpLogic("includes") },
        {
          includes: function includes(searchString) {
            return !!~stringIndexOf$1(
              toString$5(requireObjectCoercible$4(this)),
              toString$5(notARegExp(searchString)),
              arguments.length > 1 ? arguments[1] : void 0
            );
          }
        }
      );
      var whitespaces$2 = "	\n\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
      var uncurryThis$c = functionUncurryThis;
      var requireObjectCoercible$3 = requireObjectCoercible$8;
      var toString$4 = toString$8;
      var whitespaces$1 = whitespaces$2;
      var replace$1 = uncurryThis$c("".replace);
      var ltrim = RegExp("^[" + whitespaces$1 + "]+");
      var rtrim = RegExp("(^|[^" + whitespaces$1 + "])[" + whitespaces$1 + "]+$");
      var createMethod$4 = function(TYPE) {
        return function($this) {
          var string = toString$4(requireObjectCoercible$3($this));
          if (TYPE & 1) string = replace$1(string, ltrim, "");
          if (TYPE & 2) string = replace$1(string, rtrim, "$1");
          return string;
        };
      };
      var stringTrim = {
        // `String.prototype.{ trimLeft, trimStart }` methods
        // https://tc39.es/ecma262/#sec-string.prototype.trimstart
        start: createMethod$4(1),
        // `String.prototype.{ trimRight, trimEnd }` methods
        // https://tc39.es/ecma262/#sec-string.prototype.trimend
        end: createMethod$4(2),
        // `String.prototype.trim` method
        // https://tc39.es/ecma262/#sec-string.prototype.trim
        trim: createMethod$4(3)
      };
      var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
      var fails$9 = fails$n;
      var whitespaces = whitespaces$2;
      var non = "\u200B\x85\u180E";
      var stringTrimForced = function(METHOD_NAME) {
        return fails$9(function() {
          return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME$1 && whitespaces[METHOD_NAME].name !== METHOD_NAME;
        });
      };
      var $$a = _export;
      var $trim = stringTrim.trim;
      var forcedStringTrimMethod = stringTrimForced;
      $$a(
        { target: "String", proto: true, forced: forcedStringTrimMethod("trim") },
        {
          trim: function trim() {
            return $trim(this);
          }
        }
      );
      var classof$3 = classofRaw$2;
      var isArray$3 = Array.isArray || function isArray2(argument) {
        return classof$3(argument) == "Array";
      };
      var $TypeError$2 = TypeError;
      var MAX_SAFE_INTEGER = 9007199254740991;
      var doesNotExceedSafeInteger$1 = function(it) {
        if (it > MAX_SAFE_INTEGER) throw $TypeError$2("Maximum allowed index exceeded");
        return it;
      };
      var toPropertyKey = toPropertyKey$3;
      var definePropertyModule = objectDefineProperty;
      var createPropertyDescriptor = createPropertyDescriptor$3;
      var createProperty$3 = function(object, key, value) {
        var propertyKey = toPropertyKey(key);
        if (propertyKey in object)
          definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
        else object[propertyKey] = value;
      };
      var uncurryThis$b = functionUncurryThis;
      var fails$8 = fails$n;
      var isCallable$1 = isCallable$e;
      var classof$2 = classof$7;
      var getBuiltIn = getBuiltIn$4;
      var inspectSource = inspectSource$2;
      var noop = function() {
      };
      var empty = [];
      var construct = getBuiltIn("Reflect", "construct");
      var constructorRegExp = /^\s*(?:class|function)\b/;
      var exec$1 = uncurryThis$b(constructorRegExp.exec);
      var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
      var isConstructorModern = function isConstructor2(argument) {
        if (!isCallable$1(argument)) return false;
        try {
          construct(noop, empty, argument);
          return true;
        } catch (error) {
          return false;
        }
      };
      var isConstructorLegacy = function isConstructor2(argument) {
        if (!isCallable$1(argument)) return false;
        switch (classof$2(argument)) {
          case "AsyncFunction":
          case "GeneratorFunction":
          case "AsyncGeneratorFunction":
            return false;
        }
        try {
          return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource(argument));
        } catch (error) {
          return true;
        }
      };
      isConstructorLegacy.sham = true;
      var isConstructor$3 = !construct || fails$8(function() {
        var called;
        return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
          called = true;
        }) || called;
      }) ? isConstructorLegacy : isConstructorModern;
      var isArray$2 = isArray$3;
      var isConstructor$2 = isConstructor$3;
      var isObject$2 = isObject$9;
      var wellKnownSymbol$5 = wellKnownSymbol$d;
      var SPECIES$3 = wellKnownSymbol$5("species");
      var $Array$2 = Array;
      var arraySpeciesConstructor$1 = function(originalArray) {
        var C;
        if (isArray$2(originalArray)) {
          C = originalArray.constructor;
          if (isConstructor$2(C) && (C === $Array$2 || isArray$2(C.prototype))) C = void 0;
          else if (isObject$2(C)) {
            C = C[SPECIES$3];
            if (C === null) C = void 0;
          }
        }
        return C === void 0 ? $Array$2 : C;
      };
      var arraySpeciesConstructor = arraySpeciesConstructor$1;
      var arraySpeciesCreate$2 = function(originalArray, length) {
        return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
      };
      var fails$7 = fails$n;
      var wellKnownSymbol$4 = wellKnownSymbol$d;
      var V8_VERSION$1 = engineV8Version;
      var SPECIES$2 = wellKnownSymbol$4("species");
      var arrayMethodHasSpeciesSupport$4 = function(METHOD_NAME) {
        return V8_VERSION$1 >= 51 || !fails$7(function() {
          var array = [];
          var constructor = array.constructor = {};
          constructor[SPECIES$2] = function() {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };
      var $$9 = _export;
      var fails$6 = fails$n;
      var isArray$1 = isArray$3;
      var isObject$1 = isObject$9;
      var toObject$5 = toObject$7;
      var lengthOfArrayLike$4 = lengthOfArrayLike$6;
      var doesNotExceedSafeInteger = doesNotExceedSafeInteger$1;
      var createProperty$2 = createProperty$3;
      var arraySpeciesCreate$1 = arraySpeciesCreate$2;
      var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$4;
      var wellKnownSymbol$3 = wellKnownSymbol$d;
      var V8_VERSION = engineV8Version;
      var IS_CONCAT_SPREADABLE = wellKnownSymbol$3("isConcatSpreadable");
      var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails$6(function() {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
      });
      var isConcatSpreadable = function(O) {
        if (!isObject$1(O)) return false;
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return spreadable !== void 0 ? !!spreadable : isArray$1(O);
      };
      var FORCED$2 = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$3("concat");
      $$9(
        { target: "Array", proto: true, arity: 1, forced: FORCED$2 },
        {
          // eslint-disable-next-line no-unused-vars -- required for `.length`
          concat: function concat2(arg) {
            var O = toObject$5(this);
            var A = arraySpeciesCreate$1(O, 0);
            var n = 0;
            var i, k, length, len, E;
            for (i = -1, length = arguments.length; i < length; i++) {
              E = i === -1 ? O : arguments[i];
              if (isConcatSpreadable(E)) {
                len = lengthOfArrayLike$4(E);
                doesNotExceedSafeInteger(n + len);
                for (k = 0; k < len; k++, n++) if (k in E) createProperty$2(A, n, E[k]);
              } else {
                doesNotExceedSafeInteger(n + 1);
                createProperty$2(A, n++, E);
              }
            }
            A.length = n;
            return A;
          }
        }
      );
      var DESCRIPTORS$2 = descriptors;
      var uncurryThis$a = functionUncurryThis;
      var call$4 = functionCall;
      var fails$5 = fails$n;
      var objectKeys$1 = objectKeys$3;
      var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
      var propertyIsEnumerableModule = objectPropertyIsEnumerable;
      var toObject$4 = toObject$7;
      var IndexedObject$3 = indexedObject;
      var $assign = Object.assign;
      var defineProperty$1 = Object.defineProperty;
      var concat$1 = uncurryThis$a([].concat);
      var objectAssign = !$assign || fails$5(function() {
        if (DESCRIPTORS$2 && $assign(
          { b: 1 },
          $assign(
            defineProperty$1({}, "a", {
              enumerable: true,
              get: function() {
                defineProperty$1(this, "b", {
                  value: 3,
                  enumerable: false
                });
              }
            }),
            { b: 2 }
          )
        ).b !== 1)
          return true;
        var A = {};
        var B = {};
        var symbol = Symbol();
        var alphabet = "abcdefghijklmnopqrst";
        A[symbol] = 7;
        alphabet.split("").forEach(function(chr) {
          B[chr] = chr;
        });
        return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join("") != alphabet;
      }) ? function assign2(target, source) {
        var T = toObject$4(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
        var propertyIsEnumerable2 = propertyIsEnumerableModule.f;
        while (argumentsLength > index) {
          var S = IndexedObject$3(arguments[index++]);
          var keys2 = getOwnPropertySymbols ? concat$1(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
          var length = keys2.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys2[j++];
            if (!DESCRIPTORS$2 || call$4(propertyIsEnumerable2, S, key))
              T[key] = S[key];
          }
        }
        return T;
      } : $assign;
      var $$8 = _export;
      var assign = objectAssign;
      $$8(
        { target: "Object", stat: true, arity: 2, forced: Object.assign !== assign },
        {
          assign
        }
      );
      var BLOCK_ROWS = 500;
      var CLUSTER_BLOCKS = 4;
      var DEFAULTS = {
        name: "",
        placeholder: "",
        classes: "",
        classPrefix: "",
        data: void 0,
        locale: void 0,
        selectAll: true,
        single: void 0,
        singleRadio: false,
        multiple: false,
        hideOptgroupCheckboxes: false,
        multipleWidth: 80,
        width: void 0,
        size: void 0,
        dropWidth: void 0,
        maxHeight: 250,
        maxHeightUnit: "px",
        position: "bottom",
        displayValues: false,
        displayTitle: false,
        displayDelimiter: ", ",
        minimumCountSelected: 3,
        ellipsis: false,
        isOpen: false,
        keepOpen: false,
        openOnHover: false,
        container: null,
        filter: false,
        filterGroup: false,
        filterPlaceholder: "",
        filterAcceptOnEnter: false,
        filterByDataLength: void 0,
        customFilter: function customFilter(_ref) {
          var text = _ref.text, label = _ref.label, search = _ref.search;
          return (label || text).includes(search);
        },
        showClear: false,
        animate: void 0,
        styler: function styler() {
          return false;
        },
        textTemplate: function textTemplate($elm) {
          return $elm[0].innerHTML.trim();
        },
        labelTemplate: function labelTemplate($elm) {
          return $elm[0].getAttribute("label");
        },
        onOpen: function onOpen() {
          return false;
        },
        onClose: function onClose() {
          return false;
        },
        onCheckAll: function onCheckAll() {
          return false;
        },
        onUncheckAll: function onUncheckAll() {
          return false;
        },
        onFocus: function onFocus() {
          return false;
        },
        onBlur: function onBlur() {
          return false;
        },
        onOptgroupClick: function onOptgroupClick() {
          return false;
        },
        onBeforeClick: function onBeforeClick() {
          return true;
        },
        onClick: function onClick() {
          return false;
        },
        onFilter: function onFilter() {
          return false;
        },
        onClear: function onClear() {
          return false;
        },
        onAfterCreate: function onAfterCreate() {
          return false;
        }
      };
      var EN = {
        formatSelectAll: function formatSelectAll() {
          return "[Select all]";
        },
        formatAllSelected: function formatAllSelected() {
          return "All selected";
        },
        formatCountSelected: function formatCountSelected(count, total) {
          return "".concat(count, " of ").concat(total, " selected");
        },
        formatNoMatchesFound: function formatNoMatchesFound() {
          return "No matches found";
        }
      };
      var METHODS = [
        "getOptions",
        "refreshOptions",
        "getData",
        "getSelects",
        "setSelects",
        "enable",
        "disable",
        "open",
        "close",
        "check",
        "uncheck",
        "checkAll",
        "uncheckAll",
        "checkInvert",
        "focus",
        "blur",
        "refresh",
        "destroy"
      ];
      Object.assign(DEFAULTS, EN);
      var Constants = {
        VERSION: "3.21.3",
        BLOCK_ROWS,
        CLUSTER_BLOCKS,
        DEFAULTS,
        METHODS,
        LOCALES: {
          en: EN,
          "en-US": EN
        }
      };
      var NATIVE_BIND$1 = functionBindNative;
      var FunctionPrototype$1 = Function.prototype;
      var apply$2 = FunctionPrototype$1.apply;
      var call$3 = FunctionPrototype$1.call;
      var functionApply = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND$1 ? call$3.bind(apply$2) : function() {
        return call$3.apply(apply$2, arguments);
      });
      var isConstructor$1 = isConstructor$3;
      var tryToString = tryToString$2;
      var $TypeError$1 = TypeError;
      var aConstructor$1 = function(argument) {
        if (isConstructor$1(argument)) return argument;
        throw $TypeError$1(tryToString(argument) + " is not a constructor");
      };
      var anObject$3 = anObject$b;
      var aConstructor = aConstructor$1;
      var isNullOrUndefined$2 = isNullOrUndefined$6;
      var wellKnownSymbol$2 = wellKnownSymbol$d;
      var SPECIES$1 = wellKnownSymbol$2("species");
      var speciesConstructor$1 = function(O, defaultConstructor) {
        var C = anObject$3(O).constructor;
        var S;
        return C === void 0 || isNullOrUndefined$2(S = anObject$3(C)[SPECIES$1]) ? defaultConstructor : aConstructor(S);
      };
      var uncurryThis$9 = functionUncurryThis;
      var toIntegerOrInfinity$1 = toIntegerOrInfinity$4;
      var toString$3 = toString$8;
      var requireObjectCoercible$2 = requireObjectCoercible$8;
      var charAt$2 = uncurryThis$9("".charAt);
      var charCodeAt = uncurryThis$9("".charCodeAt);
      var stringSlice$3 = uncurryThis$9("".slice);
      var createMethod$3 = function(CONVERT_TO_STRING) {
        return function($this, pos) {
          var S = toString$3(requireObjectCoercible$2($this));
          var position = toIntegerOrInfinity$1(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
          first = charCodeAt(S, position);
          return first < 55296 || first > 56319 || position + 1 === size || (second = charCodeAt(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice$3(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
        };
      };
      var stringMultibyte = {
        // `String.prototype.codePointAt` method
        // https://tc39.es/ecma262/#sec-string.prototype.codepointat
        codeAt: createMethod$3(false),
        // `String.prototype.at` method
        // https://github.com/mathiasbynens/String.prototype.at
        charAt: createMethod$3(true)
      };
      var charAt$1 = stringMultibyte.charAt;
      var advanceStringIndex$2 = function(S, index, unicode) {
        return index + (unicode ? charAt$1(S, index).length : 1);
      };
      var toAbsoluteIndex$1 = toAbsoluteIndex$3;
      var lengthOfArrayLike$3 = lengthOfArrayLike$6;
      var createProperty$1 = createProperty$3;
      var $Array$1 = Array;
      var max$2 = Math.max;
      var arraySliceSimple = function(O, start, end) {
        var length = lengthOfArrayLike$3(O);
        var k = toAbsoluteIndex$1(start, length);
        var fin = toAbsoluteIndex$1(end === void 0 ? length : end, length);
        var result = $Array$1(max$2(fin - k, 0));
        for (var n = 0; k < fin; k++, n++) createProperty$1(result, n, O[k]);
        result.length = n;
        return result;
      };
      var apply$1 = functionApply;
      var call$2 = functionCall;
      var uncurryThis$8 = functionUncurryThis;
      var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
      var anObject$2 = anObject$b;
      var isNullOrUndefined$1 = isNullOrUndefined$6;
      var isRegExp = isRegexp;
      var requireObjectCoercible$1 = requireObjectCoercible$8;
      var speciesConstructor = speciesConstructor$1;
      var advanceStringIndex$1 = advanceStringIndex$2;
      var toLength$1 = toLength$3;
      var toString$2 = toString$8;
      var getMethod$1 = getMethod$4;
      var arraySlice$1 = arraySliceSimple;
      var callRegExpExec = regexpExecAbstract;
      var regexpExec = regexpExec$3;
      var stickyHelpers = regexpStickyHelpers;
      var fails$4 = fails$n;
      var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
      var MAX_UINT32 = 4294967295;
      var min$1 = Math.min;
      var $push = [].push;
      var exec = uncurryThis$8(/./.exec);
      var push$3 = uncurryThis$8($push);
      var stringSlice$2 = uncurryThis$8("".slice);
      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$4(function() {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function() {
          return originalExec.apply(this, arguments);
        };
        var result = "ab".split(re);
        return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
      });
      fixRegExpWellKnownSymbolLogic$1(
        "split",
        function(SPLIT, nativeSplit, maybeCallNative) {
          var internalSplit;
          if ("abbc".split(/(b)*/)[1] == "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
          "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
          ".".split(/()()/).length > 1 || "".split(/.?/).length) {
            internalSplit = function(separator, limit) {
              var string = toString$2(requireObjectCoercible$1(this));
              var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
              if (lim === 0) return [];
              if (separator === void 0) return [string];
              if (!isRegExp(separator)) {
                return call$2(nativeSplit, string, separator, lim);
              }
              var output = [];
              var flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
              var lastLastIndex = 0;
              var separatorCopy = new RegExp(separator.source, flags + "g");
              var match2, lastIndex, lastLength;
              while (match2 = call$2(regexpExec, separatorCopy, string)) {
                lastIndex = separatorCopy.lastIndex;
                if (lastIndex > lastLastIndex) {
                  push$3(output, stringSlice$2(string, lastLastIndex, match2.index));
                  if (match2.length > 1 && match2.index < string.length)
                    apply$1($push, output, arraySlice$1(match2, 1));
                  lastLength = match2[0].length;
                  lastLastIndex = lastIndex;
                  if (output.length >= lim) break;
                }
                if (separatorCopy.lastIndex === match2.index) separatorCopy.lastIndex++;
              }
              if (lastLastIndex === string.length) {
                if (lastLength || !exec(separatorCopy, "")) push$3(output, "");
              } else push$3(output, stringSlice$2(string, lastLastIndex));
              return output.length > lim ? arraySlice$1(output, 0, lim) : output;
            };
          } else if ("0".split(void 0, 0).length) {
            internalSplit = function(separator, limit) {
              return separator === void 0 && limit === 0 ? [] : call$2(nativeSplit, this, separator, limit);
            };
          } else internalSplit = nativeSplit;
          return [
            // `String.prototype.split` method
            // https://tc39.es/ecma262/#sec-string.prototype.split
            function split2(separator, limit) {
              var O = requireObjectCoercible$1(this);
              var splitter = isNullOrUndefined$1(separator) ? void 0 : getMethod$1(separator, SPLIT);
              return splitter ? call$2(splitter, separator, O, limit) : call$2(internalSplit, toString$2(O), separator, limit);
            },
            // `RegExp.prototype[@@split]` method
            // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
            //
            // NOTE: This cannot be properly polyfilled in engines that don't support
            // the 'y' flag.
            function(string, limit) {
              var rx = anObject$2(this);
              var S = toString$2(string);
              var res = maybeCallNative(
                internalSplit,
                rx,
                S,
                limit,
                internalSplit !== nativeSplit
              );
              if (res.done) return res.value;
              var C = speciesConstructor(rx, RegExp);
              var unicodeMatching = rx.unicode;
              var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
              var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags);
              var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
              if (lim === 0) return [];
              if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
              var p = 0;
              var q = 0;
              var A = [];
              while (q < S.length) {
                splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
                var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$2(S, q) : S);
                var e;
                if (z === null || (e = min$1(
                  toLength$1(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)),
                  S.length
                )) === p) {
                  q = advanceStringIndex$1(S, q, unicodeMatching);
                } else {
                  push$3(A, stringSlice$2(S, p, q));
                  if (A.length === lim) return A;
                  for (var i = 1; i <= z.length - 1; i++) {
                    push$3(A, z[i]);
                    if (A.length === lim) return A;
                  }
                  q = p = e;
                }
              }
              push$3(A, stringSlice$2(S, p));
              return A;
            }
          ];
        },
        !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC,
        UNSUPPORTED_Y
      );
      var fails$3 = fails$n;
      var arrayMethodIsStrict$3 = function(METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails$3(function() {
          method.call(
            null,
            argument || function() {
              return 1;
            },
            1
          );
        });
      };
      var $$7 = _export;
      var uncurryThis$7 = functionUncurryThis;
      var IndexedObject$2 = indexedObject;
      var toIndexedObject$2 = toIndexedObject$7;
      var arrayMethodIsStrict$2 = arrayMethodIsStrict$3;
      var nativeJoin = uncurryThis$7([].join);
      var ES3_STRINGS = IndexedObject$2 != Object;
      var FORCED$1 = ES3_STRINGS || !arrayMethodIsStrict$2("join", ",");
      $$7(
        { target: "Array", proto: true, forced: FORCED$1 },
        {
          join: function join2(separator) {
            return nativeJoin(
              toIndexedObject$2(this),
              separator === void 0 ? "," : separator
            );
          }
        }
      );
      var makeBuiltIn = makeBuiltInExports;
      var defineProperty = objectDefineProperty;
      var defineBuiltInAccessor$1 = function(target, name, descriptor) {
        if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
        if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
        return defineProperty.f(target, name, descriptor);
      };
      var DESCRIPTORS$1 = descriptors;
      var FUNCTION_NAME_EXISTS = functionName.EXISTS;
      var uncurryThis$6 = functionUncurryThis;
      var defineBuiltInAccessor = defineBuiltInAccessor$1;
      var FunctionPrototype = Function.prototype;
      var functionToString = uncurryThis$6(FunctionPrototype.toString);
      var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
      var regExpExec$1 = uncurryThis$6(nameRE.exec);
      var NAME = "name";
      if (DESCRIPTORS$1 && !FUNCTION_NAME_EXISTS) {
        defineBuiltInAccessor(FunctionPrototype, NAME, {
          configurable: true,
          get: function() {
            try {
              return regExpExec$1(nameRE, functionToString(this))[1];
            } catch (error) {
              return "";
            }
          }
        });
      }
      var uncurryThis$5 = functionUncurryThisClause;
      var aCallable$1 = aCallable$3;
      var NATIVE_BIND = functionBindNative;
      var bind$1 = uncurryThis$5(uncurryThis$5.bind);
      var functionBindContext = function(fn, that) {
        aCallable$1(fn);
        return that === void 0 ? fn : NATIVE_BIND ? bind$1(fn, that) : function() {
          return fn.apply(that, arguments);
        };
      };
      var bind = functionBindContext;
      var uncurryThis$4 = functionUncurryThis;
      var IndexedObject$1 = indexedObject;
      var toObject$3 = toObject$7;
      var lengthOfArrayLike$2 = lengthOfArrayLike$6;
      var arraySpeciesCreate = arraySpeciesCreate$2;
      var push$2 = uncurryThis$4([].push);
      var createMethod$2 = function(TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var IS_FILTER_REJECT = TYPE == 7;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function($this, callbackfn, that, specificCreate) {
          var O = toObject$3($this);
          var self2 = IndexedObject$1(O);
          var boundFunction = bind(callbackfn, that);
          var length = lengthOfArrayLike$2(self2);
          var index = 0;
          var create2 = specificCreate || arraySpeciesCreate;
          var target = IS_MAP ? create2($this, length) : IS_FILTER || IS_FILTER_REJECT ? create2($this, 0) : void 0;
          var value, result;
          for (; length > index; index++)
            if (NO_HOLES || index in self2) {
              value = self2[index];
              result = boundFunction(value, index, O);
              if (TYPE) {
                if (IS_MAP)
                  target[index] = result;
                else if (result)
                  switch (TYPE) {
                    case 3:
                      return true;
                    case 5:
                      return value;
                    case 6:
                      return index;
                    case 2:
                      push$2(target, value);
                  }
                else
                  switch (TYPE) {
                    case 4:
                      return false;
                    case 7:
                      push$2(target, value);
                  }
              }
            }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };
      var arrayIteration = {
        // `Array.prototype.forEach` method
        // https://tc39.es/ecma262/#sec-array.prototype.foreach
        forEach: createMethod$2(0),
        // `Array.prototype.map` method
        // https://tc39.es/ecma262/#sec-array.prototype.map
        map: createMethod$2(1),
        // `Array.prototype.filter` method
        // https://tc39.es/ecma262/#sec-array.prototype.filter
        filter: createMethod$2(2),
        // `Array.prototype.some` method
        // https://tc39.es/ecma262/#sec-array.prototype.some
        some: createMethod$2(3),
        // `Array.prototype.every` method
        // https://tc39.es/ecma262/#sec-array.prototype.every
        every: createMethod$2(4),
        // `Array.prototype.find` method
        // https://tc39.es/ecma262/#sec-array.prototype.find
        find: createMethod$2(5),
        // `Array.prototype.findIndex` method
        // https://tc39.es/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod$2(6),
        // `Array.prototype.filterReject` method
        // https://github.com/tc39/proposal-array-filtering
        filterReject: createMethod$2(7)
      };
      var $$6 = _export;
      var $find = arrayIteration.find;
      var addToUnscopables = addToUnscopables$2;
      var FIND = "find";
      var SKIPS_HOLES = true;
      if (FIND in [])
        Array(1)[FIND](function() {
          SKIPS_HOLES = false;
        });
      $$6(
        { target: "Array", proto: true, forced: SKIPS_HOLES },
        {
          find: function find(callbackfn) {
            return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      );
      addToUnscopables(FIND);
      var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
      var classof$1 = classof$7;
      var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString2() {
        return "[object " + classof$1(this) + "]";
      };
      var TO_STRING_TAG_SUPPORT = toStringTagSupport;
      var defineBuiltIn$1 = defineBuiltIn$4;
      var toString$1 = objectToString;
      if (!TO_STRING_TAG_SUPPORT) {
        defineBuiltIn$1(Object.prototype, "toString", toString$1, { unsafe: true });
      }
      var $$5 = _export;
      var $map = arrayIteration.map;
      var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$4;
      var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2("map");
      $$5(
        { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT$2 },
        {
          map: function map(callbackfn) {
            return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      );
      var DESCRIPTORS = descriptors;
      var uncurryThis$3 = functionUncurryThis;
      var objectKeys = objectKeys$3;
      var toIndexedObject$1 = toIndexedObject$7;
      var $propertyIsEnumerable = objectPropertyIsEnumerable.f;
      var propertyIsEnumerable = uncurryThis$3($propertyIsEnumerable);
      var push$1 = uncurryThis$3([].push);
      var createMethod$1 = function(TO_ENTRIES) {
        return function(it) {
          var O = toIndexedObject$1(it);
          var keys2 = objectKeys(O);
          var length = keys2.length;
          var i = 0;
          var result = [];
          var key;
          while (length > i) {
            key = keys2[i++];
            if (!DESCRIPTORS || propertyIsEnumerable(O, key)) {
              push$1(result, TO_ENTRIES ? [key, O[key]] : O[key]);
            }
          }
          return result;
        };
      };
      var objectToArray = {
        // `Object.entries` method
        // https://tc39.es/ecma262/#sec-object.entries
        entries: createMethod$1(true),
        // `Object.values` method
        // https://tc39.es/ecma262/#sec-object.values
        values: createMethod$1(false)
      };
      var $$4 = _export;
      var $entries = objectToArray.entries;
      $$4(
        { target: "Object", stat: true },
        {
          entries: function entries(O) {
            return $entries(O);
          }
        }
      );
      var $$3 = _export;
      var toObject$2 = toObject$7;
      var nativeKeys = objectKeys$3;
      var fails$2 = fails$n;
      var FAILS_ON_PRIMITIVES = fails$2(function() {
        nativeKeys(1);
      });
      $$3(
        { target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES },
        {
          keys: function keys2(it) {
            return nativeKeys(toObject$2(it));
          }
        }
      );
      var $$2 = _export;
      var $filter = arrayIteration.filter;
      var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$4;
      var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1("filter");
      $$2(
        { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT$1 },
        {
          filter: function filter(callbackfn) {
            return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          }
        }
      );
      var domIterables = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };
      var documentCreateElement = documentCreateElement$2;
      var classList = documentCreateElement("span").classList;
      var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;
      var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? void 0 : DOMTokenListPrototype$1;
      var $forEach = arrayIteration.forEach;
      var arrayMethodIsStrict$1 = arrayMethodIsStrict$3;
      var STRICT_METHOD = arrayMethodIsStrict$1("forEach");
      var arrayForEach = !STRICT_METHOD ? function forEach2(callbackfn) {
        return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
      } : [].forEach;
      var global$1 = global$f;
      var DOMIterables = domIterables;
      var DOMTokenListPrototype = domTokenListPrototype;
      var forEach = arrayForEach;
      var createNonEnumerableProperty = createNonEnumerableProperty$4;
      var handlePrototype = function(CollectionPrototype) {
        if (CollectionPrototype && CollectionPrototype.forEach !== forEach)
          try {
            createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
          } catch (error) {
            CollectionPrototype.forEach = forEach;
          }
      };
      for (var COLLECTION_NAME in DOMIterables) {
        if (DOMIterables[COLLECTION_NAME]) {
          handlePrototype(global$1[COLLECTION_NAME] && global$1[COLLECTION_NAME].prototype);
        }
      }
      handlePrototype(DOMTokenListPrototype);
      var uncurryThis$2 = functionUncurryThis;
      var arraySlice = uncurryThis$2([].slice);
      var $$1 = _export;
      var isArray = isArray$3;
      var isConstructor = isConstructor$3;
      var isObject = isObject$9;
      var toAbsoluteIndex = toAbsoluteIndex$3;
      var lengthOfArrayLike$1 = lengthOfArrayLike$6;
      var toIndexedObject = toIndexedObject$7;
      var createProperty = createProperty$3;
      var wellKnownSymbol$1 = wellKnownSymbol$d;
      var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$4;
      var nativeSlice = arraySlice;
      var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
      var SPECIES = wellKnownSymbol$1("species");
      var $Array = Array;
      var max$1 = Math.max;
      $$1(
        { target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT },
        {
          slice: function slice(start, end) {
            var O = toIndexedObject(this);
            var length = lengthOfArrayLike$1(O);
            var k = toAbsoluteIndex(start, length);
            var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
            var Constructor, result, n;
            if (isArray(O)) {
              Constructor = O.constructor;
              if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
                Constructor = void 0;
              } else if (isObject(Constructor)) {
                Constructor = Constructor[SPECIES];
                if (Constructor === null) Constructor = void 0;
              }
              if (Constructor === $Array || Constructor === void 0) {
                return nativeSlice(O, k, fin);
              }
            }
            result = new (Constructor === void 0 ? $Array : Constructor)(max$1(fin - k, 0));
            for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
            result.length = n;
            return result;
          }
        }
      );
      var call$1 = functionCall;
      var hasOwn = hasOwnProperty_1;
      var isPrototypeOf = objectIsPrototypeOf;
      var regExpFlags = regexpFlags$1;
      var RegExpPrototype$1 = RegExp.prototype;
      var regexpGetFlags = function(R) {
        var flags = R.flags;
        return flags === void 0 && !("flags" in RegExpPrototype$1) && !hasOwn(R, "flags") && isPrototypeOf(RegExpPrototype$1, R) ? call$1(regExpFlags, R) : flags;
      };
      var PROPER_FUNCTION_NAME = functionName.PROPER;
      var defineBuiltIn = defineBuiltIn$4;
      var anObject$1 = anObject$b;
      var $toString = toString$8;
      var fails$1 = fails$n;
      var getRegExpFlags = regexpGetFlags;
      var TO_STRING = "toString";
      var RegExpPrototype = RegExp.prototype;
      var nativeToString = RegExpPrototype[TO_STRING];
      var NOT_GENERIC = fails$1(function() {
        return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
      });
      var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;
      if (NOT_GENERIC || INCORRECT_NAME) {
        defineBuiltIn(
          RegExp.prototype,
          TO_STRING,
          function toString2() {
            var R = anObject$1(this);
            var pattern = $toString(R.source);
            var flags = $toString(getRegExpFlags(R));
            return "/" + pattern + "/" + flags;
          },
          { unsafe: true }
        );
      }
      var VirtualScroll = /* @__PURE__ */ function() {
        function VirtualScroll2(options) {
          var _this = this;
          _classCallCheck(this, VirtualScroll2);
          this.rows = options.rows;
          this.scrollEl = options.scrollEl;
          this.contentEl = options.contentEl;
          this.callback = options.callback;
          this.cache = {};
          this.scrollTop = this.scrollEl.scrollTop;
          this.initDOM(this.rows);
          this.scrollEl.scrollTop = this.scrollTop;
          this.lastCluster = 0;
          var onScroll = function onScroll2() {
            if (_this.lastCluster !== (_this.lastCluster = _this.getNum())) {
              _this.initDOM(_this.rows);
              _this.callback();
            }
          };
          this.scrollEl.addEventListener("scroll", onScroll, false);
          this.destroy = function() {
            _this.contentEl.innerHtml = "";
            _this.scrollEl.removeEventListener("scroll", onScroll, false);
          };
        }
        _createClass(VirtualScroll2, [
          {
            key: "initDOM",
            value: function initDOM(rows) {
              if (typeof this.clusterHeight === "undefined") {
                this.cache.scrollTop = this.scrollEl.scrollTop;
                this.cache.data = this.contentEl.innerHTML = rows[0] + rows[0] + rows[0];
                this.getRowsHeight(rows);
              }
              var data2 = this.initData(rows, this.getNum());
              var thisRows = data2.rows.join("");
              var dataChanged = this.checkChanges("data", thisRows);
              var topOffsetChanged = this.checkChanges("top", data2.topOffset);
              var bottomOffsetChanged = this.checkChanges("bottom", data2.bottomOffset);
              var html2 = [];
              if (dataChanged && topOffsetChanged) {
                if (data2.topOffset) {
                  html2.push(this.getExtra("top", data2.topOffset));
                }
                html2.push(thisRows);
                if (data2.bottomOffset) {
                  html2.push(this.getExtra("bottom", data2.bottomOffset));
                }
                this.contentEl.innerHTML = html2.join("");
              } else if (bottomOffsetChanged) {
                this.contentEl.lastChild.style.height = "".concat(data2.bottomOffset, "px");
              }
            }
          },
          {
            key: "getRowsHeight",
            value: function getRowsHeight() {
              if (typeof this.itemHeight === "undefined") {
                var nodes = this.contentEl.children;
                var node = nodes[Math.floor(nodes.length / 2)];
                this.itemHeight = node.offsetHeight;
              }
              this.blockHeight = this.itemHeight * Constants.BLOCK_ROWS;
              this.clusterRows = Constants.BLOCK_ROWS * Constants.CLUSTER_BLOCKS;
              this.clusterHeight = this.blockHeight * Constants.CLUSTER_BLOCKS;
            }
          },
          {
            key: "getNum",
            value: function getNum() {
              this.scrollTop = this.scrollEl.scrollTop;
              return Math.floor(this.scrollTop / (this.clusterHeight - this.blockHeight)) || 0;
            }
          },
          {
            key: "initData",
            value: function initData(rows, num) {
              if (rows.length < Constants.BLOCK_ROWS) {
                return {
                  topOffset: 0,
                  bottomOffset: 0,
                  rowsAbove: 0,
                  rows
                };
              }
              var start = Math.max((this.clusterRows - Constants.BLOCK_ROWS) * num, 0);
              var end = start + this.clusterRows;
              var topOffset = Math.max(start * this.itemHeight, 0);
              var bottomOffset = Math.max((rows.length - end) * this.itemHeight, 0);
              var thisRows = [];
              var rowsAbove = start;
              if (topOffset < 1) {
                rowsAbove++;
              }
              for (var i = start; i < end; i++) {
                rows[i] && thisRows.push(rows[i]);
              }
              this.dataStart = start;
              this.dataEnd = end;
              return {
                topOffset,
                bottomOffset,
                rowsAbove,
                rows: thisRows
              };
            }
          },
          {
            key: "checkChanges",
            value: function checkChanges(type, value) {
              var changed = value !== this.cache[type];
              this.cache[type] = value;
              return changed;
            }
          },
          {
            key: "getExtra",
            value: function getExtra(className, height) {
              var tag = document.createElement("li");
              tag.className = "virtual-scroll-".concat(className);
              if (height) {
                tag.style.height = "".concat(height, "px");
              }
              return tag.outerHTML;
            }
          }
        ]);
        return VirtualScroll2;
      }();
      var uncurryThis$1 = functionUncurryThis;
      var toObject$1 = toObject$7;
      var floor = Math.floor;
      var charAt = uncurryThis$1("".charAt);
      var replace = uncurryThis$1("".replace);
      var stringSlice$1 = uncurryThis$1("".slice);
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
      var getSubstitution$1 = function(matched, str, position, captures, namedCaptures, replacement2) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== void 0) {
          namedCaptures = toObject$1(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return replace(replacement2, symbols, function(match2, ch) {
          var capture;
          switch (charAt(ch, 0)) {
            case "$":
              return "$";
            case "&":
              return matched;
            case "`":
              return stringSlice$1(str, 0, position);
            case "'":
              return stringSlice$1(str, tailPos);
            case "<":
              capture = namedCaptures[stringSlice$1(ch, 1, -1)];
              break;
            default:
              var n = +ch;
              if (n === 0) return match2;
              if (n > m) {
                var f = floor(n / 10);
                if (f === 0) return match2;
                if (f <= m)
                  return captures[f - 1] === void 0 ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
                return match2;
              }
              capture = captures[n - 1];
          }
          return capture === void 0 ? "" : capture;
        });
      };
      var apply = functionApply;
      var call = functionCall;
      var uncurryThis = functionUncurryThis;
      var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
      var fails = fails$n;
      var anObject = anObject$b;
      var isCallable = isCallable$e;
      var isNullOrUndefined = isNullOrUndefined$6;
      var toIntegerOrInfinity = toIntegerOrInfinity$4;
      var toLength = toLength$3;
      var toString = toString$8;
      var requireObjectCoercible = requireObjectCoercible$8;
      var advanceStringIndex = advanceStringIndex$2;
      var getMethod = getMethod$4;
      var getSubstitution = getSubstitution$1;
      var regExpExec = regexpExecAbstract;
      var wellKnownSymbol = wellKnownSymbol$d;
      var REPLACE = wellKnownSymbol("replace");
      var max = Math.max;
      var min = Math.min;
      var concat = uncurryThis([].concat);
      var push = uncurryThis([].push);
      var stringIndexOf = uncurryThis("".indexOf);
      var stringSlice = uncurryThis("".slice);
      var maybeToString = function(it) {
        return it === void 0 ? it : String(it);
      };
      var REPLACE_KEEPS_$0 = function() {
        return "a".replace(/./, "$0") === "$0";
      }();
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
        if (/./[REPLACE]) {
          return /./[REPLACE]("a", "$0") === "";
        }
        return false;
      }();
      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
        var re = /./;
        re.exec = function() {
          var result = [];
          result.groups = { a: "7" };
          return result;
        };
        return "".replace(re, "$<a>") !== "7";
      });
      fixRegExpWellKnownSymbolLogic(
        "replace",
        function(_, nativeReplace2, maybeCallNative) {
          var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
          return [
            // `String.prototype.replace` method
            // https://tc39.es/ecma262/#sec-string.prototype.replace
            function replace2(searchValue, replaceValue) {
              var O = requireObjectCoercible(this);
              var replacer = isNullOrUndefined(searchValue) ? void 0 : getMethod(searchValue, REPLACE);
              return replacer ? call(replacer, searchValue, O, replaceValue) : call(nativeReplace2, toString(O), searchValue, replaceValue);
            },
            // `RegExp.prototype[@@replace]` method
            // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
            function(string, replaceValue) {
              var rx = anObject(this);
              var S = toString(string);
              if (typeof replaceValue == "string" && stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf(replaceValue, "$<") === -1) {
                var res = maybeCallNative(nativeReplace2, rx, S, replaceValue);
                if (res.done) return res.value;
              }
              var functionalReplace = isCallable(replaceValue);
              if (!functionalReplace) replaceValue = toString(replaceValue);
              var global2 = rx.global;
              if (global2) {
                var fullUnicode = rx.unicode;
                rx.lastIndex = 0;
              }
              var results = [];
              while (true) {
                var result = regExpExec(rx, S);
                if (result === null) break;
                push(results, result);
                if (!global2) break;
                var matchStr = toString(result[0]);
                if (matchStr === "")
                  rx.lastIndex = advanceStringIndex(
                    S,
                    toLength(rx.lastIndex),
                    fullUnicode
                  );
              }
              var accumulatedResult = "";
              var nextSourcePosition = 0;
              for (var i = 0; i < results.length; i++) {
                result = results[i];
                var matched = toString(result[0]);
                var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
                var captures = [];
                for (var j = 1; j < result.length; j++)
                  push(captures, maybeToString(result[j]));
                var namedCaptures = result.groups;
                if (functionalReplace) {
                  var replacerArgs = concat([matched], captures, position, S);
                  if (namedCaptures !== void 0) push(replacerArgs, namedCaptures);
                  var replacement2 = toString(
                    apply(replaceValue, void 0, replacerArgs)
                  );
                } else {
                  replacement2 = getSubstitution(
                    matched,
                    S,
                    position,
                    captures,
                    namedCaptures,
                    replaceValue
                  );
                }
                if (position >= nextSourcePosition) {
                  accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement2;
                  nextSourcePosition = position + matched.length;
                }
              }
              return accumulatedResult + stringSlice(S, nextSourcePosition);
            }
          ];
        },
        !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
      );
      var aCallable = aCallable$3;
      var toObject = toObject$7;
      var IndexedObject = indexedObject;
      var lengthOfArrayLike = lengthOfArrayLike$6;
      var $TypeError = TypeError;
      var createMethod = function(IS_RIGHT) {
        return function(that, callbackfn, argumentsLength, memo) {
          aCallable(callbackfn);
          var O = toObject(that);
          var self2 = IndexedObject(O);
          var length = lengthOfArrayLike(O);
          var index = IS_RIGHT ? length - 1 : 0;
          var i = IS_RIGHT ? -1 : 1;
          if (argumentsLength < 2)
            while (true) {
              if (index in self2) {
                memo = self2[index];
                index += i;
                break;
              }
              index += i;
              if (IS_RIGHT ? index < 0 : length <= index) {
                throw $TypeError("Reduce of empty array with no initial value");
              }
            }
          for (; IS_RIGHT ? index >= 0 : length > index; index += i)
            if (index in self2) {
              memo = callbackfn(memo, self2[index], index, O);
            }
          return memo;
        };
      };
      var arrayReduce = {
        // `Array.prototype.reduce` method
        // https://tc39.es/ecma262/#sec-array.prototype.reduce
        left: createMethod(false),
        // `Array.prototype.reduceRight` method
        // https://tc39.es/ecma262/#sec-array.prototype.reduceright
        right: createMethod(true)
      };
      var classof = classofRaw$2;
      var engineIsNode = typeof process != "undefined" && classof(process) == "process";
      var $ = _export;
      var $reduce = arrayReduce.left;
      var arrayMethodIsStrict = arrayMethodIsStrict$3;
      var CHROME_VERSION = engineV8Version;
      var IS_NODE = engineIsNode;
      var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;
      var FORCED = CHROME_BUG || !arrayMethodIsStrict("reduce");
      $(
        { target: "Array", proto: true, forced: FORCED },
        {
          reduce: function reduce(callbackfn) {
            var length = arguments.length;
            return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : void 0);
          }
        }
      );
      var compareObjects = function compareObjects2(objectA, objectB, compareLength) {
        var aKeys = Object.keys(objectA);
        var bKeys = Object.keys(objectB);
        if (aKeys.length !== bKeys.length) {
          return false;
        }
        for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
          var key = _aKeys[_i];
          if (bKeys.includes(key) && objectA[key] !== objectB[key]) {
            return false;
          }
        }
        return true;
      };
      var removeDiacritics = function removeDiacritics2(str) {
        if (str.normalize) {
          return str.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
        }
        var defaultDiacriticsRemovalMap = [
          {
            base: "A",
            letters: /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g
          },
          {
            base: "AA",
            letters: /[\uA732]/g
          },
          {
            base: "AE",
            letters: /[\u00C6\u01FC\u01E2]/g
          },
          {
            base: "AO",
            letters: /[\uA734]/g
          },
          {
            base: "AU",
            letters: /[\uA736]/g
          },
          {
            base: "AV",
            letters: /[\uA738\uA73A]/g
          },
          {
            base: "AY",
            letters: /[\uA73C]/g
          },
          {
            base: "B",
            letters: /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g
          },
          {
            base: "C",
            letters: /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g
          },
          {
            base: "D",
            letters: /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g
          },
          {
            base: "DZ",
            letters: /[\u01F1\u01C4]/g
          },
          {
            base: "Dz",
            letters: /[\u01F2\u01C5]/g
          },
          {
            base: "E",
            letters: /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g
          },
          {
            base: "F",
            letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g
          },
          {
            base: "G",
            letters: /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g
          },
          {
            base: "H",
            letters: /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g
          },
          {
            base: "I",
            letters: /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g
          },
          {
            base: "J",
            letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g
          },
          {
            base: "K",
            letters: /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g
          },
          {
            base: "L",
            letters: /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g
          },
          {
            base: "LJ",
            letters: /[\u01C7]/g
          },
          {
            base: "Lj",
            letters: /[\u01C8]/g
          },
          {
            base: "M",
            letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g
          },
          {
            base: "N",
            letters: /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g
          },
          {
            base: "NJ",
            letters: /[\u01CA]/g
          },
          {
            base: "Nj",
            letters: /[\u01CB]/g
          },
          {
            base: "O",
            letters: /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g
          },
          {
            base: "OI",
            letters: /[\u01A2]/g
          },
          {
            base: "OO",
            letters: /[\uA74E]/g
          },
          {
            base: "OU",
            letters: /[\u0222]/g
          },
          {
            base: "P",
            letters: /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g
          },
          {
            base: "Q",
            letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g
          },
          {
            base: "R",
            letters: /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g
          },
          {
            base: "S",
            letters: /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g
          },
          {
            base: "T",
            letters: /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g
          },
          {
            base: "TZ",
            letters: /[\uA728]/g
          },
          {
            base: "U",
            letters: /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g
          },
          {
            base: "V",
            letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g
          },
          {
            base: "VY",
            letters: /[\uA760]/g
          },
          {
            base: "W",
            letters: /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g
          },
          {
            base: "X",
            letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g
          },
          {
            base: "Y",
            letters: /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g
          },
          {
            base: "Z",
            letters: /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g
          },
          {
            base: "a",
            letters: /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g
          },
          {
            base: "aa",
            letters: /[\uA733]/g
          },
          {
            base: "ae",
            letters: /[\u00E6\u01FD\u01E3]/g
          },
          {
            base: "ao",
            letters: /[\uA735]/g
          },
          {
            base: "au",
            letters: /[\uA737]/g
          },
          {
            base: "av",
            letters: /[\uA739\uA73B]/g
          },
          {
            base: "ay",
            letters: /[\uA73D]/g
          },
          {
            base: "b",
            letters: /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g
          },
          {
            base: "c",
            letters: /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g
          },
          {
            base: "d",
            letters: /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g
          },
          {
            base: "dz",
            letters: /[\u01F3\u01C6]/g
          },
          {
            base: "e",
            letters: /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g
          },
          {
            base: "f",
            letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g
          },
          {
            base: "g",
            letters: /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g
          },
          {
            base: "h",
            letters: /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g
          },
          {
            base: "hv",
            letters: /[\u0195]/g
          },
          {
            base: "i",
            letters: /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g
          },
          {
            base: "j",
            letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g
          },
          {
            base: "k",
            letters: /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g
          },
          {
            base: "l",
            letters: /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g
          },
          {
            base: "lj",
            letters: /[\u01C9]/g
          },
          {
            base: "m",
            letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g
          },
          {
            base: "n",
            letters: /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g
          },
          {
            base: "nj",
            letters: /[\u01CC]/g
          },
          {
            base: "o",
            letters: /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g
          },
          {
            base: "oi",
            letters: /[\u01A3]/g
          },
          {
            base: "ou",
            letters: /[\u0223]/g
          },
          {
            base: "oo",
            letters: /[\uA74F]/g
          },
          {
            base: "p",
            letters: /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g
          },
          {
            base: "q",
            letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g
          },
          {
            base: "r",
            letters: /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g
          },
          {
            base: "s",
            letters: /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g
          },
          {
            base: "t",
            letters: /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g
          },
          {
            base: "tz",
            letters: /[\uA729]/g
          },
          {
            base: "u",
            letters: /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g
          },
          {
            base: "v",
            letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g
          },
          {
            base: "vy",
            letters: /[\uA761]/g
          },
          {
            base: "w",
            letters: /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
          },
          {
            base: "x",
            letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g
          },
          {
            base: "y",
            letters: /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g
          },
          {
            base: "z",
            letters: /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g
          }
        ];
        return defaultDiacriticsRemovalMap.reduce(function(string, _ref) {
          var letters = _ref.letters, base = _ref.base;
          return string.replace(letters, base);
        }, str);
      };
      var setDataKeys = function setDataKeys2(data2) {
        var total = 0;
        data2.forEach(function(row, i) {
          if (row.type === "optgroup") {
            row._key = "group_".concat(i);
            row.visible = typeof row.visible === "undefined" ? true : row.visible;
            row.children.forEach(function(child, j) {
              child.visible = typeof child.visible === "undefined" ? true : child.visible;
              if (!child.divider) {
                child._key = "option_".concat(i, "_").concat(j);
                total += 1;
              }
            });
          } else {
            row.visible = typeof row.visible === "undefined" ? true : row.visible;
            if (!row.divider) {
              row._key = "option_".concat(i);
              total += 1;
            }
          }
        });
        return total;
      };
      var findByParam = function findByParam2(data2, param, value) {
        var _iterator = _createForOfIteratorHelper(data2), _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var row = _step.value;
            if (row[param] === value || row[param] === "".concat(+row[param]) && +row[param] === value) {
              return row;
            }
            if (row.type === "optgroup") {
              var _iterator2 = _createForOfIteratorHelper(row.children), _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var child = _step2.value;
                  if (child[param] === value || child[param] === "".concat(+child[param]) && +child[param] === value) {
                    return child;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      };
      var removeUndefined = function removeUndefined2(obj) {
        Object.keys(obj).forEach(function(key) {
          return obj[key] === void 0 ? delete obj[key] : "";
        });
        return obj;
      };
      var getDocumentClickEvent = function getDocumentClickEvent2() {
        var id2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        id2 = id2 || "".concat(+/* @__PURE__ */ new Date()).concat(~~(Math.random() * 1e6));
        return "click.multiple-select-".concat(id2);
      };
      var MultipleSelect = /* @__PURE__ */ function() {
        function MultipleSelect2($el, options) {
          _classCallCheck(this, MultipleSelect2);
          this.$el = $el;
          this.options = $$e.extend({}, Constants.DEFAULTS, options);
        }
        _createClass(MultipleSelect2, [
          {
            key: "init",
            value: function init() {
              this.initLocale();
              this.initContainer();
              this.initData();
              this.initSelected(true);
              this.initFilter();
              this.initDrop();
              this.initView();
              this.options.onAfterCreate();
            }
          },
          {
            key: "initLocale",
            value: function initLocale() {
              if (this.options.locale) {
                var locales = $$e.fn.multipleSelect.locales;
                var parts = this.options.locale.split(/-|_/);
                parts[0] = parts[0].toLowerCase();
                if (parts[1]) {
                  parts[1] = parts[1].toUpperCase();
                }
                if (locales[this.options.locale]) {
                  $$e.extend(this.options, locales[this.options.locale]);
                } else if (locales[parts.join("-")]) {
                  $$e.extend(this.options, locales[parts.join("-")]);
                } else if (locales[parts[0]]) {
                  $$e.extend(this.options, locales[parts[0]]);
                }
              }
            }
          },
          {
            key: "initContainer",
            value: function initContainer() {
              var _this = this;
              var el = this.$el[0];
              var name = el.getAttribute("name") || this.options.name || "";
              if (this.options.classes) {
                this.$el.addClass(this.options.classes);
              }
              if (this.options.classPrefix) {
                this.$el.addClass(this.options.classPrefix);
                if (this.options.size) {
                  this.$el.addClass(
                    "".concat(this.options.classPrefix, "-").concat(this.options.size)
                  );
                }
              }
              this.$el.hide();
              this.$label = this.$el.closest("label");
              if (!this.$label.length && this.$el.attr("id")) {
                this.$label = $$e('label[for="'.concat(this.$el.attr("id"), '"]'));
              }
              if (this.$label.find(">input").length) {
                this.$label = null;
              }
              if (typeof this.options.single === "undefined") {
                this.options.single = el.getAttribute("multiple") === null;
              }
              this.$parent = $$e(
                '\n      <div class="ms-parent '.concat(el.getAttribute("class") || "", " ").concat(this.options.classes, '"\n      title="').concat(el.getAttribute("title") || "", '" />\n    ')
              );
              this.options.placeholder = this.options.placeholder || el.getAttribute("placeholder") || "";
              this.tabIndex = el.getAttribute("tabindex");
              var tabIndex = "";
              if (this.tabIndex !== null) {
                tabIndex = this.tabIndex && 'tabindex="'.concat(this.tabIndex, '"');
              }
              this.$el.attr("tabindex", -1);
              this.$choice = $$e(
                '\n      <button type="button" class="ms-choice"'.concat(tabIndex, '>\n      <span class="placeholder">').concat(this.options.placeholder, "</span>\n      ").concat(
                  this.options.showClear ? '<div class="icon-close"></div>' : "",
                  '\n      <div class="icon-caret"></div>\n      </button>\n    '
                )
              );
              this.$drop = $$e('<div class="ms-drop '.concat(this.options.position, '" />'));
              this.$close = this.$choice.find(".icon-close");
              if (this.options.dropWidth) {
                this.$drop.css("width", this.options.dropWidth);
              }
              this.$el.after(this.$parent);
              this.$parent.append(this.$choice);
              this.$parent.append(this.$drop);
              if (el.disabled) {
                this.$choice.addClass("disabled");
              }
              this.selectAllName = 'data-name="selectAll'.concat(name, '"');
              this.selectGroupName = 'data-name="selectGroup'.concat(name, '"');
              this.selectItemName = 'data-name="selectItem'.concat(name, '"');
              if (!this.options.keepOpen) {
                var clickEvent = getDocumentClickEvent(this.$el.attr("id"));
                $$e(document).off(clickEvent).on(clickEvent, function(e) {
                  if ($$e(e.target)[0] === _this.$choice[0] || $$e(e.target).parents(".ms-choice")[0] === _this.$choice[0]) {
                    return;
                  }
                  if (($$e(e.target)[0] === _this.$drop[0] || $$e(e.target).parents(".ms-drop")[0] !== _this.$drop[0] && e.target !== el) && _this.options.isOpen) {
                    _this.close();
                  }
                });
              }
            }
          },
          {
            key: "initData",
            value: function initData() {
              var _this2 = this;
              var data2 = [];
              if (this.options.data) {
                if (Array.isArray(this.options.data)) {
                  this.data = this.options.data.map(function(it) {
                    if (typeof it === "string" || typeof it === "number") {
                      return {
                        text: it,
                        value: it
                      };
                    }
                    return it;
                  });
                } else if (_typeof(this.options.data) === "object") {
                  for (var _i = 0, _Object$entries = Object.entries(this.options.data); _i < _Object$entries.length; _i++) {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), value = _Object$entries$_i[0], text = _Object$entries$_i[1];
                    data2.push({
                      value,
                      text
                    });
                  }
                  this.data = data2;
                }
              } else {
                $$e.each(this.$el.children(), function(i, elm) {
                  var row = _this2.initRow(i, elm);
                  if (row) {
                    data2.push(_this2.initRow(i, elm));
                  }
                });
                this.options.data = data2;
                this.data = data2;
                this.fromHtml = true;
              }
              this.dataTotal = setDataKeys(this.data);
            }
          },
          {
            key: "initRow",
            value: function initRow(i, elm, groupDisabled) {
              var _this3 = this;
              var row = {};
              var $elm = $$e(elm);
              if ($elm.is("option")) {
                row.type = "option";
                row.text = this.options.textTemplate($elm);
                row.value = elm.value;
                row.visible = true;
                row.selected = !!elm.selected;
                row.disabled = groupDisabled || elm.disabled;
                row.classes = elm.getAttribute("class") || "";
                row.title = elm.getAttribute("title") || "";
                if ($elm.data("value")) {
                  row._value = $elm.data("value");
                }
                if (Object.keys($elm.data()).length) {
                  row._data = $elm.data();
                  if (row._data.divider) {
                    row.divider = row._data.divider;
                  }
                }
                return row;
              }
              if ($elm.is("optgroup")) {
                row.type = "optgroup";
                row.label = this.options.labelTemplate($elm);
                row.visible = true;
                row.selected = !!elm.selected;
                row.disabled = elm.disabled;
                row.children = [];
                if (Object.keys($elm.data()).length) {
                  row._data = $elm.data();
                }
                $$e.each($elm.children(), function(j, elem) {
                  row.children.push(_this3.initRow(j, elem, row.disabled));
                });
                return row;
              }
              return null;
            }
          },
          {
            key: "initSelected",
            value: function initSelected(ignoreTrigger) {
              var selectedTotal = 0;
              var _iterator = _createForOfIteratorHelper(this.data), _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var row = _step.value;
                  if (row.type === "optgroup") {
                    var selectedCount = row.children.filter(function(child) {
                      return child.selected && !child.disabled && child.visible;
                    }).length;
                    if (row.children.length) {
                      row.selected = !this.options.single && selectedCount && selectedCount === row.children.filter(function(child) {
                        return !child.disabled && child.visible && !child.divider;
                      }).length;
                    }
                    selectedTotal += selectedCount;
                  } else {
                    selectedTotal += row.selected && !row.disabled && row.visible ? 1 : 0;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              this.allSelected = this.data.filter(function(row2) {
                return row2.selected && !row2.disabled && row2.visible;
              }).length === this.data.filter(function(row2) {
                return !row2.disabled && row2.visible && !row2.divider;
              }).length;
              if (!ignoreTrigger) {
                if (this.allSelected) {
                  this.options.onCheckAll();
                } else if (selectedTotal === 0) {
                  this.options.onUncheckAll();
                }
              }
            }
          },
          {
            key: "initFilter",
            value: function initFilter() {
              this.filterText = "";
              if (this.options.filter || !this.options.filterByDataLength) {
                return;
              }
              var length = 0;
              var _iterator2 = _createForOfIteratorHelper(this.data), _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var option = _step2.value;
                  if (option.type === "optgroup") {
                    length += option.children.length;
                  } else {
                    length += 1;
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              this.options.filter = length > this.options.filterByDataLength;
            }
          },
          {
            key: "initDrop",
            value: function initDrop() {
              var _this4 = this;
              this.initList();
              this.update(true);
              if (this.options.isOpen) {
                setTimeout(function() {
                  _this4.open();
                }, 50);
              }
              if (this.options.openOnHover) {
                this.$parent.hover(
                  function() {
                    _this4.open();
                  },
                  function() {
                    _this4.close();
                  }
                );
              }
            }
          },
          {
            key: "initList",
            value: function initList() {
              var html2 = [];
              if (this.options.filter) {
                html2.push(
                  '\n        <div class="ms-search">\n          <input type="text" autocomplete="off" autocorrect="off"\n            autocapitalize="off" spellcheck="false"\n            placeholder="'.concat(
                    this.options.filterPlaceholder,
                    '">\n        </div>\n      '
                  )
                );
              }
              html2.push("<ul></ul>");
              this.$drop.html(html2.join(""));
              this.$ul = this.$drop.find(">ul");
              this.initListItems();
            }
          },
          {
            key: "initListItems",
            value: function initListItems() {
              var _this5 = this;
              var rows = this.getListRows();
              var offset = 0;
              if (this.options.selectAll && !this.options.single) {
                offset = -1;
              }
              if (rows.length > Constants.BLOCK_ROWS * Constants.CLUSTER_BLOCKS) {
                if (this.virtualScroll) {
                  this.virtualScroll.destroy();
                }
                var dropVisible = this.$drop.is(":visible");
                if (!dropVisible) {
                  this.$drop.css("left", -1e4).show();
                }
                var updateDataOffset = function updateDataOffset2() {
                  _this5.updateDataStart = _this5.virtualScroll.dataStart + offset;
                  _this5.updateDataEnd = _this5.virtualScroll.dataEnd + offset;
                  if (_this5.updateDataStart < 0) {
                    _this5.updateDataStart = 0;
                  }
                  if (_this5.updateDataEnd > _this5.data.length) {
                    _this5.updateDataEnd = _this5.data.length;
                  }
                };
                this.virtualScroll = new VirtualScroll({
                  rows,
                  scrollEl: this.$ul[0],
                  contentEl: this.$ul[0],
                  callback: function callback() {
                    updateDataOffset();
                    _this5.events();
                  }
                });
                updateDataOffset();
                if (!dropVisible) {
                  this.$drop.css("left", 0).hide();
                }
              } else {
                this.$ul.html(rows.join(""));
                this.updateDataStart = 0;
                this.updateDataEnd = this.updateData.length;
                this.virtualScroll = null;
              }
              this.events();
            }
          },
          {
            key: "getListRows",
            value: function getListRows() {
              var _this6 = this;
              var rows = [];
              if (this.options.selectAll && !this.options.single) {
                rows.push(
                  '\n        <li class="ms-select-all" tabindex="0">\n        <label>\n        <input type="checkbox" '.concat(this.selectAllName).concat(
                    this.allSelected ? ' checked="checked"' : "",
                    ' tabindex="-1" />\n        <span>'
                  ).concat(
                    this.options.formatSelectAll(),
                    "</span>\n        </label>\n        </li>\n      "
                  )
                );
              }
              this.updateData = [];
              this.data.forEach(function(row) {
                rows.push.apply(rows, _toConsumableArray(_this6.initListItem(row)));
              });
              rows.push(
                '<li class="ms-no-results">'.concat(
                  this.options.formatNoMatchesFound(),
                  "</li>"
                )
              );
              return rows;
            }
          },
          {
            key: "initListItem",
            value: function initListItem(row) {
              var _this7 = this;
              var level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
              var title = row.title ? 'title="'.concat(row.title, '"') : "";
              var multiple = this.options.multiple ? "multiple" : "";
              var type = this.options.single ? "radio" : "checkbox";
              var classes = "";
              if (!row.visible) {
                return [];
              }
              this.updateData.push(row);
              if (this.options.single && !this.options.singleRadio) {
                classes = "hide-radio ";
              }
              if (row.selected) {
                classes += "selected ";
              }
              if (row.type === "optgroup") {
                var _customStyle = this.options.styler(row);
                var _style = _customStyle ? 'style="'.concat(_customStyle, '"') : "";
                var html2 = [];
                var group = this.options.hideOptgroupCheckboxes || this.options.single ? "<span ".concat(this.selectGroupName, ' data-key="').concat(row._key, '"></span>') : '<input type="checkbox"\n          '.concat(this.selectGroupName, '\n          data-key="').concat(row._key, '"\n          ').concat(
                  row.selected ? ' checked="checked"' : "",
                  "\n          "
                ).concat(
                  row.disabled ? ' disabled="disabled"' : "",
                  '\n          tabindex="-1"\n        >'
                );
                if (!classes.includes("hide-radio") && (this.options.hideOptgroupCheckboxes || this.options.single)) {
                  classes += "hide-radio ";
                }
                html2.push(
                  '\n        <li class="group '.concat(classes, '" ').concat(_style, ' tabindex="').concat(
                    classes.includes("hide-radio") || row.disabled ? -1 : 0,
                    '">\n        <label class="optgroup'
                  ).concat(
                    this.options.single || row.disabled ? " disabled" : "",
                    '">\n        '
                  ).concat(group).concat(row.label, "\n        </label>\n        </li>\n      ")
                );
                row.children.forEach(function(child) {
                  html2.push.apply(
                    html2,
                    _toConsumableArray(_this7.initListItem(child, 1))
                  );
                });
                return html2;
              }
              var customStyle = this.options.styler(row);
              var style = customStyle ? 'style="'.concat(customStyle, '"') : "";
              classes += row.classes || "";
              if (level && this.options.single) {
                classes += "option-level-".concat(level, " ");
              }
              if (row.divider) {
                return '<li class="option-divider"/>';
              }
              return [
                '\n      <li class="'.concat(multiple, " ").concat(classes, '" ').concat(title, " ").concat(style, ' tabindex="').concat(row.disabled ? -1 : 0, '">\n      <label class="').concat(row.disabled ? "disabled" : "", '">\n      <input type="').concat(type, '"\n        value="').concat(row.value, '"\n        data-key="').concat(row._key, '"\n        ').concat(this.selectItemName, "\n        ").concat(row.selected ? ' checked="checked"' : "", "\n        ").concat(
                  row.disabled ? ' disabled="disabled"' : "",
                  '\n        tabindex="-1"\n      >\n      <span>'
                ).concat(row.text, "</span>\n      </label>\n      </li>\n    ")
              ];
            }
          },
          {
            key: "events",
            value: function events() {
              var _this8 = this;
              this.$searchInput = this.$drop.find(".ms-search input");
              this.$selectAll = this.$drop.find("input[".concat(this.selectAllName, "]"));
              this.$selectGroups = this.$drop.find(
                "input[".concat(this.selectGroupName, "],span[").concat(this.selectGroupName, "]")
              );
              this.$selectItems = this.$drop.find(
                "input[".concat(this.selectItemName, "]:enabled")
              );
              this.$disableItems = this.$drop.find(
                "input[".concat(this.selectItemName, "]:disabled")
              );
              this.$noResults = this.$drop.find(".ms-no-results");
              var toggleOpen = function toggleOpen2(e) {
                e.preventDefault();
                if ($$e(e.target).hasClass("icon-close")) {
                  return;
                }
                _this8[_this8.options.isOpen ? "close" : "open"]();
              };
              if (this.$label && this.$label.length) {
                this.$label.off("click").on("click", function(e) {
                  if (e.target.nodeName.toLowerCase() !== "label") {
                    return;
                  }
                  toggleOpen(e);
                  if (!_this8.options.filter || !_this8.options.isOpen) {
                    _this8.focus();
                  }
                  e.stopPropagation();
                });
              }
              this.$choice.off("click").on("click", toggleOpen).off("focus").on("focus", this.options.onFocus).off("blur").on("blur", this.options.onBlur);
              this.$parent.off("keydown").on("keydown", function(e) {
                if (e.which === 27 && !_this8.options.keepOpen) {
                  _this8.close();
                  _this8.$choice.focus();
                }
              });
              this.$close.off("click").on("click", function(e) {
                e.preventDefault();
                _this8._checkAll(false, true);
                _this8.initSelected(false);
                _this8.updateSelected();
                _this8.update();
                _this8.options.onClear();
              });
              this.$searchInput.off("keydown").on("keydown", function(e) {
                if (e.keyCode === 9 && e.shiftKey) {
                  _this8.close();
                }
              }).off("keyup").on("keyup", function(e) {
                if (_this8.options.filterAcceptOnEnter && [13, 32].includes(e.which) && _this8.$searchInput.val()) {
                  if (_this8.options.single) {
                    var $items = _this8.$selectItems.closest("li").filter(":visible");
                    if ($items.length) {
                      _this8.setSelects([
                        $items.first().find("input[".concat(_this8.selectItemName, "]")).val()
                      ]);
                    }
                  } else {
                    _this8.$selectAll.click();
                  }
                  _this8.close();
                  _this8.focus();
                  return;
                }
                _this8.filter();
              });
              this.$selectAll.off("click").on("click", function(e) {
                _this8._checkAll($$e(e.currentTarget).prop("checked"));
              });
              this.$selectGroups.off("click").on("click", function(e) {
                var $this = $$e(e.currentTarget);
                var checked = $this.prop("checked");
                var group = findByParam(_this8.data, "_key", $this.data("key"));
                _this8._checkGroup(group, checked);
                _this8.options.onOptgroupClick(
                  removeUndefined({
                    label: group.label,
                    selected: group.selected,
                    data: group._data,
                    children: group.children.map(function(child) {
                      return removeUndefined({
                        text: child.text,
                        value: child.value,
                        selected: child.selected,
                        disabled: child.disabled,
                        data: child._data
                      });
                    })
                  })
                );
              });
              this.$selectItems.off("click").on("click", function(e) {
                var $this = $$e(e.currentTarget);
                var checked = $this.prop("checked");
                var option = findByParam(_this8.data, "_key", $this.data("key"));
                var close = function close2() {
                  if (_this8.options.single && _this8.options.isOpen && !_this8.options.keepOpen) {
                    _this8.close();
                  }
                };
                if (_this8.options.onBeforeClick(option) === false) {
                  close();
                  return;
                }
                _this8._check(option, checked);
                _this8.options.onClick(
                  removeUndefined({
                    text: option.text,
                    value: option.value,
                    selected: option.selected,
                    data: option._data
                  })
                );
                close();
              });
              this.$ul.find("li").off("keydown").on("keydown", function(e) {
                var $this = $$e(e.currentTarget);
                var $divider;
                var $li;
                switch (e.key) {
                  case "ArrowUp":
                    e.preventDefault();
                    $divider = $this.prev("li.option-divider");
                    $li = $divider.length ? $divider : $this;
                    $li.prev().trigger("focus");
                    break;
                  case "ArrowDown":
                    e.preventDefault();
                    $divider = $this.next("li.option-divider");
                    $li = $divider.length ? $divider : $this;
                    $li.next().trigger("focus");
                    break;
                  case "Enter":
                    e.preventDefault();
                    $this.find("input").trigger("click");
                    if (_this8.options.single) {
                      _this8.$choice.trigger("focus");
                    }
                    break;
                }
              });
            }
          },
          {
            key: "initView",
            value: function initView() {
              var computedWidth;
              if (window.getComputedStyle) {
                computedWidth = window.getComputedStyle(this.$el[0]).width;
                if (computedWidth === "auto") {
                  computedWidth = this.$drop.outerWidth() + 20;
                }
              } else {
                computedWidth = this.$el.outerWidth() + 20;
              }
              this.$parent.css("width", this.options.width || computedWidth);
              this.$el.show().addClass("ms-offscreen");
            }
          },
          {
            key: "open",
            value: function open() {
              if (this.$choice.hasClass("disabled")) {
                return;
              }
              this.options.isOpen = true;
              this.$parent.addClass("ms-parent-open");
              this.$choice.find(">div").addClass("open");
              this.$drop[this.animateMethod("show")]();
              this.$selectAll.parent().show();
              this.$noResults.hide();
              if (!this.data.length) {
                this.$selectAll.parent().hide();
                this.$noResults.show();
              }
              if (this.options.container) {
                var offset = this.$drop.offset();
                this.$drop.appendTo($$e(this.options.container));
                this.$drop.offset({
                  top: offset.top,
                  left: offset.left
                }).css("min-width", "auto").outerWidth(this.$parent.outerWidth());
              }
              var maxHeight = this.options.maxHeight;
              if (this.options.maxHeightUnit === "row") {
                maxHeight = this.$drop.find(">ul>li").first().outerHeight() * this.options.maxHeight;
              }
              this.$drop.find(">ul").css("max-height", "".concat(maxHeight, "px"));
              this.$drop.find(".multiple").css("width", "".concat(this.options.multipleWidth, "px"));
              if (this.data.length && this.options.filter) {
                this.$searchInput.val("");
                this.$searchInput.focus();
                this.filter(true);
              }
              this.options.onOpen();
            }
          },
          {
            key: "close",
            value: function close() {
              this.options.isOpen = false;
              this.$parent.removeClass("ms-parent-open");
              this.$choice.find(">div").removeClass("open");
              this.$drop[this.animateMethod("hide")]();
              if (this.options.container) {
                this.$parent.append(this.$drop);
                this.$drop.css({
                  top: "auto",
                  left: "auto"
                });
              }
              this.options.onClose();
            }
          },
          {
            key: "animateMethod",
            value: function animateMethod(method) {
              var methods = {
                show: {
                  fade: "fadeIn",
                  slide: "slideDown"
                },
                hide: {
                  fade: "fadeOut",
                  slide: "slideUp"
                }
              };
              return methods[method][this.options.animate] || method;
            }
          },
          {
            key: "update",
            value: function update(ignoreTrigger) {
              var valueSelects = this.getSelects();
              var textSelects = this.getSelects("text");
              if (this.options.displayValues) {
                textSelects = valueSelects;
              }
              var $span = this.$choice.find(">span");
              var sl = valueSelects.length;
              var html2 = "";
              if (sl === 0) {
                $span.addClass("placeholder").html(this.options.placeholder);
              } else if (sl < this.options.minimumCountSelected) {
                html2 = textSelects.join(this.options.displayDelimiter);
              } else if (this.options.formatAllSelected() && sl === this.dataTotal) {
                html2 = this.options.formatAllSelected();
              } else if (this.options.ellipsis && sl > this.options.minimumCountSelected) {
                html2 = "".concat(
                  textSelects.slice(0, this.options.minimumCountSelected).join(this.options.displayDelimiter),
                  "..."
                );
              } else if (this.options.formatCountSelected() && sl > this.options.minimumCountSelected) {
                html2 = this.options.formatCountSelected(sl, this.dataTotal);
              } else {
                html2 = textSelects.join(this.options.displayDelimiter);
              }
              if (html2) {
                $span.removeClass("placeholder").html(html2);
              }
              if (this.options.displayTitle) {
                $span.prop("title", this.getSelects("text"));
              }
              this.$el.val(this.getSelects());
              if (!ignoreTrigger) {
                this.$el.trigger("change");
              }
            }
          },
          {
            key: "updateSelected",
            value: function updateSelected() {
              for (var i = this.updateDataStart; i < this.updateDataEnd; i++) {
                var row = this.updateData[i];
                this.$drop.find("input[data-key=".concat(row._key, "]")).prop("checked", row.selected).closest("li").toggleClass("selected", row.selected);
              }
              var noResult = this.data.filter(function(row2) {
                return row2.visible;
              }).length === 0;
              if (this.$selectAll.length) {
                this.$selectAll.prop("checked", this.allSelected).closest("li").toggle(!noResult);
              }
              this.$noResults.toggle(noResult);
              if (this.virtualScroll) {
                this.virtualScroll.rows = this.getListRows();
              }
            }
          },
          {
            key: "getData",
            value: function getData() {
              return this.options.data;
            }
          },
          {
            key: "getOptions",
            value: function getOptions() {
              var options = $$e.extend({}, this.options);
              delete options.data;
              return $$e.extend(true, {}, options);
            }
          },
          {
            key: "refreshOptions",
            value: function refreshOptions(options) {
              if (compareObjects(this.options, options)) {
                return;
              }
              this.options = $$e.extend(this.options, options);
              this.destroy();
              this.init();
            }
            // value html, or text, default: 'value'
          },
          {
            key: "getSelects",
            value: function getSelects() {
              var type = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "value";
              var values = [];
              var _iterator3 = _createForOfIteratorHelper(this.data), _step3;
              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                  var row = _step3.value;
                  if (row.type === "optgroup") {
                    var selectedChildren = row.children.filter(function(child) {
                      return child.selected;
                    });
                    if (!selectedChildren.length) {
                      continue;
                    }
                    if (type === "value" || this.options.single) {
                      values.push.apply(
                        values,
                        _toConsumableArray(
                          selectedChildren.map(function(child) {
                            return type === "value" ? child._value || child[type] : child[type];
                          })
                        )
                      );
                    } else {
                      var value = [];
                      value.push("[");
                      value.push(row.label);
                      value.push(
                        ": ".concat(
                          selectedChildren.map(function(child) {
                            return child[type];
                          }).join(", ")
                        )
                      );
                      value.push("]");
                      values.push(value.join(""));
                    }
                  } else if (row.selected) {
                    values.push(type === "value" ? row._value || row[type] : row[type]);
                  }
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
              return values;
            }
          },
          {
            key: "setSelects",
            value: function setSelects(values) {
              var type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "value";
              var ignoreTrigger = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
              var hasChanged = false;
              var _setSelects = function _setSelects2(rows) {
                var _iterator4 = _createForOfIteratorHelper(rows), _step4;
                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
                    var row2 = _step4.value;
                    var selected = false;
                    if (type === "text") {
                      selected = values.includes(
                        $$e("<div>").html(row2.text).text().trim()
                      );
                    } else {
                      selected = values.includes(row2._value || row2.value);
                      if (!selected && row2.value === "".concat(+row2.value)) {
                        selected = values.includes(+row2.value);
                      }
                    }
                    if (row2.selected !== selected) {
                      hasChanged = true;
                    }
                    row2.selected = selected;
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }
              };
              var _iterator5 = _createForOfIteratorHelper(this.data), _step5;
              try {
                for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
                  var row = _step5.value;
                  if (row.type === "optgroup") {
                    _setSelects(row.children);
                  } else {
                    _setSelects([row]);
                  }
                }
              } catch (err) {
                _iterator5.e(err);
              } finally {
                _iterator5.f();
              }
              if (hasChanged) {
                this.initSelected(ignoreTrigger);
                this.updateSelected();
                this.update(ignoreTrigger);
              }
            }
          },
          {
            key: "enable",
            value: function enable() {
              this.$choice.removeClass("disabled");
            }
          },
          {
            key: "disable",
            value: function disable() {
              this.$choice.addClass("disabled");
            }
          },
          {
            key: "check",
            value: function check2(value) {
              var option = findByParam(this.data, "value", value);
              if (!option) {
                return;
              }
              this._check(option, true);
            }
          },
          {
            key: "uncheck",
            value: function uncheck(value) {
              var option = findByParam(this.data, "value", value);
              if (!option) {
                return;
              }
              this._check(option, false);
            }
          },
          {
            key: "_check",
            value: function _check(option, checked) {
              if (this.options.single) {
                this._checkAll(false, true);
              }
              option.selected = checked;
              this.initSelected();
              this.updateSelected();
              this.update();
            }
          },
          {
            key: "checkAll",
            value: function checkAll() {
              this._checkAll(true);
            }
          },
          {
            key: "uncheckAll",
            value: function uncheckAll() {
              this._checkAll(false);
            }
          },
          {
            key: "_checkAll",
            value: function _checkAll(checked, ignoreUpdate) {
              var _iterator6 = _createForOfIteratorHelper(this.data), _step6;
              try {
                for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
                  var row = _step6.value;
                  if (row.type === "optgroup") {
                    this._checkGroup(row, checked, true);
                  } else if (!row.disabled && !row.divider && (ignoreUpdate || row.visible)) {
                    row.selected = checked;
                  }
                }
              } catch (err) {
                _iterator6.e(err);
              } finally {
                _iterator6.f();
              }
              if (!ignoreUpdate) {
                this.initSelected();
                this.updateSelected();
                this.update();
              }
            }
          },
          {
            key: "_checkGroup",
            value: function _checkGroup(group, checked, ignoreUpdate) {
              group.selected = checked;
              group.children.forEach(function(row) {
                if (!row.disabled && !row.divider && (ignoreUpdate || row.visible)) {
                  row.selected = checked;
                }
              });
              if (!ignoreUpdate) {
                this.initSelected();
                this.updateSelected();
                this.update();
              }
            }
          },
          {
            key: "checkInvert",
            value: function checkInvert() {
              if (this.options.single) {
                return;
              }
              var _iterator7 = _createForOfIteratorHelper(this.data), _step7;
              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
                  var row = _step7.value;
                  if (row.type === "optgroup") {
                    var _iterator8 = _createForOfIteratorHelper(row.children), _step8;
                    try {
                      for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                        var child = _step8.value;
                        if (!child.divider) {
                          child.selected = !child.selected;
                        }
                      }
                    } catch (err) {
                      _iterator8.e(err);
                    } finally {
                      _iterator8.f();
                    }
                  } else if (!row.divider) {
                    row.selected = !row.selected;
                  }
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
              this.initSelected();
              this.updateSelected();
              this.update();
            }
          },
          {
            key: "focus",
            value: function focus() {
              this.$choice.focus();
              this.options.onFocus();
            }
          },
          {
            key: "blur",
            value: function blur() {
              this.$choice.blur();
              this.options.onBlur();
            }
          },
          {
            key: "refresh",
            value: function refresh() {
              this.destroy();
              this.init();
            }
          },
          {
            key: "filter",
            value: function filter(ignoreTrigger) {
              var originalSearch = this.$searchInput.val().trim();
              var search = originalSearch.toLowerCase();
              if (this.filterText === search) {
                return;
              }
              this.filterText = search;
              var _iterator9 = _createForOfIteratorHelper(this.data), _step9;
              try {
                for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
                  var row = _step9.value;
                  if (row.type === "optgroup") {
                    if (this.options.filterGroup) {
                      var visible = this.options.customFilter({
                        label: removeDiacritics(row.label.toString().toLowerCase()),
                        search: removeDiacritics(search),
                        originalLabel: row.label,
                        originalSearch,
                        row
                      });
                      row.visible = visible;
                      var _iterator10 = _createForOfIteratorHelper(row.children), _step10;
                      try {
                        for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
                          var child = _step10.value;
                          child.visible = visible;
                        }
                      } catch (err) {
                        _iterator10.e(err);
                      } finally {
                        _iterator10.f();
                      }
                    } else {
                      var _iterator11 = _createForOfIteratorHelper(row.children), _step11;
                      try {
                        for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
                          var _child = _step11.value;
                          _child.visible = this.options.customFilter({
                            text: removeDiacritics(
                              _child.text.toString().toLowerCase()
                            ),
                            search: removeDiacritics(search),
                            originalText: _child.text,
                            originalSearch,
                            row: _child,
                            parent: row
                          });
                        }
                      } catch (err) {
                        _iterator11.e(err);
                      } finally {
                        _iterator11.f();
                      }
                      row.visible = row.children.filter(function(child2) {
                        return child2.visible;
                      }).length > 0;
                    }
                  } else {
                    row.visible = this.options.customFilter({
                      text: removeDiacritics(row.text.toString().toLowerCase()),
                      search: removeDiacritics(search),
                      originalText: row.text,
                      originalSearch,
                      row
                    });
                  }
                }
              } catch (err) {
                _iterator9.e(err);
              } finally {
                _iterator9.f();
              }
              this.initListItems();
              this.initSelected(ignoreTrigger);
              this.updateSelected();
              if (!ignoreTrigger) {
                this.options.onFilter(originalSearch);
              }
            }
          },
          {
            key: "destroy",
            value: function destroy() {
              if (!this.$parent) {
                return;
              }
              this.$el.before(this.$parent).removeClass("ms-offscreen");
              if (this.tabIndex !== null) {
                this.$el.attr("tabindex", this.tabIndex);
              }
              this.$parent.remove();
              if (this.fromHtml) {
                delete this.options.data;
                this.fromHtml = false;
              }
            }
          }
        ]);
        return MultipleSelect2;
      }();
      $$e.fn.multipleSelect = function(option) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        var value;
        this.each(function(i, el) {
          var $this = $$e(el);
          var data2 = $this.data("multipleSelect");
          var options = $$e.extend({}, $this.data(), _typeof(option) === "object" && option);
          if (!data2) {
            data2 = new MultipleSelect($this, options);
            $this.data("multipleSelect", data2);
          }
          if (typeof option === "string") {
            var _data;
            if ($$e.inArray(option, Constants.METHODS) < 0) {
              throw new Error("Unknown method: ".concat(option));
            }
            value = (_data = data2)[option].apply(_data, args);
            if (option === "destroy") {
              $this.removeData("multipleSelect");
            }
          } else {
            data2.init();
          }
        });
        return typeof value !== "undefined" ? value : this;
      };
      $$e.fn.multipleSelect.Constructor = MultipleSelect;
      $$e.fn.multipleSelect.defaults = Constants.DEFAULTS;
      $$e.fn.multipleSelect.locales = Constants.LOCALES;
      $$e.fn.multipleSelect.methods = Constants.METHODS;
    });

    each(components, (component, name) => App.component(name, component));
    boot(App);
    $(() => {
      if ($("select").length) {
        $("select").multipleSelect();
      }
    });

    return App;

}));

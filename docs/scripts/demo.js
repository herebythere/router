const URLBANG = `/urlbang`;
const RECEIVER = `/urlbang/receiver`;
const PUSH = "push";
const BACK = "back";
const HIDDEN = "hidden";
const HASHCHANGE = "hashchange";
const ENTRY = "entry";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const rc = new BroadcastChannel(RECEIVER);
const bc = new BroadcastChannel(URLBANG);
let urlbangIndex = 0;
const getWindowPathname = () =>
  window.location.href.substring(window.origin.length);
const replaceHistoryEntry = (kind, index) => {
  const pathname = getWindowPathname();
  const { title } = document;
  const state = {
    data: undefined,
    kind,
    index,
    pathname,
    title,
  };
  history.replaceState(state, title, pathname);
  return state;
};
rc.addEventListener("message", (e4) => {
  if (document.visibilityState === HIDDEN) return;
  const { kind } = e4.data;
  if (kind === BACK) {
    history.back();
    return;
  }
  let { pathname } = e4.data;
  const currPathname = getWindowPathname();
  if (pathname === currPathname) return;
  urlbangIndex += 1;
  const { title, data } = e4.data;
  const state = {
    index: urlbangIndex,
    kind: PUSH,
    data,
    title,
    pathname,
  };
  history.pushState(state, title, pathname);
  bc.postMessage(state);
});
window.addEventListener(POPSTATE, (e5) => {
  if (e5.state === null) {
    urlbangIndex += 1;
  }
  const state = e5.state === null
    ? replaceHistoryEntry(HASHCHANGE, urlbangIndex)
    : e5.state;
  urlbangIndex = state.index;
  bc.postMessage(state);
});
window.addEventListener(PAGESHOW, (e) => {
  const state = history.state === null
    ? replaceHistoryEntry(ENTRY, urlbangIndex)
    : history.state;
  urlbangIndex = state.index;
  bc.postMessage(state);
});
const t = window.ShadowRoot &&
    (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  e = Symbol(),
  n = new Map();
class s {
  constructor(t2, n2) {
    if (this._$cssResult$ = true, n2 !== e) {
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    }
    this.cssText = t2;
  }
  get styleSheet() {
    let e2 = n.get(this.cssText);
    return t && e2 === void 0 &&
      (n.set(this.cssText, e2 = new CSSStyleSheet()),
        e2.replaceSync(this.cssText)),
      e2;
  }
  toString() {
    return this.cssText;
  }
}
const o = (t2) => new s(typeof t2 == "string" ? t2 : t2 + "", e),
  r = (t2, ...n2) => {
    const o2 = t2.length === 1
      ? t2[0]
      : n2.reduce((e2, n3, s2) =>
        e2 + ((t3) => {
          if (t3._$cssResult$ === true) return t3.cssText;
          if (typeof t3 == "number") return t3;
          throw Error(
            "Value passed to 'css' function must be a 'css' function result: " +
              t3 +
              ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
          );
        })(n3) + t2[s2 + 1], t2[0]);
    return new s(o2, e);
  },
  i = (e2, n2) => {
    t
      ? e2.adoptedStyleSheets = n2.map((t2) =>
        t2 instanceof CSSStyleSheet ? t2 : t2.styleSheet
      )
      : n2.forEach((t2) => {
        const n3 = document.createElement("style"), s2 = window.litNonce;
        s2 !== void 0 && n3.setAttribute("nonce", s2),
          n3.textContent = t2.cssText,
          e2.appendChild(n3);
      });
  },
  S = t ? (t2) => t2 : (t2) =>
    t2 instanceof CSSStyleSheet
      ? ((t3) => {
        let e2 = "";
        for (const n2 of t3.cssRules) e2 += n2.cssText;
        return o(e2);
      })(t2)
      : t2;
var s1;
const e1 = window.trustedTypes,
  r1 = e1 ? e1.emptyScript : "",
  h = window.reactiveElementPolyfillSupport,
  o1 = {
    toAttribute(t2, i2) {
      switch (i2) {
        case Boolean:
          t2 = t2 ? r1 : null;
          break;
        case Object:
        case Array:
          t2 = t2 == null ? t2 : JSON.stringify(t2);
      }
      return t2;
    },
    fromAttribute(t3, i2) {
      let s2 = t3;
      switch (i2) {
        case Boolean:
          s2 = t3 !== null;
          break;
        case Number:
          s2 = t3 === null ? null : Number(t3);
          break;
        case Object:
        case Array:
          try {
            s2 = JSON.parse(t3);
          } catch (t2) {
            s2 = null;
          }
      }
      return s2;
    },
  },
  n1 = (t4, i2) => i2 !== t4 && (i2 == i2 || t4 == t4),
  l = {
    attribute: true,
    type: String,
    converter: o1,
    reflect: false,
    hasChanged: n1,
  };
class a extends HTMLElement {
  constructor() {
    super(),
      this._$Et = new Map(),
      this.isUpdatePending = false,
      this.hasUpdated = false,
      this._$Ei = null,
      this.o();
  }
  static addInitializer(t5) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t5);
  }
  static get observedAttributes() {
    this.finalize();
    const t6 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t6.push(e2));
    }),
      t6;
  }
  static createProperty(t7, i2 = l) {
    if (
      i2.state && (i2.attribute = false),
        this.finalize(),
        this.elementProperties.set(t7, i2),
        !i2.noAccessor && !this.prototype.hasOwnProperty(t7)
    ) {
      const s2 = typeof t7 == "symbol" ? Symbol() : "__" + t7,
        e2 = this.getPropertyDescriptor(t7, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t7, e2);
    }
  }
  static getPropertyDescriptor(t8, i2, s2) {
    return {
      get() {
        return this[i2];
      },
      set(e2) {
        const r2 = this[t8];
        this[i2] = e2, this.requestUpdate(t8, r2, s2);
      },
      configurable: true,
      enumerable: true,
    };
  }
  static getPropertyOptions(t9) {
    return this.elementProperties.get(t9) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return false;
    this.finalized = true;
    const t10 = Object.getPrototypeOf(this);
    if (
      t10.finalize(),
        this.elementProperties = new Map(t10.elementProperties),
        this._$Eu = new Map(),
        this.hasOwnProperty("properties")
    ) {
      const t2 = this.properties,
        i2 = [
          ...Object.getOwnPropertyNames(t2),
          ...Object.getOwnPropertySymbols(t2),
        ];
      for (const s2 of i2) this.createProperty(s2, t2[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2) s2.unshift(S(i3));
    } else i2 !== void 0 && s2.push(S(i2));
    return s2;
  }
  static _$Eh(t11, i2) {
    const s2 = i2.attribute;
    return s2 === false
      ? void 0
      : typeof s2 == "string"
      ? s2
      : typeof t11 == "string"
      ? t11.toLowerCase()
      : void 0;
  }
  o() {
    var t12;
    this._$Ep = new Promise((t2) => this.enableUpdating = t2),
      this._$AL = new Map(),
      this._$Em(),
      this.requestUpdate(),
      (t12 = this.constructor.l) === null || t12 === void 0 ||
      t12.forEach((t2) => t2(this));
  }
  addController(t13) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(
      t13,
    ),
      this.renderRoot !== void 0 && this.isConnected &&
      ((s2 = t13.hostConnected) === null || s2 === void 0 || s2.call(t13));
  }
  removeController(t14) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 ||
      i2.splice(this._$Eg.indexOf(t14) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t15;
    const s2 = (t15 = this.shadowRoot) !== null && t15 !== void 0
      ? t15
      : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t16;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(true),
      (t16 = this._$Eg) === null || t16 === void 0 || t16.forEach((t2) => {
        var i2;
        return (i2 = t2.hostConnected) === null || i2 === void 0
          ? void 0
          : i2.call(t2);
      });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t17;
    (t17 = this._$Eg) === null || t17 === void 0 || t17.forEach((t2) => {
      var i2;
      return (i2 = t2.hostDisconnected) === null || i2 === void 0
        ? void 0
        : i2.call(t2);
    });
  }
  attributeChangedCallback(t18, i2, s2) {
    this._$AK(t18, s2);
  }
  _$ES(t19, i2, s2 = l) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t19, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0
              ? void 0
              : e2.toAttribute) !== null && r2 !== void 0
        ? r2
        : o1.toAttribute)(i2, s2.type);
      this._$Ei = t19,
        n2 == null
          ? this.removeAttribute(h2)
          : this.setAttribute(h2, n2),
        this._$Ei = null;
    }
  }
  _$AK(t20, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t20);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t2 = h2.getPropertyOptions(n2),
        l2 = t2.converter,
        a3 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0
                      ? void 0
                      : s2.fromAttribute) !== null && e2 !== void 0
                ? e2
                : typeof l2 == "function"
                ? l2
                : null) !== null && r2 !== void 0
          ? r2
          : o1.fromAttribute;
      this._$Ei = n2, this[n2] = a3(i2, t2.type), this._$Ei = null;
    }
  }
  requestUpdate(t21, i2, s2) {
    let e2 = true;
    t21 !== void 0 &&
    (((s2 = s2 || this.constructor.getPropertyOptions(t21)).hasChanged || n1)(
        this[t21],
        i2,
      )
      ? (this._$AL.has(t21) || this._$AL.set(t21, i2),
        s2.reflect === true && this._$Ei !== t21 &&
        (this._$E_ === void 0 && (this._$E_ = new Map()),
          this._$E_.set(t21, s2)))
      : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t22 = this.scheduleUpdate();
    return t22 != null && await t22, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t23;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
      (this._$Et.forEach((t2, i3) => this[i3] = t2), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2),
        i2
          ? (this.willUpdate(s2),
            (t23 = this._$Eg) === null || t23 === void 0 ||
            t23.forEach((t2) => {
              var i3;
              return (i3 = t2.hostUpdate) === null || i3 === void 0
                ? void 0
                : i3.call(t2);
            }),
            this.update(s2))
          : this._$EU();
    } catch (t2) {
      throw i2 = false, this._$EU(), t2;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t) {
  }
  _$AE(t24) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t2) => {
      var i3;
      return (i3 = t2.hostUpdated) === null || i3 === void 0
        ? void 0
        : i3.call(t2);
    }),
      this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t24)),
      this.updated(t24);
  }
  _$EU() {
    this._$AL = new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return true;
  }
  update(t) {
    this._$E_ !== void 0 &&
    (this._$E_.forEach((t2, i2) => this._$ES(i2, this[i2], t2)),
      this._$E_ = void 0), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
a.finalized = true,
  a.elementProperties = new Map(),
  a.elementStyles = [],
  a.shadowRootOptions = {
    mode: "open",
  },
  h == null || h({
    ReactiveElement: a,
  }),
  ((s1 = globalThis.reactiveElementVersions) !== null && s1 !== void 0
    ? s1
    : globalThis.reactiveElementVersions = []).push("1.1.1");
var t1;
const i1 = globalThis.trustedTypes,
  s2 = i1
    ? i1.createPolicy("lit-html", {
      createHTML: (t2) => t2,
    })
    : void 0,
  e2 = `lit$${(Math.random() + "").slice(9)}$`,
  o2 = "?" + e2,
  n2 = `<${o2}>`,
  l1 = document,
  h1 = (t2 = "") => l1.createComment(t2),
  r2 = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function",
  d = Array.isArray,
  u = (t2) => {
    var i2;
    return d(t2) ||
      typeof ((i2 = t2) === null || i2 === void 0
          ? void 0
          : i2[Symbol.iterator]) == "function";
  },
  c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v = /-->/g,
  a1 = />/g,
  f =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  _ = /'/g,
  m = /"/g,
  g = /^(?:script|style|textarea)$/i,
  p = (t2) =>
    (i2, ...s21) => ({
      _$litType$: t2,
      strings: i2,
      values: s21,
    }),
  $ = p(1),
  y = p(2),
  b = Symbol.for("lit-noChange"),
  w = Symbol.for("lit-nothing"),
  T = new WeakMap(),
  x = (t2, i2, s22) => {
    var e21, o21;
    const n21 =
      (e21 = s22 == null ? void 0 : s22.renderBefore) !== null && e21 !== void 0
        ? e21 : i2;
    let l2 = n21._$litPart$;
    if (l2 === void 0) {
      const t3 = (o21 = s22 == null
              ? void 0
              : s22.renderBefore) !== null && o21 !== void 0
        ? o21
        : null;
      n21._$litPart$ = l2 = new N(
        i2.insertBefore(h1(), t3),
        t3,
        void 0,
        s22 != null ? s22 : {},
      );
    }
    return l2._$AI(t2), l2;
  },
  A = l1.createTreeWalker(l1, 129, null, false),
  C = (t2, i2) => {
    const o22 = t2.length - 1, l2 = [];
    let h2, r21 = i2 === 2 ? "<svg>" : "", d2 = c;
    for (let i3 = 0; i3 < o22; i3++) {
      const s23 = t2[i3];
      let o3, u3, p2 = -1, $2 = 0;
      for (
        ;
        $2 < s23.length && (d2.lastIndex = $2, u3 = d2.exec(s23), u3 !== null);
      ) {
        $2 = d2.lastIndex,
          d2 === c
            ? u3[1] === "!--"
              ? d2 = v
              : u3[1] !== void 0
              ? d2 = a1
              : u3[2] !== void 0
              ? (g.test(u3[2]) && (h2 = RegExp("</" + u3[2], "g")), d2 = f)
              : u3[3] !== void 0 && (d2 = f)
            : d2 === f
            ? u3[0] === ">"
              ? (d2 = h2 != null ? h2 : c, p2 = -1)
              : u3[1] === void 0
              ? p2 = -2
              : (p2 = d2.lastIndex - u3[2].length,
                o3 = u3[1],
                d2 = u3[3] === void 0 ? f : u3[3] === '"' ? m : _)
            : d2 === m || d2 === _
            ? d2 = f
            : d2 === v || d2 === a1
            ? d2 = c
            : (d2 = f, h2 = void 0);
      }
      const y2 = d2 === f && t2[i3 + 1].startsWith("/>") ? " " : "";
      r21 += d2 === c ? s23 + n2
      : p2 >= 0
        ? (l2.push(o3), s23.slice(0, p2) + "$lit$" + s23.slice(p2) + e2 + y2)
        : s23 + e2 + (p2 === -2 ? (l2.push(void 0), i3) : y2);
    }
    const u2 = r21 + (t2[o22] || "<?>") + (i2 === 2 ? "</svg>" : "");
    if (!Array.isArray(t2) || !t2.hasOwnProperty("raw")) {
      throw Error("invalid template strings array");
    }
    return [
      s2 !== void 0 ? s2.createHTML(u2) : u2,
      l2,
    ];
  };
class E {
  constructor({ strings: t2, _$litType$: s24 }, n22) {
    let l2;
    this.parts = [];
    let r22 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s24);
    if (
      this.el = E.createElement(v2, n22),
        A.currentNode = this.el.content,
        s24 === 2
    ) {
      const t3 = this.el.content, i2 = t3.firstChild;
      i2.remove(), t3.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u2;) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t3 = [];
          for (const i2 of l2.getAttributeNames()) {
            if (i2.endsWith("$lit$") || i2.startsWith(e2)) {
              const s3 = a2[d2++];
              if (t3.push(i2), s3 !== void 0) {
                const t4 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(
                    e2,
                  ),
                  i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({
                  type: 1,
                  index: r22,
                  name: i3[2],
                  strings: t4,
                  ctor: i3[1] === "."
                    ? M
                    : i3[1] === "?"
                    ? H
                    : i3[1] === "@"
                    ? I
                    : S1,
                });
              } else {
                c2.push({
                  type: 6,
                  index: r22,
                });
              }
            }
          }
          for (const i21 of t3) l2.removeAttribute(i21);
        }
        if (g.test(l2.tagName)) {
          const t3 = l2.textContent.split(e2), s3 = t3.length - 1;
          if (s3 > 0) {
            l2.textContent = i1 ? i1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++) {
              l2.append(t3[i2], h1()),
                A.nextNode(),
                c2.push({
                  type: 2,
                  index: ++r22,
                });
            }
            l2.append(t3[s3], h1());
          }
        }
      } else if (l2.nodeType === 8) {
        if (l2.data === o2) {
          c2.push({
            type: 2,
            index: r22,
          });
        } else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e2, t3 + 1)) !== -1;) {
            c2.push({
              type: 7,
              index: r22,
            }), t3 += e2.length - 1;
          }
        }
      }
      r22++;
    }
  }
  static createElement(t2, i2) {
    const s25 = l1.createElement("template");
    return s25.innerHTML = t2, s25;
  }
}
function P(t2, i2, s26 = t2, e22) {
  var o23, n23, l2, h2;
  if (i2 === b) return i2;
  let d2 = e22 !== void 0
    ? (o23 = s26._$Cl) === null || o23 === void 0 ? void 0 : o23[e22]
    : s26._$Cu;
  const u2 = r2(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 &&
    ((n23 = d2 == null ? void 0 : d2._$AO) === null || n23 === void 0 ||
      n23.call(d2, false),
      u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s26, e22)),
      e22 !== void 0
        ? ((l2 = (h2 = s26)._$Cl) !== null && l2 !== void 0
          ? l2
          : h2._$Cl = [])[e22] = d2
        : s26._$Cu = d2),
    d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e22)),
    i2;
}
class V {
  constructor(t2, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t2, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t2) {
    var i2;
    const { el: { content: s27 }, parts: e23 } = this._$AD,
      o24 = ((i2 = t2 == null
              ? void 0
              : t2.creationScope) !== null && i2 !== void 0
        ? i2
        : l1).importNode(s27, true);
    A.currentNode = o24;
    let n24 = A.nextNode(), h2 = 0, r2 = 0, d2 = e23[0];
    for (; d2 !== void 0;) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2
          ? i3 = new N(n24, n24.nextSibling, this, t2)
          : d2.type === 1
          ? i3 = new d2.ctor(n24, d2.name, d2.strings, this, t2)
          : d2.type === 6 && (i3 = new L(n24, this, t2)),
          this.v.push(i3),
          d2 = e23[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n24 = A.nextNode(), h2++);
    }
    return o24;
  }
  m(t2) {
    let i2 = 0;
    for (const s28 of this.v) {
      s28 !== void 0 &&
      (s28.strings !== void 0
        ? (s28._$AI(t2, s28, i2), i2 += s28.strings.length - 2)
        : s28._$AI(t2[i2])), i2++;
    }
  }
}
class N {
  constructor(t2, i2, s29, e24) {
    var o25;
    this.type = 2,
      this._$AH = w,
      this._$AN = void 0,
      this._$AA = t2,
      this._$AB = i2,
      this._$AM = s29,
      this.options = e24,
      this._$Cg = (o25 = e24 == null ? void 0 : e24.isConnected) === null ||
        o25 === void 0 || o25;
  }
  get _$AU() {
    var t2, i2;
    return (i2 = (t2 = this._$AM) === null || t2 === void 0
            ? void 0
            : t2._$AU) !== null && i2 !== void 0
      ? i2
      : this._$Cg;
  }
  get parentNode() {
    let t2 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t2.nodeType === 11 && (t2 = i2.parentNode), t2;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t2, i2 = this) {
    t2 = P(this, t2, i2),
      r2(t2)
        ? t2 === w || t2 == null || t2 === ""
          ? (this._$AH !== w && this._$AR(), this._$AH = w)
          : t2 !== this._$AH && t2 !== b && this.$(t2)
        : t2._$litType$ !== void 0
        ? this.T(t2)
        : t2.nodeType !== void 0
        ? this.S(t2)
        : u(t2)
        ? this.A(t2)
        : this.$(t2);
  }
  M(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  S(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.M(t2));
  }
  $(t2) {
    this._$AH !== w && r2(this._$AH)
      ? this._$AA.nextSibling.data = t2
      : this.S(l1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s210, _$litType$: e25 } = t2,
      o26 = typeof e25 == "number"
        ? this._$AC(t2)
        : (e25.el === void 0 && (e25.el = E.createElement(e25.h, this.options)),
          e25);
    if (
      ((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o26
    ) {
      this._$AH.m(s210);
    } else {
      const t3 = new V(o26, this), i3 = t3.p(this.options);
      t3.m(s210), this.S(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  A(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s211, e26 = 0;
    for (const o27 of t2) {
      e26 === i2.length
        ? i2.push(s211 = new N(this.M(h1()), this.M(h1()), this, this.options))
        : s211 = i2[e26],
        s211._$AI(o27),
        e26++;
    }
    e26 < i2.length &&
      (this._$AR(s211 && s211._$AB.nextSibling, e26), i2.length = e26);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s212;
    for (
      (s212 = this._$AP) === null || s212 === void 0 ||
      s212.call(this, false, true, i2);
      t2 && t2 !== this._$AB;
    ) {
      const i3 = t2.nextSibling;
      t2.remove(), t2 = i3;
    }
  }
  setConnected(t2) {
    var i2;
    this._$AM === void 0 &&
      (this._$Cg = t2,
        (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t2));
  }
}
class S1 {
  constructor(t2, i2, s213, e27, o28) {
    this.type = 1,
      this._$AH = w,
      this._$AN = void 0,
      this.element = t2,
      this.name = i2,
      this._$AM = e27,
      this.options = o28,
      s213.length > 2 || s213[0] !== "" || s213[1] !== ""
        ? (this._$AH = Array(s213.length - 1).fill(new String()),
          this.strings = s213)
        : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e28) {
    const o29 = this.strings;
    let n25 = false;
    if (o29 === void 0) {
      t2 = P(this, t2, i2, 0),
        n25 = !r2(t2) || t2 !== this._$AH && t2 !== b,
        n25 && (this._$AH = t2);
    } else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o29[0], l2 = 0; l2 < o29.length - 1; l2++) {
        h2 = P(this, e3[s2 + l2], i2, l2),
          h2 === b && (h2 = this._$AH[l2]),
          n25 || (n25 = !r2(h2) || h2 !== this._$AH[l2]),
          h2 === w
            ? t2 = w
            : t2 !== w && (t2 += (h2 != null ? h2 : "") + o29[l2 + 1]),
          this._$AH[l2] = h2;
      }
    }
    n25 && !e28 && this.k(t2);
  }
  k(t2) {
    t2 === w
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i1 ? i1.emptyScript : "";
class H extends S1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t2) {
    t2 && t2 !== w
      ? this.element.setAttribute(this.name, k)
      : this.element.removeAttribute(this.name);
  }
}
class I extends S1 {
  constructor(t2, i2, s214, e29, o210) {
    super(t2, i2, s214, e29, o210), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s215;
    if (
      (t2 = (s215 = P(this, t2, i2, 0)) !== null && s215 !== void 0
        ? s215
        : w) === b
    ) {
      return;
    }
    const e210 = this._$AH,
      o211 = t2 === w && e210 !== w || t2.capture !== e210.capture ||
        t2.once !== e210.once || t2.passive !== e210.passive,
      n26 = t2 !== w && (e210 === w || o211);
    o211 && this.element.removeEventListener(this.name, this, e210),
      n26 && this.element.addEventListener(this.name, this, t2),
      this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s216;
    typeof this._$AH == "function"
      ? this._$AH.call(
        (s216 = (i2 = this.options) === null || i2 === void 0
              ? void 0
              : i2.host) !== null && s216 !== void 0
          ? s216
          : this.element,
        t2,
      )
      : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s217) {
    this.element = t2,
      this.type = 6,
      this._$AN = void 0,
      this._$AM = i2,
      this.options = s217;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2) {
    P(this, t2);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(E, N),
  ((t1 = globalThis.litHtmlVersions) !== null && t1 !== void 0
    ? t1
    : globalThis.litHtmlVersions = []).push("2.1.1");
var l2, o3;
class s3 extends a {
  constructor() {
    super(...arguments),
      this.renderOptions = {
        host: this,
      },
      this._$Dt = void 0;
  }
  createRenderRoot() {
    var t25, e6;
    const i3 = super.createRenderRoot();
    return (t25 = (e6 = this.renderOptions).renderBefore) !== null &&
        t25 !== void 0 || (e6.renderBefore = i3.firstChild),
      i3;
  }
  update(t26) {
    const i4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t26),
      this._$Dt = x(i4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t27;
    super.connectedCallback(),
      (t27 = this._$Dt) === null || t27 === void 0 || t27.setConnected(true);
  }
  disconnectedCallback() {
    var t28;
    super.disconnectedCallback(),
      (t28 = this._$Dt) === null || t28 === void 0 || t28.setConnected(false);
  }
  render() {
    return b;
  }
}
s3.finalized = true,
  s3._$litElement$ = true,
  (l2 = globalThis.litElementHydrateSupport) === null || l2 === void 0 ||
  l2.call(globalThis, {
    LitElement: s3,
  });
const n3 = globalThis.litElementPolyfillSupport;
n3 == null || n3({
  LitElement: s3,
});
((o3 = globalThis.litElementVersions) !== null && o3 !== void 0
  ? o3
  : globalThis.litElementVersions = []).push("3.1.1");
const i2 = (i21, e211) =>
  e211.kind === "method" && e211.descriptor && !("value" in e211.descriptor)
    ? {
      ...e211,
      finisher(n4) {
        n4.createProperty(e211.key, i21);
      },
    }
    : {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      originalKey: e211.key,
      initializer() {
        typeof e211.initializer == "function" &&
          (this[e211.key] = e211.initializer.call(this));
      },
      finisher(n5) {
        n5.createProperty(e211.key, i21);
      },
    };
function e3(e212) {
  return (n6, t29) =>
    t29 !== void 0
      ? ((i22, e31, n27) => {
        e31.constructor.createProperty(n27, i22);
      })(e212, n6, t29)
      : i2(e212, n6);
}
const rc1 = new BroadcastChannel(RECEIVER);
new BroadcastChannel(URLBANG);
const pushEntry = (pathname, title, params) => {
  rc1.postMessage({
    kind: PUSH,
    pathname,
    title,
    params,
  });
};
const URLBANG1 = "/urlbang";
const RECEIVER1 = "/urlbang/receiver";
const HIDDEN1 = "hidden";
const fallbackMessageData = {
  kind: "unknown",
  index: -1,
  title: "title unknown",
  pathname: "pathname unknown",
  data: undefined,
};
const bc1 = new BroadcastChannel(URLBANG1);
const rc2 = new BroadcastChannel(RECEIVER1);
const historyEntries = [];
let subscriptions = [];
let previousIndex = 0;
let maxIndex = 0;
bc1.addEventListener("message", (e7) => {
  if (document.visibilityState === HIDDEN1) return;
  const { index, kind } = e7.data;
  if (historyEntries[index] === undefined) {
    historyEntries[index] = e7.data;
  }
  if (
    kind === "hashchange" && historyEntries[index]?.kind !== "recorded_change"
  ) {
    historyEntries[index] = {
      ...e7.data,
      kind: "recorded_change",
    };
    historyEntries.splice(index + 1);
  }
  maxIndex = Math.max(index, maxIndex);
  console.log("maxindex:", maxIndex);
  previousIndex = index;
  dispatch();
});
rc2.addEventListener("message", (e8) => {
  if (document.visibilityState === HIDDEN1) return;
  const { kind } = e8.data;
  if (kind === "push" && previousIndex !== maxIndex) {
    historyEntries.splice(previousIndex + 1);
  }
});
const subscribe = (callback) => {
  subscriptions.push(callback);
  return subscriptions.length - 1;
};
const unsubscribe = (receipt) => {
  const updatedSubscriptions = [];
  const receiptNum = receipt.toString();
  for (const index in subscriptions) {
    if (receiptNum === index) {
      continue;
    }
    updatedSubscriptions.push(subscriptions[index]);
  }
  subscriptions = updatedSubscriptions;
};
const dispatch = () => {
  for (const subscription of subscriptions) {
    subscription();
  }
};
const createHistoryListItems = () => {
  const templates = [];
  let entryIndex = 0;
  while (entryIndex < historyEntries.length) {
    let entry = historyEntries[entryIndex];
    if (entry === null || entry === undefined) {
      entry = {
        ...fallbackMessageData,
        index: entryIndex,
      };
    }
    let className = "defined";
    if (entry === undefined || entry === null) {
      className = "undefined";
    }
    const { index } = entry;
    if (index === previousIndex) {
      className = "current";
    }
    const { pathname, title } = entry;
    const entryDelta = entryIndex - previousIndex;
    templates.push($`
      <li class="${className}" @pointerdown=${() => history.go(entryDelta)}>
        <div>${pathname}</div>
        <div>${title}</div>
      </li>
    `);
    entryIndex += 1;
  }
  return templates;
};
const styles1 = r`
    h3, div, ul, li {
      box-sizing: border-box;
    }
    h3 {
      margin-top: 0;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li, input[type=button] {
      cursor: pointer;
    }

    .container {
      border: 1px solid #efefef;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height: 70vh;
      width: 50vw;
      max-height: 600px;
      max-width: 600px;
      overflow: auto;
    }

    .unknown, .defined, .current {
      border: 1px solid transparent;
    }

    .unknown {
      color: #878787;
    }
    .unknown:hover, .defined:hover {
      background-color: #fcfcfc;
      border: 1px solid #ababab;
    }

    .defined {
      color: #434343;
    }
    .defined:hover {
      border: 1px solid #565656;
    }

    .current {
      color: #1e5bbd;
      background-color: #f5fbff;
    }
    .current:hover {
      background-color: #e3eeff;
    }
`;
class DemoHistory extends s3 {
  static styles = [
    styles1,
  ];
  receipt;
  render() {
    const historyListItems = createHistoryListItems();
    return $`
            <h3>Demo History:</h3>
            <ul class="container">${historyListItems}</ul>
        `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.receipt = subscribe(() => this.requestUpdate());
  }
  disconnectedCallback() {
    if (this.receipt) {
      unsubscribe(this.receipt);
    }
    super.disconnectedCallback();
  }
}
customElements.define("demo-history", DemoHistory);
function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context,
) {
  var desc1 = {};
  Object.keys(descriptor).forEach(function (key) {
    desc1[key] = descriptor[key];
  });
  desc1.enumerable = !!desc1.enumerable;
  desc1.configurable = !!desc1.configurable;
  if ("value" in desc1 || desc1.initializer) {
    desc1.writable = true;
  }
  desc1 = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator ? decorator(target, property, desc) || desc : desc;
  }, desc1);
  if (context && desc1.initializer !== void 0) {
    desc1.value = desc1.initializer ? desc1.initializer.call(context) : void 0;
    desc1.initializer = undefined;
  }
  if (desc1.initializer === void 0) {
    Object.defineProperty(target, property, desc1);
    desc1 = null;
  }
  return desc1;
}
function _initializerDefineProperty(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer
      ? descriptor.initializer.call(context)
      : void 0,
  });
}
var _class, _descriptor, _dec;
const urlData = {
  "/#/home": "home page",
  "/#/about": "about this page",
  "/#/projects": "projects created by the author",
  "/#/articles": "articles written by the author",
};
const styles11 = r`
  .container {
    border: 1px solid #efefef;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
let DemoMenu = ((_class = class DemoMenu extends s3 {
  static styles = [
    styles11,
  ];
  render() {
    const { path } = this;
    const home = path + "/#/home";
    const about = path + "/#/about";
    const projects = path + "/#/projects";
    const articles = path + "/#/articles";
    return $`
      <div class="container">
        <input type="button" name="${home}" value="home" @pointerdown="${this.onPointer}">
        <input type="button" name="${about}" value="about"  @pointerdown="${this.onPointer}">
        <input type="button" name="${projects}" value="projects" @pointerdown="${this.onPointer}">
        <input type="button" name="${articles}" value="articles" @pointerdown="${this.onPointer}">
      </div>
    `;
  }
  onPointer(e9) {
    if (!(e9.target instanceof HTMLInputElement)) return;
    const { path } = this;
    const { name } = e9.target;
    const nameWithoutPrefix = name.substring(path.length);
    const title = urlData[nameWithoutPrefix];
    pushEntry(name, title);
  }
  constructor(...args) {
    super(...args);
    _initializerDefineProperty(this, "path", _descriptor, this);
  }
}) || _class,
  _dec = e3({
    kind: String,
  }),
  _descriptor = _applyDecoratedDescriptor(_class.prototype, "path", [
    _dec,
  ], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return "";
    },
  }),
  _class);
customElements.define("demo-menu", DemoMenu);

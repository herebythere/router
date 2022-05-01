const unsafeAttributeEventHandlers = [
  "onabort",
  "onactivate",
  "onactivateinvisible",
  "onafterprint",
  "onafterupdate",
  "onanimationcancel",
  "onanimationend",
  "onanimationiteration",
  "onanimationstart",
  "onariarequest",
  "onauxclick",
  "onbeforeactivate",
  "onbeforecopy",
  "onbeforecut",
  "onbeforedeactivate",
  "onbeforeeditfocus",
  "onbeforepaste",
  "onbeforeprint",
  "onbeforeunload",
  "onbegin",
  "onblur",
  "onbounce",
  "oncancel",
  "oncanplay",
  "oncanplaythrough",
  "oncellchange",
  "onchange",
  "onclick",
  "onclose",
  "oncommand",
  "oncontextmenu",
  "oncontrolselect",
  "oncopy",
  "oncuechange",
  "oncut",
  "ondataavailable",
  "ondatasetchanged",
  "ondatasetcomplete",
  "ondblclick",
  "ondeactivate",
  "ondrag",
  "ondragdrop",
  "ondragend",
  "ondragenter",
  "ondragexit",
  "ondragleave",
  "ondragover",
  "ondragstart",
  "ondrop",
  "ondurationchange",
  "onemptied",
  "onend",
  "onended",
  "onerror",
  "onerrorupdate",
  "onexit",
  "onfilterchange",
  "onfinish",
  "onfocus",
  "onfocusin",
  "onfocusout",
  "onformdata",
  "onfullscreenchange",
  "onfullscreenerror",
  "ongotpointercapture",
  "onhelp",
  "oninput",
  "oninvalid",
  "onkeydown",
  "onkeypress",
  "onkeyup",
  "onlayoutcomplete",
  "onload",
  "onloadeddata",
  "onloadedmetadata",
  "onloadend",
  "onloadstart",
  "onlosecapture",
  "onlostpointercapture",
  "onmediacomplete",
  "onmediaerror",
  "onmessage",
  "onmousedown",
  "onmouseenter",
  "onmouseleave",
  "onmousemove",
  "onmouseout",
  "onmouseover",
  "onmouseup",
  "onmousewheel",
  "onmove",
  "onmoveend",
  "onmovestart",
  "onmozfullscreenchange",
  "onmozfullscreenerror",
  "onmscontentzoom",
  "onmsgesturechange",
  "onmsgesturedoubletap",
  "onmsgestureend",
  "onmsgesturehold",
  "onmsgesturestart",
  "onmsgesturetap",
  "onmsgotpointercapture",
  "onmsinertiastart",
  "onmslostpointercapture",
  "onmsmanipulationstatechanged",
  "onmspointercancel",
  "onmspointerdown",
  "onmspointerenter",
  "onmspointerleave",
  "onmspointermove",
  "onmspointerout",
  "onmspointerover",
  "onmspointerup",
  "onoffline",
  "ononline",
  "onoutofsync",
  "onoverscroll",
  "onpaste",
  "onpause",
  "onplay",
  "onplaying",
  "onpointercancel",
  "onpointerdown",
  "onpointerenter",
  "onpointerleave",
  "onpointermove",
  "onpointerout",
  "onpointerover",
  "onpointerrawupdate",
  "onpointerup",
  "onprogress",
  "onpropertychange",
  "onratechange",
  "onreadystatechange",
  "onrepeat",
  "onreset",
  "onresize",
  "onresizeend",
  "onresizestart",
  "onresume",
  "onreverse",
  "onrowdelete",
  "onrowenter",
  "onrowexit",
  "onrowinserted",
  "onscroll",
  "onscrollend",
  "onsearch",
  "onseek",
  "onseeked",
  "onseeking",
  "onselect",
  "onselectionchange",
  "onselectstart",
  "onshow",
  "onstalled",
  "onstart",
  "onstop",
  "onstorage",
  "onsubmit",
  "onsuspend",
  "onsynchrestored",
  "ontimeerror",
  "ontimeupdate",
  "ontoggle",
  "ontrackchange",
  "ontransitioncancel",
  "ontransitionend",
  "ontransitionrun",
  "ontransitionstart",
  "onunload",
  "onurlflip",
  "onvolumechange",
  "onwaiting",
  "onwebkitanimationend",
  "onwebkitanimationiteration",
  "onwebkitanimationstart",
  "onwebkitfullscreenchange",
  "onwebkitfullscreenerror",
  "onwebkittransitionend",
  "onwheel",
];
function getUnsafeAttributeEventHandlers() {
  if (typeof window !== "undefined") {
    const eventHandlers = [];
    for (const name in HTMLElement.prototype) {
      if (name.slice(0, 2) === "on") {
        eventHandlers.push(name);
      }
    }
    return eventHandlers;
  } else {
    return unsafeAttributeEventHandlers;
  }
}
const isBrowser = typeof window !== "undefined";
const rejectInputFn = (s) => {
  throw new TypeError("undefined conversion");
};
const rejectInputDefaultPolicyFn = (s) => null;
const { toLowerCase, toUpperCase } = String.prototype;
const HTML_NS = "http://www.w3.org/1999/xhtml";
const SVG_NS = "http://www.w3.org/2000/svg";
const TrustedTypePolicy = function () {
  throw new TypeError("Illegal constructor");
};
const TrustedTypePolicyFactory = function () {
  throw new TypeError("Illegal constructor");
};
const DEFAULT_POLICY_NAME = "default";
const trustedTypesBuilderTestOnly = function () {
  const {
    assign,
    create,
    defineProperty: defineProperty2,
    freeze,
    getOwnPropertyNames: getOwnPropertyNames2,
    getPrototypeOf: getPrototypeOf2,
    prototype: ObjectPrototype,
  } = Object;
  const { hasOwnProperty: hasOwnProperty2 } = ObjectPrototype;
  const { forEach, push: push1 } = Array.prototype;
  const creatorSymbol = Symbol();
  const privates = function (obj) {
    let v2 = privateMap.get(obj);
    if (v2 === void 0) {
      v2 = create(null);
      privateMap.set(obj, v2);
    }
    return v2;
  };
  function selfContained(collection) {
    const proto = getPrototypeOf2(collection);
    if (proto == null || getPrototypeOf2(proto) !== ObjectPrototype) {
      throw new Error();
    }
    for (const key of getOwnPropertyNames2(proto)) {
      defineProperty2(collection, key, {
        value: collection[key],
      });
    }
    return collection;
  }
  const privateMap = selfContained(new WeakMap());
  const policyNames = selfContained([]);
  const allowedNames = selfContained([]);
  let allowDuplicateNames = true;
  let defaultPolicy = null;
  let enforceNameRestrictions = false;
  class TrustedType {
    constructor(s7, policyName) {
      if (s7 !== creatorSymbol) {
        throw new Error("cannot call the constructor");
      }
      defineProperty2(this, "policyName", {
        value: "" + policyName,
        enumerable: true,
      });
    }
    toString() {
      return privates(this)["v"];
    }
    valueOf() {
      return privates(this)["v"];
    }
  }
  function lockdownTrustedType(SubClass, canonName) {
    freeze(SubClass.prototype);
    delete SubClass.name;
    defineProperty2(SubClass, "name", {
      value: canonName,
    });
  }
  class TrustedScriptURL extends TrustedType {
  }
  lockdownTrustedType(TrustedScriptURL, "TrustedScriptURL");
  class TrustedHTML extends TrustedType {
  }
  lockdownTrustedType(TrustedHTML, "TrustedHTML");
  class TrustedScript extends TrustedType {
  }
  lockdownTrustedType(TrustedScript, "TrustedScript");
  lockdownTrustedType(TrustedType, "TrustedType");
  const emptyHTML = freeze(create(new TrustedHTML(creatorSymbol, "")));
  privates(emptyHTML)["v"] = "";
  const emptyScript = freeze(create(new TrustedScript(creatorSymbol, "")));
  privates(emptyScript)["v"] = "";
  const TYPE_MAP = {
    [HTML_NS]: {
      EMBED: {
        attributes: {
          src: TrustedScriptURL.name,
        },
      },
      IFRAME: {
        attributes: {
          srcdoc: TrustedHTML.name,
        },
      },
      OBJECT: {
        attributes: {
          data: TrustedScriptURL.name,
          codebase: TrustedScriptURL.name,
        },
      },
      SCRIPT: {
        attributes: {
          src: TrustedScriptURL.name,
          text: TrustedScript.name,
        },
        properties: {
          innerText: TrustedScript.name,
          textContent: TrustedScript.name,
          text: TrustedScript.name,
        },
      },
      "*": {
        attributes: {},
        properties: {
          innerHTML: TrustedHTML.name,
          outerHTML: TrustedHTML.name,
        },
      },
    },
    [SVG_NS]: {
      "*": {
        attributes: {},
        properties: {},
      },
    },
  };
  const ATTR_PROPERTY_MAP = {
    codebase: "codeBase",
    formaction: "formAction",
  };
  if (isBrowser && !("srcdoc" in HTMLIFrameElement.prototype)) {
    delete TYPE_MAP[HTML_NS]["IFRAME"]["attributes"]["srcdoc"];
  }
  for (const tag1 of Object.keys(TYPE_MAP[HTML_NS])) {
    if (!TYPE_MAP[HTML_NS][tag1]["properties"]) {
      TYPE_MAP[HTML_NS][tag1]["properties"] = {};
    }
    for (const attr of Object.keys(TYPE_MAP[HTML_NS][tag1]["attributes"])) {
      TYPE_MAP[HTML_NS][tag1]["properties"][
        ATTR_PROPERTY_MAP[attr]
          ? ATTR_PROPERTY_MAP[attr]
          : attr
      ] = TYPE_MAP[HTML_NS][tag1]["attributes"][attr];
    }
  }
  for (const name1 of getUnsafeAttributeEventHandlers()) {
    TYPE_MAP[HTML_NS]["*"]["attributes"][name1] = "TrustedScript";
    TYPE_MAP[SVG_NS]["*"]["attributes"][name1] = "TrustedScript";
  }
  const createTypeMapping = {
    createHTML: TrustedHTML,
    createScriptURL: TrustedScriptURL,
    createScript: TrustedScript,
  };
  const createFunctionAllowed = createTypeMapping.hasOwnProperty;
  function isTrustedTypeChecker(type) {
    return (obj) => obj instanceof type && privateMap.has(obj);
  }
  function wrapPolicy(policyName, innerPolicy) {
    function creator(Ctor, methodName) {
      const method = innerPolicy[methodName] ||
        (policyName == DEFAULT_POLICY_NAME
          ? rejectInputDefaultPolicyFn
          : rejectInputFn);
      const policySpecificType = freeze(new Ctor(creatorSymbol, policyName));
      const factory = {
        [methodName](s8, ...args) {
          let result = method("" + s8, ...args);
          if (result === void 0 || result === null) {
            if (policyName == DEFAULT_POLICY_NAME) {
              return result;
            }
            result = "";
          }
          const allowedValue = "" + result;
          const o7 = freeze(create(policySpecificType));
          privates(o7)["v"] = allowedValue;
          return o7;
        },
      }[methodName];
      return freeze(factory);
    }
    const policy = create(TrustedTypePolicy.prototype);
    for (const name of getOwnPropertyNames2(createTypeMapping)) {
      policy[name] = creator(createTypeMapping[name], name);
    }
    defineProperty2(policy, "name", {
      value: policyName,
      writable: false,
      configurable: false,
      enumerable: true,
    });
    return freeze(policy);
  }
  function getAttributeType(
    tagName1,
    attribute,
    elementNs = "",
    attributeNs = "",
  ) {
    const canonicalAttr = toLowerCase.apply(String(attribute));
    return getTypeInternal_(
      tagName1,
      "attributes",
      canonicalAttr,
      elementNs,
      attributeNs,
    ) || null;
  }
  function getTypeInternal_(tag, container, name, elNs = "", attrNs = "") {
    const canonicalTag = toUpperCase.apply(String(tag));
    let ns = attrNs ? attrNs : elNs;
    if (!ns) {
      ns = HTML_NS;
    }
    const map = hasOwnProperty2.apply(TYPE_MAP, [
        ns,
      ])
      ? TYPE_MAP[ns]
      : null;
    if (!map) {
      return;
    }
    if (
      hasOwnProperty2.apply(map, [
        canonicalTag,
      ]) && map[canonicalTag] &&
      hasOwnProperty2.apply(map[canonicalTag][container], [
        name,
      ]) && map[canonicalTag][container][name]
    ) {
      return map[canonicalTag][container][name];
    }
    if (
      hasOwnProperty2.apply(map, [
        "*",
      ]) && hasOwnProperty2.apply(map["*"][container], [
        name,
      ]) && map["*"][container][name]
    ) {
      return map["*"][container][name];
    }
  }
  function getPropertyType(tagName2, property, elementNs = "") {
    return getTypeInternal_(
      tagName2,
      "properties",
      String(property),
      elementNs,
    ) || null;
  }
  function getTypeMapping(namespaceUri = "") {
    if (!namespaceUri) {
      try {
        namespaceUri = document.documentElement.namespaceURI;
      } catch (e) {
        namespaceUri = HTML_NS;
      }
    }
    function deepClone(o8) {
      return JSON.parse(JSON.stringify(o8));
    }
    const map = TYPE_MAP[namespaceUri];
    if (!map) {
      return {};
    }
    return deepClone(map);
  }
  function createPolicy(name, policy) {
    const pName = "" + name;
    if (!pName.match(/^[-#a-zA-Z0-9=_/@.%]+$/g)) {
      throw new TypeError("Policy " + pName + " contains invalid characters.");
    }
    if (
      enforceNameRestrictions && allowedNames.indexOf(pName) === -1 &&
      allowedNames.indexOf("*") === -1
    ) {
      throw new TypeError("Policy " + pName + " disallowed.");
    }
    if (pName === DEFAULT_POLICY_NAME && defaultPolicy) {
      throw new TypeError("Policy " + pName + " already exists.");
    }
    if (
      enforceNameRestrictions && !allowDuplicateNames &&
      policyNames.indexOf(pName) !== -1
    ) {
      throw new TypeError("Policy " + pName + " exists.");
    }
    policyNames.push(pName);
    const innerPolicy = create(null);
    if (policy && typeof policy === "object") {
      for (const key of getOwnPropertyNames2(policy)) {
        if (createFunctionAllowed.call(createTypeMapping, key)) {
          innerPolicy[key] = policy[key];
        }
      }
    } else {
      console.warn(
        "trustedTypes.createPolicy " + pName + " was given an empty policy",
      );
    }
    freeze(innerPolicy);
    const wrappedPolicy = wrapPolicy(pName, innerPolicy);
    if (pName === DEFAULT_POLICY_NAME) {
      defaultPolicy = wrappedPolicy;
    }
    return wrappedPolicy;
  }
  function setPolicyNameRestrictions2(allowedPolicyNames, allowDuplicates) {
    enforceNameRestrictions = true;
    allowedNames.length = 0;
    forEach.call(allowedPolicyNames, (el) => {
      push1.call(allowedNames, "" + el);
    });
    allowDuplicateNames = allowDuplicates;
    policyNames.length = 0;
  }
  function clearPolicyNameRestrictions2() {
    enforceNameRestrictions = false;
  }
  function getDefaultPolicy2() {
    return defaultPolicy;
  }
  function resetDefaultPolicy2() {
    defaultPolicy = null;
    policyNames.splice(policyNames.indexOf(DEFAULT_POLICY_NAME), 1);
  }
  const api = create(TrustedTypePolicyFactory.prototype);
  assign(api, {
    createPolicy,
    isHTML: isTrustedTypeChecker(TrustedHTML),
    isScriptURL: isTrustedTypeChecker(TrustedScriptURL),
    isScript: isTrustedTypeChecker(TrustedScript),
    getAttributeType,
    getPropertyType,
    getTypeMapping,
    emptyHTML,
    emptyScript,
    defaultPolicy,
    TrustedHTML,
    TrustedScriptURL,
    TrustedScript,
  });
  defineProperty2(api, "defaultPolicy", {
    get: getDefaultPolicy2,
    set: () => {
    },
  });
  return {
    trustedTypes: freeze(api),
    setPolicyNameRestrictions: setPolicyNameRestrictions2,
    clearPolicyNameRestrictions: clearPolicyNameRestrictions2,
    getDefaultPolicy: getDefaultPolicy2,
    resetDefaultPolicy: resetDefaultPolicy2,
  };
};
const {
  trustedTypes,
  setPolicyNameRestrictions,
  clearPolicyNameRestrictions,
  getDefaultPolicy,
  resetDefaultPolicy,
} = trustedTypesBuilderTestOnly();
const ENFORCEMENT_DIRECTIVE_NAME = "require-trusted-types-for";
const POLICIES_DIRECTIVE_NAME = "trusted-types";
class TrustedTypeConfig {
  constructor(
    isLoggingEnabled,
    isEnforcementEnabled,
    allowedPolicyNames,
    allowDuplicates,
    cspString = null,
    windowObject = null,
  ) {
    this.isLoggingEnabled = isLoggingEnabled;
    this.isEnforcementEnabled = isEnforcementEnabled;
    this.allowedPolicyNames = allowedPolicyNames;
    this.allowDuplicates = allowDuplicates;
    this.cspString = cspString;
    this.windowObject = windowObject;
  }
  static parseCSP(cspString) {
    const SEMICOLON = /\s*;\s*/;
    const WHITESPACE = /\s+/;
    return cspString.trim().split(SEMICOLON).map((serializedDirective) =>
      serializedDirective.split(WHITESPACE)
    ).reduce(function (parsed, directive) {
      if (directive[0]) {
        parsed[directive[0]] = directive.slice(1).map((s9) => s9).sort();
      }
      return parsed;
    }, {});
  }
  static fromCSP(cspString) {
    const policy = TrustedTypeConfig.parseCSP(cspString);
    const enforce = ENFORCEMENT_DIRECTIVE_NAME in policy &&
      policy[ENFORCEMENT_DIRECTIVE_NAME].includes("'script'");
    let policies = [
      "*",
    ];
    let allowDuplicates = true;
    if (POLICIES_DIRECTIVE_NAME in policy) {
      policies = policy[POLICIES_DIRECTIVE_NAME].filter((p2) =>
        p2.charAt(0) !== "'"
      );
      allowDuplicates = policy[POLICIES_DIRECTIVE_NAME].includes(
        "'allow-duplicates'",
      );
      if (
        policy[POLICIES_DIRECTIVE_NAME].length == 1 &&
        policy[POLICIES_DIRECTIVE_NAME][0] == "'none'"
      ) {
        policies = [];
      }
    }
    return new TrustedTypeConfig(
      true,
      enforce,
      policies,
      allowDuplicates,
      cspString,
    );
  }
}
const { defineProperty } = Object;
const { apply } = Reflect;
const { getOwnPropertyNames, getOwnPropertyDescriptor, getPrototypeOf } =
  Object;
const { hasOwnProperty, isPrototypeOf } = Object.prototype;
const { slice } = String.prototype;
const typeMap = trustedTypes.getTypeMapping(HTML_NS);
const STRING_TO_TYPE = {
  TrustedHTML: trustedTypes.TrustedHTML,
  TrustedScript: trustedTypes.TrustedScript,
  TrustedScriptURL: trustedTypes.TrustedScriptURL,
};
for (const tagName of Object.keys(typeMap)) {
  const attrs = typeMap[tagName]["properties"];
  for (const [k, v] of Object.entries(attrs)) {
    attrs[k] = STRING_TO_TYPE[v];
  }
}
({
  TrustedHTML: trustedTypes.isHTML,
  TrustedScriptURL: trustedTypes.isScriptURL,
  TrustedScript: trustedTypes.isScript,
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
  r = e1 ? e1.emptyScript : "",
  h = window.reactiveElementPolyfillSupport,
  o1 = {
    toAttribute(t4, i2) {
      switch (i2) {
        case Boolean:
          t4 = t4 ? r : null;
          break;
        case Object:
        case Array:
          t4 = t4 == null ? t4 : JSON.stringify(t4);
      }
      return t4;
    },
    fromAttribute(t5, i2) {
      let s2 = t5;
      switch (i2) {
        case Boolean:
          s2 = t5 !== null;
          break;
        case Number:
          s2 = t5 === null ? null : Number(t5);
          break;
        case Object:
        case Array:
          try {
            s2 = JSON.parse(t5);
          } catch (t2) {
            s2 = null;
          }
      }
      return s2;
    },
  },
  n1 = (t6, i2) => i2 !== t6 && (i2 == i2 || t6 == t6),
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
  static addInitializer(t7) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t7);
  }
  static get observedAttributes() {
    this.finalize();
    const t8 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t8.push(e2));
    }),
      t8;
  }
  static createProperty(t9, i2 = l) {
    if (
      i2.state && (i2.attribute = false),
        this.finalize(),
        this.elementProperties.set(t9, i2),
        !i2.noAccessor && !this.prototype.hasOwnProperty(t9)
    ) {
      const s2 = typeof t9 == "symbol" ? Symbol() : "__" + t9,
        e2 = this.getPropertyDescriptor(t9, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t9, e2);
    }
  }
  static getPropertyDescriptor(t10, i2, s2) {
    return {
      get() {
        return this[i2];
      },
      set(e2) {
        const r2 = this[t10];
        this[i2] = e2, this.requestUpdate(t10, r2, s2);
      },
      configurable: true,
      enumerable: true,
    };
  }
  static getPropertyOptions(t11) {
    return this.elementProperties.get(t11) || l;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return false;
    this.finalized = true;
    const t12 = Object.getPrototypeOf(this);
    if (
      t12.finalize(),
        this.elementProperties = new Map(t12.elementProperties),
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
  static _$Eh(t13, i2) {
    const s2 = i2.attribute;
    return s2 === false
      ? void 0
      : typeof s2 == "string"
      ? s2
      : typeof t13 == "string"
      ? t13.toLowerCase()
      : void 0;
  }
  o() {
    var t14;
    this._$Ep = new Promise((t2) => this.enableUpdating = t2),
      this._$AL = new Map(),
      this._$Em(),
      this.requestUpdate(),
      (t14 = this.constructor.l) === null || t14 === void 0 ||
      t14.forEach((t2) => t2(this));
  }
  addController(t15) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(
      t15,
    ),
      this.renderRoot !== void 0 && this.isConnected &&
      ((s2 = t15.hostConnected) === null || s2 === void 0 || s2.call(t15));
  }
  removeController(t16) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 ||
      i2.splice(this._$Eg.indexOf(t16) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t17;
    const s2 = (t17 = this.shadowRoot) !== null && t17 !== void 0
      ? t17
      : this.attachShadow(this.constructor.shadowRootOptions);
    return i(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t18;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(true),
      (t18 = this._$Eg) === null || t18 === void 0 || t18.forEach((t2) => {
        var i2;
        return (i2 = t2.hostConnected) === null || i2 === void 0
          ? void 0
          : i2.call(t2);
      });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t19;
    (t19 = this._$Eg) === null || t19 === void 0 || t19.forEach((t2) => {
      var i2;
      return (i2 = t2.hostDisconnected) === null || i2 === void 0
        ? void 0
        : i2.call(t2);
    });
  }
  attributeChangedCallback(t20, i2, s2) {
    this._$AK(t20, s2);
  }
  _$ES(t21, i2, s2 = l) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t21, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0
              ? void 0
              : e2.toAttribute) !== null && r2 !== void 0
        ? r2
        : o1.toAttribute)(i2, s2.type);
      this._$Ei = t21,
        n2 == null
          ? this.removeAttribute(h2)
          : this.setAttribute(h2, n2),
        this._$Ei = null;
    }
  }
  _$AK(t22, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t22);
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
  requestUpdate(t23, i2, s2) {
    let e2 = true;
    t23 !== void 0 &&
    (((s2 = s2 || this.constructor.getPropertyOptions(t23)).hasChanged || n1)(
        this[t23],
        i2,
      )
      ? (this._$AL.has(t23) || this._$AL.set(t23, i2),
        s2.reflect === true && this._$Ei !== t23 &&
        (this._$EC === void 0 && (this._$EC = new Map()),
          this._$EC.set(t23, s2)))
      : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t2) {
      Promise.reject(t2);
    }
    const t24 = this.scheduleUpdate();
    return t24 != null && await t24, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t25;
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
            (t25 = this._$Eg) === null || t25 === void 0 ||
            t25.forEach((t2) => {
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
  _$AE(t26) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t2) => {
      var i3;
      return (i3 = t2.hostUpdated) === null || i3 === void 0
        ? void 0
        : i3.call(t2);
    }),
      this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t26)),
      this.updated(t26);
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
    this._$EC !== void 0 &&
    (this._$EC.forEach((t2, i2) => this._$ES(i2, this[i2], t2)),
      this._$EC = void 0), this._$EU();
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
    : globalThis.reactiveElementVersions = []).push("1.3.1");
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
  r1 = (t2) => t2 === null || typeof t2 != "object" && typeof t2 != "function",
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
  g = /^(?:script|style|textarea|title)$/i,
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
  A = l1.createTreeWalker(l1, 129, null, false),
  C = (t2, i2) => {
    const o21 = t2.length - 1, l2 = [];
    let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
    for (let i3 = 0; i3 < o21; i3++) {
      const s22 = t2[i3];
      let o3, u3, p2 = -1, $2 = 0;
      for (
        ;
        $2 < s22.length && (d2.lastIndex = $2, u3 = d2.exec(s22), u3 !== null);
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
      r2 += d2 === c ? s22 + n2
      : p2 >= 0
        ? (l2.push(o3), s22.slice(0, p2) + "$lit$" + s22.slice(p2) + e2 + y2)
        : s22 + e2 + (p2 === -2 ? (l2.push(void 0), i3) : y2);
    }
    const u2 = r2 + (t2[o21] || "<?>") + (i2 === 2 ? "</svg>" : "");
    if (!Array.isArray(t2) || !t2.hasOwnProperty("raw")) {
      throw Error("invalid template strings array");
    }
    return [
      s2 !== void 0 ? s2.createHTML(u2) : u2,
      l2,
    ];
  };
class E {
  constructor({ strings: t2, _$litType$: s23 }, n21) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u2 = t2.length - 1, c2 = this.parts, [v2, a2] = C(t2, s23);
    if (
      this.el = E.createElement(v2, n21),
        A.currentNode = this.el.content,
        s23 === 2
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
                  index: r2,
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
                  index: r2,
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
                  index: ++r2,
                });
            }
            l2.append(t3[s3], h1());
          }
        }
      } else if (l2.nodeType === 8) {
        if (l2.data === o2) {
          c2.push({
            type: 2,
            index: r2,
          });
        } else {
          let t3 = -1;
          for (; (t3 = l2.data.indexOf(e2, t3 + 1)) !== -1;) {
            c2.push({
              type: 7,
              index: r2,
            }), t3 += e2.length - 1;
          }
        }
      }
      r2++;
    }
  }
  static createElement(t2, i2) {
    const s24 = l1.createElement("template");
    return s24.innerHTML = t2, s24;
  }
}
function P(t2, i2, s25 = t2, e21) {
  var o22, n22, l2, h2;
  if (i2 === b) return i2;
  let d2 = e21 !== void 0
    ? (o22 = s25._$Cl) === null || o22 === void 0 ? void 0 : o22[e21]
    : s25._$Cu;
  const u2 = r1(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 &&
    ((n22 = d2 == null ? void 0 : d2._$AO) === null || n22 === void 0 ||
      n22.call(d2, false),
      u2 === void 0 ? d2 = void 0 : (d2 = new u2(t2), d2._$AT(t2, s25, e21)),
      e21 !== void 0
        ? ((l2 = (h2 = s25)._$Cl) !== null && l2 !== void 0
          ? l2
          : h2._$Cl = [])[e21] = d2
        : s25._$Cu = d2),
    d2 !== void 0 && (i2 = P(t2, d2._$AS(t2, i2.values), d2, e21)),
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
    const { el: { content: s26 }, parts: e22 } = this._$AD,
      o23 = ((i2 = t2 == null
              ? void 0
              : t2.creationScope) !== null && i2 !== void 0
        ? i2
        : l1).importNode(s26, true);
    A.currentNode = o23;
    let n23 = A.nextNode(), h2 = 0, r2 = 0, d2 = e22[0];
    for (; d2 !== void 0;) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2
          ? i3 = new N(n23, n23.nextSibling, this, t2)
          : d2.type === 1
          ? i3 = new d2.ctor(n23, d2.name, d2.strings, this, t2)
          : d2.type === 6 && (i3 = new L(n23, this, t2)),
          this.v.push(i3),
          d2 = e22[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n23 = A.nextNode(), h2++);
    }
    return o23;
  }
  m(t2) {
    let i2 = 0;
    for (const s27 of this.v) {
      s27 !== void 0 &&
      (s27.strings !== void 0
        ? (s27._$AI(t2, s27, i2), i2 += s27.strings.length - 2)
        : s27._$AI(t2[i2])), i2++;
    }
  }
}
class N {
  constructor(t2, i2, s28, e23) {
    var o24;
    this.type = 2,
      this._$AH = w,
      this._$AN = void 0,
      this._$AA = t2,
      this._$AB = i2,
      this._$AM = s28,
      this.options = e23,
      this._$Cg = (o24 = e23 == null ? void 0 : e23.isConnected) === null ||
        o24 === void 0 || o24;
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
      r1(t2)
        ? t2 === w || t2 == null || t2 === ""
          ? (this._$AH !== w && this._$AR(), this._$AH = w)
          : t2 !== this._$AH && t2 !== b && this.$(t2)
        : t2._$litType$ !== void 0
        ? this.T(t2)
        : t2.nodeType !== void 0
        ? this.k(t2)
        : u(t2)
        ? this.S(t2)
        : this.$(t2);
  }
  A(t2, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t2, i2);
  }
  k(t2) {
    this._$AH !== t2 && (this._$AR(), this._$AH = this.A(t2));
  }
  $(t2) {
    this._$AH !== w && r1(this._$AH)
      ? this._$AA.nextSibling.data = t2
      : this.k(l1.createTextNode(t2)), this._$AH = t2;
  }
  T(t2) {
    var i2;
    const { values: s29, _$litType$: e24 } = t2,
      o25 = typeof e24 == "number"
        ? this._$AC(t2)
        : (e24.el === void 0 && (e24.el = E.createElement(e24.h, this.options)),
          e24);
    if (
      ((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o25
    ) {
      this._$AH.m(s29);
    } else {
      const t3 = new V(o25, this), i3 = t3.p(this.options);
      t3.m(s29), this.k(i3), this._$AH = t3;
    }
  }
  _$AC(t2) {
    let i2 = T.get(t2.strings);
    return i2 === void 0 && T.set(t2.strings, i2 = new E(t2)), i2;
  }
  S(t2) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s210, e25 = 0;
    for (const o26 of t2) {
      e25 === i2.length
        ? i2.push(s210 = new N(this.A(h1()), this.A(h1()), this, this.options))
        : s210 = i2[e25],
        s210._$AI(o26),
        e25++;
    }
    e25 < i2.length &&
      (this._$AR(s210 && s210._$AB.nextSibling, e25), i2.length = e25);
  }
  _$AR(t2 = this._$AA.nextSibling, i2) {
    var s211;
    for (
      (s211 = this._$AP) === null || s211 === void 0 ||
      s211.call(this, false, true, i2);
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
  constructor(t2, i2, s212, e26, o27) {
    this.type = 1,
      this._$AH = w,
      this._$AN = void 0,
      this.element = t2,
      this.name = i2,
      this._$AM = e26,
      this.options = o27,
      s212.length > 2 || s212[0] !== "" || s212[1] !== ""
        ? (this._$AH = Array(s212.length - 1).fill(new String()),
          this.strings = s212)
        : this._$AH = w;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t2, i2 = this, s2, e27) {
    const o28 = this.strings;
    let n24 = false;
    if (o28 === void 0) {
      t2 = P(this, t2, i2, 0),
        n24 = !r1(t2) || t2 !== this._$AH && t2 !== b,
        n24 && (this._$AH = t2);
    } else {
      const e3 = t2;
      let l2, h2;
      for (t2 = o28[0], l2 = 0; l2 < o28.length - 1; l2++) {
        h2 = P(this, e3[s2 + l2], i2, l2),
          h2 === b && (h2 = this._$AH[l2]),
          n24 || (n24 = !r1(h2) || h2 !== this._$AH[l2]),
          h2 === w
            ? t2 = w
            : t2 !== w && (t2 += (h2 != null ? h2 : "") + o28[l2 + 1]),
          this._$AH[l2] = h2;
      }
    }
    n24 && !e27 && this.C(t2);
  }
  C(t2) {
    t2 === w
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t2 != null ? t2 : "");
  }
}
class M extends S1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t2) {
    this.element[this.name] = t2 === w ? void 0 : t2;
  }
}
const k = i1 ? i1.emptyScript : "";
class H extends S1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t2) {
    t2 && t2 !== w
      ? this.element.setAttribute(this.name, k)
      : this.element.removeAttribute(this.name);
  }
}
class I extends S1 {
  constructor(t2, i2, s213, e28, o29) {
    super(t2, i2, s213, e28, o29), this.type = 5;
  }
  _$AI(t2, i2 = this) {
    var s214;
    if (
      (t2 = (s214 = P(this, t2, i2, 0)) !== null && s214 !== void 0
        ? s214
        : w) === b
    ) {
      return;
    }
    const e29 = this._$AH,
      o210 = t2 === w && e29 !== w || t2.capture !== e29.capture ||
        t2.once !== e29.once || t2.passive !== e29.passive,
      n25 = t2 !== w && (e29 === w || o210);
    o210 && this.element.removeEventListener(this.name, this, e29),
      n25 && this.element.addEventListener(this.name, this, t2),
      this._$AH = t2;
  }
  handleEvent(t2) {
    var i2, s215;
    typeof this._$AH == "function"
      ? this._$AH.call(
        (s215 = (i2 = this.options) === null || i2 === void 0
              ? void 0
              : i2.host) !== null && s215 !== void 0
          ? s215
          : this.element,
        t2,
      )
      : this._$AH.handleEvent(t2);
  }
}
class L {
  constructor(t2, i2, s216) {
    this.element = t2,
      this.type = 6,
      this._$AN = void 0,
      this._$AM = i2,
      this.options = s216;
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
    : globalThis.litHtmlVersions = []).push("2.2.1");
const t2 = window.ShadowRoot &&
    (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  e3 = Symbol(),
  n3 = new Map();
class s3 {
  constructor(t27, n26) {
    if (this._$cssResult$ = true, n26 !== e3) {
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead.",
      );
    }
    this.cssText = t27;
  }
  get styleSheet() {
    let e210 = n3.get(this.cssText);
    return t2 && e210 === void 0 &&
      (n3.set(this.cssText, e210 = new CSSStyleSheet()),
        e210.replaceSync(this.cssText)),
      e210;
  }
  toString() {
    return this.cssText;
  }
}
const o3 = (t28) => new s3(typeof t28 == "string" ? t28 : t28 + "", e3),
  r2 = (t29, ...n27) => {
    const o211 = t29.length === 1
      ? t29[0]
      : n27.reduce((e211, n31, s2) =>
        e211 + ((t3) => {
          if (t3._$cssResult$ === true) return t3.cssText;
          if (typeof t3 == "number") return t3;
          throw Error(
            "Value passed to 'css' function must be a 'css' function result: " +
              t3 +
              ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
          );
        })(n31) + t29[s2 + 1], t29[0]);
    return new s3(o211, e3);
  },
  i2 = (e212, n28) => {
    t2
      ? e212.adoptedStyleSheets = n28.map((t210) =>
        t210 instanceof CSSStyleSheet ? t210 : t210.styleSheet
      )
      : n28.forEach((t211) => {
        const n32 = document.createElement("style"), s217 = window.litNonce;
        s217 !== void 0 && n32.setAttribute("nonce", s217),
          n32.textContent = t211.cssText,
          e212.appendChild(n32);
      });
  },
  S2 = t2
    ? (t212) => t212
    : (t213) =>
      t213 instanceof CSSStyleSheet
        ? ((t3) => {
          let e213 = "";
          for (const n29 of t3.cssRules) e213 += n29.cssText;
          return o3(e213);
        })(t213)
        : t213;
var s4;
const e4 = window.trustedTypes,
  r3 = e4 ? e4.emptyScript : "",
  h2 = window.reactiveElementPolyfillSupport,
  o4 = {
    toAttribute(t30, i21) {
      switch (i21) {
        case Boolean:
          t30 = t30 ? r3 : null;
          break;
        case Object:
        case Array:
          t30 = t30 == null ? t30 : JSON.stringify(t30);
      }
      return t30;
    },
    fromAttribute(t31, i22) {
      let s218 = t31;
      switch (i22) {
        case Boolean:
          s218 = t31 !== null;
          break;
        case Number:
          s218 = t31 === null ? null : Number(t31);
          break;
        case Object:
        case Array:
          try {
            s218 = JSON.parse(t31);
          } catch (t2) {
            s218 = null;
          }
      }
      return s218;
    },
  },
  n4 = (t32, i23) => i23 !== t32 && (i23 == i23 || t32 == t32),
  l2 = {
    attribute: true,
    type: String,
    converter: o4,
    reflect: false,
    hasChanged: n4,
  };
class a2 extends HTMLElement {
  constructor() {
    super(),
      this._$Et = new Map(),
      this.isUpdatePending = false,
      this.hasUpdated = false,
      this._$Ei = null,
      this.o();
  }
  static addInitializer(t33) {
    var i24;
    (i24 = this.l) !== null && i24 !== void 0 || (this.l = []),
      this.l.push(t33);
  }
  static get observedAttributes() {
    this.finalize();
    const t34 = [];
    return this.elementProperties.forEach((i25, s219) => {
      const e214 = this._$Eh(s219, i25);
      e214 !== void 0 && (this._$Eu.set(e214, s219), t34.push(e214));
    }),
      t34;
  }
  static createProperty(t35, i26 = l2) {
    if (
      i26.state && (i26.attribute = false),
        this.finalize(),
        this.elementProperties.set(t35, i26),
        !i26.noAccessor && !this.prototype.hasOwnProperty(t35)
    ) {
      const s220 = typeof t35 == "symbol" ? Symbol() : "__" + t35,
        e215 = this.getPropertyDescriptor(t35, s220, i26);
      e215 !== void 0 && Object.defineProperty(this.prototype, t35, e215);
    }
  }
  static getPropertyDescriptor(t36, i2, s221) {
    return {
      get() {
        return this[i2];
      },
      set(e216) {
        const r21 = this[t36];
        this[i2] = e216, this.requestUpdate(t36, r21, s221);
      },
      configurable: true,
      enumerable: true,
    };
  }
  static getPropertyOptions(t37) {
    return this.elementProperties.get(t37) || l2;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return false;
    this.finalized = true;
    const t38 = Object.getPrototypeOf(this);
    if (
      t38.finalize(),
        this.elementProperties = new Map(t38.elementProperties),
        this._$Eu = new Map(),
        this.hasOwnProperty("properties")
    ) {
      const t214 = this.properties,
        i27 = [
          ...Object.getOwnPropertyNames(t214),
          ...Object.getOwnPropertySymbols(t214),
        ];
      for (const s222 of i27) this.createProperty(s222, t214[s222]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i28) {
    const s223 = [];
    if (Array.isArray(i28)) {
      const e217 = new Set(i28.flat(1 / 0).reverse());
      for (const i3 of e217) s223.unshift(S2(i3));
    } else i28 !== void 0 && s223.push(S2(i28));
    return s223;
  }
  static _$Eh(t39, i29) {
    const s224 = i29.attribute;
    return s224 === false
      ? void 0
      : typeof s224 == "string"
      ? s224
      : typeof t39 == "string"
      ? t39.toLowerCase()
      : void 0;
  }
  o() {
    var t40;
    this._$Ep = new Promise((t215) => this.enableUpdating = t215),
      this._$AL = new Map(),
      this._$Em(),
      this.requestUpdate(),
      (t40 = this.constructor.l) === null || t40 === void 0 ||
      t40.forEach((t216) => t216(this));
  }
  addController(t41) {
    var i210, s225;
    ((i210 = this._$Eg) !== null && i210 !== void 0 ? i210 : this._$Eg = [])
      .push(t41),
      this.renderRoot !== void 0 && this.isConnected &&
      ((s225 = t41.hostConnected) === null || s225 === void 0 ||
        s225.call(t41));
  }
  removeController(t42) {
    var i211;
    (i211 = this._$Eg) === null || i211 === void 0 ||
      i211.splice(this._$Eg.indexOf(t42) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, i212) => {
      this.hasOwnProperty(i212) &&
        (this._$Et.set(i212, this[i212]), delete this[i212]);
    });
  }
  createRenderRoot() {
    var t43;
    const s226 = (t43 = this.shadowRoot) !== null && t43 !== void 0
      ? t43
      : this.attachShadow(this.constructor.shadowRootOptions);
    return i2(s226, this.constructor.elementStyles), s226;
  }
  connectedCallback() {
    var t44;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(true),
      (t44 = this._$Eg) === null || t44 === void 0 || t44.forEach((t217) => {
        var i213;
        return (i213 = t217.hostConnected) === null || i213 === void 0
          ? void 0
          : i213.call(t217);
      });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t45;
    (t45 = this._$Eg) === null || t45 === void 0 || t45.forEach((t218) => {
      var i214;
      return (i214 = t218.hostDisconnected) === null || i214 === void 0
        ? void 0
        : i214.call(t218);
    });
  }
  attributeChangedCallback(t46, i2, s227) {
    this._$AK(t46, s227);
  }
  _$ES(t47, i215, s228 = l2) {
    var e218, r22;
    const h21 = this.constructor._$Eh(t47, s228);
    if (h21 !== void 0 && s228.reflect === true) {
      const n210 = ((r22 = (e218 = s228.converter) === null || e218 === void 0
              ? void 0
              : e218.toAttribute) !== null && r22 !== void 0
        ? r22
        : o4.toAttribute)(i215, s228.type);
      this._$Ei = t47,
        n210 == null
          ? this.removeAttribute(h21)
          : this.setAttribute(h21, n210),
        this._$Ei = null;
    }
  }
  _$AK(t48, i216) {
    var s229, e219, r23;
    const h22 = this.constructor, n211 = h22._$Eu.get(t48);
    if (n211 !== void 0 && this._$Ei !== n211) {
      const t219 = h22.getPropertyOptions(n211),
        l21 = t219.converter,
        a3 = (r23 = (e219 = (s229 = l21) === null || s229 === void 0
                      ? void 0
                      : s229.fromAttribute) !== null && e219 !== void 0
                ? e219
                : typeof l21 == "function"
                ? l21
                : null) !== null && r23 !== void 0
          ? r23
          : o4.fromAttribute;
      this._$Ei = n211, this[n211] = a3(i216, t219.type), this._$Ei = null;
    }
  }
  requestUpdate(t49, i217, s230) {
    let e220 = true;
    t49 !== void 0 &&
    (((s230 = s230 || this.constructor.getPropertyOptions(t49)).hasChanged ||
        n4)(this[t49], i217)
      ? (this._$AL.has(t49) || this._$AL.set(t49, i217),
        s230.reflect === true && this._$Ei !== t49 &&
        (this._$EC === void 0 && (this._$EC = new Map()),
          this._$EC.set(t49, s230)))
      : e220 = false),
      !this.isUpdatePending && e220 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t220) {
      Promise.reject(t220);
    }
    const t50 = this.scheduleUpdate();
    return t50 != null && await t50, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t51;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
      (this._$Et.forEach((t221, i3) => this[i3] = t221), this._$Et = void 0);
    let i218 = false;
    const s231 = this._$AL;
    try {
      i218 = this.shouldUpdate(s231),
        i218
          ? (this.willUpdate(s231),
            (t51 = this._$Eg) === null || t51 === void 0 ||
            t51.forEach((t222) => {
              var i3;
              return (i3 = t222.hostUpdate) === null || i3 === void 0
                ? void 0
                : i3.call(t222);
            }),
            this.update(s231))
          : this._$EU();
    } catch (t223) {
      throw i218 = false, this._$EU(), t223;
    }
    i218 && this._$AE(s231);
  }
  willUpdate(t) {
  }
  _$AE(t52) {
    var i219;
    (i219 = this._$Eg) === null || i219 === void 0 || i219.forEach((t224) => {
      var i3;
      return (i3 = t224.hostUpdated) === null || i3 === void 0
        ? void 0
        : i3.call(t224);
    }),
      this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t52)),
      this.updated(t52);
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
    this._$EC !== void 0 &&
    (this._$EC.forEach((t225, i220) => this._$ES(i220, this[i220], t225)),
      this._$EC = void 0), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
a2.finalized = true,
  a2.elementProperties = new Map(),
  a2.elementStyles = [],
  a2.shadowRootOptions = {
    mode: "open",
  },
  h2 == null || h2({
    ReactiveElement: a2,
  }),
  ((s4 = globalThis.reactiveElementVersions) !== null && s4 !== void 0
    ? s4
    : globalThis.reactiveElementVersions = []).push("1.3.0");
var t3;
const i3 = globalThis.trustedTypes,
  s5 = i3
    ? i3.createPolicy("lit-html", {
      createHTML: (t226) => t226,
    })
    : void 0,
  e5 = `lit$${(Math.random() + "").slice(9)}$`,
  o5 = "?" + e5,
  n5 = `<${o5}>`,
  l3 = document,
  h3 = (t227 = "") => l3.createComment(t227),
  r4 = (t228) =>
    t228 === null || typeof t228 != "object" && typeof t228 != "function",
  d1 = Array.isArray,
  u1 = (t229) => {
    var i221;
    return d1(t229) ||
      typeof ((i221 = t229) === null || i221 === void 0
          ? void 0
          : i221[Symbol.iterator]) == "function";
  },
  c1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  v1 = /-->/g,
  a3 = />/g,
  f1 =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  _1 = /'/g,
  m1 = /"/g,
  g1 = /^(?:script|style|textarea|title)$/i,
  p1 = (t230) =>
    (i222, ...s232) => ({
      _$litType$: t230,
      strings: i222,
      values: s232,
    }),
  $1 = p1(1),
  y1 = p1(2),
  b1 = Symbol.for("lit-noChange"),
  w1 = Symbol.for("lit-nothing"),
  T1 = new WeakMap(),
  x = (t231, i223, s233) => {
    var e221, o212;
    const n212 =
      (e221 = s233 == null ? void 0 : s233.renderBefore) !== null &&
        e221 !== void 0 ? e221 : i223;
    let l22 = n212._$litPart$;
    if (l22 === void 0) {
      const t310 =
        (o212 = s233 == null ? void 0 : s233.renderBefore) !== null &&
          o212 !== void 0 ? o212 : null;
      n212._$litPart$ = l22 = new N1(
        i223.insertBefore(h3(), t310),
        t310,
        void 0,
        s233 != null ? s233 : {},
      );
    }
    return l22._$AI(t231), l22;
  },
  A1 = l3.createTreeWalker(l3, 129, null, false),
  C1 = (t232, i224) => {
    const o213 = t232.length - 1, l23 = [];
    let h23, r24 = i224 === 2 ? "<svg>" : "", d2 = c1;
    for (let i31 = 0; i31 < o213; i31++) {
      const s234 = t232[i31];
      let o31, u3, p2 = -1, $2 = 0;
      for (
        ;
        $2 < s234.length &&
        (d2.lastIndex = $2, u3 = d2.exec(s234), u3 !== null);
      ) {
        $2 = d2.lastIndex,
          d2 === c1
            ? u3[1] === "!--"
              ? d2 = v1
              : u3[1] !== void 0
              ? d2 = a3
              : u3[2] !== void 0
              ? (g1.test(u3[2]) && (h23 = RegExp("</" + u3[2], "g")), d2 = f1)
              : u3[3] !== void 0 && (d2 = f1)
            : d2 === f1
            ? u3[0] === ">"
              ? (d2 = h23 != null ? h23 : c1, p2 = -1)
              : u3[1] === void 0
              ? p2 = -2
              : (p2 = d2.lastIndex - u3[2].length,
                o31 = u3[1],
                d2 = u3[3] === void 0 ? f1 : u3[3] === '"' ? m1 : _1)
            : d2 === m1 || d2 === _1
            ? d2 = f1
            : d2 === v1 || d2 === a3
            ? d2 = c1
            : (d2 = f1, h23 = void 0);
      }
      const y2 = d2 === f1 && t232[i31 + 1].startsWith("/>") ? " " : "";
      r24 += d2 === c1 ? s234 + n5 : p2 >= 0
        ? (l23.push(o31),
          s234.slice(0, p2) + "$lit$" + s234.slice(p2) + e5 + y2)
        : s234 + e5 + (p2 === -2 ? (l23.push(void 0), i31) : y2);
    }
    const u2 = r24 + (t232[o213] || "<?>") + (i224 === 2 ? "</svg>" : "");
    if (!Array.isArray(t232) || !t232.hasOwnProperty("raw")) {
      throw Error("invalid template strings array");
    }
    return [
      s5 !== void 0 ? s5.createHTML(u2) : u2,
      l23,
    ];
  };
class E1 {
  constructor({ strings: t233, _$litType$: s235 }, n213) {
    let l24;
    this.parts = [];
    let r25 = 0, d2 = 0;
    const u2 = t233.length - 1, c2 = this.parts, [v2, a21] = C1(t233, s235);
    if (
      this.el = E1.createElement(v2, n213),
        A1.currentNode = this.el.content,
        s235 === 2
    ) {
      const t311 = this.el.content, i225 = t311.firstChild;
      i225.remove(), t311.append(...i225.childNodes);
    }
    for (; (l24 = A1.nextNode()) !== null && c2.length < u2;) {
      if (l24.nodeType === 1) {
        if (l24.hasAttributes()) {
          const t312 = [];
          for (const i226 of l24.getAttributeNames()) {
            if (i226.endsWith("$lit$") || i226.startsWith(e5)) {
              const s31 = a21[d2++];
              if (t312.push(i226), s31 !== void 0) {
                const t4 = l24.getAttribute(s31.toLowerCase() + "$lit$").split(
                    e5,
                  ),
                  i32 = /([.?@])?(.*)/.exec(s31);
                c2.push({
                  type: 1,
                  index: r25,
                  name: i32[2],
                  strings: t4,
                  ctor: i32[1] === "."
                    ? M1
                    : i32[1] === "?"
                    ? H1
                    : i32[1] === "@"
                    ? I1
                    : S3,
                });
              } else {
                c2.push({
                  type: 6,
                  index: r25,
                });
              }
            }
          }
          for (const i21 of t312) l24.removeAttribute(i21);
        }
        if (g1.test(l24.tagName)) {
          const t313 = l24.textContent.split(e5), s32 = t313.length - 1;
          if (s32 > 0) {
            l24.textContent = i3 ? i3.emptyScript : "";
            for (let i227 = 0; i227 < s32; i227++) {
              l24.append(t313[i227], h3()),
                A1.nextNode(),
                c2.push({
                  type: 2,
                  index: ++r25,
                });
            }
            l24.append(t313[s32], h3());
          }
        }
      } else if (l24.nodeType === 8) {
        if (l24.data === o5) {
          c2.push({
            type: 2,
            index: r25,
          });
        } else {
          let t314 = -1;
          for (; (t314 = l24.data.indexOf(e5, t314 + 1)) !== -1;) {
            c2.push({
              type: 7,
              index: r25,
            }), t314 += e5.length - 1;
          }
        }
      }
      r25++;
    }
  }
  static createElement(t234, i2) {
    const s236 = l3.createElement("template");
    return s236.innerHTML = t234, s236;
  }
}
function P1(t235, i228, s237 = t235, e222) {
  var o214, n214, l25, h24;
  if (i228 === b1) return i228;
  let d2 = e222 !== void 0
    ? (o214 = s237._$Cl) === null || o214 === void 0 ? void 0 : o214[e222]
    : s237._$Cu;
  const u2 = r4(i228) ? void 0 : i228._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u2 &&
    ((n214 = d2 == null ? void 0 : d2._$AO) === null || n214 === void 0 ||
      n214.call(d2, false),
      u2 === void 0
        ? d2 = void 0
        : (d2 = new u2(t235), d2._$AT(t235, s237, e222)),
      e222 !== void 0
        ? ((l25 = (h24 = s237)._$Cl) !== null && l25 !== void 0
          ? l25
          : h24._$Cl = [])[e222] = d2
        : s237._$Cu = d2),
    d2 !== void 0 && (i228 = P1(t235, d2._$AS(t235, i228.values), d2, e222)),
    i228;
}
class V1 {
  constructor(t236, i229) {
    this.v = [], this._$AN = void 0, this._$AD = t236, this._$AM = i229;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t237) {
    var i230;
    const { el: { content: s238 }, parts: e223 } = this._$AD,
      o215 = ((i230 = t237 == null
              ? void 0
              : t237.creationScope) !== null && i230 !== void 0
        ? i230
        : l3).importNode(s238, true);
    A1.currentNode = o215;
    let n215 = A1.nextNode(), h25 = 0, r2 = 0, d2 = e223[0];
    for (; d2 !== void 0;) {
      if (h25 === d2.index) {
        let i33;
        d2.type === 2
          ? i33 = new N1(n215, n215.nextSibling, this, t237)
          : d2.type === 1
          ? i33 = new d2.ctor(n215, d2.name, d2.strings, this, t237)
          : d2.type === 6 && (i33 = new L1(n215, this, t237)),
          this.v.push(i33),
          d2 = e223[++r2];
      }
      h25 !== (d2 == null ? void 0 : d2.index) && (n215 = A1.nextNode(), h25++);
    }
    return o215;
  }
  m(t238) {
    let i231 = 0;
    for (const s239 of this.v) {
      s239 !== void 0 &&
      (s239.strings !== void 0
        ? (s239._$AI(t238, s239, i231), i231 += s239.strings.length - 2)
        : s239._$AI(t238[i231])), i231++;
    }
  }
}
class N1 {
  constructor(t239, i232, s240, e224) {
    var o216;
    this.type = 2,
      this._$AH = w1,
      this._$AN = void 0,
      this._$AA = t239,
      this._$AB = i232,
      this._$AM = s240,
      this.options = e224,
      this._$Cg = (o216 = e224 == null ? void 0 : e224.isConnected) === null ||
        o216 === void 0 || o216;
  }
  get _$AU() {
    var t240, i233;
    return (i233 = (t240 = this._$AM) === null || t240 === void 0
            ? void 0
            : t240._$AU) !== null && i233 !== void 0
      ? i233
      : this._$Cg;
  }
  get parentNode() {
    let t241 = this._$AA.parentNode;
    const i234 = this._$AM;
    return i234 !== void 0 && t241.nodeType === 11 && (t241 = i234.parentNode),
      t241;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t242, i235 = this) {
    t242 = P1(this, t242, i235),
      r4(t242)
        ? t242 === w1 || t242 == null || t242 === ""
          ? (this._$AH !== w1 && this._$AR(), this._$AH = w1)
          : t242 !== this._$AH && t242 !== b1 && this.$(t242)
        : t242._$litType$ !== void 0
        ? this.T(t242)
        : t242.nodeType !== void 0
        ? this.k(t242)
        : u1(t242)
        ? this.S(t242)
        : this.$(t242);
  }
  A(t243, i236 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t243, i236);
  }
  k(t244) {
    this._$AH !== t244 && (this._$AR(), this._$AH = this.A(t244));
  }
  $(t245) {
    this._$AH !== w1 && r4(this._$AH)
      ? this._$AA.nextSibling.data = t245
      : this.k(l3.createTextNode(t245)), this._$AH = t245;
  }
  T(t246) {
    var i237;
    const { values: s241, _$litType$: e225 } = t246,
      o217 = typeof e225 == "number"
        ? this._$AC(t246)
        : (e225.el === void 0 &&
          (e225.el = E1.createElement(e225.h, this.options)),
          e225);
    if (
      ((i237 = this._$AH) === null || i237 === void 0 ? void 0 : i237._$AD) ===
        o217
    ) {
      this._$AH.m(s241);
    } else {
      const t315 = new V1(o217, this), i34 = t315.p(this.options);
      t315.m(s241), this.k(i34), this._$AH = t315;
    }
  }
  _$AC(t247) {
    let i238 = T1.get(t247.strings);
    return i238 === void 0 && T1.set(t247.strings, i238 = new E1(t247)), i238;
  }
  S(t248) {
    d1(this._$AH) || (this._$AH = [], this._$AR());
    const i239 = this._$AH;
    let s242, e226 = 0;
    for (const o218 of t248) {
      e226 === i239.length
        ? i239.push(
          s242 = new N1(this.A(h3()), this.A(h3()), this, this.options),
        )
        : s242 = i239[e226],
        s242._$AI(o218),
        e226++;
    }
    e226 < i239.length &&
      (this._$AR(s242 && s242._$AB.nextSibling, e226), i239.length = e226);
  }
  _$AR(t249 = this._$AA.nextSibling, i240) {
    var s243;
    for (
      (s243 = this._$AP) === null || s243 === void 0 ||
      s243.call(this, false, true, i240);
      t249 && t249 !== this._$AB;
    ) {
      const i35 = t249.nextSibling;
      t249.remove(), t249 = i35;
    }
  }
  setConnected(t250) {
    var i241;
    this._$AM === void 0 &&
      (this._$Cg = t250,
        (i241 = this._$AP) === null || i241 === void 0 ||
        i241.call(this, t250));
  }
}
class S3 {
  constructor(t251, i242, s244, e227, o219) {
    this.type = 1,
      this._$AH = w1,
      this._$AN = void 0,
      this.element = t251,
      this.name = i242,
      this._$AM = e227,
      this.options = o219,
      s244.length > 2 || s244[0] !== "" || s244[1] !== ""
        ? (this._$AH = Array(s244.length - 1).fill(new String()),
          this.strings = s244)
        : this._$AH = w1;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t252, i243 = this, s2, e228) {
    const o220 = this.strings;
    let n216 = false;
    if (o220 === void 0) {
      t252 = P1(this, t252, i243, 0),
        n216 = !r4(t252) || t252 !== this._$AH && t252 !== b1,
        n216 && (this._$AH = t252);
    } else {
      const e31 = t252;
      let l26, h26;
      for (t252 = o220[0], l26 = 0; l26 < o220.length - 1; l26++) {
        h26 = P1(this, e31[s2 + l26], i243, l26),
          h26 === b1 && (h26 = this._$AH[l26]),
          n216 || (n216 = !r4(h26) || h26 !== this._$AH[l26]),
          h26 === w1
            ? t252 = w1
            : t252 !== w1 && (t252 += (h26 != null ? h26 : "") + o220[l26 + 1]),
          this._$AH[l26] = h26;
      }
    }
    n216 && !e228 && this.C(t252);
  }
  C(t253) {
    t253 === w1
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t253 != null ? t253 : "");
  }
}
class M1 extends S3 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t254) {
    this.element[this.name] = t254 === w1 ? void 0 : t254;
  }
}
const k1 = i3 ? i3.emptyScript : "";
class H1 extends S3 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t255) {
    t255 && t255 !== w1
      ? this.element.setAttribute(this.name, k1)
      : this.element.removeAttribute(this.name);
  }
}
class I1 extends S3 {
  constructor(t256, i244, s245, e229, o221) {
    super(t256, i244, s245, e229, o221), this.type = 5;
  }
  _$AI(t257, i245 = this) {
    var s246;
    if (
      (t257 = (s246 = P1(this, t257, i245, 0)) !== null && s246 !== void 0
        ? s246
        : w1) === b1
    ) {
      return;
    }
    const e230 = this._$AH,
      o222 = t257 === w1 && e230 !== w1 || t257.capture !== e230.capture ||
        t257.once !== e230.once || t257.passive !== e230.passive,
      n217 = t257 !== w1 && (e230 === w1 || o222);
    o222 && this.element.removeEventListener(this.name, this, e230),
      n217 && this.element.addEventListener(this.name, this, t257),
      this._$AH = t257;
  }
  handleEvent(t258) {
    var i246, s247;
    typeof this._$AH == "function"
      ? this._$AH.call(
        (s247 = (i246 = this.options) === null || i246 === void 0
              ? void 0
              : i246.host) !== null && s247 !== void 0
          ? s247
          : this.element,
        t258,
      )
      : this._$AH.handleEvent(t258);
  }
}
class L1 {
  constructor(t259, i247, s248) {
    this.element = t259,
      this.type = 6,
      this._$AN = void 0,
      this._$AM = i247,
      this.options = s248;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t260) {
    P1(this, t260);
  }
}
const z1 = window.litHtmlPolyfillSupport;
z1 == null || z1(E1, N1),
  ((t3 = globalThis.litHtmlVersions) !== null && t3 !== void 0
    ? t3
    : globalThis.litHtmlVersions = []).push("2.2.0");
var l4, o6;
class s6 extends a2 {
  constructor() {
    super(...arguments),
      this.renderOptions = {
        host: this,
      },
      this._$Dt = void 0;
  }
  createRenderRoot() {
    var t53, e7;
    const i5 = super.createRenderRoot();
    return (t53 = (e7 = this.renderOptions).renderBefore) !== null &&
        t53 !== void 0 || (e7.renderBefore = i5.firstChild),
      i5;
  }
  update(t54) {
    const i6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t54),
      this._$Dt = x(i6, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t55;
    super.connectedCallback(),
      (t55 = this._$Dt) === null || t55 === void 0 || t55.setConnected(true);
  }
  disconnectedCallback() {
    var t56;
    super.disconnectedCallback(),
      (t56 = this._$Dt) === null || t56 === void 0 || t56.setConnected(false);
  }
  render() {
    return b1;
  }
}
s6.finalized = true,
  s6._$litElement$ = true,
  (l4 = globalThis.litElementHydrateSupport) === null || l4 === void 0 ||
  l4.call(globalThis, {
    LitElement: s6,
  });
const n6 = globalThis.litElementPolyfillSupport;
n6 == null || n6({
  LitElement: s6,
});
((o6 = globalThis.litElementVersions) !== null && o6 !== void 0
  ? o6
  : globalThis.litElementVersions = []).push("3.2.0");
const n7 = (n218) =>
  (e8) =>
    typeof e8 == "function"
      ? ((n33, e231) => (window.customElements.define(n33, e231), e231))(
        n218,
        e8,
      )
      : ((n34, e232) => {
        const { kind: t57, elements: i7 } = e232;
        return {
          kind: t57,
          elements: i7,
          finisher(e32) {
            window.customElements.define(n34, e32);
          },
        };
      })(n218, e8);
const i4 = (i248, e233) =>
  e233.kind === "method" && e233.descriptor && !("value" in e233.descriptor)
    ? {
      ...e233,
      finisher(n9) {
        n9.createProperty(e233.key, i248);
      },
    }
    : {
      kind: "field",
      key: Symbol(),
      placement: "own",
      descriptor: {},
      originalKey: e233.key,
      initializer() {
        typeof e233.initializer == "function" &&
          (this[e233.key] = e233.initializer.call(this));
      },
      finisher(n10) {
        n10.createProperty(e233.key, i248);
      },
    };
function e6(e234) {
  return (n11, t58) =>
    t58 !== void 0
      ? ((i249, e33, n219) => {
        e33.constructor.createProperty(n219, i249);
      })(e234, n11, t58)
      : i4(e234, n11);
}
var n8;
((n8 = window.HTMLSlotElement) === null || n8 === void 0
    ? void 0
    : n8.prototype.assignedElements) != null
  ? (o223, n220) => o223.assignedElements(n220)
  : (o224, n221) =>
    o224.assignedNodes(n221).filter((o32) =>
      o32.nodeType === Node.ELEMENT_NODE
    );
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const BROADCAST = "router_broadcast";
const HASH_CHANGE = "router_hash_change";
const UNKNOWN = "router_unknown";
let bc;
function setBroadcaster(broadcaster) {
  bc = broadcaster;
}
function getLocation() {
  return window.location.href.substring(window.origin.length);
}
function replaceHistoryEntry(type) {
  const location = getLocation();
  const { title } = document;
  const state = {
    data: history.state?.data,
    type,
    location,
    title,
  };
  history.replaceState(state, title, location);
}
function push(state) {
  const { title, location } = state;
  history.pushState(state, title, location);
  bc.postMessage(history.state);
}
function onPopState(e9) {
  if (e9.state === null) replaceHistoryEntry(HASH_CHANGE);
  bc.postMessage(history.state);
}
function onPageShow() {
  if (history.state === null) replaceHistoryEntry(UNKNOWN);
  bc.postMessage(history.state);
}
window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);
const bc1 = new BroadcastChannel("router-demo");
setBroadcaster(bc1);
const urlTitles = {
  "/": "root",
  "/#/dogs": "dogs",
  "/#/cats": "cats",
  "/#/pigs": "pigs",
};
const urlData = {
  "/": "beasts tread softly underfoot",
  "/#/dogs": "dogs crave companions and magic",
  "/#/cats": "cats become grand hunters, do not lie to them",
  "/#/pigs": "pigs are curious, often playful",
};
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
const styles1 = r2`
  :host, .direction-container, .location-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  input {
    border: 2px solid #eee;
    background-color: #fff;
    box-sizing: border-box;
    padding: 4px 8px;
    font-family: monospace;
    font-weight: 700;
    cursor: pointer;
  }

  input:active {
    background-color: #000;
    color: #fff;
  }

  input:hover, input:focus {
    border: 2px solid #000;
  }

  .direction-container {
    align-items: flex-start;
  }

  .location-container {
    flex-direction: column;
  }
`;
var _dec1 = n7("demo-menu");
_class = _dec1(
  ((_class = class DemoMenu extends s6 {
    static styles = [
      styles1,
    ];
    render() {
      const path = this.path;
      const root = path + "/";
      const dogs = path + "/#/dogs";
      const cats = path + "/#/cats";
      const pigs = path + "/#/pigs";
      return $1`
      <div class="direction-container">
        <input type="button" name="back" value="<--" @pointerup="${this.onBack}"></input>
        <input type="button" name="${root}" value="/" @pointerup="${this.onPointer}"></input>
      </div>

      <div class="location-container">
        <input type="button" name="${dogs}" value="#/dog"  @pointerup="${this.onPointer}">
        <input type="button" name="${cats}" value="#/cat" @pointerup="${this.onPointer}">
        <input type="button" name="${pigs}" value="#/pig" @pointerup="${this.onPointer}">
      </div>
    `;
    }
    onBack() {
      history.back();
    }
    onPointer(e10) {
      if (!(e10.target instanceof HTMLInputElement)) return;
      const { name } = e10.target;
      const nameWithoutPrefix = name.substring(this.path.length);
      const title = urlTitles[nameWithoutPrefix];
      const data = urlData[nameWithoutPrefix];
      push({
        type: BROADCAST,
        data,
        title,
        location: name,
      });
    }
    constructor(...args) {
      super(...args);
      _initializerDefineProperty(this, "path", _descriptor, this);
    }
  }) || _class,
    _dec = e6({
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
    _class),
) || _class;
var _class1;
const HIDDEN = "hidden";
const bc2 = new BroadcastChannel("router-demo");
bc2.addEventListener("message", (e11) => {
  if (document.visibilityState === HIDDEN) return;
  if (e11.data === null) return;
  callback(e11.data);
});
const styles11 = r2`
	:host {
		font-family: monospace;
    font-size: 28px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 400px;
		overflow: auto;
	}
  
  p {
    margin-top: 0;
  }
`;
let initialCallback = () => {
};
let callback = initialCallback;
function getLocation1() {
  return window.location.href.substring(window.origin.length);
}
var _dec2 = n7("demo-display");
_class1 = _dec2(
  (_class1 = class DemoDisplay extends s6 {
    static styles = [
      styles11,
    ];
    render() {
      let data = history.state?.data;
      if (data === undefined && getLocation1() === "/") {
        data = urlData["/"];
      }
      return $1`
      <div class="container">
        <p>${data}</p>
      </div>
    `;
    }
    connectedCallback() {
      super.connectedCallback();
      callback = () => this.requestUpdate();
    }
    disconnectedCallback() {
      super.disconnectedCallback();
      callback = initialCallback;
    }
  }) || _class1,
) || _class1;

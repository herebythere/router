// Imports / side effects

// Deno required some kind of ordering
//
// 1 only deno types (must be separated by a full line \n)
// 2 imports with side effects
// 3 imports with deno types (must be separated by a full line \n)
// 4 exports with deno types (must be separated by a full line \n)
// 5 exports

// @deno-types="https://cdn.skypack.dev/trusted-types?dts";

import "../../v0.1/deno/urlbang-dom.ts";

// @deno-types="https://cdn.skypack.dev/lit?dts"
export { css, html, LitElement } from "https://cdn.skypack.dev/lit";
export type { TemplateResult } from "https://cdn.skypack.dev/lit?dts";

export type {
  BroadcastMessageData,
  HistoryModifier,
  Listener,
} from "../../v0.1/deno/urlbang.ts";
export {
  addListener,
  goBack,
  pushEntry,
  URLBANG,
} from "../../v0.1/deno/urlbang.ts";

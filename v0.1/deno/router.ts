// brian taylor vann
// router

import { BroadcastMessage } from "./router_types.ts";
import { Callback } from "./router_types.ts";
import { HASH_CHANGE, PAGE_SHOW, replaceHistoryEntry } from "./utils.ts";

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

let callback: Callback = () => {};

function subscribe(cb: Callback) {
  callback = cb;
}

function pushState<D>(state: BroadcastMessage<D>) {
  const {
    title,
    location,
  } = state;

  history.pushState(state, title, location);
  callback(history.state);
}

function onPopState(e: PopStateEvent) {
  if (e.state === null) {
    replaceHistoryEntry(HASH_CHANGE);
  }

  callback(history.state);
}

function onPageShow() {
  if (history.state === null) {
    replaceHistoryEntry(PAGE_SHOW);
  }

  callback(history.state);
}

window.addEventListener(PAGESHOW, onPageShow);
window.addEventListener(POPSTATE, onPopState);

export { pushState, subscribe };

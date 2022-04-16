import type { BroadcastMessage, HistoryModifier } from "./router_types.ts";

const PUSH = "router_push";
const BACK = "router_pop";
const HIDDEN = "hidden";
const HASH_CHANGE = "router_hash_change";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

function getPathname(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry<D>(type: HistoryModifier) {
  const pathname = getPathname();
  const { title } = document;

  const state: BroadcastMessage<D> = {
    data: undefined,
    type,
    pathname,
    title,
  };

  history.replaceState(state, title, pathname);
}

export {
  BACK,
  getPathname,
  HASH_CHANGE,
  HIDDEN,
  PAGESHOW,
  POPSTATE,
  PUSH,
  replaceHistoryEntry,
};

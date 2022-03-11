import type { BroadcastMessage, HistoryModifier } from "./urlbang_types.ts";

const PUSH = "router__push";
const BACK = "router__back";
const HIDDEN = "hidden";
const HASH_CHANGE = "router__hash_change";
const PERSONAL_ENTRY = "router__personal_entry";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

function getWindowPathname(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry<D>(type: HistoryModifier) {
  const pathname = getWindowPathname();
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
  getWindowPathname,
  HASH_CHANGE,
  HIDDEN,
  PAGESHOW,
  PERSONAL_ENTRY,
  POPSTATE,
  PUSH,
  replaceHistoryEntry,
};

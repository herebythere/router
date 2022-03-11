import type { BroadcastMessage, HistoryModifier } from "./urlbang_types.ts";

const PUSH = "push";
const FORWARD = "forward";
const BACK = "back";
const HIDDEN = "hidden";
const HASHCHANGE = "hash_change";
const ENTRY = "personal_entry";
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
  ENTRY,
  FORWARD,
  getWindowPathname,
  HASHCHANGE,
  HIDDEN,
  PAGESHOW,
  POPSTATE,
  PUSH,
  replaceHistoryEntry,
};

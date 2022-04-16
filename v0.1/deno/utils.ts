import type { BroadcastMessage, HistoryModifier } from "./router_types.ts";

const PUSH = "router_push";
const POP = "router_pop";
const HASH_CHANGE = "router_hash_change";

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

export { getPathname, HASH_CHANGE, POP, PUSH, replaceHistoryEntry };

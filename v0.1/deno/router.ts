// brian taylor vann
// router

type HistoryModifier =
  | "router_broadcast"
  | "router_unknown"
  | "router_hash_change";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
  location: string;
  title: string;
  data?: D;
};

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const BROADCAST = "router_broadcast";
const HASH_CHANGE = "router_hash_change";
const UNKNOWN = "router_unknown";

// quick polyfill for safari
const bc = (BroadcastChannel) ? new BroadcastChannel("router") : window;

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry<D>(type: HistoryModifier) {
  const location = getLocation();
  const { title } = document;

  const state: BroadcastMessage<D> = {
    data: history.state?.data,
    type,
    location,
    title,
  };

  history.replaceState(state, title, location);
}

function push<D>(state: BroadcastMessage<D>) {
  const { title, location } = state;

  history.pushState(state, title, location);
  bc.postMessage(history.state);
}

function onPopState(e: PopStateEvent) {
  if (e.state === null) replaceHistoryEntry(HASH_CHANGE);
  bc.postMessage(history.state);
}

function onPageShow() {
  if (history.state === null) replaceHistoryEntry(UNKNOWN);
  bc.postMessage(history.state);
}

window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);

export type { BroadcastMessage };
export { BROADCAST, HASH_CHANGE, push, UNKNOWN };

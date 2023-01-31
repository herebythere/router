const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const BROADCAST = "router_broadcast";
const HASH_CHANGE = "router_hash_change";
const UNKNOWN = "router_unknown";
const EMPTY = "";

let bc: Broadcaster;
function setBroadcaster(broadcaster: Broadcaster) {
  bc = broadcaster;
}

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry<D>(type: HistoryModifier) {
  const location = getLocation();
  const state: BroadcastMessage<D> = {
    data: history.state?.data,
    title: document.title,
    location,
    type,
  };

  history.replaceState(state, EMPTY, location);
}

function push<D>(state: BroadcastMessage<D>) {
  const { title, location } = state;

  history.pushState(state, EMPTY, location);
  document.title = title;
  
  if (bc === undefined) return;
  bc.postMessage(history.state);
}

function onPopState(e: PopStateEvent) {
  if (e.state === null) replaceHistoryEntry(HASH_CHANGE);
  const { title } = history.state;
  if (title) {
    document.title = title;
  }

  if (bc === undefined) return;
  bc.postMessage(history.state);
}

function onPageShow() {
  if (history.state === null) replaceHistoryEntry(UNKNOWN);
  const {title} = history.state;
  if (title) {
    document.title = title;
  }

  if (bc === undefined) return;
  bc.postMessage(history.state);
}

window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);

export type { Broadcaster, BroadcastMessage };
export { BROADCAST, HASH_CHANGE, push, setBroadcaster, UNKNOWN };

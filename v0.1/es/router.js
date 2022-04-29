const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const BROADCAST = "router_broadcast";
const HASH_CHANGE = "router_hash_change";
const UNKNOWN = "router_unknown";
const bc = BroadcastChannel ? new BroadcastChannel("router") : window;
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
function onPopState(e) {
  if (e.state === null) replaceHistoryEntry(HASH_CHANGE);
  bc.postMessage(history.state);
}
function onPageShow() {
  if (history.state === null) replaceHistoryEntry(UNKNOWN);
  bc.postMessage(history.state);
}
window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);
export {
  BROADCAST as BROADCAST,
  HASH_CHANGE as HASH_CHANGE,
  push as push,
  UNKNOWN as UNKNOWN,
};

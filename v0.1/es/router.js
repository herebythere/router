const BROADCAST = "router_broadcast";
const HASH_CHANGE = "router_broadcast_hash_change";
const PAGE_SHOW = "router_broadcast_unknown";
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
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
let callback = () => {
};
function subscribe(cb) {
  callback = cb;
}
function onPopState(e) {
  console.log("on pop state");
  if (e.state === null) {
    replaceHistoryEntry(HASH_CHANGE);
  }
  callback(history.state);
}
function onPageShow() {
  console.log("on page show");
  if (history.state === null) {
    replaceHistoryEntry(PAGE_SHOW);
  }
  callback(history.state);
}
window.addEventListener(PAGESHOW, onPageShow);
window.addEventListener(POPSTATE, onPopState);
export { subscribe as subscribe };
export { BROADCAST as BROADCAST, HASH_CHANGE as HASH_CHANGE };

const URLBANG = `/urlbang`;
const RECEIVER = `/urlbang/receiver`;
const PUSH = "push";
const BACK = "back";
const HIDDEN = "hidden";
const HASHCHANGE = "hashchange";
const ENTRY = "entry";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const rc = new BroadcastChannel(RECEIVER);
const bc = new BroadcastChannel(URLBANG);
let urlbangIndex = 0;
const getWindowPathname = () =>
  window.location.href.substring(window.origin.length);
const replaceHistoryEntry = (kind, index) => {
  const pathname = getWindowPathname();
  const { title } = document;
  const state = {
    data: undefined,
    kind,
    index,
    pathname,
    title,
  };
  history.replaceState(state, title, pathname);
  return state;
};
rc.addEventListener("message", (e) => {
  if (document.visibilityState === HIDDEN) return;
  const { kind } = e.data;
  if (kind === BACK) {
    history.back();
    return;
  }
  let { pathname } = e.data;
  const currPathname = getWindowPathname();
  if (pathname === currPathname) return;
  urlbangIndex += 1;
  const { title, data } = e.data;
  const state = {
    index: urlbangIndex,
    kind: PUSH,
    data,
    title,
    pathname,
  };
  history.pushState(state, title, pathname);
  bc.postMessage(state);
});
window.addEventListener(POPSTATE, (e) => {
  if (e.state === null) {
    urlbangIndex += 1;
  }
  const state = e.state === null
    ? replaceHistoryEntry(HASHCHANGE, urlbangIndex)
    : e.state;
  urlbangIndex = state.index;
  bc.postMessage(state);
});
window.addEventListener(PAGESHOW, (e) => {
  const state = history.state === null
    ? replaceHistoryEntry(ENTRY, urlbangIndex)
    : history.state;
  urlbangIndex = state.index;
  bc.postMessage(state);
});

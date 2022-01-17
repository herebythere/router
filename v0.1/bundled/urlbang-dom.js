const DOMAIN = window.location.host;
const URLBANG = `${DOMAIN}:urlbang`;
const RECIEVER = `${DOMAIN}:urlbang__reciever`;
const PUSH = "push";
const BACK = "back";
const HIDDEN = "hidden";
const HASHCHANGE = "hashchange";
const ENTRY = "entry";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const rc = new BroadcastChannel(RECIEVER);
const bc = new BroadcastChannel(URLBANG);
let historyIndex = 0;
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
  history.replaceState(state, document.title, pathname);
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
  if (pathname === currPathname) {
    return;
  }
  historyIndex += 1;
  const { title, data } = e.data;
  const state = {
    index: historyIndex,
    data,
    title,
    pathname,
    kind: PUSH,
  };
  history.pushState(state, title, pathname);
  bc.postMessage(state);
});
window.addEventListener(POPSTATE, (e) => {
  if (e.state === null) {
    historyIndex += 1;
  }
  const state = e.state === null
    ? replaceHistoryEntry(HASHCHANGE, historyIndex)
    : e.state;
  historyIndex = state.index;
  bc.postMessage(state);
});
window.addEventListener(PAGESHOW, (e) => {
  const state = history.state === null
    ? replaceHistoryEntry(ENTRY, historyIndex)
    : history.state;
  historyIndex = state.index;
  bc.postMessage(state);
});

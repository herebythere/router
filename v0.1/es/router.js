const BROADCAST = "router_broadcast";
const POP = "router_pop";
const HASH_CHANGE = "router_broadcast_hash_change";
function getPathname() {
  return window.location.href.substring(window.origin.length);
}
function replaceHistoryEntry(type) {
  const pathname = getPathname();
  const { title } = document;
  const state = {
    data: undefined,
    type,
    pathname,
    title,
  };
  history.replaceState(state, title, pathname);
}
function back() {
  history.back();
}
function push(action) {
  const { type } = action;
  if (type !== BROADCAST) return;
  const { pathname } = action;
  if (pathname === getPathname()) return;
  const { title, data } = action;
  const state = {
    type,
    data,
    title,
    pathname,
  };
  history.pushState(state, title, pathname);
}
const reactions = {
  router_pop: back,
  router_broadcast: push,
};
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
class Router {
  callback;
  constructor(callback) {
    this.callback = callback;
    window.addEventListener(PAGESHOW, this.onPageShow);
    window.addEventListener(POPSTATE, this.onPopState);
  }
  disconnect() {
    window.removeEventListener(PAGESHOW, this.onPageShow);
    window.removeEventListener(POPSTATE, this.onPopState);
  }
  dispatch(action) {
    const reaction = reactions[action.type];
    if (reaction === undefined) return;
    reaction(action);
    this.callback({
      ...history.state,
    });
  }
  onPageShow = () => {
    if (history.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.callback({
      ...history.state,
    });
  };
  onPopState = (e) => {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.callback({
      ...history.state,
    });
  };
}
export { Router as Router };
export { BROADCAST as BROADCAST, HASH_CHANGE as HASH_CHANGE, POP as POP };

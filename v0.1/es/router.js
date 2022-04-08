const PUSH = "router_push";
const BACK = "router_back";
const HASH_CHANGE = "router_hash_change";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
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
function back(action) {
  if (action.type !== BACK) return;
  history.back();
}
function push(action) {
  const { type } = action;
  if (type !== PUSH) return;
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
  router_back: back,
  router_push: push,
};
class Router {
  ctx;
  constructor(callback) {
    this.ctx = {
      reactions,
      callback,
    };
    window.addEventListener(PAGESHOW, this.onPageShow);
    window.addEventListener(POPSTATE, this.onPopState);
  }
  disconnect() {
    window.removeEventListener(PAGESHOW, this.onPageShow);
    window.removeEventListener(POPSTATE, this.onPopState);
  }
  dispatch(action) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;
    reaction(action);
    this.ctx.callback({
      ...history.state,
    });
  }
  onPageShow = () => {
    if (history.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.ctx.callback({
      ...history.state,
    });
  };
  onPopState = (e) => {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.ctx.callback({
      ...history.state,
    });
  };
}
export { Router as Router };
export { HASH_CHANGE as HASH_CHANGE, PUSH as PUSH };

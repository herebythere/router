const PUSH = "router__push";
const BACK = "router__back";
const HASH_CHANGE = "router__hash_change";
const PERSONAL_ENTRY = "router__personal_entry";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
function getWindowPathname() {
  return window.location.href.substring(window.origin.length);
}
function replaceHistoryEntry(type) {
  const pathname = getWindowPathname();
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
  if (pathname === getWindowPathname()) return;
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
  back,
  push,
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
    this.ctx.callback(history.state);
  }
  onPageShow(e) {
    if (history.state === null) replaceHistoryEntry(PERSONAL_ENTRY);
    this.ctx.callback(history.state);
  }
  onPopState(e) {
    if (e.state === null) replaceHistoryEntry(HASH_CHANGE);
    this.ctx.callback(history.state);
  }
}
export { Router as Router };
export {
  HASH_CHANGE as HASH_CHANGE,
  PERSONAL_ENTRY as PERSONAL_ENTRY,
  PUSH as PUSH,
};

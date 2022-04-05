import type { DispatchMessage } from "./router_types.ts";

import { BACK, getWindowPathname, PUSH } from "./utils.ts";

function back<D>(action: DispatchMessage<D>) {
  if (action.type !== BACK) return;
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== PUSH) return;

  const { pathname } = action;
  if (pathname === getWindowPathname()) return;

  const { title, data } = action;

  const state = { type, data, title, pathname };
  history.pushState(state, title, pathname);
}

const reactions = {
  router_back: back,
  router_push: push,
};

export { reactions };

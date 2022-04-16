import type { DispatchMessage } from "./router_types.ts";

import { BROADCAST, getPathname } from "./utils.ts";

function back() {
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== BROADCAST) return;
  const { pathname } = action;
  if (pathname === getPathname()) return;

  const { title, data } = action;
  const state = { type, data, title, pathname };
  history.pushState(state, title, pathname);
}

const reactions = {
  router_pop: back,
  router_broadcast: push,
};

export { reactions };

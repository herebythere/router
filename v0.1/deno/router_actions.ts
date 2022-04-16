import type { DispatchMessage } from "./router_types.ts";

import { getPathname, POP, PUSH } from "./utils.ts";

function pop<D>(action: DispatchMessage<D>) {
  if (action.type !== POP) return;
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== PUSH) return;

  const { pathname } = action;
  if (pathname === getPathname()) return;

  const { title, data } = action;

  const state = { type, data, title, pathname };
  history.pushState(state, title, pathname);
}

const reactions = {
  router_pop: pop,
  router_push: push,
};

export { reactions };

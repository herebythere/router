import type { DispatchMessage } from "./router_types.ts";

import { BROADCAST, getLocation } from "./utils.ts";

function back() {
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== BROADCAST) return;
  const { location } = action;
  if (location === getLocation()) return;

  const { title, data } = action;
  const state = { type, data, title, location };
  history.pushState(state, title, location);
}

const reactions = {
  router_pop: back,
  router_broadcast: push,
};

export { reactions };

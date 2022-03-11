import type { DispatchMessage } from "./urlbang_types.ts";

import { BACK, getWindowPathname, PUSH } from "./utils.ts";

function back<D>(action: DispatchMessage<D>) {
  if (action.type !== BACK) return;
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== PUSH) return;

  const { pathname } = action;
  const currPathname = getWindowPathname();
  if (pathname === currPathname) return;

  const { title, data } = action;

  const state = { type, data, title, pathname };
  history.pushState(state, title, pathname);
}

const reactions = {
  back,
  push,
};

export { reactions };

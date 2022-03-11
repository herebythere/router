import type { DispatchMessage } from "./urlbang_types.ts";

import { getWindowPathname } from "./utils.ts";

function back<D>(action: DispatchMessage<D>) {
  if (action.type !== "back") return;
  history.back();
}

function push<D>(action: DispatchMessage<D>) {
  const { type } = action;
  if (type !== "push") return;

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

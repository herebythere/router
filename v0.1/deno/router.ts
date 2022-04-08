// brian taylor vann
// router

// This implementation leverages a browser's History API.
// The History API functions as a store of sorts.
//
// Rather than maintaining our own state, the histry api
// will be the store in the larger "router" pattern

import type {
  BroadcastMessage,
  Callback,
  DispatchMessage,
  RouterContext,
} from "./router_types.ts";

import {
  HASH_CHANGE,
  PAGESHOW,
  POPSTATE,
  replaceHistoryEntry,
} from "./utils.ts";
import { reactions } from "./router_actions.ts";

class Router<D = unknown> {
  private ctx: RouterContext<DispatchMessage<D>, BroadcastMessage<D>>;

  constructor(callback: Callback<BroadcastMessage<D>>) {
    this.ctx = { reactions, callback };

    window.addEventListener(PAGESHOW, this.onPageShow);
    window.addEventListener(POPSTATE, this.onPopState);
  }

  disconnect() {
    window.removeEventListener(PAGESHOW, this.onPageShow);
    window.removeEventListener(POPSTATE, this.onPopState);
  }

  dispatch(action: DispatchMessage<D>) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) return;

    reaction(action);
    this.ctx.callback({ ...history.state });
  }

  private onPageShow = () => {
    if (history.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.ctx.callback({ ...history.state });
  };

  private onPopState = (e: PopStateEvent) => {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.ctx.callback({ ...history.state });
  };
}

export { Router };

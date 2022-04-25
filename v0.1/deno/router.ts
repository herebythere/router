// brian taylor vann
// router

// This implementation leverages a browser's History API.
// The History API functions as a store of sorts.
//
// Rather than maintaining our own state, the histry api
// will be the store in the larger "router" pattern

import { BroadcastMessage, Callback, DispatchMessage } from "./router_types.ts";
import { HASH_CHANGE, PAGE_SHOW, replaceHistoryEntry } from "./utils.ts";
import { reactions } from "./router_actions.ts";

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

class Router<D = unknown> {
  private callback: Callback<BroadcastMessage<D>>;

  constructor(callback: Callback<BroadcastMessage<D>>) {
    this.callback = callback;

    window.addEventListener(PAGESHOW, this.onPageShow);
    window.addEventListener(POPSTATE, this.onPopState);
  }

  disconnect() {
    window.removeEventListener(PAGESHOW, this.onPageShow);
    window.removeEventListener(POPSTATE, this.onPopState);
  }

  dispatch(action: DispatchMessage<D>) {
    const reaction = reactions[action.type];
    if (reaction === undefined) return;

    reaction(action);
    this.callback({ ...history.state });
  }

  // is page show different enough?
  private onPageShow = () => {
    if (history.state === null) {
      replaceHistoryEntry(PAGE_SHOW);
    }

    this.callback(history.state);
  };

  private onPopState = (e: PopStateEvent) => {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }

    this.callback(history.state);
  };
}

export { Router };

// brian taylor vann
// router

// This implementation leverages a browser's History API.
// The History API functions as a store of sorts.
//
// Rather than maintaining our own state, the histry api
// will be the store in the larger "router" pattern

import {
  BroadcastMessage,
  Callback,
  DispatchMessage,
  ReactionMap,
  ReactionRecord,
} from "./router_types.ts";

import {
  HASH_CHANGE,
  PAGESHOW,
  POPSTATE,
  replaceHistoryEntry,
} from "./utils.ts";
import { reactions } from "./router_actions.ts";

class Router<D = unknown, B = unknown> {
  private callback: Callback<BroadcastMessage<B>>;

  constructor(
    callback: Callback<BroadcastMessage<B>>,
  ) {
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

  private onPageShow = () => {
    if (history.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.callback({ ...history.state });
  };

  private onPopState = (e: PopStateEvent) => {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }
    this.callback({ ...history.state });
  };
}

export { Router };

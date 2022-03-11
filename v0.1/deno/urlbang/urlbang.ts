// brian taylor vann
// router

// This implementation leverages a browser's History API.
// The History API functions as a store of sorts.
//
// Rather than maintaining our own state, the histry api
// will be the store in the larger "router" pattern

import type {
  BroadcastMessage,
  DispatchMessage,
  HistoryModifier,
  RouterContext,
  Subscription,
} from "./urlbang_types.ts";

import {
  HASH_CHANGE,
  PAGESHOW,
  PERSONAL_ENTRY,
  POPSTATE,
  replaceHistoryEntry,
} from "./utils.ts";
import { reactions } from "./urlbang_actions.ts";

class Router<D = unknown> {
  private ctx: RouterContext<BroadcastMessage<D>, DispatchMessage<D>>;

  constructor(subscription: Subscription<BroadcastMessage<D>>) {
    this.ctx = {
      reactions,
      subscription,
    };

    this.connect();
  }

  private connect() {
    window.addEventListener(PAGESHOW, this.onPageShow);
    window.addEventListener(POPSTATE, this.onPopState);
  }

  disconnect() {
    window.removeEventListener(PAGESHOW, this.onPageShow);
    window.removeEventListener(POPSTATE, this.onPopState);
  }

  dispatch(action: DispatchMessage<D>) {
    const reaction = this.ctx.reactions[action.type];
    if (reaction === undefined) {
      return;
    }

    reaction(action);

    this.ctx.subscription(history.state);
  }

  private onPageShow(e: PageTransitionEvent) {
    if (history.state === null) {
      replaceHistoryEntry(PERSONAL_ENTRY);
    }

    this.ctx.subscription(history.state);
  }

  private onPopState(e: PopStateEvent) {
    if (e.state === null) {
      replaceHistoryEntry(HASH_CHANGE);
    }

    this.ctx.subscription(history.state);
  }
}

export { Router };

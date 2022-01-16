// brian taylor vann

import type { DispatchMessage } from "./urlbang.types.ts";
import {
  BACK,
  FORWARD,
  HIDDEN,
  PUSH,
  RECIEVER,
  URLBANG,
} from "./urlbang.types.ts";

// URLBang DOM
//
// This module can only be accessed with a message
// through a Broadcast Channel.

const POPSTATE = "popstate";

const rc = new BroadcastChannel(RECIEVER);
const bc = new BroadcastChannel(URLBANG);

let historyIndex = -1;

rc.addEventListener(
  "message",
  (e: MessageEvent<DispatchMessage>) => {
    if (document.visibilityState === HIDDEN) return;

    const { direction } = e.data;
    if (direction === BACK) {
      history.back();
      return;
    }

    const { url } = e.data;
    const pathname = ("/" + url);
    if (pathname === window.location.pathname) {
      return;
    }

    historyIndex += 1;
    const { title, params } = e.data;
    const state = { index: historyIndex, params, title, url };

    history.pushState(state, title, url);

    bc.postMessage({ direction: PUSH, params, title, url });
  },
);

window.addEventListener(POPSTATE, (e: PopStateEvent) => {
  if (e.state === null) {
    bc.postMessage({ direction: BACK, title: "", url: "" });
    return;
  }

  const { params, title, url, index } = e.state;

  const direction = (historyIndex > index) ? BACK : FORWARD;

  historyIndex = index;

  bc.postMessage({ params, title, url, direction });
});

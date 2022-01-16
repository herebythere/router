// brian taylor vann

import type { Messages } from "./urlbang.types.ts";
import {
  BROADCAST,
  DISPATCH,
  DOMAIN,
  HIDDEN,
  POP,
  PUSH,
  RECIEVER,
  URLBANG,
} from "./urlbang.types.ts";

const POPSTATE = "popstate";

const rc = new BroadcastChannel(`${DOMAIN}:${URLBANG}_${RECIEVER}`);
const bc = new BroadcastChannel(`${DOMAIN}:${URLBANG}`);

rc.addEventListener(
  "message",
  (e: MessageEvent<Messages>) => {
    if (document.visibilityState === HIDDEN) return;

    const { data } = e;
    const { kind, direction } = data;
    if (kind !== DISPATCH) return;
    if (direction === POP) {
      history.back();
      return;
    }

    const { title, url, params } = data;
    const state = { params, title, url };

    history.pushState(state, title, url);
    bc.postMessage({ kind: BROADCAST, direction: PUSH, params, title, url });
  },
);

window.addEventListener(POPSTATE, (e: PopStateEvent) => {
  bc.postMessage({ ...e.state, kind: BROADCAST, direction: POP });
});

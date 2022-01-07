// brian taylor vann

import { URLBangMessageData } from "./urlbang.types.ts";

const HIDDEN = "hidden";
const DOMAIN = window.location.host;

const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);

bc.addEventListener(
  "message",
  (e: MessageEvent<URLBangMessageData<unknown>>) => {
    if (document.visibilityState === HIDDEN) return;

    const { data } = e;
    if (!data.broadcast) return;

    // prevent history cycles
    data.broadcast = false;

    const { title, url } = data;

    history.pushState(data, title, url);
    bc.postMessage(data);
  },
);

window.addEventListener("popstate", (e) => bc.postMessage(e.state));

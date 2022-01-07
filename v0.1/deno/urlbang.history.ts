// brian taylor vann

import { URLBangMessageData } from "./urlbang.types.ts";

type OnMessage = (e: MessageEvent<URLBangMessageData<unknown>>) => void;
type OnPopState = (e: PopStateEvent) => void;

const HIDDEN = "hidden";
const DOMAIN = window.location.host;

const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);

const onPopState: OnPopState = (e) => bc.postMessage(e.state);
const onMessage: OnMessage = (e) => {
  if (document.visibilityState === HIDDEN) return;

  const { data } = e;
  if (!data.broadcast) return;

  // prevent history cycles
  data.broadcast = false;

  history.pushState(data, data.title, data.url);
  bc.postMessage(data);
};

bc.addEventListener("message", onMessage);
window.addEventListener("popstate", onPopState);

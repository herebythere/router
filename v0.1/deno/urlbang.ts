// brian taylor vann

import type { BroadcastMessageData, HistoryModifier } from "./urlbang.types.ts";
import { BACK, PUSH, RECEIVER, URLBANG } from "./urlbang.types.ts";

type PushEntry<P = unknown> = (url: string, title: string, params?: P) => void;
type GoBack = () => void;
type Listener<P = unknown> = (
  e: MessageEvent<BroadcastMessageData<P>>,
) => void;
type RemoveListener = () => void;
type AddListener<P = unknown> = (
  listener: Listener<P>,
) => RemoveListener;

const rc = new BroadcastChannel(RECEIVER);
const bc = new BroadcastChannel(URLBANG);

const goBack: GoBack = () => rc.postMessage({ kind: BACK });
const pushEntry: PushEntry = (pathname, title, params) => {
  rc.postMessage({ kind: PUSH, pathname, title, params });
};

const addListener: AddListener = (listener) => {
  bc.addEventListener("message", listener);

  return () => bc.removeEventListener("message", listener);
};

export type { BroadcastMessageData, HistoryModifier, Listener };

export { addListener, goBack, pushEntry, RECEIVER, URLBANG };

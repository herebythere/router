// brian taylor vann

import type { BroadcastMessage, DispatchMessage } from "./urlbang.types.ts";
import {
  BROADCAST,
  DISPATCH,
  DOMAIN,
  POP,
  PUSH,
  RECIEVER,
  URLBANG,
} from "./urlbang.types.ts";

type Push<P = unknown> = (url: string, title: string, params: P) => void;
type Pop = () => void;
type Listener<P = unknown> = (
  e: MessageEvent<BroadcastMessage<P>>,
) => void;
type RemoveListener = () => void;
type AddListener<P = unknown> = (
  listener: Listener<P>,
) => RemoveListener;

const rc = new BroadcastChannel(`${DOMAIN}:${URLBANG}_${RECIEVER}`);
const bc = new BroadcastChannel(`${DOMAIN}:${URLBANG}`);

const pop: Pop = () => bc.postMessage({ kind: DISPATCH, direction: POP });
const push: Push = (url, title, params) =>
  rc.postMessage({ kind: DISPATCH, direction: PUSH, url, title, params });

const addListener: AddListener = (listener) => {
  const wrappedlistener: Listener = (e) => {
    if (e.data.kind !== BROADCAST) return;
    listener(e);
  };

  bc.addEventListener("message", wrappedlistener);

  return () => bc.removeEventListener("message", wrappedlistener);
};

export type { BroadcastMessage, DispatchMessage, Listener };

export { addListener, pop, push };

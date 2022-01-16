// brian taylor vann

import type { BroadcastMessage, Direction } from "./urlbang.types.ts";
import {
  BACK,
  FORWARD,
  HIDDEN,
  PUSH,
  RECIEVER,
  URLBANG,
} from "./urlbang.types.ts";

type PushEntry<P = unknown> = (url: string, title: string, params?: P) => void;
type GoBack = () => void;
type Listener<P = unknown> = (
  e: MessageEvent<BroadcastMessage<P>>,
) => void;
type RemoveListener = () => void;
type AddListener<P = unknown> = (
  listener: Listener<P>,
) => RemoveListener;

const rc = new BroadcastChannel(RECIEVER);
const bc = new BroadcastChannel(URLBANG);

const goBack: GoBack = () => rc.postMessage({ direction: BACK });
const pushEntry: PushEntry = (url, title, params) =>
  rc.postMessage({ direction: PUSH, url, title, params });

const addListener: AddListener = (listener) => {
  bc.addEventListener("message", listener);

  return () => bc.removeEventListener("message", listener);
};

export type { BroadcastMessage, Direction, Listener };

export {
  addListener,
  BACK,
  FORWARD,
  goBack,
  HIDDEN,
  PUSH,
  pushEntry,
  RECIEVER,
  URLBANG,
};

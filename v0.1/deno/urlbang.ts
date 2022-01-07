// brian taylor vann

import { URLBangMessageData } from "./urlbang.types.ts";

type Broadcast<P = unknown> = (message: URLBangMessageData<P>) => void;
type RecieverCallback<P = unknown> = (
  e: MessageEvent<URLBangMessageData<P>>,
) => void;
type RemoveCallback = () => void;
type AddRecieverCallback<P = unknown> = (
  callback: RecieverCallback<P>,
) => RemoveCallback;

const DOMAIN = window.location.host;
const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);

const broadcast: Broadcast = (message) => {
  message.broadcast = true;
  bc.postMessage(message);
};

const addRecieverCallback: AddRecieverCallback = (callback) => {
  const wrappedCallback: RecieverCallback = (e) => {
    if (e.data.broadcast) return;
    callback(e);
  };

  bc.addEventListener("message", wrappedCallback);

  return () => bc.removeEventListener("message", wrappedCallback);
};

export { addRecieverCallback, broadcast };

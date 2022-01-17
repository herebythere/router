// brian taylor vann

interface MessageParams<D> {
  pathname: string;
  title: string;
  data: D;
}

interface PopMessage {
  kind: "back";
}

type PushMessage<D = unknown> = {
  kind: "push";
} & MessageParams<D>;

type DispatchMessage<D = unknown> =
  | PopMessage
  | PushMessage<D>;

type HistoryModifier = "push" | "hashchange" | "entry";

type BroadcastMessageData<D = unknown> = {
  index: number;
  kind: HistoryModifier;
} & MessageParams<D>;

const DOMAIN = window.location.host;
const URLBANG = `${DOMAIN}:urlbang`;
const RECIEVER = `${DOMAIN}:urlbang__reciever`;
const PUSH = "push";
const FORWARD = "forward";
const BACK = "back";
const HIDDEN = "hidden";
const HASHCHANGE = "hashchange";
const ENTRY = "entry";

export type {
  BroadcastMessageData,
  DispatchMessage,
  HistoryModifier,
  PushMessage,
};

export { BACK, ENTRY, FORWARD, HASHCHANGE, HIDDEN, PUSH, RECIEVER, URLBANG };

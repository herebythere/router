// brian taylor vann

interface PopMessage {
  direction: "back";
}
interface MessageParams<P> {
  url: string;
  title: string;
  params: P;
}

type PushMessage<P = unknown> = {
  direction: "push";
} & MessageParams<P>;

type DispatchMessage<P = unknown> =
  | PopMessage
  | PushMessage<P>;

type Direction = "forward" | "back" | "push";

type BroadcastMessage<P = unknown> = {
  direction: Direction;
} & MessageParams<P>;

type StateParams<P = unknown> = {
  index: number;
} & MessageParams<P>;

const DOMAIN = window.location.host;
const URLBANG = `${DOMAIN}:urlbang`;
const RECIEVER = `${DOMAIN}:urlbang__reciever`;
const PUSH = "push";
const FORWARD = "forward";
const BACK = "back";
const HIDDEN = "hidden";

export type {
  BroadcastMessage,
  Direction,
  DispatchMessage,
  PushMessage,
  StateParams,
};

export { BACK, FORWARD, HIDDEN, PUSH, RECIEVER, URLBANG };

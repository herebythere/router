type Direction = "push" | "pop";

interface PopMessage {
  kind: "dispatch";
  direction: "pop";
}

interface PushMessage<P> {
  kind: "dispatch";
  direction: "push";
  url: string;
  title: string;
  params: P;
}

type DispatchMessage<P = unknown> =
  | PopMessage
  | PushMessage<P>;

interface BroadcastMessage<P = unknown> {
  kind: "broadcast";
  direction: Direction;
  url: string;
  title: string;
  params: P;
}

const URLBANG = "urlbang";
const RECIEVER = "reciever";
const BROADCAST = "broadcast";
const DISPATCH = "dispatch";
const PUSH = "push";
const POP = "pop";
const DOMAIN = window.location.host;

type Messages<P = unknown> = BroadcastMessage<P> | DispatchMessage<P>;

export type { BroadcastMessage, DispatchMessage, Messages };

export { BROADCAST, DISPATCH, DOMAIN, POP, PUSH, RECIEVER, URLBANG };

// brian taylor vann

interface PopMessage {
  type: "router_pop";
}

interface MessageParams<D> {
  location: string;
  title: string;
  data?: D;
}

type PushMessage<D = unknown> = {
  type: "router_broadcast";
} & MessageParams<D>;

type DispatchMessage<D = unknown> =
  | PopMessage
  | PushMessage<D>;

type HistoryModifier =
  | "router_broadcast"
  | "router_broadcast_unknown"
  | "router_broadcast_hash_change";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
} & MessageParams<D>;

type Callback<D> = (data: D) => void;

export type {
  BroadcastMessage,
  Callback,
  DispatchMessage,
  HistoryModifier,
  PopMessage,
  PushMessage,
};

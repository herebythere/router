// brian taylor vann

type HistoryModifier =
  | "router_broadcast"
  | "router_broadcast_unknown"
  | "router_broadcast_hash_change";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
  location: string;
  title: string;
  data?: D;
};

type Callback = <D>(data: BroadcastMessage<D>) => void;

export type { BroadcastMessage, Callback, HistoryModifier };

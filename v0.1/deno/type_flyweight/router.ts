type HistoryModifier =
  | "router_broadcast"
  | "router_unknown"
  | "router_hash_change";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
  location: string;
  title: string;
  data?: D;
};

type BroadcastMessage<D = unknown> = {
  location: string;
  title: string;
  data?: D;
};

interface BroadcasterInterface<D> {
  postMessage(message: BroadcastMessage<D>): void;
}


export type { BroadcasterInterface, BroadcastMessage }

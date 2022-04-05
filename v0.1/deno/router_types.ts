// brian taylor vann

interface MessageParams<D> {
  pathname: string;
  title: string;
  data?: D;
}

interface PopMessage {
  type: "router_back";
}

type PushMessage<D = unknown> = {
  type: "router_push";
} & MessageParams<D>;

type DispatchMessage<D = unknown> =
  | PopMessage
  | PushMessage<D>;

type HistoryModifier =
  | "router_push"
  | "router_hash_change";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
} & MessageParams<D>;

type Callback<D> = (data: D) => void;
type Reaction<A> = (action: A) => void;
type ReactionRecord<A> = Record<string, Reaction<A>>;

interface RouterContext<A, D> {
  reactions: ReactionRecord<A>;
  callback: Callback<D>;
}

export type {
  BroadcastMessage,
  Callback,
  DispatchMessage,
  HistoryModifier,
  PushMessage,
  ReactionRecord,
  RouterContext,
};

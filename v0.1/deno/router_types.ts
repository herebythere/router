// brian taylor vann

interface Action {
  type: string;
}

interface MessageParams<D> {
  pathname: string;
  title: string;
  data?: D;
}

interface PopMessage {
  type: "router_pop";
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
type ReactionMap<R> = {
  [K in keyof R]: R[K];
};

export type {
  BroadcastMessage,
  Callback,
  DispatchMessage,
  HistoryModifier,
  PopMessage,
  PushMessage,
  ReactionMap,
  ReactionRecord,
};

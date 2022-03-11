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
  type: "router__back";
}

type PushMessage<D = unknown> = {
  type: "router__push";
} & MessageParams<D>;

type DispatchMessage<D = unknown> =
  | PopMessage
  | PushMessage<D>;

type HistoryModifier =
  | "router__push"
  | "router__hash_change"
  | "router__personal_entry";

type BroadcastMessage<D = unknown> = {
  type: HistoryModifier;
} & MessageParams<D>;

type Subscription<T> = (message: T) => void;

type Reaction<A> = (action: A) => void;
type ReactionRecord<A> = Record<string, Reaction<A>>;

interface RouterContext<D, A> {
  reactions: ReactionRecord<A>;
  subscription: Subscription<D>;
}

export type {
  BroadcastMessage,
  DispatchMessage,
  HistoryModifier,
  PushMessage,
  ReactionRecord,
  RouterContext,
  Subscription,
};

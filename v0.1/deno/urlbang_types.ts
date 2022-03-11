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
  type: "back";
}

type PushMessage<D = unknown> = {
  type: "push";
} & MessageParams<D>;

type DispatchMessage<D = unknown> =
  | PopMessage
  | PushMessage<D>;

type HistoryModifier = "push" | "hash_change" | "personal_entry" | "branch";

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

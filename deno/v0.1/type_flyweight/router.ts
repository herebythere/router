interface MessageInterface<D = unknown> {
  location: string;
  title: string;
  data?: D;
}

interface BroadcasterInterface<D = unknown> {
  postMessage(message: MessageInterface<D>): void;
}

interface RouterInterface {
  setup(): void;
  teardown(): void;
  push<D>(message: MessageInterface<D>): void;
}

export type { BroadcasterInterface, MessageInterface, RouterInterface };

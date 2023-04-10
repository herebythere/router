interface MessageInterface<D = unknown> {
	type: "router";
  location: string;
  title: string;
  data?: D;
}

interface BroadcasterInterface<D = unknown> {
  postMessage(message: MessageInterface<D>): void;
}

interface RouterInterface {
  teardown(): void;
  push<D>(message: MessageInterface<D>): void;
}

export type { BroadcasterInterface, MessageInterface, RouterInterface };

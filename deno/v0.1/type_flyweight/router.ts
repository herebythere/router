type BroadcastInterface<D = unknown> = {
  location: string;
  title: string;
  data?: D;
};

interface BroadcasterInterface<D = unknown> {
  postMessage(message: BroadcastInterface<D>): void;
}

export type { BroadcasterInterface, BroadcastInterface };

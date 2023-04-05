interface BroadcastInterface<D = unknown> {
  location: string;
  title: string;
  data?: D;
};

interface BroadcasterInterface<D = unknown> {
  postMessage(broadcast: BroadcastInterface): void;
};

export type { BroadcastInterface, BroadcasterInterface };

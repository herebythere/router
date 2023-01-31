type BroadcastMessage<D = unknown> = {
  location: string;
  title: string;
  data?: D;
};

interface BroadcasterInterface<D = unknown> {
  postMessage(message: BroadcastMessage<D>): void;
}


export type { BroadcasterInterface, BroadcastMessage }

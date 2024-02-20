interface MinimalRouterState {
  title: string;
  location: string;
}

interface BroadcasterInterface {
  postMessage(message: unknown): void;
}

export type { BroadcasterInterface, MinimalRouterState };

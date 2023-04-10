import type {
  BroadcasterInterface,
  MessageInterface,
  RouterInterface,
} from "../type_flyweight/router.ts";

const EMPTY = "";

function replaceHistoryEntry() {
  const location = window.location.href.substring(window.origin.length);
  const state: MessageInterface = {
    data: this.prevHistoryState?.data,
    title: document.title,
    location,
  };

  history.replaceState(state, EMPTY, location);
}

class RouterDOM implements RouterInterface {
  prevHistoryState: MessageInterface = history.state;
  broadcaster: BroadcasterInterface;

  constructor(broadcaster: BroadcasterInterface) {
    this.broadcaster = broadcaster;
  }

  setup() {
    window.addEventListener("popstate", this.onHistoryChange);
    window.addEventListener("pageshow", this.onHistoryChange);
  }

  teardown() {
    window.removeEventListener("popstate", this.onHistoryChange);
    window.removeEventListener("pageshow", this.onHistoryChange);
  }

  onHistoryChange = () => {
    if (history.state === null) replaceHistoryEntry();

    document.title = history.state.title;
    this.prevHistoryState = history.state;

    this.broadcaster.postMessage(history.state);
  };

  push<D>(message: MessageInterface<D>) {
    history.pushState(message, EMPTY, message.location);
    document.title = message.title;
    this.prevHistoryState = message;

    this.broadcaster.postMessage(history.state);
  }
}

export { RouterDOM };

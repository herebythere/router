import type {
  BroadcasterInterface,
  MinimalRouterState,
} from "../type_flyweight/router.ts";

const ROUTER = "router";
const EMPTY = "";
// so much is reliant on lifecycle methods and on "history change"

function push<S extends MinimalRouterState>(
  broadcaster: BroadcasterInterface,
  message: S,
) {
  history.pushState(message, EMPTY, message.location);
  document.title = message.title;
  broadcaster.postMessage(history.state);
}

function onHistoryChange(broadcaster: BroadcasterInterface) {
  document.title = history.state.title;
  broadcaster.postMessage(history.state);
}

export { push, onHistoryChange };

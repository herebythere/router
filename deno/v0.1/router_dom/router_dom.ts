import type {
  BroadcasterInterface,
  MessageInterface,
} from "../type_flyweight/router.ts";

const ROUTER = "router";
const EMPTY = "";

let prevHistoryState: unknown = history.state;
let broadcaster: BroadcasterInterface = window;

function replaceHistoryEntry() {
  const location = window.location.href.substring(window.origin.length);
  const state: MessageInterface = {
  	type: ROUTER,
    title: document.title,
    data: undefined,
    location,
  };

  history.replaceState(state, EMPTY, location);
}

function onHistoryChange() {
  if (history.state === null) replaceHistoryEntry();

  document.title = history.state.title;
  prevHistoryState = history.state;

  broadcaster.postMessage(history.state);
};

function setBroadcaster(caster: BroadcasterInterface) {
	broadcaster = caster;
}

function push<D>(message: MessageInterface<D>) {
  history.pushState(message, EMPTY, message.location);
  document.title = message.title;

  broadcaster.postMessage(history.state);
}

window.addEventListener("popstate", onHistoryChange);
window.addEventListener("pageshow", onHistoryChange);

export { push };

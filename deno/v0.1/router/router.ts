import type {
  BroadcasterInterface,
  BroadcastMessage,
} from "../type_flyweight/router.ts";

const EMPTY = "";

let prevHistoryState: BroadcastMessage;
let bc: BroadcasterInterface;
function setBroadcaster(broadcaster: BroadcasterInterface) {
  bc = broadcaster;
}

function push<D>(state: BroadcastMessage<D>) {
  prevHistoryState = state;
  history.pushState(state, EMPTY, state.location);
  document.title = state.title;

  if (bc === undefined) return;
  bc.postMessage(history.state);
}

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry() {
  const location = getLocation();
  const state: BroadcastMessage = {
    data: prevHistoryState?.data,
    title: document.title,
    location,
  };

  history.replaceState(state, EMPTY, location);
}

function onPopState() {
  if (history.state === null) replaceHistoryEntry();

  prevHistoryState = history.state;
  const { title } = history.state;
  if (title) {
    document.title = title;
  }

  if (bc === undefined) return;
  bc.postMessage(history.state);
}

function onPageShow() {
  if (history.state === null) replaceHistoryEntry();
  prevHistoryState = history.state;

  if (bc === undefined) return;
  bc.postMessage(history.state);
}

window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);

export { push, setBroadcaster };

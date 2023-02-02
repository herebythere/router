import type {
  BroadcasterInterface,
  BroadcastInterface,
} from "../type_flyweight/router.ts";

const EMPTY = "";

let prevHistoryState: BroadcastInterface;
let bc: BroadcasterInterface;
function setBroadcaster(broadcaster: BroadcasterInterface) {
  bc = broadcaster;
}

function push<D>(state: BroadcastInterface<D>) {
  prevHistoryState = state;
  history.pushState(state, EMPTY, state.location);
  document.title = state.title;

  bc?.postMessage(history.state);
}

function getLocation(): string {
  console.log(window.location.href);
  console.log(window.origin);
  console.log(window.location.href.substring(window.origin.length));
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry() {
  const location = getLocation();
  const state: BroadcastInterface = {
    data: prevHistoryState?.data,
    title: document.title,
    location,
  };

  history.replaceState(state, EMPTY, location);
}

function onPopState() {
  if (history.state === null) replaceHistoryEntry();

  prevHistoryState = history.state;
  document.title = history.state.title;

  bc?.postMessage(history.state);
}

function onPageShow() {
  if (history.state === null) replaceHistoryEntry();
  prevHistoryState = history.state;

  bc?.postMessage(history.state);
}

window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);

// if loaded lazily call onpageshow
onPageShow();

export { push, setBroadcaster };

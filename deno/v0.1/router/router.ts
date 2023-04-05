import type {
  BroadcastInterface,
  BroadcasterInterface,
} from "../type_flyweight/router.ts";

const EMPTY = "";

let prevHistoryState: BroadcastInterface;
let broadcaster: BroadcasterInterface;

function setBroadcaster(updatedBroadcdaster: BroadcasterInterface) {
	broadcaster = updatedBroadcdaster;
}

function push<D>(state: BroadcastInterface<D>) {
  prevHistoryState = state;
  history.pushState(state, EMPTY, state.location);
  document.title = state.title;

	broadcaster?.postMessage(history.state);
}

function getLocation(): string {
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

	broadcaster?.postMessage(history.state);
}

function onPageShow() {
  if (history.state === null) replaceHistoryEntry();
  prevHistoryState = history.state;

	broadcaster?.postMessage(history.state);
}

window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);

// call onpageshow if loaded lazily 
onPageShow();

export { push, setBroadcaster };

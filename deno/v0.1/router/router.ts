import type {
  BroadcasterInterface,
  BroadcastMessage,
} from "../type_flyweight/router.ts";

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const EMPTY = "";

let prevHistoryState: BroadcastMessage;
let bc: BroadcasterInterface;
function setBroadcaster(broadcaster: BroadcasterInterface) {
  bc = broadcaster;
}

function push<D>(state: BroadcastMessage<D>) {
  const { title, location } = state;

  prevHistoryState = state;
  history.pushState(state, EMPTY, location);
  document.title = title;

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

window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);

export { push, setBroadcaster };

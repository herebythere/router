// brian taylor vann

import type {
  BroadcastMessageData,
  DispatchMessage,
  HistoryModifier,
} from "./urlbang.types.ts";
import {
  BACK,
  ENTRY,
  HASHCHANGE,
  HIDDEN,
  PUSH,
  RECIEVER,
  URLBANG,
} from "./urlbang.types.ts";

// URLBang DOM
//
// This module can only be accessed with a message
// through a Broadcast Channel.

type GetWindowPathname = () => string;
type CreateHistoryEntry = (
  kind: HistoryModifier,
  index: number,
) => BroadcastMessageData;

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

const rc = new BroadcastChannel(RECIEVER);
const bc = new BroadcastChannel(URLBANG);

let historyIndex = 0;

const getWindowPathname: GetWindowPathname = () =>
  window.location.href.substring(window.origin.length);

const replaceHistoryEntry: CreateHistoryEntry = (kind, index) => {
  const pathname = getWindowPathname();
  const { title } = document;

  const state: BroadcastMessageData = {
    data: undefined,
    kind,
    index,
    pathname,
    title,
  };

  history.replaceState(state, document.title, pathname);

  return state;
};

rc.addEventListener(
  "message",
  (e: MessageEvent<DispatchMessage>) => {
    if (document.visibilityState === HIDDEN) return;

    const { kind } = e.data;
    if (kind === BACK) {
      history.back();
      return;
    }

    let { pathname } = e.data;
    const currPathname = getWindowPathname();
    if (pathname === currPathname) {
      return;
    }

    historyIndex += 1;
    const { title, data } = e.data;
    const state = { index: historyIndex, data, title, pathname, kind: PUSH };

    history.pushState(state, title, pathname);

    bc.postMessage(state);
  },
);

window.addEventListener(POPSTATE, (e: PopStateEvent) => {
  if (e.state === null) {
    historyIndex += 1;
  }

  const state: BroadcastMessageData = (e.state === null)
    ? replaceHistoryEntry(HASHCHANGE, historyIndex)
    : e.state;

  historyIndex = state.index;

  bc.postMessage(state);
});

window.addEventListener(PAGESHOW, (e: PageTransitionEvent) => {
  const state: BroadcastMessageData = (history.state === null)
    ? replaceHistoryEntry(ENTRY, historyIndex)
    : history.state;

  historyIndex = state.index;

  bc.postMessage(state);
});

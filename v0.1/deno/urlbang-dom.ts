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
  RECEIVER,
  URLBANG,
} from "./urlbang.types.ts";

// URLBang DOM
//
// This module can only be accessed with a message
// through a Broadcast Channel at /urlbang/receiver

type GetWindowPathname = () => string;
type CreateHistoryEntry = (
  kind: HistoryModifier,
  index: number,
) => BroadcastMessageData;

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

const rc = new BroadcastChannel(RECEIVER);
const bc = new BroadcastChannel(URLBANG);

let urlbangIndex = 0;
let maxIndex = 0;

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

  history.replaceState(state, title, pathname);

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
    if (pathname === currPathname) return;

    urlbangIndex += 1;
    const { title, data } = e.data;
    const state = { index: urlbangIndex, kind: PUSH, data, title, pathname };

    history.pushState(state, title, pathname);

    bc.postMessage(state);
  },
);

window.addEventListener(POPSTATE, (e: PopStateEvent) => {
  if (e.state === null) {
    urlbangIndex += 1;
  }

  const state: BroadcastMessageData = (e.state === null)
    ? replaceHistoryEntry(HASHCHANGE, urlbangIndex)
    : e.state;

  urlbangIndex = state.index;

  bc.postMessage(state);
});

window.addEventListener(PAGESHOW, (e: PageTransitionEvent) => {
  const state: BroadcastMessageData = (history.state === null)
    ? replaceHistoryEntry(ENTRY, urlbangIndex)
    : history.state;

  urlbangIndex = state.index;

  bc.postMessage(state);
});

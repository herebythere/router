// brian taylor vann

import type { BroadcastMessage, Direction } from "./deps.ts";

import { BACK, FORWARD, HIDDEN, PUSH, URLBANG } from "./deps.ts";

// this could be it's own implementation from URLBang
// do we need history?

const bc = new BroadcastChannel(URLBANG);

let previousDirection: Direction | undefined;
let historyIndex = 0;
const historyEntries: Array<BroadcastMessage> = [];

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage>) => {
    if (document.visibilityState === HIDDEN) return;

    const { direction } = e.data;

    if (direction === PUSH) {
      if (previousDirection !== PUSH) {
        historyEntries.splice(historyIndex);
      }
      previousDirection = PUSH;
      historyIndex += 1;
      historyEntries.push(e.data);
    }

    if (direction === BACK) {
      previousDirection = BACK;
      historyIndex -= 1;
    }

    if (direction === FORWARD) {
      previousDirection = FORWARD;
      historyIndex += 1;
    }

    console.log(historyIndex);
    console.log(historyEntries);
  },
);

// pub sub

// webcomponent render

export { historyEntries, historyIndex };

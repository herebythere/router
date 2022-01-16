import type { BroadcastMessage } from "../../v0.1/deno/urlbang.ts";
import { addListener } from "../../v0.1/deno/urlbang.ts";

console.log("hello world");

const historyList = document.querySelector(".history-list");

const modifyHistoryList = (message: BroadcastMessage) => {
  const { title, url, direction } = message;
  if (historyList === null) {
    return;
  }

  if (
    historyList.firstChild !== null && direction === "pop" &&
    historyList.children.length > 0
  ) {
    historyList.removeChild(historyList.firstChild);
    return;
  }

  const historyEntry = document.createElement("li");
  const historyEntryText = document.createTextNode(`
    url: ${url}
    title: ${title}
  `);
  historyEntry.appendChild(historyEntryText);

  if (historyList.firstChild === null) {
    historyList.appendChild(historyEntry);
    return;
  }

  historyList.insertBefore(historyList.firstChild, historyEntry);
};

addListener((e: MessageEvent<BroadcastMessage>) => {
  if (document.visibilityState === "hidden") return;
  modifyHistoryList(e.data);
});

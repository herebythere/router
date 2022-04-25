import type { BroadcastMessage, HistoryModifier } from "./router_types.ts";

const BROADCAST = "router_broadcast";
const POP = "router_pop";
const HASH_CHANGE = "router_broadcast_hash_change";
const PAGE_SHOW = "router_broadcast_unknown";

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

function replaceHistoryEntry<D>(type: HistoryModifier) {
  const location = getLocation();
  const { title } = document;

  const state: BroadcastMessage<D> = {
    data: history.state?.data,
    type,
    location,
    title,
  };

  history.replaceState(state, title, location);
}

export {
  BROADCAST,
  getLocation,
  HASH_CHANGE,
  PAGE_SHOW,
  POP,
  replaceHistoryEntry,
};

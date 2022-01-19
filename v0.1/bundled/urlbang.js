const URLBANG = `/urlbang`;
const RECEIVER = `/urlbang/receiver`;
const PUSH = "push";
const BACK = "back";
const rc = new BroadcastChannel(RECEIVER);
const bc = new BroadcastChannel(URLBANG);
const goBack = () =>
  rc.postMessage({
    kind: BACK,
  });
const pushEntry = (pathname, title, params) => {
  rc.postMessage({
    kind: PUSH,
    pathname,
    title,
    params,
  });
};
const addListener = (listener) => {
  bc.addEventListener("message", listener);
  return () => bc.removeEventListener("message", listener);
};
export {
  addListener as addListener,
  goBack as goBack,
  pushEntry as pushEntry,
  RECEIVER as RECEIVER,
  URLBANG as URLBANG,
};

const URLBANG = "urlbang";
const RECIEVER = "reciever";
const BROADCAST = "broadcast";
const DOMAIN = window.location.host;
const DISPATCH = "dispatch";
const PUSH = "push";
const POP = "pop";
const rc = new BroadcastChannel(`${DOMAIN}:${URLBANG}_${RECIEVER}`);
const bc = new BroadcastChannel(`${DOMAIN}:${URLBANG}`);
const pop = () =>
  bc.postMessage({
    kind: DISPATCH,
    direction: POP,
  });
const push = (url, title, params) =>
  rc.postMessage({
    kind: DISPATCH,
    direction: PUSH,
    url,
    title,
    params,
  });
const addListener = (listener) => {
  const wrappedlistener = (e) => {
    if (e.data.kind !== BROADCAST) return;
    listener(e);
  };
  bc.addEventListener("message", wrappedlistener);
  return () => bc.removeEventListener("message", wrappedlistener);
};
export { addListener as addListener, pop as pop, push as push };

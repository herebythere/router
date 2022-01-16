const DOMAIN = window.location.host;
const URLBANG = `${DOMAIN}:urlbang`;
const RECIEVER = `${DOMAIN}:urlbang__reciever`;
const PUSH = "push";
const FORWARD = "forward";
const BACK = "back";
const HIDDEN = "hidden";
const rc = new BroadcastChannel(RECIEVER);
const bc = new BroadcastChannel(URLBANG);
const goBack = () =>
  rc.postMessage({
    direction: BACK,
  });
const pushEntry = (url, title, params) =>
  rc.postMessage({
    direction: PUSH,
    url,
    title,
    params,
  });
const addListener = (listener) => {
  bc.addEventListener("message", listener);
  return () => bc.removeEventListener("message", listener);
};
export {
  addListener as addListener,
  BACK as BACK,
  FORWARD as FORWARD,
  goBack as goBack,
  HIDDEN as HIDDEN,
  PUSH as PUSH,
  pushEntry as pushEntry,
  RECIEVER as RECIEVER,
  URLBANG as URLBANG,
};

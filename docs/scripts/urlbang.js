const DOMAIN = window.location.host;
const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);
const broadcast = (message) => {
  message.broadcast = true;
  bc.postMessage(message);
};
const addRecieverCallback = (callback) => {
  const wrappedCallback = (e) => {
    if (e.data.broadcast) return;
    callback(e);
  };
  bc.addEventListener("message", wrappedCallback);
  return () => bc.removeEventListener("message", wrappedCallback);
};
export { addRecieverCallback as addRecieverCallback, broadcast as broadcast };

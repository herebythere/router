const HIDDEN = "hidden";
const DOMAIN = window.location.host;
const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);
const onPopState = (e) => bc.postMessage(e.state);
const onMessage = (e) => {
  if (document.visibilityState === HIDDEN) return;
  const { data } = e;
  if (!data.broadcast) return;
  data.broadcast = false;
  history.pushState(data, data.title, data.url);
  bc.postMessage(data);
};
bc.addEventListener("message", onMessage);
window.addEventListener("popstate", onPopState);

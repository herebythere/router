const DOMAIN = window.location.host;
const rc = new BroadcastChannel(`${DOMAIN}:urlbang_reciever`);
const bc = new BroadcastChannel(`${DOMAIN}:urlbang_broadcast`);
window.addEventListener("popstate", (e) => {
  bc.postMessage(e.state);
});
rc.addEventListener("message", (e) => {
  const { state, title, url } = e.data;
  history.pushState(state, title, url);
  bc.postMessage(state);
});

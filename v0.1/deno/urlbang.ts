const DOMAIN = window.location.host;
const rc = new BroadcastChannel(`${DOMAIN}:urlbang_reciever`);
const bc = new BroadcastChannel(`${DOMAIN}:urlbang_broadcast`);

// can use postMessage as a fallback

window.addEventListener("popstate", (e: PopStateEvent) => {
  bc.postMessage(e.state);
});

rc.addEventListener("message", (e: MessageEvent) => {
  const { state, title, url } = e.data;

  history.pushState(state, title, url);
  bc.postMessage(state);
});

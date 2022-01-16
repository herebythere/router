const URLBANG = "urlbang";
const RECIEVER = "reciever";
const BROADCAST = "broadcast";
const DOMAIN = window.location.host;
const HIDDEN = "hidden";
const DISPATCH = "dispatch";
const PUSH = "push";
const POP = "pop";
const rc = new BroadcastChannel(`${DOMAIN}:${URLBANG}_${RECIEVER}`);
const bc = new BroadcastChannel(`${DOMAIN}:${URLBANG}`);
rc.addEventListener("message", (e) => {
  if (document.visibilityState === HIDDEN) return;
  const { data } = e;
  if (data.kind !== DISPATCH) return;
  if (data.direction === POP) {
    history.back();
    return;
  }
  const { title, url, params } = data;
  const state = {
    params,
    title,
    url,
  };
  history.pushState(state, title, url);
  bc.postMessage({
    kind: BROADCAST,
    direction: PUSH,
    params,
    title,
    url,
  });
});
window.addEventListener("popstate", (e) => {
  bc.postMessage({
    ...e.state,
    kind: BROADCAST,
    direction: POP,
  });
});

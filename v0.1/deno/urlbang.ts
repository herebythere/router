interface PushHistoryParams {
  url: string;
  title: string;
  kind: unknown;
  state: unknown;
}

type PushHistory = (params: PushHistoryParams) => void;

const DOMAIN = window.location.host;

// can use postMessage as a fallback
const rc = new BroadcastChannel(`${DOMAIN}:urlbang_reciever`);
const bc = new BroadcastChannel(`${DOMAIN}:urlbang_broadcast`);

window.addEventListener("popstate", (e: PopStateEvent) => {
  bc.postMessage(e.state);
});

rc.addEventListener("message", (e: MessageEvent) => {
  const { state, title, url } = e.data;

  history.pushState(state, title, url);
  bc.postMessage(state);
});

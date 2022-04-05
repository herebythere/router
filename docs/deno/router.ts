import type { DispatchMessage } from "./deps.ts";
import { Router } from "./deps.ts";

const bc = new BroadcastChannel("router-demo");
const rc = new BroadcastChannel("router-demo-dispatch");

const router = new Router((message) => {
  bc.postMessage(message);
});

rc.addEventListener("message", (message: MessageEvent<DispatchMessage>) => {
  router.dispatch(message.data);
});

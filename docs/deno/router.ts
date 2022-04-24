import type { DispatchMessage } from "./deps.ts";
import { Router } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
 */
const bc = new BroadcastChannel("router-demo");
const router = new Router((message) => {
  bc.postMessage(message);
});

/*
  another broadcast channel dispatches messages to a router
*/
const rc = new BroadcastChannel("router-demo-dispatch");
rc.addEventListener("message", (message: MessageEvent<DispatchMessage>) => {
  router.dispatch(message.data);
});

import { subscribe } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
 */
const bc = new BroadcastChannel("router-demo");
subscribe((message) => {
  console.log("router subscription");
  console.log(message);
  bc.postMessage(message);
});

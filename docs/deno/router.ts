import { setBroadcaster } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
 */

const bc = new BroadcastChannel("router-demo");
setBroadcaster(bc);

import type { BroadcasterInterface, MinimalRouterState } from "../type_flyweight/router.ts";

const ROUTER = "router";
const EMPTY = "";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

class Router<S extends MinimalRouterState> {
	broadcaster: BroadcasterInterface;
	
	constructor(
		broadcaster: BroadcasterInterface,
	) {
		this.broadcaster = broadcaster;
	}

	push(message: S) {
	  history.pushState(message, EMPTY, message.location);
		document.title = message.title;
		this.broadcaster.postMessage(history.state);
	}

	onHistoryChange() {
		document.title = history.state.title;
		this.broadcaster.postMessage(history.state);
	}
}

export { Router };

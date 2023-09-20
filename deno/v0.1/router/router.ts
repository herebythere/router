import type { BroadcasterInterface, MessageInterface } from "../type_flyweight/router.ts";

const ROUTER = "router";
const EMPTY = "";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";

function replaceHistoryEntry() {
	const location = window.location.href.substring(window.origin.length);
	const state: MessageInterface = {
	  type: ROUTER,
	  title: document.title,
	  location,
	};

	history.replaceState(state, EMPTY, location);
}

class Router<D> {
	broadcaster: BroadcasterInterface;
	
	constructor(broadcaster: BroadcasterInterface, initialState) {
		this.broadcaster = broadcaster;
		window.addEventListener(POPSTATE, this.onHistoryChange);
		window.addEventListener(PAGESHOW, this.onHistoryChange);
	}
	
	push(message: MessageInterface<D>) {
	  history.pushState(message, EMPTY, message.location);
		document.title = message.title;
		broadcaster.postMessage(history.state);
	}

	onHistoryChange = () => {
		if (history.state === null) replaceHistoryEntry();

		document.title = history.state.title;
		this.broadcaster.postMessage(history.state);
	}

	disconnect() {
		window.removeEventListener(POPSTATE, this.onHistoryChange);
		window.removeEventListener("domcontenedloaded", this.onHistoryChange);
	}
}

export { Router };

import type {
  MessageInterface,
  BroadcasterInterface,
  RouterInterface
} from "../type_flyweight/router.ts";

const EMPTY = "";


class DOMRouter implements RouterInterface {
	broadcaster: BroadcasterInterface;
	prevHistoryState: MessageInterface = history.state;
	
	constructor(broadcaster: BroadcasterInterface) {
		this.broadcaster = broadcaster;
	}
	
	replaceHistoryEntry() {
		const location = window.location.href.substring(window.origin.length);
		const state: MessageInterface = {
		  data: this.prevHistoryState["data"],
		  title: document.title,
		  location,
		};

		history.replaceState(state, EMPTY, location);
	}
	
	setup() {
		window.addEventListener("popstate", this.onPopState);
		window.addEventListener("pageshow", this.onPageShow);
		if (this.prevHistoryState === null) {
			this.replaceHistoryEntry();
		}
	}
	
	teardown() {
		window.removeEventListener("popstate", this.onPopState);
		window.removeEventListener("pageshow", this.onPageShow);
	}
	
	onPageShow() {
		if (history.state === null) this.replaceHistoryEntry();
		this.prevHistoryState = history.state;

		this.broadcaster.postMessage(history.state);
	}
	
	onPopState() {
		if (history.state === null) this.replaceHistoryEntry();

		document.title = history.state.title;
		this.prevHistoryState = history.state;

		this.broadcaster.postMessage(history.state);
	}
	
	push<D>(message: MessageInterface<D>) {
		history.pushState(message, EMPTY, message.location);
		document.title = message.title;
		this.prevHistoryState = message;

		this.broadcaster.postMessage(history.state);
	}
}


export { DOMRouter };

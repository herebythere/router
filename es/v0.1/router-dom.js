// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
<<<<<<<< HEAD:es/v0.1/router-dom.js
class RouterDOM {
========
class DOMRouter {
>>>>>>>> main:es/v0.1/router.js
    prevHistoryState = history.state;
    broadcaster;
    constructor(broadcaster){
        this.broadcaster = broadcaster;
        window.addEventListener("popstate", this.onHistoryChange);
        window.addEventListener("pageshow", this.onHistoryChange);
        if (this.prevHistoryState === null) {
            this.onHistoryChange();
        }
    }
    setup() {}
    teardown() {
        window.removeEventListener("popstate", this.onHistoryChange);
        window.removeEventListener("pageshow", this.onHistoryChange);
    }
    setup() {
        window.addEventListener("popstate", this.onHistoryChange);
        window.addEventListener("pageshow", this.onHistoryChange);
    }
    teardown() {
        window.removeEventListener("popstate", this.onHistoryChange);
        window.removeEventListener("pageshow", this.onHistoryChange);
    }
    replaceHistoryEntry() {
        const location = window.location.href.substring(window.origin.length);
        const state = {
            data: this.prevHistoryState?.data,
            title: document.title,
            location
        };
        history.replaceState(state, EMPTY, location);
    }
    onHistoryChange = (e)=>{
        if (history.state === null) this.replaceHistoryEntry();
        document.title = history.state.title;
        this.prevHistoryState = history.state;
        this.broadcaster?.postMessage(history.state);
    };
    push(message) {
        history.pushState(message, EMPTY, message.location);
        document.title = message.title;
        this.prevHistoryState = message;
        this.broadcaster.postMessage(history.state);
    }
}
export { RouterDOM as RouterDOM };

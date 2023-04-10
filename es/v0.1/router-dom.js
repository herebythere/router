// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const ROUTER = "router";
const EMPTY = "";
let prevHistoryState = history.state;
function replaceHistoryEntry() {
    const location = window.location.href.substring(window.origin.length);
    const state = {
        type: ROUTER,
        title: document.title,
        data: undefined,
        location
    };
    history.replaceState(state, EMPTY, location);
}
class RouterDOM {
    broadcaster;
    constructor(broadcaster){
        this.broadcaster = broadcaster;
        window.addEventListener("popstate", this.onHistoryChange);
        window.addEventListener("pageshow", this.onHistoryChange);
    }
    teardown() {
        window.removeEventListener("popstate", this.onHistoryChange);
        window.removeEventListener("pageshow", this.onHistoryChange);
    }
    onHistoryChange = ()=>{
        if (history.state === null) replaceHistoryEntry();
        document.title = history.state.title;
        prevHistoryState = history.state;
        this.broadcaster.postMessage(history.state);
    };
    push(message) {
        history.pushState(message, EMPTY, message.location);
        document.title = message.title;
        this.broadcaster.postMessage(history.state);
    }
}
export { RouterDOM as RouterDOM };

// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
class DOMRouter {
    broadcaster;
    prevHistoryState = history.state;
    constructor(broadcaster){
        this.broadcaster = broadcaster;
    }
    replaceHistoryEntry() {
        const location = window.location.href.substring(window.origin.length);
        const state = {
            data: this.prevHistoryState["data"],
            title: document.title,
            location
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
    push(message) {
        history.pushState(message, EMPTY, message.location);
        document.title = message.title;
        this.prevHistoryState = message;
        this.broadcaster.postMessage(history.state);
    }
}
const router = new DOMRouter(window);
router.setup();
function sendRandomHistory() {
    const location = `/${Math.floor(Math.random() * 1000)}`;
    router.push({
        data: Math.floor(Math.random() * 100),
        title: location,
        location
    });
}
const button = document.querySelector("button");
button.addEventListener("click", sendRandomHistory);
const section = document.querySelector("section");
function receiveHistory() {
    const paragraph = document.createElement("p");
    paragraph.textContent = JSON.stringify(history.state);
    section.insertBefore(paragraph, section.firstChild);
}
window.addEventListener("message", receiveHistory);

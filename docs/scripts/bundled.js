// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
class DOMRouter {
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

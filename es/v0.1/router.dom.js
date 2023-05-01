// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const ROUTER = "router";
const EMPTY = "";
const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
let prevHistoryState = history.state;
let broadcaster = window;
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
function onHistoryChange() {
    if (history.state === null) replaceHistoryEntry();
    document.title = history.state.title;
    prevHistoryState = history.state;
    broadcaster.postMessage(history.state);
}
function setBroadcaster(caster) {
    broadcaster = caster;
}
function push(message) {
    history.pushState(message, EMPTY, message.location);
    document.title = message.title;
    broadcaster.postMessage(history.state);
}
window.addEventListener(POPSTATE, onHistoryChange);
window.addEventListener(PAGESHOW, onHistoryChange);
export { push as push, setBroadcaster as setBroadcaster };
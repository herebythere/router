// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const POPSTATE = "popstate";
const PAGESHOW = "pageshow";
const EMPTY = "";
let prevHistoryState;
let bc;
function setBroadcaster(broadcaster) {
    bc = broadcaster;
}
function push(state) {
    const { title , location  } = state;
    prevHistoryState = state;
    history.pushState(state, EMPTY, location);
    document.title = title;
    if (bc === undefined) return;
    bc.postMessage(history.state);
}
function getLocation() {
    return window.location.href.substring(window.origin.length);
}
function replaceHistoryEntry() {
    const location = getLocation();
    const state = {
        data: prevHistoryState?.data,
        title: document.title,
        location
    };
    history.replaceState(state, EMPTY, location);
}
function onPopState() {
    if (history.state === null) replaceHistoryEntry();
    prevHistoryState = history.state;
    const { title  } = history.state;
    if (title) {
        document.title = title;
    }
    if (bc === undefined) return;
    bc.postMessage(history.state);
}
function onPageShow() {
    if (history.state === null) replaceHistoryEntry();
    prevHistoryState = history.state;
    if (bc === undefined) return;
    bc.postMessage(history.state);
}
window.addEventListener(POPSTATE, onPopState);
window.addEventListener(PAGESHOW, onPageShow);
export { push as push, setBroadcaster as setBroadcaster };

// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
let prevHistoryState;
let bc;
function setBroadcaster(broadcaster) {
    bc = broadcaster;
}
function push(state) {
    prevHistoryState = state;
    history.pushState(state, EMPTY, state.location);
    document.title = state.title;
    bc?.postMessage(history.state);
}
function getLocation() {
    console.log(window.location.href);
    console.log(window.origin);
    console.log(window.location.href.substring(window.origin.length));
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
    document.title = history.state.title;
    bc?.postMessage(history.state);
}
function onPageShow() {
    if (history.state === null) replaceHistoryEntry();
    prevHistoryState = history.state;
    bc?.postMessage(history.state);
}
window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);
onPageShow();
export { push as push, setBroadcaster as setBroadcaster };

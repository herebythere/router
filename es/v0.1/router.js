// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
let prevHistoryState;
let broadcaster;
function setBroadcaster(updatedBroadcdaster) {
    broadcaster = updatedBroadcdaster;
}
function push(state) {
    prevHistoryState = state;
    history.pushState(state, EMPTY, state.location);
    document.title = state.title;
    broadcaster?.postMessage(history.state);
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
    document.title = history.state.title;
    broadcaster?.postMessage(history.state);
}
function onPageShow() {
    if (history.state === null) replaceHistoryEntry();
    prevHistoryState = history.state;
    broadcaster?.postMessage(history.state);
}
window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);
onPageShow();
export { push as push, setBroadcaster as setBroadcaster };

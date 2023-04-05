// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const EMPTY = "";
let prevHistoryState;
function push(state) {
    prevHistoryState = state;
    history.pushState(state, EMPTY, state.location);
    document.title = state.title;
    window.dispatchEvent(new Event("hbt__router_event"));
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
    window.dispatchEvent(new Event("hbt__router_event"));
}
function onPageShow() {
    if (history.state === null) replaceHistoryEntry();
    prevHistoryState = history.state;
    window.dispatchEvent(new Event("hbt__router_event"));
}
window.addEventListener("popstate", onPopState);
window.addEventListener("pageshow", onPageShow);
onPageShow();
function sendRandomHistory() {
    const location = `/${Math.floor(Math.random() * 1000)}`;
    push({
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
window.addEventListener("hbt__router_event", receiveHistory);

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
function push(message) {
    history.pushState(message, EMPTY, message.location);
    document.title = message.title;
    broadcaster.postMessage(history.state);
}
window.addEventListener(POPSTATE, onHistoryChange);
window.addEventListener(PAGESHOW, onHistoryChange);
function sendRandomHistory() {
    const location = `/${Math.floor(Math.random() * 1000)}`;
    push({
        type: "router",
        title: location,
        data: Math.floor(Math.random() * 100),
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

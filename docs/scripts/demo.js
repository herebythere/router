const URLBANG = "urlbang";
const RECIEVER = "reciever";
const BROADCAST = "broadcast";
const DOMAIN = window.location.host;
new BroadcastChannel(`${DOMAIN}:${URLBANG}_${RECIEVER}`);
const bc = new BroadcastChannel(`${DOMAIN}:${URLBANG}`);
const addListener = (listener)=>{
    const wrappedlistener = (e)=>{
        if (e.data.kind !== BROADCAST) return;
        listener(e);
    };
    bc.addEventListener("message", wrappedlistener);
    return ()=>bc.removeEventListener("message", wrappedlistener)
    ;
};
console.log("hello world");
const historyList = document.querySelector(".history-list");
const modifyHistoryList = (message)=>{
    const { title , url , direction  } = message;
    if (historyList === null) {
        return;
    }
    if (historyList.firstChild !== null && direction === "pop" && historyList.children.length > 0) {
        historyList.removeChild(historyList.firstChild);
        return;
    }
    const historyEntry = document.createElement("li");
    const historyEntryText = document.createTextNode(`
    url: ${url}
    title: ${title}
  `);
    historyEntry.appendChild(historyEntryText);
    if (historyList.firstChild === null) {
        historyList.appendChild(historyEntry);
        return;
    }
    historyList.insertBefore(historyList.firstChild, historyEntry);
};
addListener((e)=>{
    if (document.visibilityState === "hidden") return;
    modifyHistoryList(e.data);
});

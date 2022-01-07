const HIDDEN = "hidden";
const DOMAIN = window.location.host;
const bc = new BroadcastChannel(`${DOMAIN}:urlbang`);
bc.addEventListener("message", (e)=>{
    if (document.visibilityState === HIDDEN) return;
    const { data  } = e;
    if (!data.broadcast) return;
    data.broadcast = false;
    const { title , url  } = data;
    history.pushState(data, title, url);
    bc.postMessage(data);
});
window.addEventListener("popstate", (e)=>bc.postMessage(e.state)
);

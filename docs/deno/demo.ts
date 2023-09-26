import { Router } from "./deps.ts";

function replaceHistoryEntry() {
	const location = window.location.href.substring(window.origin.length);
	const state: MessageInterface = {
	  type: ROUTER,
	  title: document.title,
	  location,
	};

	history.replaceState(state, EMPTY, location);
}

replaceHistoryEntry();

const bc = new BroadcastChannel("router_demo");
const router = new Router(bc);

function sendRandomHistory() {
  const location = `/${Math.floor(Math.random() * 1000)}`;
  router.push({
    title: location,
    location,
  });
}

const button = document.querySelector("button")!;
button.addEventListener("click", sendRandomHistory);

const section = document.querySelector("section")!;

function receiveHistory() {
  const paragraph = document.createElement("p")!;
  paragraph.textContent = JSON.stringify(history.state);

  section.insertBefore(paragraph, section.firstChild);
}

bc.addEventListener("message", receiveHistory);

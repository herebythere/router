import { push, setBroadcaster } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
*/

setBroadcaster(window);

function sendRandomHistory() {
  const location = `/${Math.floor(Math.random() * 1000)}`;
  push({
    data: Math.floor(Math.random() * 100),
    title: location,
    location,
  });
}

const button = document.querySelector("button")!;
button.addEventListener("click", sendRandomHistory);

const section = document.querySelector("section")!;

function receiveHistory(event: MessageEvent) {
  console.log(event);

  const paragraph = document.createElement("p")!;
  paragraph.textContent = JSON.stringify(event.data);

  section.insertBefore(paragraph, section.firstChild);
}

window.addEventListener("message", receiveHistory);

import { push } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
*/

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

function receiveHistory() {
  const paragraph = document.createElement("p")!;
  paragraph.textContent = JSON.stringify(history.state);

  section.insertBefore(paragraph, section.firstChild);
}

window.addEventListener("hbt__router_event", receiveHistory);

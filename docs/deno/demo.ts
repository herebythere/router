import { push } from "./deps.ts";

function sendRandomHistory() {
  const location = `/${Math.floor(Math.random() * 1000)}`;
  push({
    type: "router",
    title: location,
    data: Math.floor(Math.random() * 100),
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

window.addEventListener("message", receiveHistory);

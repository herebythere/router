import { DOMRouter } from "./deps.ts";

/*
  use broadcast channel dedicated to publishing state across contexts contexts
  like windows, tabs,
*/

const router = new DOMRouter(window);
router.setup();

function sendRandomHistory() {
  const location = `/${Math.floor(Math.random() * 1000)}`;
  router.push({
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

window.addEventListener("message", receiveHistory);

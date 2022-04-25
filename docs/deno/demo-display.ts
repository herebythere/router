// brian taylor vann

import type { BroadcastMessage } from "./deps.ts";

import { css, customElement, html, LitElement } from "./deps.ts";

/**
 * Display history like an old gameboy
 */

type Callback = (message: BroadcastMessage<string>) => void;

const HIDDEN = "hidden";

const bc = new BroadcastChannel("router-demo");

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage<string>>) => {
    if (document.visibilityState === HIDDEN) return;

    if (e.data === null) {
      console.log("null value found!");
      return;
    }

    callback(e.data);
  },
);

const styles = css`
	:host {
		font-family: monospace;
		border: 1px solid #efefef;
		display: flex;
		flex-direction: column;
		gap: 20px;
		height: 70vh;
		width: 50vw;
		max-height: 600px;
		max-width: 600px;
		overflow: auto;
	}
`;

// extremely cheap observer
let initialCallback = () => {};
let callback: Callback = initialCallback;

@customElement("demo-display")
class DemoDisplay extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <div class="container">
        <p>${document.title}</p>
        <p>${history.state?.data}</p>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    callback = (message: BroadcastMessage<string>) => {
      this.requestUpdate();
    };
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    callback = initialCallback;
  }
}

export { DemoDisplay };

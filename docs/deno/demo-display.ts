// brian taylor vann

import type { BroadcastMessage } from "./deps.ts";

import { css, customElement, html, LitElement, property } from "./deps.ts";

import { urlData } from "./faux_data.ts";

type Callback = (message: BroadcastMessage<string>) => void;

const HIDDEN = "hidden";

const bc = new BroadcastChannel("router-demo");

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage<string>>) => {
    if (document.visibilityState === HIDDEN) return;

    if (e.data === null) return;
    callback(e.data);
  },
);

const styles = css`
	:host {
		font-family: monospace;
    font-size: 28px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 400px;
		overflow: auto;
	}
  
  p {
    margin-top: 0;
  }
`;

// extremely cheap observer
let initialCallback: Callback = () => {};
let callback = initialCallback;

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

@customElement("demo-display")
class DemoDisplay extends LitElement {
  @property({ kind: String })
  path = "/";

  static styles = [styles];

  render() {
    let data = history.state?.data;
    if (data === undefined && getLocation() === this.path) {
      data = urlData["/"];
    }

    return html`
      <div class="container">
        <p>${data}</p>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    callback = () => this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    callback = initialCallback;
  }
}

export { DemoDisplay };

// brian taylor vann

import type { BroadcastMessage } from "./deps.ts";

import { css, customElement, html, LitElement } from "./deps.ts";

const HIDDEN = "hidden";

const bc = new BroadcastChannel("router-demo");

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage>) => {
    if (document.visibilityState === HIDDEN) return;

    if (e.data === null) {
      console.log("null value found!");
      return;
    }

    callback();
  },
);

const styles = css`
    h3, div, ul, li {
      box-sizing: border-box;
    }
    h3 {
      margin-top: 0;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li, input[type=button] {
      cursor: pointer;
    }

    .container {
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

    .unknown, .defined, .current {
      border: 1px solid transparent;
    }

    .unknown {
      color: #878787;
    }
    .unknown:hover, .defined:hover {
      background-color: #fcfcfc;
      border: 1px solid #ababab;
    }

    .defined {
      color: #434343;
    }
    .defined:hover {
      border: 1px solid #565656;
    }

    .current {
      color: #1e5bbd;
      background-color: #f5fbff;
    }
    .current:hover {
      background-color: #e3eeff;
    }
`;

// exremely cheap observer
let initialCallback = () => {};
let callback = initialCallback;

@customElement("demo-history")
class DemoHistory extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <h3>Demo History:</h3>
      <div class="container">
        <p>${document.title}</p>
        <p>${window.location.href.substring(window.origin.length)}</p>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    callback = () => {
      this.requestUpdate();
    };
  }

  disconnectedCallback() {
    callback = initialCallback;
  }
}

export { DemoHistory };

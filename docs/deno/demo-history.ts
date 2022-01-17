// brian taylor vann

import type { BroadcastMessageData, TemplateResult } from "./deps.ts";

import { css, html, LitElement, URLBANG } from "./deps.ts";

// this could be it's own implementation from URLBang
// do we need history?

type SubcriptionCallback = () => void;
type Subcribe = (callback: SubcriptionCallback) => number;
type Unsubcribe = (receipt: number) => void;
type Dispatch = () => void;
type CreateTemplates = () => Array<TemplateResult>;

const bc = new BroadcastChannel(URLBANG);

type HistoryKinds =
  | "back"
  | "forward"
  | "skip_back"
  | "skip_forward"
  | "entry"
  | "tail_entry";

const BACK = "back";
const FORWARD = "forward";
const SKIP_BACK = "skip_back";
const SKIP_FORWARD = "skip_forward";
const ENTRY = "entry";
const TAIL_ENTRY = "tail_entry";
const HIDDEN = "hidden";

let previousIndex = 0;
let direction: HistoryKinds | undefined;

// add another type here for "tracked_hashchanges"

const historyEntries: Array<BroadcastMessageData | null> = [];

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessageData>) => {
    if (document.visibilityState === HIDDEN) return;

    const { index, kind } = e.data;

    if (historyEntries[index] === undefined) {
      historyEntries[index] = e.data;
    }

    // manual hash change
    // hashchange

    const indexDelta = index - previousIndex;
    console.log("index delta:", indexDelta);

    // entry splice logic

    // if -1, forward
    // if 1, back

    // if < -1, jump backward
    // if > 1, jump forward
    //

    previousIndex = index;

    console.log(index, kind);
    console.log(historyEntries);
    dispatch();
  },
);

let subscriptions: Array<SubcriptionCallback> = [];
// pub sub
const subscribe: Subcribe = (callback: SubcriptionCallback) => {
  subscriptions.push(callback);
  return subscriptions.length - 1;
};

const unsubscribe: Unsubcribe = (receipt) => {
  const updatedSubscriptions = [];
  const receiptNum = receipt.toString();
  for (const index in subscriptions) {
    if (receiptNum === index) {
      continue;
    }
    updatedSubscriptions.push(subscriptions[index]);
  }

  subscriptions = updatedSubscriptions;
};

const dispatch: Dispatch = () => {
  for (const subscription of subscriptions) {
    subscription();
  }
};

// webcomponent render

const createHistoryListItems: CreateTemplates = () => {
  // unknown
  // current
  // defined
  const templates = [];
  for (const entry of historyEntries) {
    if (entry === undefined || entry === null) {
      templates.push(html`<li class="unknown"> unknown history state</li>`);
      continue;
    }

    const { index, pathname, title, kind } = entry;
    if (index === previousIndex) {
      templates.push(html`
                <li class="current">
                    <div>pathname: ${pathname}</div>
                    <div>title: ${title}</div>
                    <div>kind: ${kind}
                </li>
            `);
      continue;
    }

    templates.push(html`
            <li class="defined">
                <div>pathname: ${pathname}</div>
                <div>title: ${title}</div>
                <div>kind: ${kind}
            </li>
        `);
  }

  return templates;
};

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

    .container {
        border: 1px solid #efefef;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .unknown {
        color: #878787;
    }
    .unknown:hover {
        background-color: #efefef;
        outline: 1px solid #ababab;
    }

    .defined {
        color: #434343;
    }
    .defined:hover {
        background-color: #efefef;
        outline: 1px solid #565656;
    }

    .current {
        color: ##1e5bbd;
        outline: 1px solid #1e5bbd;
    }
    .current:hover {
        background-color: #e3eeff;
    }
`;

class DemoHistory extends LitElement {
  static styles = [styles];
  receipt: number | undefined;

  render() {
    const historyListItems = createHistoryListItems();

    return html`
            <h3>Demo History:</h3>
            <ul class="container">${historyListItems}</ul>
        `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.receipt = subscribe(() => this.requestUpdate());
  }

  disconnectedCallback() {
    if (this.receipt) {
      unsubscribe(this.receipt);
    }
    super.disconnectedCallback();
  }
}

customElements.define("demo-history", DemoHistory);

export { DemoHistory };

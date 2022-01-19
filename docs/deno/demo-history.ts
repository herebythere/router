// brian taylor vann

import type { BroadcastMessageData, TemplateResult } from "./deps.ts";

import { css, html, LitElement } from "./deps.ts";

type SubcriptionCallback = () => void;
type Subcribe = (callback: SubcriptionCallback) => number;
type Unsubcribe = (receipt: number) => void;
type Dispatch = () => void;
type CreateTemplates = () => Array<TemplateResult>;

interface RecordedHashchangeData {
  kind: "recorded_change";
  index: number;
  title: string;
  pathname: string;
  data: unknown;
}

interface UnknownData {
  kind: "unknown";
  index: number;
  title: string;
  pathname: string;
  data: unknown;
}

type HistoryMessageData =
  | BroadcastMessageData
  | RecordedHashchangeData
  | UnknownData;

// Intial values

const URLBANG = "/urlbang";
const RECEIVER = "/urlbang/receiver";
const HIDDEN = "hidden";

const fallbackMessageData: UnknownData = {
  kind: "unknown",
  index: -1,
  title: "title unknown",
  pathname: "pathname unknown",
  data: undefined,
};

const bc = new BroadcastChannel(URLBANG);
const rc = new BroadcastChannel(RECEIVER);

// Stateful / Mutative entries

const historyEntries: Array<HistoryMessageData | null> = [];
let subscriptions: Array<SubcriptionCallback> = [];
let previousIndex = 0;
let maxIndex = 0;

// Module functions

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessageData>) => {
    if (document.visibilityState === HIDDEN) return;

    const { index, kind } = e.data;

    if (historyEntries[index] === undefined) {
      historyEntries[index] = e.data;
    }

    if (
      kind === "hashchange" && historyEntries[index]?.kind !== "recorded_change"
    ) {
      historyEntries[index] = { ...e.data, kind: "recorded_change" };
      historyEntries.splice(index + 1);
    }

    maxIndex = Math.max(index, maxIndex);
    console.log("maxindex:", maxIndex);

    previousIndex = index;

    dispatch();
  },
);

rc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessageData>) => {
    if (document.visibilityState === HIDDEN) return;

    const { kind } = e.data;
    if (kind === "push" && previousIndex !== maxIndex) {
      historyEntries.splice(previousIndex + 1);
    }
  },
);

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

const createHistoryListItems: CreateTemplates = () => {
  const templates = [];
  let entryIndex = 0;
  while (entryIndex < historyEntries.length) {
    let entry = historyEntries[entryIndex];
    if (entry === null || entry === undefined) {
      entry = { ...fallbackMessageData, index: entryIndex };
    }

    let className = "defined";
    if (entry === undefined || entry === null) {
      className = "undefined";
    }
    const { index } = entry;
    if (index === previousIndex) {
      className = "current";
    }

    const { pathname, title } = entry;
    const entryDelta = entryIndex - previousIndex;

    templates.push(html`
      <li class="${className}" @pointerdown=${() => history.go(entryDelta)}>
        <div>${pathname}</div>
        <div>${title}</div>
      </li>
    `);

    entryIndex += 1;
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

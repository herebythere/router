// brian taylor vann

import { customElement } from "./deps.ts";
import type { BroadcastMessage, TemplateResult } from "./deps.ts";

import { css, html, LitElement } from "./deps.ts";

type SubcriptionCallback = () => void;
type Subcribe = (callback: SubcriptionCallback) => number;
type Unsubcribe = (receipt: number) => void;
type Dispatch = () => void;
type CreateTemplates = () => Array<TemplateResult>;

interface IndexData {
  index: number;
}

interface RecordedHashchangeData {
  type: "recorded_change";
  title: string;
  pathname: string;
  data?: IndexData;
}

interface UnknownData {
  type: "unknown";
  title: string;
  pathname: string;
  data?: IndexData;
}

type HistoryMessageData =
  | BroadcastMessage
  | RecordedHashchangeData
  | UnknownData;

// Intial values

const HIDDEN = "hidden";

const fallbackMessageData: UnknownData = {
  type: "unknown",
  title: "title unknown",
  pathname: "pathname unknown",
  data: {
    index: -1,
  },
};

const bc = new BroadcastChannel("router-demo");
const rc = new BroadcastChannel("router-demo-dispatch");

// Stateful / Mutative entries

const historyEntries: Array<HistoryMessageData | null> = [];
let subscriptions: Array<SubcriptionCallback> = [];
let previousIndex = 0;
let maxIndex = 0;

// Module functions

bc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage<IndexData>>) => {
    if (document.visibilityState === HIDDEN) return;

    const { data } = e.data;

    const index = data?.index ?? -1;
    if (historyEntries[index] === undefined) {
      historyEntries[index] = e.data;
    }

    const { type } = e.data;
    if (
      type === "router_hash_change" &&
      historyEntries[index]?.type !== "recorded_change"
    ) {
      historyEntries[index] = { ...e.data, type: "recorded_change" };
      historyEntries.splice(index + 1);
    }

    maxIndex = Math.max(index, maxIndex);
    console.log("maxindex:", maxIndex);

    previousIndex = index;

    // dispatch();
  },
);

rc.addEventListener(
  "message",
  (e: MessageEvent<BroadcastMessage>) => {
    if (document.visibilityState === HIDDEN) return;
    console.log("router-dispatch:", e);

    const { type } = e.data;
    if (type === "router_push" && previousIndex !== maxIndex) {
      historyEntries.splice(previousIndex + 1);
    }
  },
);

// const subscribe: Subcribe = (callback: SubcriptionCallback) => {
//   subscriptions.push(callback);
//   return subscriptions.length - 1;
// };

// const unsubscribe: Unsubcribe = (receipt) => {
//   const updatedSubscriptions = [];
//   const receiptNum = receipt.toString();
//   for (const index in subscriptions) {
//     if (receiptNum === index) {
//       continue;
//     }
//     updatedSubscriptions.push(subscriptions[index]);
//   }

//   subscriptions = updatedSubscriptions;
// };

// const dispatch: Dispatch = () => {
//   for (const subscription of subscriptions) {
//     subscription();
//   }
// };

// const createHistoryListItems: CreateTemplates = () => {
//   const templates = [];
//   let entryIndex = 0;
//   while (entryIndex < historyEntries.length) {
//     let entry = historyEntries[entryIndex];
//     if (entry === null || entry === undefined) {
//       entry = { ...fallbackMessageData, index: entryIndex };
//     }

//     let className = "defined";
//     if (entry === undefined || entry === null) {
//       className = "undefined";
//     }
//     const { index } = entry;
//     if (index === previousIndex) {
//       className = "current";
//     }

//     const { pathname, title } = entry;
//     const entryDelta = entryIndex - previousIndex;

//     templates.push(html`
//       <li class="${className}" @pointerdown=${() => history.go(entryDelta)}>
//         <div>${pathname}</div>
//         <div>${title}</div>
//       </li>
//     `);

//     entryIndex += 1;
//   }

//   return templates;
// };

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

@customElement("demo-history")
class DemoHistory extends LitElement {
  static styles = [styles];
  receipt: number | undefined;

  render() {
    // const historyListItems = createHistoryListItems();

    return html`
        <h3>Demo History:</h3>
        <ul class="container">${[]}</ul>
    `;
  }

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.receipt = subscribe(() => this.requestUpdate());
  // }

  // disconnectedCallback() {
  //   if (this.receipt) {
  //     unsubscribe(this.receipt);
  //   }
  //   super.disconnectedCallback();
  // }
}

export { DemoHistory };

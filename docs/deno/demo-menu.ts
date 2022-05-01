import { urlData, urlTitles } from "./faux_data.ts";

import {
  BROADCAST,
  css,
  customElement,
  html,
  LitElement,
  property,
  push,
} from "./deps.ts";

const styles = css`
  :host, .direction-container, .location-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  input {
    border: 2px solid #eee;
    background-color: #fff;
    box-sizing: border-box;
    padding: 4px 8px;
    font-family: monospace;
    font-weight: 700;
    cursor: pointer;
  }

  input:active {
    background-color: #000;
    color: #fff;
  }

  input:hover, input:focus {
    border: 2px solid #000;
  }

  .direction-container {
    align-items: flex-start;
  }

  .location-container {
    flex-direction: column;
  }
`;

function getLocation(): string {
  return window.location.href.substring(window.origin.length);
}

@customElement("demo-menu")
class DemoMenu extends LitElement {
  @property({ kind: String })
  path = "/";

  static styles = [styles];

  render() {
    const path = this.path;

    const root = path;
    const dogs = path + "#/dogs";
    const cats = path + "#/cats";
    const pigs = path + "#/pigs";

    return html`
      <div class="direction-container">
        <input type="button" name="back" value="<--" @pointerup="${this.onBack}"></input>
        <input type="button" name="${root}" value="/" @pointerup="${this.onPointer}"></input>
      </div>

      <div class="location-container">
        <input type="button" name="${dogs}" value="#/dog"  @pointerup="${this.onPointer}">
        <input type="button" name="${cats}" value="#/cat" @pointerup="${this.onPointer}">
        <input type="button" name="${pigs}" value="#/pig" @pointerup="${this.onPointer}">
      </div>
    `;
  }

  onBack() {
    history.back();
  }

  onPointer(e: PointerEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { name } = e.target;
    const nameWithoutPrefix = name.substring(this.path.length - 1);
    const title = urlTitles[nameWithoutPrefix];
    const data = urlData[nameWithoutPrefix];

    console.log("demo-menu:");
    console.log("nameWithoutPrefix", nameWithoutPrefix);
    console.log("title:", title);
    console.log("data:", data);

    push({
      type: BROADCAST,
      data,
      title,
      location: name,
    });
  }
}

export { DemoMenu };

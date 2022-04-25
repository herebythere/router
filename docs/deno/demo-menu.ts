import {
  BROADCAST,
  css,
  customElement,
  html,
  LitElement,
  property,
  pushState,
} from "./deps.ts";

/**
 * Buttons should pop
 * instantaneous press
 * but slow release
 */

const urlTitles: Record<string, string> = {
  "/#/home": "home page",
  "/#/dogs": "dogs",
  "/#/cats": "cats",
  "/#/pigs": "pigs",
};

const urlData: Record<string, string> = {
  "/#/home": "home page",
  "/#/dogs": "dogs like magic tricks",
  "/#/cats": "cats are grand hunters",
  "/#/pigs": "pigs are curious, often playful",
};

const styles = css`
  input {
    border: 2px solid #000;
    background-color: #fff;
    box-sizing: border-box;
    padding: 4px 8px;
    font-family: monospace;
    font-weight: 700;
    cursor: pointer;
  }

  .container {
    border: 1px solid #efefef;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

@customElement("demo-menu")
class DemoMenu extends LitElement {
  @property({ kind: String })
  path = "";

  static styles = [styles];

  render() {
    const path = this.path;

    const home = path + "/";
    const dogs = path + "/#/dogs";
    const cats = path + "/#/cats";
    const pigs = path + "/#/pigs";

    return html`\
      <input type="button" name="back" value="back" @pointerup="${this.onBack}">

      <div class="container">
        <input type="button" name="${home}" value="home" @pointerup="${this.onPointer}">
        <input type="button" name="${dogs}" value="dog"  @pointerup="${this.onPointer}">
        <input type="button" name="${cats}" value="cat" @pointerup="${this.onPointer}">
        <input type="button" name="${pigs}" value="pig" @pointerup="${this.onPointer}">
      </div>
    `;
  }

  onBack() {
    history.back();
  }

  onPointer(e: PointerEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { name } = e.target;
    const nameWithoutPrefix = name.substring(this.path.length);
    const title = urlTitles[nameWithoutPrefix];
    const data = urlData[nameWithoutPrefix];

    pushState({
      type: BROADCAST,
      data,
      title,
      location: name,
    });
  }
}

export { DemoMenu };

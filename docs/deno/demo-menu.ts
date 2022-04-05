import {
  css,
  customElement,
  HASH_CHANGE,
  html,
  LitElement,
  property,
  PUSH,
} from "./deps.ts";

const urlData: Record<string, string> = {
  "/#/home": "home page",
  "/#/about": "about this page",
  "/#/projects": "projects created by the author",
  "/#/articles": "articles written by the author",
};

const rc = new BroadcastChannel("router-demo-dispatch");

const styles = css`
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
    const { path } = this;

    const home = path + "/#/home";
    const about = path + "/#/about";
    const projects = path + "/#/projects";
    const articles = path + "/#/articles";

    return html`
      <div class="container">
        <input type="button" name="${home}" value="home" @pointerup="${this.onPointer}">
        <input type="button" name="${about}" value="about"  @pointerup="${this.onPointer}">
        <input type="button" name="${projects}" value="projects" @pointerup="${this.onPointer}">
        <input type="button" name="${articles}" value="articles" @pointerup="${this.onPointer}">
      </div>
    `;
  }

  onPointer(e: PointerEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { name } = e.target;

    const nameWithoutPrefix = name.substring(this.path.length);
    const title = urlData[nameWithoutPrefix];

    rc.postMessage({
      type: PUSH,
      pathname: name,
      title,
    });
  }
}

export { DemoMenu };

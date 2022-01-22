import { css, html, LitElement, property, pushEntry } from "./deps.ts";

const urlData: Record<string, string> = {
  "/#/home": "home page",
  "/#/about": "about this page",
  "/#/projects": "projects created by the author",
  "/#/articles": "articles written by the author",
};

const styles = css`
  .container {
    border: 1px solid #efefef;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

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
        <input type="button" name="${home}" value="home" @pointerdown="${this.onPointer}">
        <input type="button" name="${about}" value="about"  @pointerdown="${this.onPointer}">
        <input type="button" name="${projects}" value="projects" @pointerdown="${this.onPointer}">
        <input type="button" name="${articles}" value="articles" @pointerdown="${this.onPointer}">
      </div>
    `;
  }

  onPointer(e: PointerEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { path } = this;
    const { name } = e.target;

    const nameWithoutPrefix = name.substring(path.length);
    const title = urlData[nameWithoutPrefix];

    pushEntry(name, title);
  }
}

customElements.define("demo-menu", DemoMenu);

export { DemoMenu };

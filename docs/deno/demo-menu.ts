import { css, html, LitElement, pushEntry } from "./deps.ts";

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
  static styles = [styles];
  render() {
    return html`
      <div class="container">
        <input type="button" name="/#/home" value="home" @pointerdown="${this.onPointerDown}">
        <input type="button" name="/#/about" value="about"  @pointerdown="${this.onPointerDown}">
        <input type="button" name="/#/projects" value="projects" @pointerdown="${this.onPointerDown}">
        <input type="button" name="/#/articles" value="articles" @pointerdown="${this.onPointerDown}">
      </div>
    `;
  }

  onPointerDown(e: PointerEvent) {
    if (!(e.target instanceof HTMLInputElement)) return;

    const { name } = e.target;
    const title = urlData[name];

    pushEntry(name, title);
  }
}

customElements.define("demo-menu", DemoMenu);

export { DemoMenu };

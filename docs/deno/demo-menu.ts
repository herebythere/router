import { html, LitElement, pushEntry } from "./deps.ts";

const urlData: Record<string, string> = {
  home: "home page",
  about: "about this page",
  projects: "projects created by the author",
  articles: "articles written by the author",
};

class DemoMenu extends LitElement {
  render() {
    return html`
            <div>
                <input type="button" name="home" value="home" @pointerdown="${this.onPointerDown}">
                <input type="button" name="about" value="about"  @pointerdown="${this.onPointerDown}">
                <input type="button" name="projects" value="projects" @pointerdown="${this.onPointerDown}">
                <input type="button" name="articles" value="articles" @pointerdown="${this.onPointerDown}">
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

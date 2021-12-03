import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Realty Website — Careers");
  }

  async getHtml() {
    return `
      <div class="container">
        <p>Hello, World!</p>
      </div>
  `;
  }
}

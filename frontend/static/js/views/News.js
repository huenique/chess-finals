import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("News - Realty Website");
  }

  async getHtml() {
    return `
      <div class="container">
        <p>Hello, World!</p>
      </div>
  `;
  }
}

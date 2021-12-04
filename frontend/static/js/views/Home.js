import { slideText } from "../helpers/text.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Realty Website");
  }

  async generateLabels() {
    var labels = [
      "find your dream home",
      "unearth new lands",
      "discover townhouses",
      "locate commercial establishments",
    ];

    var slideObjects = [];

    for (var i = 0; i < labels.length; i++) {
      var slideObject = `
        <div class="slide-object fade">
          <div class="text-label text-center text-white fw-bold">${labels[i]}</div>
        </div>
      `;
      slideObjects.push(slideObject);
    }

    return slideObjects;
  }

  async getHtml() {
    var labels = await this.generateLabels();

    return `
    <div class="container">
      ${labels.join("\r\n")}
      <div class="splashscreen">
        <label class="search-field">
          <input class="m-2 search-placeholder" type="text" placeholder="City, Neighbourhood, Address, ZIP Code" aria-label="Search" placeholder="&nbsp;"/>
          <button class="btn btn-light">Search</button>
        </label>
      </div>
    </div>
    `;
  }

  async drawEffects() {
    await slideText();
  }
}

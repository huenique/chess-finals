import { slideText } from "../helpers/text.js";
import { sleep } from "../helpers/utils.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Realty Website");
  }

  /*
  Effects listener

  Some effects may break during page navigation, mostly due to functions not
  executing on time. If elements are missing essential attributes, we assume
  they broke. This will automatically recall those effects.
  */
  async checkDrawEffects() {
    while (true) {
      let slideObjects = document.getElementsByClassName("slide-object");
      for (let i = 0; i < slideObjects.length; i++) {
        if (!slideObjects[i].hasAttribute("style")) {
          await slideText();
        }
      }
      await sleep(1000);
    }
  }

  async generateLabels() {
    var labels = [
      "find your dream home",
      "unearth new lands",
      "discover townhouses",
      "locate establishments",
    ];

    var slideObjects = [];

    for (let i = 0; i < labels.length; i++) {
      let slideObject = `
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
    await this.checkDrawEffects();
  }
}

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
  executing on time. This a block of code checks if elements are broken by
  looking at their attributes and performs resets if necessary.
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
    let labels = [
      "find your dream home",
      "unearth new lands",
      "discover townhouses",
      "locate establishments",
    ];

    let slideObjects = [];

    for (let i = 0; i < labels.length; i++) {
      let slideObject = `
        <div class="slide-object">
          <div class="text-label text-center text-white fw-bold">${labels[i]}</div>
        </div>
      `;
      slideObjects.push(slideObject);
    }

    return slideObjects;
  }

  async displayResults() {
    let searchBtn = document.getElementById("search-btn");
    let searchModal = document.getElementById("search-modal");

    searchBtn.addEventListener("click", function () {
      let searchValue = document.getElementById("search-value");
      if (searchValue.value !== "") {
        let _searchModal = new bootstrap.Modal(
          document.getElementById("search-modal"),
        );
        _searchModal.show();
      }
    });

    searchModal.addEventListener("shown.bs.modal", function () {
      let results = document.getElementById("results-group");
      let resultImgs = [];

      for (let i = 0; i < 5; i++) {
        resultImgs.push(`
          <li class="search-result-list list-group-item d-flex">
            <p class="result-preview">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <img class="result-thumbnail" src="https://picsum.photos/640/480?random=${i}" alt="result-img">
          </li>
        `);
      }

      results.innerHTML = `
        <ul class="list-group list-group-flush">
          ${resultImgs.join("\r\n")}
        </ul>
      `;
    });
  }

  async getHtml() {
    let labels = await this.generateLabels();

    return `
    <div class="container">
      <div class="modal fade" id="search-modal" tabindex="-1" aria-labelledby="search-result" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="search-result">Result: </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="results-group" class="modal-body">
              ...
            </div>
          </div>
        </div>
      </div>
      ${labels.join("\r\n")}
      <div class="splashscreen">
        <form name="search-form" onsubmit="return false">
          <label class="search-field">
            <input class="m-2 search-placeholder" id="search-value" type="text" placeholder="City, Neighbourhood, Address, ZIP Code" aria-label="Search" placeholder="&nbsp;" required/>
            <button class="btn btn-light" id="search-btn">Search</button>
          </label>
        </form>
      </div>

    </div>
    `;
  }

  async drawEffects() {
    await this.displayResults();
    await slideText();

    // This should be called last as it runs a loop
    await this.checkDrawEffects();
  }
}

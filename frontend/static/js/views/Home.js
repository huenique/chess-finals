import { slideText } from "../helpers/text.js";
import { getRandomInt, loadIcons, sleep } from "../helpers/utils.js";
import AbstractView from "./AbstractView.js";

var drawingEffects = false;
var avatarIds = [];

// Prevent page from making multiple api calls to get profile avatars
for (var i = 0; i < 7; i++) {
  avatarIds.push(await getRandomInt(1, 69));
}

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

  async generateProfiles() {
    let names = [
      "Olufunmilayo Gray",
      "Toby Aleks",
      "Chikelu Ilham",
      "Logan Anh",
      "Lorrin Sheridan",
      "Leighton Ade",
      "Issy Suman",
    ];
    let avatars = [];

    for (let i = 0; i < 7; i++) {
      avatars.push(`https://i.pravatar.cc/200?img=${avatarIds[i]}`);
    }

    return [names, avatars];
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

  async generateReviews() {
    let reviews = [];
    let [names, avatars] = await this.generateProfiles();

    for (let i = 0; i < 7; i++) {
      let review = `
        <li class="splide__slide">
          <div class="review-card card mb-5">
            <div class="row g-0 align-items-center">
              <div class="col-md-4">
                <img src="${
                  avatars[i]
                }" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="review-content-title card-title">${names[i]}</h5>
                  <p class="review-content-body card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor ex ut libero imperdiet, at posuere urna eleifend.
                  </p>
                  <p class="card-text">${`<i data-feather="star"></i>`.repeat(
                    await getRandomInt(1, 5)
                  )}</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      `;
      reviews.push(review);
    }

    return reviews;
  }

  async displayResults() {
    let searchBtn = document.getElementById("search-btn");
    let searchModal = document.getElementById("search-modal");

    searchBtn.addEventListener("click", function () {
      let searchValue = document.getElementById("search-value");
      if (searchValue.value !== "") {
        let _searchModal = new bootstrap.Modal(
          document.getElementById("search-modal")
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

  async slideReviews() {
    var splide = new Splide(".splide", {
      autoWidth: true,
      gap: "100em",
      type: "loop",
      perPage: 1,
      focus: "center",
      autoplay: true,
      pauseOnFocus: false,
    });

    splide.mount();
  }

  async displayReviewsSection(reviews) {
    return `
      <div class="splide review-container">
        <div class="splide__track review-list">
          <ul class="splide__list">
            ${reviews.join("\r\n")}
          </ul>
        </div>
        <div class="splide__progress">
          <div class="splide__progress__bar">
          </div>
        </div>
      </div>
    `;
  }

  async getHtml() {
    let labels = await this.generateLabels();
    let reviews = await this.generateReviews();
    // Disable reviews on smaller screens
    let reviewsSection =
      window.innerWidth >= 810
        ? await this.displayReviewsSection(reviews)
        : null;

    return `
      <div class="container-lg">
        <div class="modal fade" id="search-modal" tabindex="-1" aria-labelledby="search-result" aria-hidden="true" aria-modal="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-lg-down modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="search-result">Result: </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div id="results-group" class="modal-body">
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
        <div id="reviews">
          ${reviewsSection}
        </div>
      </div>
    `;
  }

  async loadExtra() {
    await this.displayResults();

    try {
      await this.slideReviews();
    } catch (err) {}

    await loadIcons();

    if (!drawingEffects) {
      drawingEffects = true;
      await slideText();
      await this.checkDrawEffects();
    }
  }
}

// Disable reviews on smaller screens
window.onresize = () => {
  if (window.innerWidth <= 800) {
    document.getElementById("reviews").innerHTML = "";
  }
};

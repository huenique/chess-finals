import { randomDate } from "../store/actions.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("News - Realty Website");
  }

  async genArticle() {
    let articles = [];
    let dates = [];

    for (let i = 0; i < 6; i++) {
      let date = await randomDate("01/01/2022", "01/01/2021");
      dates.push(date);
    }

    dates.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });

    for (let i = 0; i < 6; i++) {
      let article = `
        <a href="#" class="article-card list-group-item list-group-item-action">
          <div class="d-flex">
            <div class="article-content">
              <p class="article-title">Lorem ipsum dolor sit amet</p>
              <p class="article-body text-truncate" style="color: gray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <small class="article-date text-muted">${dates[i]}</small>
              <img class="article-thumbnail" src="https://picsum.photos/640/480?random=${i}" alt="article-thumbnail">
              </div>
          </div>
        </a>
      `;
      articles.push(article);
    }

    return articles;
  }

  async getHtml() {
    let articles = await this.genArticle();

    return `
      <div class="alt-container container">
        <div class="article-container">
          <div class="list-group">
            ${articles.join("\r\n")}
          </div>
        </div>
      </div>
  `;
  }
}

import { randomDate } from "../store/actions.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("News - Realty Website");
  }

  async generateArticle() {
    var articles = [];
    var dates = [];

    for (let i = 0; i < 6; i++) {
      let date = await randomDate("01/01/2022", "01/01/2021");
      dates.push(date);
    }

    dates.sort(function (a, b) {
      return new Date(a) - new Date(b);
    });

    for (let i = 0; i < 6; i++) {
      let article = `
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">List group item heading</h5>
            <img src="https://source.unsplash.com/random/1280x720" width="20%" height="0%" alt="...">
          </div>
          <p class="mb-1">Some placeholder content in a paragraph.</p>
          <small class="text-muted">${dates[i]}</small>
        </a>
      `;
      articles.push(article);
    }

    return articles;
  }

  async getHtml() {
    let articles = await this.generateArticle();

    return `
      <div class="container">
        <div class="article-container mt-5">
          <div class="list-group">
            ${articles.join("\r\n")}
          </div>
        </div>
      </div>
  `;
  }
}

import { getArticleImages, randomDate } from "../store/actions.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("News - Realty Website");
  }

  async genImages(limit) {
    var source = await getArticleImages(limit);
    var data = source.data;
    var images = [];

    for (let i = 0; i < data.length; i++) {
      images.push(data[i].download_url);
    }

    return images;
  }

  async genArticle() {
    var articles = [];
    var dates = [];
    var images = await this.genImages(6);

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
            <img src="${images[i]}" width="20%" height="0%" alt="article-thumbnail">
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
    let articles = await this.genArticle();

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

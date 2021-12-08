import { sleep } from "../helpers/utils.js";

export async function slideText() {
  let slideIndex = 0;
  await showSlides();

  async function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide-object");

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    try {
      slides[slideIndex - 1].style.display = "block";
      await sleep(5000);
      await showSlides();
    } catch (e) {}
  }
}

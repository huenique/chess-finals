import Contact from "./views/Contact.js";
import Home from "./views/Home.js";
import News from "./views/News.js";

var drawingEffects = [];

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/news", view: News },
    { path: "/contact", view: Contact },
  ];

  const matches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = matches.find((match) => match.isMatch);

  // NOTE: use 404 err code if possible
  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  // inject component into html template
  document.querySelector("#app").innerHTML = await view.getHtml();

  if (
    typeof view.drawEffects === "function" &&
    drawingEffects.includes(match.route.path) === false
  ) {
    drawingEffects.push(match.route.path);
    await view.drawEffects();
  }
};

// return data on page history navigation
window.addEventListener("popstate", router);

// disable page load
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

// NOTE: This implementation is very slow

class Navbar extends HTMLElement {
  constructor() {
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create elements
    const linkElem = document.createElement("link");
    const navBar = document.createElement("navbar");

    // Apply external styles to the shadow dom
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "../../static/css/bootstrap.min.css");

    // Inject html code for navigation bar
    navBar.innerHTML = `
      <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/" data-link>Navbar</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class=" nav-item">
                <a class="nav__link nav-link" href="/news" data-link>News</a>
              </li>
              <li class="nav-item">
                <a class="nav__link nav-link" href="/careers" data-link>Careers</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(linkElem);
    shadow.appendChild(navBar);
  }
}

customElements.define("page-content", Navbar);

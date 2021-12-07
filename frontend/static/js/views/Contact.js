import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Contact - Realty Website");
  }

  async getHtml() {
    return `
      <div class="container bg-white p-5">
        <p class="fs-3 fw-bold">How can we help you?</p>
        <form>
          <div class="container">
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="client-name" class="form-label">Name *</label>
                  <input type="text" class="form-control" id="client-name" required>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="client-email" class="form-label">Email *</label>
                  <input type="email" class="form-control" id="client-email" required>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="mb-3">
                  <label for="select-reason" class="form-label">Regarding *</label>
                  <select id="select-reason" class="form-select" required>
                    <option disabled="" selected="" value="">Select</options>
                    <option value="franchise">Opening a franchise</option>
                    <option value="complaint">I have a complaint</option>
                    <option value="general">General help</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <div class="mb-3">
                  <label for="client-phone" class="form-label">Phone</label>
                  <input type="tel" class="form-control" placeholder="+639012345678" pattern="+63[0-9]{10}" id="client-phone">
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <div class="mb-3 text-center">
                  <div class="form-floating">
                    <textarea class="form-control" id="floatingTextarea2" style="height: 100px" required></textarea>
                    <label for="floatingTextarea2">Enter a message</label>
                  </div>
                  <button type="submit" class="btn btn-primary mt-5">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  `;
  }
}

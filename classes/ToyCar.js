export class ToyCar {
  /**@type {string}*/
  #id
  /**@type {string}*/
  #model
  /**@type {string}*/
  #num
  /**@type {string}*/
  #brand
  /**@type {number}*/
  #year
  /**@type {string}*/
  #location
  /**@type {string}*/
  #description
  /**@type {Array<string>} */
  #images

  /**
   * @param {string} id
   * @param {string} model
   * @param {string} num
   * @param {string} brand
   * @param {number} year
   * @param {string} location
   * @param {string} description
   * @param {Array<string>} images
   */
  constructor(
    id,
    model,
    num,
    brand,
    year,
    location,
    description,
    images
  ) {
    this.#id = id
    this.#model = model
    this.#num = num
    this.#brand = brand
    this.#year = year
    this.#location = location
    this.#description = description
    this.#images = Array.isArray(images) ? images : []
  }

  /**
   * @returns {string}
   */
  get num () {
    return this.#num
  }

  /**
   * @returns {string}
   */
  get brand () {
    return this.#brand
  }

  /**
   * @returns {string}
   */
  get location () {
    return this.#location
  }

  /**
   * @param {string} url
   */
  add_image (url) {
    this.#images.push(url)
  }

  /**
   * @returns {string}
   */
  createHeader = () => ``

  /**
   * @param {string} dt
   * @param {string} dd
   * @returns {string}
   */
  createDefinitionPair = (dt, dd) => dd ? `
    <dt>${dt}</dt>
    <dd>${dd}</dd>
  ` : ``

  /**
   * @returns {boolean}
   */
  hasDetails = () => !!this.#num || !!this.#brand || !!this.#location

  /**
   * @returns {string}
   */
  createDefinitionList = () => this.hasDetails() ? `
    <dl>
      ${this.createDefinitionPair('Number', this.#num)}
      ${this.createDefinitionPair('Brand', this.#brand)}
      ${this.createDefinitionPair('Made in', this.#location)}
    </dl>
  ` : ``

  /**
   * @returns {String}
   */
  createCarousel = () => `
    <div class="carousel slide" data-ride="carousel" id="Model${this.#id}">
      <div class="carousel-inner">
        ${this.#images.map((/**@type {String} */ img, /**@type {Number} */ i) => `
          <div class="${!i ? 'carousel-item active' : 'carousel-item'}">
            <img class="d-block w-100" src="${img}"/>
          </div>
        `).join('')}
      </div>
    </div>
  `

  /**
   * @param {String} target
   */
  display (target) {
    const markup = `
      <div class="card">
        ${this.createHeader()}
        ${this.#images.length && this.createCarousel()}
        <div class="card-body">
          <h5>
            ${this.#model}
            <br>
            <small class="text-muted">
              ${this.#year}
            </small>
          </h5>
          ${this.createDefinitionList()}
          <details>
            <summary>Description</summary>
            <p>${this.#description}</p>
          </details>
        </div>
      </div>
    `
    const domTarget = document.getElementById(target)
    domTarget && domTarget.insertAdjacentHTML('afterbegin', markup)
  }
}
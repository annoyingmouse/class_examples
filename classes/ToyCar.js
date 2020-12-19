/**
 * Class representing a generic toy car
 */
export class ToyCar {
  /**
   * Private properties
   */
  #id
  #model
  #num
  #brand
  #year
  #location
  #description
  /**@type {Array<String>} */
  #images

  /**
   * Constructs a new instance of the ToyCar class
   * @param {String} id - The unique identifier from the Database
   * @param {String} model - The name of the model
   * @param {String} num - The number of the model
   * @param {String} brand - The brand of the model
   * @param {Number} year - The year of production
   * @param {String} location - Where the model was made
   * @param {String} description - A description of the model
   * @param {Array<String>} images - An array of images of the model
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
   * Get the number of the model
   * @returns {string} - The number of the modeles5
   */
  get num () {
    return this.#num
  }

  /**
   * Get the brand of the model
   * @returns {string} - The brand of the model
   */
  get brand () {
    return this.#brand
  }

  /**
   * Get the place where the model was made
   * @returns {string} - Where the model was made
   */
  get location () {
    return this.#location
  }

  /**
   * Adds an image to the #images array of the model
   * @param {string} url - The url of an image of the model.
   */
  add_image (url) {
    this.#images.push(url)
  }

  /**
   * Stub function to be overwritten by children
   * @returns {String}
   */
  createHeader = () => ``

  /**
   * Creates a dt/dd pair for the given values if dd has a value
   * @param {String} dt - The definition term
   * @param {String} dd - The definition description
   * @returns {String} - the dt/dd pair if there is a valid value for the 'dd', else an empty string
   */
  createDefinitionPair = (dt, dd) => dd ? `
    <dt>${dt}</dt>
    <dd>${dd}</dd>
  ` : ``

  /**
   * Returns true if the model has a number, a brand or a locations
   */
  hasDetails = () => this.#num || this.#brand || this.#location

  /**
   * Creates a definition list
   * @returns {string} - the dl with associated dt/dd pairs
   */
  createDefinitionList = () => this.hasDetails() && `
    <dl>
      ${this.createDefinitionPair('Number', this.#num)}
      ${this.createDefinitionPair('Brand', this.#brand)}
      ${this.createDefinitionPair('Made in', this.#location)}
    </dl>
  `

  /**
   * Generates a carousel of images from the images in the Class, uses Bootstrap 4's Carousel:
   * https://getbootstrap.com/docs/4.0/components/carousel/
   * @returns {String} - a carousel of images
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
   * Generates a Bootstrap 4 card with details of the toy car and attaches it to the target element:
   * https://getbootstrap.com/docs/4.0/components/card/
   * @param {String} target - The id of the DOM element to which to attach to 'card'
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
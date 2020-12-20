import { ToyCar } from './ToyCar.js'

export class DinkyCar extends ToyCar {
  /**@type {string}*/
  #num_new
  /**@type {string}*/
  #manufacturer

  /**
   * @param {string} manufacturer
   * @param {string} id
   * @param {string} model
   * @param {string} num
   * @param {string} num_new
   * @param {string} brand
   * @param {number} year
   * @param {string} location
   * @param {string} description
   * @param {Array<string>} images
   */
  constructor(
    manufacturer,
    id,
    model,
    num,
    num_new,
    brand,
    year,
    location,
    description,
    images
  ) {
    super(
      id,
      model,
      num,
      brand,
      year,
      location,
      description,
      images
    )
    this.#manufacturer = manufacturer
    this.#num_new = num_new
  }

  /**
   * @returns {string}
   */
  createHeader = () => `
    <div class="card-header text-white bg-danger font-weight-bold">
      ${this.#manufacturer}
    </div>
  `

  /**
   * @returns {boolean}
   */
  hasDetails = () => !!this.num || !!this.#num_new || !!this.brand || !!this.location

  /**
   * @returns {string}
   */
  createDefinitionList = () => this.hasDetails() ? `
    <dl>
      ${this.createDefinitionPair('Number', this.num)}
      ${this.createDefinitionPair('Re-numbered', this.#num_new)}
      ${this.createDefinitionPair('Brand', this.brand)}
      ${this.createDefinitionPair('Made in', this.location)}
    </dl>
  ` : ``
}
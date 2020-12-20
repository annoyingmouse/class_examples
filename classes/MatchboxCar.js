import {ToyCar} from './ToyCar.js'

export class MatchboxCar extends ToyCar {
  /**@type {string}*/
  #manufacturer

  /**
   * @param {string} manufacturer
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
    manufacturer,
    id,
    model,
    num,
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
  }

  /**
   * @returns {string}
   */
  createHeader = () => `
    <div class="card-header text-white bg-success font-weight-bold">
      ${this.#manufacturer}
    </div>
  `
}
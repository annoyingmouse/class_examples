import {ToyCar} from './ToyCar.js'

/**
 * Class representing a Matchbox toy car
 */
export class MatchboxCar extends ToyCar {
  /**
   * Private property, not in ToyCar
   */
  #manufacturer

  /**
   * Constructs a new instance of the MatchboxCar class using the ToyCar class
   * @param {string} manufacturer - The maker of the model
   * @param {string} id - The unique from the Database
   * @param {string} model - The name of the model
   * @param {string} num - The number of the model
   * @param {string} brand - The brand of the model
   * @param {number} year - The year of production
   * @param {string} location - Where the model was made
   * @param {string} description - A description of the model
   * @param {Array<string>} images - A collection of images of the model
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
   * Returns a formatted string indicating the manufacturer of the model, overrides the method inherited from ToyCar
   * @returns {string} - a green header element displaying the manufacturer
   */
  createHeader = () => `
    <div class="card-header text-white bg-success font-weight-bold">
      ${this.#manufacturer}
    </div>
  `
}
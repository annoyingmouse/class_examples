import { ToyCar } from './ToyCar.js'

/**
 * Class representing a Dinky toy car
 */
export class DinkyCar extends ToyCar {
  /**
   * Private properties, not in ToyCar
   */
  #num_new
  #manufacturer

  /**
   * Constructs a new instance of the DinkyCar class using the ToyCar class
   * @param {string} manufacturer - The maker of the model
   * @param {string} id - The unique from the Database
   * @param {string} model - The name of the model
   * @param {string} num - The number of the model
   * @param {string} num_new - The number of the model after 1954
   * @param {string} brand - The brand of the model
   * @param {number} year - The year of production
   * @param {string} location - Where the model was made
   * @param {string} description - A description of the model
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
   * Returns a formatted string indicating the manufacturer of the model, overrides the method inherited from ToyCar
   * @returns {string} - a red header element displaying the manufacturer
   */
  createHeader = () => `
    <div class="card-header text-white bg-danger font-weight-bold">
      ${this.#manufacturer}
    </div>
  `

  /**
   * Returns true if the model has a number, a new number, a brand or a locations
   */
  hasDetails = () => this.num || this.#num_new || this.brand || this.location

  /**
   * Creates a definition list, overrides the method inherited from ToyCar
   * @returns {string} - the dl with associated dt/dd pairs (Dinky cars might have two numbers)
   */
  createDefinitionList = () => this.hasDetails() && `
    <dl>
      ${this.createDefinitionPair('Number', this.num)}
      ${this.createDefinitionPair('Re-numbered', this.#num_new)}
      ${this.createDefinitionPair('Brand', this.brand)}
      ${this.createDefinitionPair('Made in', this.location)}
    </dl>
  `
}

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
   * @param args - Similar to the args for ToyCar but with an extra for manufacturer. A destructured list of variables.
   */
  constructor(...args) {
    super(...args.splice(1))
    this.#manufacturer = [...args].shift()
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

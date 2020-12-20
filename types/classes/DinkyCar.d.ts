export class DinkyCar extends ToyCar {
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
    constructor(manufacturer: string, id: string, model: string, num: string, num_new: string, brand: string, year: number, location: string, description: string, images: Array<string>);
    #private;
}
import { ToyCar } from "./ToyCar.js";

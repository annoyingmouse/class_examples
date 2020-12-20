export class ToyCar {
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
    constructor(id: string, model: string, num: string, brand: string, year: number, location: string, description: string, images: Array<string>);
    /**
     * @returns {string}
     */
    get num(): string;
    /**
     * @returns {string}
     */
    get brand(): string;
    /**
     * @returns {string}
     */
    get location(): string;
    /**
     * @param {string} url
     */
    add_image(url: string): void;
    /**
     * @returns {string}
     */
    createHeader: () => string;
    /**
     * @param {string} dt
     * @param {string} dd
     * @returns {string}
     */
    createDefinitionPair: (dt: string, dd: string) => string;
    /**
     * @returns {boolean}
     */
    hasDetails: () => boolean;
    /**
     * @returns {string}
     */
    createDefinitionList: () => string;
    /**
     * @returns {String}
     */
    createCarousel: () => string;
    /**
     * @param {String} target
     */
    display(target: string): void;
    #private;
}

(function () {
  'use strict';

  /**
   * Class representing a generic toy car
   */
  class ToyCar {
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
    #images

    /**
     * Constructs a new instance of the ToyCar class
     * @param {string} id - The unique from the Database
     * @param {string} model - The name of the model
     * @param {string} num - The number of the model
     * @param {string} brand - The brand of the model
     * @param {number} year - The year of production
     * @param {string} location - Where the model was made
     * @param {string} description - A description of the model
     * @param {array} images - An array of images of the model
     */
    constructor(
        id,
        model,
        num,
        brand,
        year,
        location,
        description,
        images = []
    ){
      this.#id = id;
      this.#model = model;
      this.#num = num;
      this.#brand = brand;
      this.#year = year;
      this.#location = location;
      this.#description = description;
      this.#images = Array.isArray(images) ? images : [];
    }

    /**
     * Get the number of the model
     * @returns {string} - The number of the model
     */
    get num() {
      return this.#num
    }

    /**
     * Get the brand of the model
     * @returns {string} - The brand of the model
     */
    get brand() {
      return this.#brand
    }

    /**
     * Get the place where the model was made
     * @returns {string} - Where the model was made
     */
    get location() {
      return this.#location
    }

    /**
     * Adds an image to the #images array of the model
     * @param {string} url - The url of an image of the model.
     */
    add_image(url){
      this.#images.push(url);
    }

    /**
     * Stub function to be overwritten by children
     * @returns {string}
     */
    createHeader = () => ``

    /**
     * Creates a dt/dd pair for the given values if dd has a value
     * @param {string} dt - The definition term
     * @param {string} dd - The definition description
     * @returns {string} - the dt/dd pair if there is a valid value for the 'dd', else an empty string
     */
    createDefinitionPair = (dt, dd) => dd ? `
    <dt>${dt}</dt>
    <dd>${dd}</dd>
  ` : ``

    /**
     * Creates a definition list
     * @returns {string} - the dl with associated dt/dd pairs
     */
    createDefinitionList = () => `
    <dl>
      ${this.createDefinitionPair('Number', this.#num)}
      ${this.createDefinitionPair('Brand', this.#brand)}
      ${this.createDefinitionPair('Made in', this.#location)}
    </dl>
  `

    /**
     * Generates a carousel of images from the images in the Class, uses Bootstrap 4's Carousel:
     * https://getbootstrap.com/docs/4.0/components/carousel/
     * @returns {string} - a carousel of images
     */
    createCarousel = () => `
    <div class="carousel slide" data-ride="carousel" id="Model${this.#id}">
      <div class="carousel-inner">
        ${this.#images.map((img, i) => `
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
     * @param {string} target - The id of the DOM element to which to attach to 'card'
     */
    display(target) {
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
    `;
      const domTarget = document.getElementById(target);
      domTarget.insertAdjacentHTML('afterbegin', markup);
    }
  }

  /**
   * Class representing a Matchbox toy car
   */
  class MatchboxCar extends ToyCar {
    /**
     * Private property, not in ToyCar
     */
    #manufacturer

    /**
     * Constructs a new instance of the MatchboxCar class using the ToyCar class
     * @param args - Similar to the args for ToyCar but with an extra for manufacturer. A destructured list of variables.
     */
    constructor(...args) {
      super(...args.splice(1));
      this.#manufacturer = [...args].shift();
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

  /**
   * Class representing a Dinky toy car
   */
  class DinkyCar extends ToyCar {
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
      );
      this.#manufacturer = manufacturer;
      this.#num_new = num_new;
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
     * Creates a definition list, overrides the method inherited from ToyCar
     * @returns {string} - the dl with associated dt/dd pairs (Dinky cars might have two numbers)
     */
    createDefinitionList = () => `
    <dl>
      ${this.createDefinitionPair('Number', this.num)}
      ${this.createDefinitionPair('Number', this.#num_new)}
      ${this.createDefinitionPair('Brand', this.brand)}
      ${this.createDefinitionPair('Made in', this.location)}
    </dl>
  `
  }

  /**
   * Create bundle using:
   * `rollup index.js --file bundle.js --format iife`
   */

  var javalin = new MatchboxCar(
      'Matchbox', // manufacturer
      '0', // id
      'AMX Javalin', // model
      'MB9', // num
      'Superfast 1-75', // brand
      1972, // year
      'England', // location
      'Matchbox Superfast No 9 AMX Javelin WHITE Interior MIB RARE. Model Condition: Original and Mint, Box Condition: Original and Near Mint, label on one striker side of box. No missing end or tuck in flaps.' // description
  );
  javalin.add_image('https://dummyimage.com/378x370');
  javalin.add_image('https://dummyimage.com/378x385');
  javalin.add_image('https://dummyimage.com/378');
  javalin.display('collection');

  var FordGroup6 = new MatchboxCar(
      'Matchbox', // manufacturer
      '1', // id
      'Ford Group 6', // model
      'MB45', // num
      'Superfast 1-75', // brand
      1972, // year
      'England', // location
      'Matchbox Superfast no MB 45 a Ford Group 6 in Metallic Magenta Gloss black Painted Base Light Amber Tinted windows Ivory Interior 5 Spoke Wheels', // description
      ['https://dummyimage.com/211x209', 'https://dummyimage.com/211', 'https://dummyimage.com/211x218']
  ).display('collection');

  var FordGT = new MatchboxCar(
      'Matchbox', // manufacturer
      '2', // id
      'Ford G.T.', // model
      'MB41', // num
      'Superfast 1-75', // brand
      1972, // year
      'England', // location
      '1970s. Matchbox Superfast. 41 Ford GT 40 Bronze with Black base F1.Indy.Mint in box.original. Original box is complete with all flaps.' // description
  );
  FordGT.add_image('https://dummyimage.com/347');
  FordGT.add_image('https://dummyimage.com/347x337');
  FordGT.add_image('https://dummyimage.com/347x355');
  FordGT.display('collection');

  var MerryweatherMarquisFireEngine = new MatchboxCar(
      'Matchbox', // manufacturer
      '3', // id
      'Merryweather Marquis Fire Engine', // model
      'MB35', // num
      'Superfast 1-75', // brand
      1972, // year
      'England', // location
      'One of the lights on the top side of the truck is slightly pushed down. The labels are slightly torn and one of the front wheels is slightly bent.' // description
  );
  MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435x425');
  MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435x437');
  MerryweatherMarquisFireEngine.add_image('https://dummyimage.com/435');
  MerryweatherMarquisFireEngine.display('collection');

  var LotusEuropa = new MatchboxCar(
      'Matchbox', // manufacturer
      '4', // id
      'Lotus Europa', // model
      'MB5', // num
      'Superfast', // brand
      1974, // year
      'England', // location
      'Matchbox Lesney Superfast MB 5 Lotus Europa - RARE JPS ISSUE. Condition is "Used".' // description
  );
  LotusEuropa.add_image('https://dummyimage.com/316x309');
  LotusEuropa.add_image('https://dummyimage.com/316');
  LotusEuropa.add_image('https://dummyimage.com/316x317');
  LotusEuropa.display('collection');

  var ChevroletCorvette = new MatchboxCar(
      'Matchbox', // manufacturer
      '5', // id
      'Chevrolet Corvette', // model
      'MB62', // num
      'Superfast 1-75', // brand
      1979, // year
      'MACAU', // location
      'MATCHBOX No.62 CHEVROLET CORVETTE YELLOW/PURPLE' // description
  );
  ChevroletCorvette.add_image('https://dummyimage.com/232x212');
  ChevroletCorvette.add_image('https://dummyimage.com/316');
  ChevroletCorvette.add_image('https://dummyimage.com/316x317');
  ChevroletCorvette.display('collection');

  var rileySaloon = new DinkyCar(
      'Dinky', // manufacturer
      '6', // id
      'Riley Saloon', // model
      '40a', // num
      null, // num_new
      null, // brand
      1947, // year
      'England', // location
      'Green body with green ridged hubs, "First Version" which has the tin-plate base with the axles held by cast pillars at the rear and integral castings at the front.', // description
      ['https://dummyimage.com/388x380', 'https://dummyimage.com/388x395', 'https://dummyimage.com/388']
  ).display('collection');

  var foden8WheelWagon = new DinkyCar(
      'Dinky', // manufacturer
      '7', // id
      'Foden 8 Wheel Wagon', // model
      '501', // num
      '901', // num_new
      null, // brand
      1947, // year
      'England', // location
      'This is a very scarce early issue dark grey 1st cab Foden Wagon with a red chassis and red ridged wheels and cab side flashes. This was the last colour run for this first phase of production for 1st cab wagons and would usually have no mount block for a rear tow hook and no tank slots which were both not introduced until October 1948. However a few examples at the end of this first production phase received the mount block and a small unpainted hook and this is why this model is particularly scarce. It also helps to confirm some of the known date changes of the parts. It continues to have no casting support for the chain posts underneath as this was not introduced until January 1952. There is a spare tyre mounted to the chassis by a correct silver nut and bolt. Please note that a black nut and bolt were not issued for any 1st cab model. Finally as an early release it has the black herringbone original tyres which are now hardened but have no flats and a full "20mph" transfer on the rear left wheel arch.', // description
      ['https://dummyimage.com/368x360', 'https://dummyimage.com/368x375', 'https://dummyimage.com/368']
  ).display('collection');

}());

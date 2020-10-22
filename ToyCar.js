/**
 * Toy Car.
 *
 * @constructor
 * @param {String} manufacturer - Who made the model.
 * @param {String} id - The unique from the Database.
 * @param {String} model - The name on the bottom.
 * @param {String} num - The number on the bottom.
 * @param {String} brand - The brand, from the bottom.
 * @param {Number} year - The year of production.
 * @param {String} location - Where the model was made.
 * @param {String} description - A description of the model.
 */
function ToyCar(manufacturer, id, model, num, brand, year, location, description) {
  Object.defineProperty(this, "manufacturer", {
    get: function() {
      return manufacturer;
    }
  });
  Object.defineProperty(this, "id", {
    get: function() {
      return id;
    }
  });
  Object.defineProperty(this, "model", {
    get: function() {
      return model;
    }
  });
  Object.defineProperty(this, "num", {
    get: function() {
      return num;
    }
  });
  Object.defineProperty(this, "brand", {
    get: function() {
      return brand;
    }
  });
  Object.defineProperty(this, "year", {
    get: function() {
      return year;
    }
  });
  Object.defineProperty(this, "location", {
    get: function() {
      return location;
    }
  });
  Object.defineProperty(this, "description", {
    get: function() {
      return description;
    }
  });
  var images = [];
  Object.defineProperty(this, "images", {
    get: function() {
      return images;
    }
  });
  Object.defineProperty(this, "add_image", {
    set: function(uri) {
      this.images.push(uri);
    }
  });
}

/**
 * Default createHeader method for ToyCar.
 */
ToyCar.prototype.createHeader = function(){
  return null;
};

/**
 * Create element and set attributes.
 *
 * @param {Object} obj - The attributes of the element.
 * @param {string} el - The element to be created, defaults to Content Division.
 */
ToyCar.prototype.createElemWithAttributes = function(obj, el) {
  el = el || "div";
  var element = document.createElement(el);
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      element.setAttribute(key, obj[key]);
    }
  }
  return element;
};

/**
 * Create element with attributes and set text.
 *
 * @param {Object} obj - The attributes of the element.
 * @param {string} el - The element to be created, defaults to Content Division.
 * @param {string} text - the text content of the element.
 */
ToyCar.prototype.createRichElement = function(obj, el, text) {
  var element = this.createElemWithAttributes (obj, el);
  element.textContent = text;
  return element;
};

/**
 * Create a dl and populate
 *
 * @param {String} node - The DOM element to which we should add the definition list
 */
ToyCar.prototype.createDefinitionList = function(target) {
  if (this.num || this.brand || this.location) {
    var dl = document.createElement("dl");
    target.appendChild(dl);
    this.num && this.createDefinitionPair("Number", this.num, dl);
    this.brand && this.createDefinitionPair("Brand", this.brand, dl);
    this.location && this.createDefinitionPair("Made in", this.location, dl);
  }
}

/**
 * Create a dt/dd pair and append to target.
 *
 * @param {String} DT - The Description Term.
 * @param {String} DD - The Description Details.
 * @param {String} DL - The Description List.
 */
ToyCar.prototype.createDefinitionPair = function(dt, dd, dl) {
  dl.appendChild(this.createRichElement({}, "dt", dt));
  dl.appendChild(this.createRichElement({}, "dd", dd));
};

/**
 * Display item.
 *
 * @param {String} Target - The target for insertion.
 */
ToyCar.prototype.display = function(target) {
  var card = this.createElemWithAttributes({
    "class": "card"
  });
  card.appendChild(this.createHeader());
  if (this.images.length) {
    var carousel = this.createElemWithAttributes({
      "class": "carousel slide",
      "data-ride": "carousel",
      "id": "Model" + this.id
    });
    var carouselInner = this.createElemWithAttributes({
      "class": "carousel-inner"
    });
    this.images.forEach(function(uri, index) {
      var carouselItem = this.createElemWithAttributes({
        "class": !index
            ? "carousel-item active"
            : "carousel-item"
      });
      var img = this.createElemWithAttributes({
        "class": "d-block w-100",
        "src": uri
      }, "img");
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
      carousel.appendChild(carouselInner);
    }.bind(this));
    card.appendChild(carousel);
  }
  var domTarget = document.getElementById(target);
  domTarget.appendChild(card);
  var cardBody = this.createElemWithAttributes({
    "class": "card-body"
  });
  card.appendChild(cardBody);
  var hFive = this.createRichElement({}, "h5", this.model);
  var br = document.createElement("br");
  hFive.appendChild(br);
  var yearSmall = this.createRichElement({
    "class": "text-muted"
  }, "small", this.year);
  hFive.appendChild(yearSmall);
  cardBody.appendChild(hFive);
  this.createDefinitionList(cardBody);
  if (this.description) {
    var details = document.createElement("details");
    cardBody.appendChild(details);
    details.appendChild(this.createRichElement({}, "summary", "Description"));
    details.appendChild(this.createRichElement({}, "p", this.description));
  }
};

/**
 * Matchbox Car.
 *
 * @constructor
 * @param {String} id - The unique from the Database.
 * @param {String} model - The name on the bottom.
 * @param {String} num - The number on the bottom.
 * @param {String} brand - The brand, from the bottom.
 * @param {Number} year - The year of production.
 * @param {String} location - Where the model was made.
 * @param {String} description - A description of the model.
 */
function MatchboxCar(manufacturer, id, model, num, brand, year, location, description) {
  ToyCar.call(this, manufacturer, id, model, num, brand, year, location, description);
};
MatchboxCar.prototype = Object.create(ToyCar.prototype);
MatchboxCar.prototype.constructor = MatchboxCar;

MatchboxCar.prototype.createHeader = function(){
  var cardHeader = this.createElemWithAttributes({
    "class": "card-header text-white bg-success font-weight-bold"
  });
  cardHeader.textContent = this.manufacturer;
  return cardHeader;
};

/**
 * Dinky Car.
 *
 * @constructor
 * @param {String} id - The unique from the Database.
 * @param {String} model - The name on the bottom.
 * @param {String} num - The number on the bottom.
 * @param {String} num - The number after 1954.
 * @param {String} brand - The brand, from the bottom.
 * @param {Number} year - The year of production.
 * @param {String} location - Where the model was made.
 * @param {String} description - A description of the model.
 */
function DinkyCar(manufacturer, id, model, num, num_new, brand, year, location, description) {
  ToyCar.call(this, manufacturer, id, model, num, brand, year, location, description);
  Object.defineProperty(this, "num_new", {
    get: function() {
      return num_new;
    }
  });
};
DinkyCar.prototype = Object.create(ToyCar.prototype);
DinkyCar.prototype.constructor = DinkyCar;

/**
 * Overwrites the createHeader method from ToyCar.
 */
DinkyCar.prototype.createHeader = function(){
  var cardHeader = this.createElemWithAttributes({
    "class": "card-header text-white bg-danger font-weight-bold"
  });
  cardHeader.textContent = this.manufacturer;
  return cardHeader;
};

/**
 * Create a dl and populate
 *
 * @param {String} node - The DOM element to which we should add the definition list
 */
DinkyCar.prototype.createDefinitionList = function(target) {
  if (this.num || this.num_new || this.brand || this.location) {
    var dl = document.createElement("dl");
    target.appendChild(dl);
    this.num && this.createDefinitionPair("Number", this.num, dl);
    this.num_new && this.createDefinitionPair("Re-numbered", this.num_new, dl);
    this.brand && this.createDefinitionPair("Brand", this.brand, dl);
    this.location && this.createDefinitionPair("Made in", this.location, dl);
  }
};

var javalin = new MatchboxCar(
    "Matchbox",
    "0",
    "AMX Javalin",
    "MB9",
    "Superfast 1-75",
    1972,
    "England",
    "Matchbox Superfast No 9 AMX Javelin WHITE Interior MIB RARE. Model Condition: Original and Mint, Box Condition: Original and Near Mint, label on one striker side of box. No missing end or tuck in flaps. "
);
javalin.add_image = "https://dummyimage.com/378x370";
javalin.add_image = "https://dummyimage.com/378x385";
javalin.add_image = "https://dummyimage.com/378";
javalin.display("collection");

var FordGroup6 = new MatchboxCar(
    "Matchbox",
    "1",
    "Ford Group 6",
    "MB45",
    "Superfast 1-75",
    1972,
    "England",
    "Matchbox Superfast no MB 45 a Ford Group 6 in Metallic Magenta Gloss black Painted Base Light Amber Tinted windows Ivory Interior 5 Spoke Wheels"
);
FordGroup6.add_image = "https://dummyimage.com/211x209";
FordGroup6.add_image = "https://dummyimage.com/211";
FordGroup6.add_image = "https://dummyimage.com/211x218";
FordGroup6.display("collection");

var FordGT = new MatchboxCar(
    "Matchbox",
    "2",
    "Ford G.T.",
    "MB41",
    "Superfast 1-75",
    1972,
    "England",
    "1970s. Matchbox Superfast. 41 Ford GT 40 Bronze with Black base F1.Indy.Mint in box.original. Original box is complete with all flaps."
);
FordGT.add_image = "https://dummyimage.com/347";
FordGT.add_image = "https://dummyimage.com/347x337";
FordGT.add_image = "https://dummyimage.com/347x355";
FordGT.display("collection");

var MerryweatherMarquisFireEngine = new MatchboxCar(
    "Matchbox",
    "3",
    "Merryweather Marquis Fire Engine",
    "MB35",
    "Superfast 1-75",
    1972,
    "England",
    "One of the lights on the top side of the truck is slightly pushed down. The labels are slightly torn and one of the front wheels is slightly bent."
);
MerryweatherMarquisFireEngine.add_image = "https://dummyimage.com/435x425";
MerryweatherMarquisFireEngine.add_image = "https://dummyimage.com/435x437";
MerryweatherMarquisFireEngine.add_image = "https://dummyimage.com/435";
MerryweatherMarquisFireEngine.display("collection");

var LotusEuropa = new MatchboxCar(
    "Matchbox",
    "4",
    "Lotus Europa",
    "MB5",
    "Superfast",
    1974,
    "England",
    "Matchbox Lesney Superfast MB 5 Lotus Europa - RARE JPS ISSUE. Condition is \"Used\"."
);
LotusEuropa.add_image = "https://dummyimage.com/316x309";
LotusEuropa.add_image = "https://dummyimage.com/316";
LotusEuropa.add_image = "https://dummyimage.com/316x317";
LotusEuropa.display("collection");

var ChevroletCorvette = new MatchboxCar(
    "Matchbox",
    "5",
    "Chevrolet Corvette",
    "MB62",
    "Superfast 1-75",
    1979,
    "MACAU",
    "MATCHBOX No.62 CHEVROLET CORVETTE YELLOW/PURPLE"
);
ChevroletCorvette.add_image = "https://dummyimage.com/232x212";
ChevroletCorvette.add_image = "https://dummyimage.com/316";
ChevroletCorvette.add_image = "https://dummyimage.com/316x317";
ChevroletCorvette.display("collection");


var rileySaloon = new DinkyCar(
    "Dinky",
    "6",
    "Riley Saloon",
    "40a",
    null,
    null,
    1947,
    "England",
    "Green body with green ridged hubs, 'First Version' which has the tin-plate base with the axles held by cast pillars at the rear and integral castings at the front."
);
rileySaloon.add_image = "https://dummyimage.com/388x380";
rileySaloon.add_image = "https://dummyimage.com/388x395";
rileySaloon.add_image = "https://dummyimage.com/388";
rileySaloon.display("collection");

var foden8WheelWagon = new DinkyCar(
    "Dinky",
    "7",
    "Foden 8 Wheel Wagon",
    "501",
    "901",
    null,
    1947,
    "England",
    "This is a very scarce early issue dark grey 1st cab Foden Wagon with a red chassis and red ridged wheels and cab side flashes. This was the last colour run for this first phase of production for 1st cab wagons and would usually have no mount block for a rear tow hook and no tank slots which were both not introduced until October 1948. However a few examples at the end of this first production phase received the mount block and a small unpainted hook and this is why this model is particularly scarce. It also helps to confirm some of the known date changes of the parts. It continues to have no casting support for the chain posts underneath as this was not introduced until January 1952. There is a spare tyre mounted to the chassis by a correct silver nut and bolt. Please note that a black nut and bolt were not issued for any 1st cab model. Finally as an early release it has the black herringbone original tyres which are now hardened but have no flats and a full '20mph' transfer on the rear left wheel arch."
);
foden8WheelWagon.add_image = "https://dummyimage.com/368x360";
foden8WheelWagon.add_image = "https://dummyimage.com/368x375";
foden8WheelWagon.add_image = "https://dummyimage.com/368";
foden8WheelWagon.display("collection");
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
function MatchboxCar(id, model, num, brand, year, location, description) {
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
    set: function(url) {
      this.images.push(url);
    }
  });
};

/**
 * Create element and set attributes.
 *
 * @param {Object} obj - The attributes of the element.
 * @param {string} el - The element to be created, defaults to Content Division.
 */
MatchboxCar.prototype.createElemWithAttributes = function(obj, el) {
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
MatchboxCar.prototype.createRichElement = function(obj, el, text) {
  var element = this.createElemWithAttributes (obj, el);
  element.textContent = text;
  return element;
};


/**
 * Create a dt/dd pair and append to target.
 *
 * @param {String} DT - The Description Term.
 * @param {String} DD - The Description Details.
 * @param {String} DL - The Description List.
 */
MatchboxCar.prototype.createDefinitionPair = function(dt, dd, dl) {
  dl.appendChild(this.createRichElement({}, "dt", dt));
  dl.appendChild(this.createRichElement({}, "dd", dd));
};

/**
 * Display item.
 *
 * @param {String} Target - The target for insertion.
 */
MatchboxCar.prototype.display = function(target) {
  var card = this.createElemWithAttributes({
    "class": "card"
  });
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
  if (this.num || this.brand || this.location) {
    var dl = document.createElement("dl");
    cardBody.appendChild(dl);
    if (this.num) {
      this.createDefinitionPair("Number", this.num, dl);
    }
    if (this.brand) {
      this.createDefinitionPair("Brand", this.brand, dl);
    }
    if (this.location) {
      this.createDefinitionPair("Made in", this.location, dl);
    }
  }
  if (this.description) {
    var details = document.createElement("details");
    cardBody.appendChild(details);
    details.appendChild(this.createRichElement({}, "summary", "Description"));
    details.appendChild(this.createRichElement({}, "p", this.description));
  }
};

var javalin = new MatchboxCar(
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

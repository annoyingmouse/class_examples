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
    },
    set: function(uri) {
      this.images.push(uri);
    }
  });
}

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
 * Create a dt/dd pair and append to target.
 *
 * @param {String} DT - The Description Term.
 * @param {String} DD - The Description Details.
 * @param {String} DL - The Description List.
 */
MatchboxCar.prototype.createDefinitionPair = function(dt, dd, dl) {
  var DT = document.createElement("dt");
  DT.textContent = dt;
  dl.appendChild(DT);
  var DD = document.createElement("dd");
  DD.textContent = dd;
  dl.appendChild(DD);
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
  var hFive = document.createElement("h5");
  hFive.textContent = this.model;
  var br = document.createElement("br");
  hFive.appendChild(br);
  var yearSmall = this.createElemWithAttributes({
    "class": "text-muted"
  }, "small");
  yearSmall.textContent = this.year;
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
    var p = document.createElement("p");
    p.textContent = this.description;
    cardBody.appendChild(p);
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
javalin.images = "https://dummyimage.com/378x370";
javalin.images = "https://dummyimage.com/378x385";
javalin.images = "https://dummyimage.com/378";
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
FordGroup6.images = "https://dummyimage.com/211x209";
FordGroup6.images = "https://dummyimage.com/211";
FordGroup6.images = "https://dummyimage.com/211x218";
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
FordGT.images = "https://dummyimage.com/347";
FordGT.images = "https://dummyimage.com/347x337";
FordGT.images = "https://dummyimage.com/347x355";
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
MerryweatherMarquisFireEngine.images = "https://dummyimage.com/435x425";
MerryweatherMarquisFireEngine.images = "https://dummyimage.com/435x437";
MerryweatherMarquisFireEngine.images = "https://dummyimage.com/435";
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
LotusEuropa.images = "https://dummyimage.com/316x309";
LotusEuropa.images = "https://dummyimage.com/316";
LotusEuropa.images = "https://dummyimage.com/316x317";
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
ChevroletCorvette.images = "https://dummyimage.com/232x212";
ChevroletCorvette.images = "https://dummyimage.com/316";
ChevroletCorvette.images = "https://dummyimage.com/316x317";
ChevroletCorvette.display("collection");

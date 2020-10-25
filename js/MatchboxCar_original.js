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
function MatchboxCar(
    id,
    model,
    num,
    brand,
    year,
    location,
    description
) {
  this.id = id;
  this.model = model;
  this.num = num;
  this.brand = brand;
  this.year = year;
  this.location = location;
  this.description = description;
  this.images = [];
};

/**
 * Display item.
 *
 * @param {String} Target - The target for insertion.
 */
MatchboxCar.prototype.display = function(target) {
  var card = document.createElement("div");
  card.setAttribute("class", "card");
  if (this.images.length) {
    var carousel = document.createElement("div");
    carousel.setAttribute("class", "carousel slide");
    carousel.setAttribute("data-ride", "carousel");
    carousel.setAttribute("id", "Model" + this.id);
    var carouselInner = document.createElement("div");
    carouselInner.setAttribute("class", "carousel-inner");
    this.images.forEach(function(uri, index) {
      var carouselItem = document.createElement("div");
      carouselItem.setAttribute("class", !index
          ? "carousel-item active"
          : "carousel-item");
      var img = document.createElement("img");
      img.setAttribute("class", "d-block w-100");
      img.setAttribute("src", uri);
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
      carousel.appendChild(carouselInner);
    }.bind(this));
    card.appendChild(carousel);
  }
  var domTarget = document.getElementById(target);
  domTarget.appendChild(card);
  var cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");
  card.appendChild(cardBody);
  var hFive = document.createElement("h5");
  hFive.textContent = this.model;
  var br = document.createElement("br");
  hFive.appendChild(br);
  var yearSmall = document.createElement("small");
  yearSmall.setAttribute("class", "text-muted");
  yearSmall.textContent = this.year;
  hFive.appendChild(yearSmall);
  cardBody.appendChild(hFive);
  if (this.num || this.brand || this.location) {
    var dl = document.createElement("dl");
    cardBody.appendChild(dl);
    if (this.num) {
      var DTnum = document.createElement("dt");
      DTnum.textContent = "Number";
      dl.appendChild(DTnum);
      var DDnum = document.createElement("dd");
      DDnum.textContent = this.num;
      dl.appendChild(DDnum);
    }
    if (this.brand) {
      var DTbrand = document.createElement("dt");
      DTbrand.textContent = "Brand";
      dl.appendChild(DTbrand);
      var DDbrand = document.createElement("dd");
      DDbrand.textContent = this.brand;
      dl.appendChild(DDbrand);
    }
    if (this.location) {
      var DTlocation = document.createElement("dt");
      DTlocation.textContent = "Made in";
      dl.appendChild(DTlocation);
      var DDlocation = document.createElement("dd");
      DDlocation.textContent = this.location;
      dl.appendChild(DDlocation);
    }
  }
  if (this.description) {
    var details = document.createElement("details");
    cardBody.appendChild(details);
    var summary = document.createElement("summary");
    details.appendChild(summary);
    summary.textContent = "Description";
    var p = document.createElement("p");
    p.textContent = this.description;
    details.appendChild(p);
  }
};

var javalin = new MatchboxCar(
    "0",
    "AMX Javalin",
    "MB9",
    "Superfast 1-75",
    1972,
    "England",
    "Matchbox Superfast No 9 AMX Javelin WHITE Interior MIB RARE. Model Condition: Original and Mint, Box Condition: Original and Near Mint, label on one striker side of box. No missing end or tuck in flaps."
);
javalin.images.push("https://dummyimage.com/378x370");
javalin.images.push("https://dummyimage.com/378x385");
javalin.images.push("https://dummyimage.com/378");
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
FordGroup6.images.push("https://dummyimage.com/211x209");
FordGroup6.images.push("https://dummyimage.com/211");
FordGroup6.images.push("https://dummyimage.com/211x218");
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
FordGT.images.push("https://dummyimage.com/347");
FordGT.images.push("https://dummyimage.com/347x337");
FordGT.images.push("https://dummyimage.com/347x355");
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
MerryweatherMarquisFireEngine.images.push("https://dummyimage.com/435x425");
MerryweatherMarquisFireEngine.images.push("https://dummyimage.com/435x437");
MerryweatherMarquisFireEngine.images.push("https://dummyimage.com/435");
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
LotusEuropa.images.push("https://dummyimage.com/316x309");
LotusEuropa.images.push("https://dummyimage.com/316");
LotusEuropa.images.push("https://dummyimage.com/316x317");
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
ChevroletCorvette.images.push("https://dummyimage.com/232x212");
ChevroletCorvette.images.push("https://dummyimage.com/316");
ChevroletCorvette.images.push("https://dummyimage.com/316x317");
ChevroletCorvette.display("collection");
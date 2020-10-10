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
}

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
    "Bacon ipsum dolor amet fatback boudin frankfurter venison."
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
    "Rump capicola biltong bacon, shankle sirloin pancetta filet mignon."
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
    "Sirloin turkey cupim pork loin doner beef buffalo pig porchetta ribeye leberkas."
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
    "Shank kevin rump, capicola biltong chicken doner short loin pork shankle sausage pancetta."
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
    "Filet mignon short ribs boudin buffalo."
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
    "Pastrami tail prosciutto landjaeger jerky ground round."
);
ChevroletCorvette.images.push("https://dummyimage.com/232x212");
ChevroletCorvette.images.push("https://dummyimage.com/316");
ChevroletCorvette.images.push("https://dummyimage.com/316x317");
ChevroletCorvette.display("collection");
# JavaScript classes (ES5 and ES6)
 
[![](https://1.bp.blogspot.com/-eHHo40uwhEI/X4_wt1I04EI/AAAAAAAAoZ4/Wi8Z3FVke_IQJEIZ51o93W4ZqUjftSFLACLcBGAsYHQ/s400/orange_and_white_chevrolet_camaro-scopio-f4ec5a0d-39ba-4514-9e12-83a6093a3124.jpg)](https://1.bp.blogspot.com/-eHHo40uwhEI/X4_wt1I04EI/AAAAAAAAoZ4/Wi8Z3FVke_IQJEIZ51o93W4ZqUjftSFLACLcBGAsYHQ/s2048/orange_and_white_chevrolet_camaro-scopio-f4ec5a0d-39ba-4514-9e12-83a6093a3124.jpg)


<label style="display:flex; justify-content: start; align-items: center; font-family: Barlow"><a style="display:flex; align-items: center" href="https://scop.io"><img height="20x" src="https://cdn.shopify.com/s/files/1/2395/7099/t/46/assets/icon_2x.png?v=17766308506443902960" style="margin: 0px 10px 0px 0px"></a> By <a style="text-decoration: none; margin: 0px 5px;" href="/collections/vendors?q=Marco+Antonio+Martinez+Soto">Marco Antonio Martinez Soto</a></label>

Imagine you're a collector, we don't care what it is you collect; it could be matchbox cars, real cars or matchboxes. You do, however, care about cataloguing your collection and sharing its details with other collectors (after first checking your locks are secure). You've spent some time thinking about normalizing the data for inclusion in a database and crafted a secure mechanism which allows you to update your collection online. Brilliant! Now it comes to displaying your collection to your peers, how would you do that?

You could output that Database in the form of a table; each item would be a row in that table. But then you think about how else you could display it and start to get creative. You could show a card for each item, should you have pictures (and sometimes you do), you could do something fancy with a masonry layout and get them to auto flow as well. Thankfully Bootstrap v4 comes with Masonry support built-in, so you're good to go.

You know the items in your collection very well, you've spent some time thinking about them and collecting them after all. And your work on the normalized Database means that you know what their characteristics are as well. You've heard about Object-Oriented Programming (OOP), so why not turn your hand to instantiating each item in your collection as an object — now that we're getting serious, let's decide what you're collecting. To make things as easy as possible, let's decide upon matchbox toy cars.

To some extent identifying matchbox cars is dead easy, they have writing on the bottom after all. There's the name of the vehicle, the year of production; sometimes there's a number. There is also where they were built. You have some duplicates, so you'll need a field for a description so that you can distinguish between the copies. You've invested some time taking pictures and uploading them to an S3 bucket, some you've even taken multiple images of, so you'll need an array of image URIs as well, which you can display in a slideshow. That array might be empty though as you don't take a picture immediately after cataloguing them.

In the bad old days, JavaScript wasn't a class-based object-oriented language (and perhaps it still isn't), it was prototype-based, but what does that mean? JS classes used to be written as functions so that you could write your Matchbox car like this:

```javascript
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
```

Writing it that way all is not ideal though, all the details of the car are available to anyone with the developer console open. It's just not right that all those fields are available for any Tom, Dick or Harry to look at - some things should remain hidden. You know your fellow collectors and can imagine how much they'd relish pointing out a fault in your collection, so you decide to protect the data and make the attributes private. The protection of internal class variables is by no means a bullet-proof way of avoiding your fellow collectors taking the Mickey, but it'll have to do. With this in mind, you decide to add getters and setters to the object, but you're mindful that only the image field needs a setter. The image field is an array, so you need a way to add new images to the object after the object has been initialized. Once they're initiated, you only allow your items to be changed in limited ways and, in some instances, they don't need to be changed at all once instantiated. This change gives rise to this code:

```javascript
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
```

Having classes like this is all well and good, but what do you do with them once you've got them. Well, the purpose of the script is to show off your collection, so you need to display them. You decide to add a function (these are sometimes called methods in OOP) called "display" to the prototype of your object. This function is called with a target, so you can define where the items should be inserted within the DOM. This is shown in below:

```javascript
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
```

Once you've clocked that the method is creating and manipulating many HTML elements you decide to make some helper methods for creating and setting the attributes of those elements; this is the updated code:

```javascript
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
```

All is well and good, but you've been offered another collector's collection of cars for a rock-bottom bargain price and decide to take it — it is a steal at that price. Sure there are cars you've already got, but some of them are in better condition. You read through their list, hand over the cash and collect them later that day (after forgetting to tell your significant other the real price - the seller is more than happy to doctor the invoice for you). You get them home and immediately see that they were less discerning than you and had collected Dinky cars as well.

After getting over your shock, you clock that it's not all that bad and decide to expand your collection and include the new models. This lack of discernment also opens up a whole new avenue for your obsession to go down. But what to do about your Database and lovely JavaScript class. Displaying Dinky cars using your MatchboxCar class seems wrong, and there is the odd difference to take into account too. The problem of the Database is easy enough to overcome as you add another field for the maker, and maybe another for the new number (more of which later).

What to do about displaying them, though? You could create a DinkyCar class, but that would duplicate significant chunks of the code from MatchboxCar. Instead, you decide that you need an ancestor class called ToyCar from which both the MatchboxCar and DinkyCar inherit some variables and functions. Those classes with specific variables and functions can add them as required.

```javascript
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
```

Your decision to not use the model number as the primary key for the Database is supported when you start to look at the data for Dinky cars. It seems that there was a renumbering introduced in 1954 for some models, as such you want to add these new numbers, but only to the Dinky car object. You also want to distinguish whether Matchbox or Dinky made the model car, so you add a `createHeader` function to the ToyCar objects prototype which returns nothing. Both the MatchboxCar and the DinkyCar classes flesh out this stub of a function; with MatchboxCar returning a header with a green background, and DinkyCar returning a title with a red background.

```javascript
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
```

You've managed to include the four main concepts of OOP in the development of your ToyCar class. You've **encapsulated** the variables and functions within several classes. You've **abstracted** the variables of the object; protecting those variables which need to remain private. Your child classes **inherit** from a parent class. Finally, you've created some **polymorphism** in that both the MatchboxCar and DinkyCar classes override the `createHeader` stub function of the ToyCar class. Smart old stick aren't you?

The above approach should work in many, if not all, browsers. But ES2016, and later, introduced some syntactic sugar to JS classes, and we'll look at refactoring our final iteration now.

We can use the `#` prefix to denote private variables rather than creating getters and setters - though we do need to be aware that ancestors of our parent class will still need to access those private variables using a getter. This method will save a significant amount of code but does mean we need to be cautious. While as this hash notation has not yet been accepted into the standard it is widely used, and [many JavaScript engines have adopted it](https://www.sitepoint.com/javascript-private-class-fields/).

```javascript
class ToyCar {
  #id
  #model
  #num
  #brand
  #year
  #location
  #description
  #images

  constructor(id, model, num, brand, year, location, description, images = []){
    this.#id = id
    this.#model = model
    this.#num = num
    this.#brand = brand
    this.#year = year
    this.#location = location
    this.#description = description
    this.#images = Array.isArray(images) ? images : []
  }

  get num() {
    return this.#num
  }

  get brand() {
    return this.#brand
  }

  get location() {
    return this.#location
  }

  add_image(url){
    this.#images.push(url)
  }

  createHeader = () => ``

  createDefinitionPair = (dt, dd) => dd ? `
    <dt>${dt}</dt>
    <dd>${dd}</dd>
  ` : ``

  createDefinitionList = () => `
    <dl>
      ${this.createDefinitionPair('Number', this.#num)}
      ${this.createDefinitionPair('Brand', this.#brand)}
      ${this.createDefinitionPair('Made in', this.#location)}
    </dl>
  `

  createCarousel = () =>
      `<div class="carousel slide" data-ride="carousel" id="Model${this.#id}">
      <div class="carousel-inner">
        ${this.#images.map((img, i) => `
          <div class="${!i ? 'carousel-item active' : 'carousel-item'}">
            <img class="d-block w-100" src="${img}">
          </div>
        `).join('')}
      </div>
    </div>
  `

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
    `
    const domTarget = document.getElementById(target)
    domTarget.insertAdjacentHTML('afterbegin', markup)
  }
}

class MatchboxCar extends ToyCar {
  #manufacturer

  constructor(...args) {
    super(...args.splice(1))
    this.#manufacturer = [...args].shift()
  }

  createHeader = () => `
    <div class="card-header text-white bg-success font-weight-bold">
      ${this.#manufacturer}
    </div>
  `
}

class DinkyCar extends ToyCar {
  #num_new
  #manufacturer

  constructor(manufacturer, id, model, num, num_new, brand, year, location, description, images) {
    super(id, model, num, brand, year, location, description, images)
    this.#manufacturer = manufacturer
    this.#num_new = num_new
  }

  createHeader = () => `
    <div class="card-header text-white bg-danger font-weight-bold">
      ${this.#manufacturer}
    </div>
  `
  createDefinitionList = () => `
    <dl>
      ${this.createDefinitionPair('Number', this.num)}
      ${this.createDefinitionPair('Number', this.#num_new)}
      ${this.createDefinitionPair('Brand', this.brand)}
      ${this.createDefinitionPair('Made in', this.location)}
    </dl>
  `
}
```

We can also make use of template literals to remove the imperative style of creating and manipulating DOM elements. Rather than use [`append`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) as we have previously, we can instead use [`insertAdjacentHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) meaning we can avoid [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) manipulation. Quite apart from saving significant amounts of imperative code, this method allows much more readable code - you can understand what's happening simply by reading the code.

We're also taking advantage of a shortcode for using if by using the logical AND ([`&&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)) to decide if something should be displayed, as we did in the previous iteration. This method of determining the conditional rendering of elements seems to have [stemmed from React](https://reactjs.org/docs/conditional-rendering.html) and takes advantage of the fact that statements are evaluated from left to right. If the first condition resolves to true, then the following code is invoked.

That's not to say that we don't take advantage of the tertiary operator also. The method used in the preceding class failed when it came to rendering DT/DD pairs of elements with null values, and I can only think that that was down to something about the getters in the parent class. This issue is worth further research.

The MatchboxCar class, which extends or inherits from ToyCar, plays fast and loose with its arguments as we only need to pass a subset of the initial constructor arguments to the parent class, all the while retaining the first argument for the manufacturer variable. Similar occurs in the DinkyCar class, but in that instance, the `new_num` variable is nested within the arguments, so we take a more traditional approach to its super construction.

We can take advantage of [Export and Import](https://javascript.info/import-export) directives to further improve the legibility of our code. If we split up our classes into separate files, then we can export and import them only as and when required. We do need to be careful to tell the browser to be patient though, so we can inform the JavaScript engine that we're working with modules by using the type attribute on the script element and setting it to the type `module`. This modularisation does lead to far more clean looking code but will fail on earlier browsers so it might be worth using something like [rollup](https://rollupjs.org/guide/en/) - but as things stand your lovely code is only going to work well on Chrome. Firefox doesn't yet support private fields, you see - I dare say it will soon, but at present, it doesn't. Fingers crossed for the future though!

I hope you've enjoyed reading this as much as I have enjoyed writing it - it's going to be a chapter in my next book, but I thought it'd work well as a standalone piece in its own right. The working code is on [repl.it](https://repl.it/@annoyingmouse/ES5-Class-Example) so please do have a play. I've come an awful long way since answering, "OOP is a solution looking for a problem". Something I said when asked to explain what OOP was way back when in an interview - what a plonker! We've looked at the four main Object-oriented concepts ([as explained to a 6-year-old](https://www.educative.io/edpresso/object-oriented-concepts-as-explained-to-a-6-year-old))

# JS classes
 
Imagine you're a collector, we don't care what it is you collect; it could be matchbox cars, real cars or matchboxes. You do, however, care about cataloguing your collection and sharing with other collectors (after first checking your locks are secure). You've spent some time thinking about normalizing the data for inclusion in a database and crafted a secure mechanism which allows you to update your collection online. Brilliant! Now it comes to displaying your collection to your peers, how would you do that?
 
You could output that database in the form of a table; each item would be a row in that table. But then you think about how else you could display it and start to get creative. You could show a card for each item, should you have pictures (and sometimes you do), you could do something fancy with a masonry layout and get them to auto flow as well. Thankfully Bootstrap v4 comes with Masonry support built-in, so you're good to go.
 
You know the items in your collection very well, you've spent some time thinking about them and collecting them after all. And your work on the normalized database means that you know what their characteristics are as well. You've heard about Object-Oriented Programming (OOP), so why not turn your hand to instantiating each item in your collection as an object — now that we're getting serious, let's decide what you're collecting. To make things as easy as possible, let's decide upon matchbox toy cars.
 
To some extent identifying matchbox cars is dead easy, they have writing on the bottom after all. There's the name of the vehicle, the year of production; sometimes there's a number. There is also, periodically, where they were built. You have some duplicates, so you'll need a field for your description so you can distinguish between the copies. You've also invested some time taking pictures and uploading them to an S3 bucket, some you've even taken multiple images of, so you'll need an array of image URIs as well. That array might be empty though as you don't take a picture immediately after cataloguing them.

## Your first attempt
### MatchboxCar_original.js
 
In the bad old days, JavaScript wasn't a class-based object-oriented language (and perhaps it still isn't), it was prototype-based, but what does that mean? JS classes used to be written as functions so that you could write your Matchbox car like the one in the MatchboxCar_original.js file.
 
## Keeping private things private
### MatchboxCar.js
 
Writing it that way all is not ideal though, all it needs is for someone to open the developer console, remove a car, alter the attributes of the object and reattach it to the DOM, and incorrect data would appear on the page. You know your fellow collectors and can imagine how much they'd relish pointing out a fault in your collection, so you decide to protect the data and make the attributes private. This protection of internal class variables is by no means a bullet-proof way of avoiding your fellow collectors taking the Mickey, but it'll have to do. With this in mind, you decide to add getters and setters, but only the images attribute needs a setter. Once they're initiated, you only allow your items to be changed in limited ways and, in some instances, they don't need to be changed at all once instantiated. This change gives rise to the code in MatchboxCar.js.
 
Having classes like this is all well and good, but what do you do with them once you've got them. Well, the purpose of the script is to show off your collection, so you need to display them. You decide to add a function (these are sometimes called methods in OOP) called "display" to the prototype of your object. This function is called with a target, so you can define where the items should be inserted within the DOM. Again this is shown in the MatchboxCar_original.js, as well as the MatchboxCar.js. Once you've clocked that the method is creating and manipulating so many HTML elements you decide to make some helper methods for creating and setting the attributes of those elements; this updated code is in MatchboxCar.js.
 
After all your hard work, but you've been offered another collector's collection of cars for a rock-bottom bargain price and decide to take it — it is a steal at that price. Sure there are cars you've already got, but some of theirs are in better condition. You read through his list, hand over the cash and collect them later that day. You get them home and immediately see that they were less discerning than you and had collected Dinky cars as well.

## Working on inheritance
### ToyCar.js
 
After getting over your shock, you clock that it's not all that bad and decide to expand your collection and include the new models. But what to do about your database and lovely JavaScript class. Displaying Dinky cars using your MatchboxCar.js class seems wrong, and there is the odd difference to take into account too.
 
You could create a DinkyCar class, but that would duplicate significant chunks of the code from MatchboxCar. Instead, you decide that you need an ancestor class called ToyCar from which both the MatchboxCar and DinkyCar inherit variables and functions. Those classes with specific variables and functions can add them as and when required.
 
Your decision to not use the model number as the primary key for the database is supported when you start to look at the data for Dinky cars. It seems that there was a renumbering introduced in 1954 for some models, as such you want to add these new numbers, but only to the Dinky car object. You also want to distinguish whether Matchbox or Dinky made the model car, so you add a createHeader function to the ToyCar object which returns nothing. Both the MatchboxCar and the DinkyCar classes flesh out this stub of a function; with MathboxCar returning a header with a green background, and DinkyCar returning a title with a red background.

You've managed to include the four main concepts of OOP in the development of your ToyCar class. You've encapsulated the variables and functions within several classes. You've abstracted the variables of the object; protecting those variables which need to remain private. Your child classes inherit from a parent class. Finally, you've created some polymorphism in that both the MatchboxCar and DinkyCar classes override the createHeader stub function of the ToyCar class. Smart old stick aren't you?

## Adding some sugar
### ToyCarClass.js

The above approach should work in many, if not all, browsers. But ES2016, and later, introduced some syntactic sugar to JS classes, and we'll look at refactoring our final iteration now. 

We can use the `#` prefix to denote private variables rather than creating getters and setters - though we do need to be aware that ancestors of our parent class will still need to access those private variables using a getter. This method will save a significant amount of code but does mean we need to be cautious. While as this hash notation has not yet been accepted into the standard it is widely used, and [many - but not all - JavaScript engines have adopted it](https://www.sitepoint.com/javascript-private-class-fields/).

We can also make use of template literals to remove the imperative style of creating and manipulating DOM elements. Rather than use [`append`](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append) or [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) as we have previously, we can instead use [`insertAdjacentHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) meaning we can avoid [`innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML) manipulation. Quite apart from saving significant amounts of imperative code, this method allows much more readable code - you can understand what's happening simply by reading the code.

We're also taking advantage of a shortcode for using if by using the logical AND ([`&&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND)) to decide if something should be displayed, as we did in the previous iteration. This method of determining the conditional rendering of elements seems to have [stemmed from React](https://reactjs.org/docs/conditional-rendering.html) and takes advantage of the fact that statements are evaluated from left to right. If the first condition resolves to true, then the following code is invoked.

That's not to say that we don't take advantage of the tertiary operator also. The method used in the preceding class failed when it came to rendering DT/DD pairs of elements with null values, and I can only think that that was down to something about the getters in the parent class. This issue is worth further research - but is beyond the scope of this work.

The MatchboxCar class, which extends or inherits from ToyCar, plays fast and loose with its arguments as we only need to pass a subset of the initial constructor arguments to the parent class, all the while retaining the first argument for the manufacturer variable. Similar occurs in the DinkyCar class, but in that instance, the new_num variable is nested within the arguments, so we take a more traditional approach.

## Time to break things down.
### index.js

We can take advantage of [export and import directives](https://javascript.info/import-export) to further improve the legibility of our code. If we split up our classes into separate files, then we can export and import them only as and when required. We do need to be careful to tell the browser to be patient though, so we can inform the JavaScript engine that we're working with modules by using the type attribute on the script element and setting it to the type `module`. This modularisation does lead to far more clean looking code but will fail on earlier browsers so it might be worth using something like rollup - but as things stand your lovely code is only going to work well on Chrome. Firefox doesn't yet support private fields, you see - I dare say it will soon, but at present, it doesn't.


 
 
 
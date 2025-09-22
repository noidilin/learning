// rest pattern

"use strict";

const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: { open: 12, close: 22 },
    fri: { open: 11, close: 23 },
    // open 24 hours
    sat: { open: 0, close: 24 },
  },

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // expecting one object as arguments, then destructuring varibles from it
  orderDelivery: function ({
    starterIndex = 1, // set default
    mainIndex = 1, // set default
    time = "20:00", // set default
    address,
  }) {
    console.log(
      `order received: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}.`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  
  orderPizza: function(mainIngredient, ...otherIngredients) {
    return [mainIngredient, otherIngredients];
  }
};

// spread, because on Right side of equal sign
const arr = [1, 2, ...[3, 4]];
// rest, because on left side of equal sign 
const [a, b, ...c] = [1, 2, 3, 4, 5];
a;
c;

// arrays
const [pizza, , risotto, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu];
pizza;
otherFood;

// objects
const {sat, ...weekdays} = restaurant.openingHours;
weekdays;

/* Function */
const add = function (...numbers) {
  let sum = 0;
  for(let i = 0; i<numbers.length; i++) sum += numbers[i];
  return sum;
}

add(2,3);
add(5,3,4,2);
add(8,2,5,3,2,7,8,1);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
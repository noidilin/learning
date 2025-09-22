// spread operator

'use strict'

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
  
  orderPasta: function(ing1, ing2, ing3) {
    console.log(`here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`);
  }
};

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
const newArr = [1, 2, ...arr];

badNewArr;
newArr;
console.log(...newArr);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
newMenu;

// copy array
const mainMenuCopy = [...restaurant.mainMenu];
mainMenuCopy;

// join 2 arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];
menu;

// 
const ingredients = ['mushrooms', 'aspargus', 'cheese'];
restaurant.orderPasta(...ingredients);

// copy object
const newRestaurant = { founding: 1998, ...restaurant, founder: 'Guiseppe' }
newRestaurant;

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
restaurant.name;
restaurantCopy.name;


































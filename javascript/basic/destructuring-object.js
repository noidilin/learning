// destructuring objects

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
};

// use the original field name
const { name, openingHours, categories } = restaurant;
name;
openingHours;
categories;

// use custom name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
restaurantName;
hours;
tags;

// default value
const { menu = [], starterMenu: starters = [] } = restaurant;
menu; // not exist
starters;

// mutating variables
let a = 111;
let b = 999;
const obj = { a: 256, b: 512, c: 1024 };
// {a, b} = obj;
/* 
start the line with {} will confuse JS engine into thinking that this is a statement block. Therefore, we need to wrap this line into a (), just like what we did for  IIFE.
*/
({ a, b } = obj);
a;
b;

// nested objects, custom name
const {
  fri: { open: oHour, close: cHour },
} = restaurant.openingHours;
oHour;
cHour;

restaurant.orderDelivery({
  time: "22:30",
  address: "Via del Sole, 21",
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: "xinhua 1st street",
})

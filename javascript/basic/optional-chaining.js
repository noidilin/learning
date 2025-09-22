// optionnal chaining ?.

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

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
  
  orderPizza: function(mainIngredient, ...otherIngredients) {
    return [mainIngredient, otherIngredients];
  }
};

// result in reference error
// openingHours.mon.open

restaurant.openingHours.mon?.open;
restaurant.openingHours?.mon?.open;

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0,1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0,1) ?? 'Method does not exist');

// Arrays
const users = [{name: 'Jonas', email: 'hello@jonas.io'}];
console.log(users[0]?.name ?? 'User array empty');

// is the same as
if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');
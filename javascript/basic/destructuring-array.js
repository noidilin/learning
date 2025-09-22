// destructuring arrays

"use strict";

/* array destructuring */
const arr = [1, 2, 3];
const [x, y, z] = arr;
x;
y;
z;

// nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
i;
j;
k;

// default value
const [p = 1, q = 1, r = 1] = [8, 9];
p;
q;
r;

/* destructuring example */
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

// array
restaurant.order(2, 0); // return array
const [starter, main] = restaurant.order(2, 0);
starter;
main;

// skip third value
let [first, second, , fourth] = restaurant.categories;
first;
second;
fourth;

// switch variable value
[first, fourth] = [fourth, first];
first;
fourth;

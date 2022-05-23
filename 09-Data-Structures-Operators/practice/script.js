'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  }
};


// Destructuring은 ESX의 기능으로, 기본적으로 배열이나 객체에서 별도의 변수로 값을 푸는 방식을 말한다.

// Array destructure
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr; // array를 한 번에 분해 
console.log(x, y, z); // 2, 3, 4
console.log(arr); // [2, 3, 4] 실제 array 변수는 파괴되지 않는다.

// 순서대로 갖는 게 아니라 skip하고 싶으면 공란으로 두면 된다.
const [first, , second] = restaurant.categories;
console.log(first, second); // Italian, Vegeterain


// array destructring으로 쉽게 두 변수 간의 값 바꾸기가 이루어진다.
let [main, , secondary] = restaurant.categories;

// 기존의 방식 - temp라는 중간 변수를 사용하여 변경
// const temp = main;
// main = secondary;
// secondary = temp;

// array destructure 사용
[main, secondary] = [secondary, main];


// array를 return하는 함수에 분해 할당 (destructuring assignment)
const [starter, mainCourse] = restaurant.order(2, 0);


// 중첩된 array destructuring
const nested = [3, 4, [5, 6]];
// const [i, ,j] = nested;
// console.log(i, j); // 3, [5, 6]

const [i, , [j, k]] = nested;
console.log(i, j, k); // 3, 5, 6
// -> Destructuring 내부에서 Destructuring을 수행해야 한다.


// default value
// array의 길이를 모르는 경우, 해당 값이 없을 경우를 대비해서 기본값을 미리 지정할 수 있다.
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
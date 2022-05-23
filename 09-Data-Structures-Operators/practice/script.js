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
  },

  orderDelivery: function(starterIndex = 1, mainIndex = 0, time = '20:00', address) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  }
};






////////////////////////////////////////////////////////

/* [9-103] Array Destructuring (구조분해 할당)
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

*/
////////////////////////////////////////////////////////




/* [9-104] Object Destructuring


// object의 분해는 이렇게 중괄호로 이루어진다.
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// 변수 이름을 다르게 해서 분해를 하고 싶다면 속성 이름 참조와 :(콜론)을 이용하면 된다.
const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;
console.llog(restaurantName, hours, tags);


// default value를 설정할 수 있다.
const { menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters); // menu는 빈 array로 나옴.
// default value 없이 아무 값도 없는 경우엔 undefined가 출력된다.
// 외부에서 데이터를 가지고 오는 경우 (ex: 서버) 데이터가 어떻게 보이는 지 정확히 모를 수 있으므로 이처럼 기본값을 설정하는 것이 유용하다.


// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14};
({ a, b } = obj); 
console.log(a, b); // 23, 7
// JS는 중괄호로 줄을 시작할 때 코드 블록을 예상한다. 그리고 코드 블록에는 아무것도 할당할 수 없기 때문에 등호'='를 하면 오류가 발생한다. 이를 해결하는 비결은 코드를 괄호'()'로 묶는 것이다.


// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); // 11, 23



// JS의 함수는 객체를 받으면 즉시 구조 분해(destructuring)를 수행한 후 parameter와 일치한 값을 해당 위치에 전달한다.
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});
// 함수 인자에 default value를 설정할 수 있다. 
// 함수의 매개변수가 많을 경우(복잡할 경우) 일일이 지정하기 어려울 수 있다. 이럴 때를 위해 기본값을 설정해두면 편하다.
*/



// Spread Operator는 기본적으로 모든 Array 요소를 한 번에 푼다.
const arr = [7, 8, 9];
const badNewArr = [1, 2, a[0], a[1], a[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
const newArr2 = [1, 2, arr]; // [1, 2, [7, 8, 9]]
console.log(newArr); // [1, 2, 7, 8, 9]
console.log(...newArr); // 1, 2, 7, 8, 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);
// 스프레드 연산자는 destructuring처럼 배열에서 요소를 가져오지만, 차이점으로 새로운 변수를 생성하지 않는다.

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];



// 스프레드 연산자는 배열에서 작동하는 것처럼 보이지만, 사실 iterable에서 작동한다.
// iterables are things like all arrays, strings, maps or sets but not objects.
// -> string도 스프레드 연산자가 가능하다.
const str = 'yosep';
const letters = [...str, ' ', 's.'];
console.log(letters); // ['y', 'o', 's', 'e', 'p', ' ', 's.']


// 쉼표로 구분 된 여러 값을 필요로하는 곳일 경우에만 스프레드 연산자를 사용하고, 그 외에는 에러가 뜬다.
// -> 함수에 인수를 전달할 때, 새 array를 만들 때
console.log(...str); // OK
// console.log(`${...str}`) // ERROR


// 스프레드 연산자를 함수에 인수를 전달할 때 사용하는 경우
const ingredient = [
  mushromms,
  asparagus,
  cheese,
]

restaurant.orderPasta(ingredient[0], ingredient[1], ingredient[2]);
restaurant.orderPasta(...ingredient); // 위와 동일한 결과
// 함수의 인자도 comma',' separated이기 때문에 array 생성에서와 마찬가지로 스프레드 연산자를 사용할 수 있다.



// ES2018 스프레드 연산자 -> 객체가 iterable하진 않아도 스프레드 연산자 사용 가능
// Objects
// 기존의 object를 가져온 후, 거기에 새로운 속성(property)을 더 추가할 수 있다.
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe'};
console.log(newRestaurant);

// obeject copy
const restaurantCopy = {...restaurant};
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name); // Ristorante Roma
console.log(restaurant.name); // Classico Italiano

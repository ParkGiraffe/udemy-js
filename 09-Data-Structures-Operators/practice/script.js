'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section



// property의 이름을 계산(compute)해서 설정할 수 있다. 
// 계산을 위해서 []대괄호를 넣는다.

const weekdays = ['mon','tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  sun: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // 기존의 방식
  // openingHours: openingHours,

  // ES6 enhanced object literals
  openingHours, // object 변수를 그대로 집어넣어서 하위 property 생성


  // 기존의 방식
  // order: function(starterIndex, mainIndex) {
  //   return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  // },

  // ES6 enhanced object literals
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery(starterIndex = 1, mainIndex = 0, time = '20:00', address) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`);
  },

  orderPizza(mainIngredient, ...otherIngredients) { // 첫 번째 이외에 사용하지 않은 모든 인자가 otherIngredients로 들어간다.
    console.log(mainIngredient); // mushrooms
    console.log(otherIngredients); // 나머지 요소들이 array로 출력
    
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


/* [9-105] The Spread Operator (...)

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
*/


  

/*
// [9-106] Rest Pattern and Parameters
// 스프레드 연산자처럼 '...'을 사용하지만, 실제로는 스프레드 연산자와 반대된다.
// 스프레드 연산자는 배열을 개별요소로 확장한다면, Rest(나머지) 패턴은 요소를 수집해서 배열로 압축한다.


// SPREAD, beacause on RIGHT side of =
const arr = [1, 2, ...[3, 4]];



// REST, beacause on LEFT side of =
// 1) Destructuring
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]
// REST(나머지) Pattern 배열의 나머지 요소를 새 배열에 넣는다.

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); // Pizza, Risotto, [나머지 음식들] <- 스킵한 요소는 포함되지 않음.



// Objects
// 레스토랑에서 주말 말고 평일에만 일하고 싶기 때문에 토요일을 빼려고 할 경우
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays); // {fri: {}, thu: {}}



// 2) Functions
const add = function(...numbers) {
  console.log(numbers); // 전달 받은 인자들이 array로 묶여있는 것을 확인할 수 있다.
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
// 임의의 양의 인수를 전달하는 경우에 REST Pattern


// 만약에 array를 전달하고자 한다면?
const x = [23, 5, 7];
add(...x);
// SPREAD로 풀어서 넣어주면 된다. REST와 SPREAD는 서로 반대됨을 기억하자!


// 실제 응용
restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms') // 이럴 경우 REST PATTERN에 들어갈 요소가 없어서 빈 배열을 내보낸다.

*/



/*
// [9-107] Short Circuiting (&& and II)

// Use ANY Data Ttype, return ANY data type.
// short-circuiting (단락)


// OR 연산자
// OR 연산자의 경우, 단락의 첫 번째 값이 true이면, 즉시 첫 번째 값을 반환한다.
// JS는 OR 연산자 단락에서 하나만 참이면 전부 참이기 때문에, 참을 만나면 바로 evaluation 한다.
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // Jonas
console.log(true || 0); // true
console.log(undefined || null); // null
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello


//restaurant.numGuests는 존재하지 않는 property이다.
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10; // 존재하지 않을 경우를 대비해 10을
console.log(guests1); // 10

// 삼항 연산자를 OR 연산자로 대체
const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10

// 이 방식의 문제점! 만약 레스토랑의 실제 게스트멤버 수가 0일 경우에도 기본값 10을 출력한다는 문제가 있다.
// 다음 강의에서 이 문제에 대해 해결책을 모색할 예정



// AND 연산자
// AND 연산자는 OR과 반대되는 방식으로 작동한다.

console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // Jonas
// 첫 번째 값이 거짓이면 바로 그 거짓인 값을 return
// 모두 참이면, 마지막 값을 return

// OR은 참인 값이 보일 때까지, AND는 거짓인 값이 보일 때까지


// 응용
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
// 해당하는 property나 value가 존재하는 지를 미리 체크하기 위해 if문을 위처럼 사용한다.
// 이럴 때 AND 연산자를 사용하면 좋다.

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

// OR연산자로 기본값을 설정하고, AND연산자로 속성의 존재 여부를 검사하고 두 번째 단락에서 실행할 수 있다.
*/



/*
// [9-108] The Nullish Coalescing Operator (??)
// Nullish Coalescing Operator는 ES2020에 도입된 Operator이다.

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // 10
// 위와 같은 경우 10을 출력한다는 것이 OR 연산자의 문제였다.

// Nullish: null and undefined (NOT 0 or '');
// 0과 ''를 제외하고 Short Circuiting evaluation 실행
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 0
// OR 연산자를 대체한다.
*/

/*
// [9-109] Logical Assignment Operators
// ES2021에 추가된 현대적인 논리 할당 연산자들


const restaurant1 = {
  name: 'Capri',
  numGuests: 20,
};

const restaurant2 = {
  name: 'La Pizza',
  owner: 'Giovanni Rossi',
};

// OR assignment Operator
restaurant1.numGuests = restaurant1.numGuests || 10;
restaurant2.numGuests = restaurant2.numGuests || 10;

// 위와 같은 코드를 좀 더 짧게 쓰게 해주는 연산자이다.
restaurant1.numGuests ||= 10;
restaurant2.numGuests ||= 10;


// logical nullish assignment operator 또한 존재한다.
const restaurant3 = {
  name: 'Capri',
  numGuests: 0,
};

restaurant3.numGuests ||= 10;


// AND 연산자 역시 assignment operator가 있다.
// AND연산자를 이용해서 레스토랑 주인의 이름을 익명화하기
restaurant2.owner = restaurant2.owner && '<ANONYMOUS>';
restaurant2.owner &&= '<ANONYMOUS>';
*/


/*
// [9-110] Coding Challenge #1

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
const [players1, players2] = game.players;

// 2.
const [gk, ...fieldPlayers] = players1;

// 3.
const allPlayers = [...players1, ...players2];

// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];

// 5.
const {team1: team1, x: draw, team2: team2} = game.odds;

// 6.
const printGoals = function(...players) {
    console.log(players);
    console.log(`${players.length} goals were scored`);
};
printGoals(game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win')
team1 > team2 && console.log('Team 2 is more likely to win')
*/


/*
// [9-111] Looping Arrays: The for-of Loop
// for-of 구문은 배열의 각 요소에 대한 액세스를 제공한다. (python의 for-in과 비슷해보임)
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu) console.log(item);

for (const item of menu.entries()) {
  console.log(item);
}
// entreis()의 출력문

for (const [e, el] of menu.entries()) {
  console.log(`${e + 1} : ${el}`);
}
// 해당 코드의 출력문
*/


// [9-112] Enhanced Object Literals


/* 
// [9-113] Optional Chaining (?.)

// mon은 선언되지 않은 상황이다.
console.log(restaurant.openingHours.mon.open); // TypeError: undefined
// 웹 API로 데이터를 받아올 경우 위처럼 해당 데이터가 없거나 안 불러와지는 경우가 있다.

// 그래서 대안으로 if문을 사용했었다.
// 하지만 너무 길고 복잡하다.
if (restaurant.openingHours && restaurant.openingHours.mon) console.log(restaurant.openingHours.mon.open);


// ES2020은 이에 대한 솔루션을 제공한다.
// 그것은 바로 optional chaining이다.
// optional chaining은 certain property가 존재하지 않는 경우 undefined를 return한다.

// WITH optional chaining
console.log(restaurant.openingHours?.mon?.open);
// optional chaining은 undefined와 null일 경우 작동을 중단한다.


// Example
const days = ['mon','tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of dyas) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // fundamental에서 배운 내용 -> expression을 이용해서 이름을 설정하려면 []대괄호 사용
  console.log(`On ${day}, we open at ${open}`);
}


// Methods
// optional chaining으로 method의 유무를 확인할 수 있다.
// 그리고 nullish coalescing operator를 사용해서 해당 메소드가 없을 알려주면 좋다.
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');



// Arrays
// optional chaining을 이용해서 해당 array 안에 element가 있는 지를 검사
const users = [{name: 'Jonas', email: 'ewqrqwe@qwerqwer.com'}];
console.log(users[0]?.name || 'User array empty.');
*/





/*
// [9-114] Looping Objects: Object Keys, Values, and Entries
// Object 예약어를 이용해서 object loop 만들기

// Property NAMES = KEYS
const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat'] 

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr); 
// Object.keys(objectName)는 해당 object의 키 값을 array로 return한다.


// Property VALUES
const values = Object.values(openingHours);
console.log(values); 
// [해당 값들을 array로 return]


// Entire Object
// entries는 이름과 값을 함께 가지는 것
const entries = Object.entries(openingHours); // entries = openingHours.entries()

for (const [key, {open, close}] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
// [key, value]를 element로 가지는 array를 반환 -> 이중 array 반환
*/



/*
// [9-115] Coding Challenge #2

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


// 1.
for(const [number, player] of game.scored.entries()) {
  console.log(`Goal ${number + 1} : ${player}`);
}

// 2.
let sum = 0;
const odds = Object.values(game.odds);
for(i of odds) {
  sum += i;
}
const average = sum / odds.length;

// 3.
for ({team, ratio} of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr}: ${ratio}`);
}

// 4.
const scorers = {};
for (player of game.scored) {
  scorers[player] ? scorers[player]++ : scorers[player] = 1;
}
*/



/*
// [9-116] Sets
// ES6 배열과 객체 이외에 두 가지 데이터 구조가 추가되었다.
// 바로 Sets와 Map이다.
// Sets는 unique value의 collection이다.
// new Set()안에는 iterable을 인수로 받는다.
// 중복된 값이 있을 경우, 따로 저장하는 것이 아니라 하나로만 저장된다.
const orderSet = new Set([
  'Pasta',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
  'Risotto',
]);
console.log(orderSet); // {"Pasta", "Pizza", "Risotto"}
// 키-값 쌍이 없고, 배열과 비슷해 보인다. 집합도 iterable이다. 
// 하지만 배열과 매우 다르다. 
// 1. 고유한 값을 가진다. (중복값이 없다.)
// 2. 순서의 의미가 없다.


// String도 iterable하기 때문에 set으로 분리할 수 있다.
console.log('Yosep'); 


// Set의 크기는 size property로 알 수 있다. NOT length
console.log(orderSet.size); // 3


// element 검색은 has method로 알 수 있다. array의 include mothod와 유사
console.log(orderSet.has('Pizza')); // true
console.log(orderSet.has('Bread')); // false


// element 추가 - add method
// 참고로 똑같은 걸 더 추가해도 set 내부 요소는 바뀌는 것이 없다.
orderSet.add('Garlic Bread');


// element 삭제 - delete method
orderSet.delete('Risotto');


// Set에는 인덱스가 없다.
console.log(orderSet[0]); // undefined
// Set의 의미를 이해해야 할 필요가 있다. set는 모든 값이 고유하기 때문에 순서가 의미가 없다. 그리고 해당 데이터를 set에서 가져올 필요가 없다. 그저 세트에 그 특정 값이 있는지에 대한 여부만 중요하다. 그래서 has method를 가지고 있는 것이다. element를 가져올 필요가 있다면 array를 쓰면 되는 것이다.


// Set 안의 모든 요소 삭제 - clear method
orderSet.clear(); // {}


// iterable하기 때문에 for문도 사용 가능하다
for (const order of orderSet) console.log(order);


// 그리고 iterable의 특성을 이용해서 spread 연산자를 사용할 수 있다.
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique); // ["Waiter", "Chef", "Manager"]



// Set과 size property를 이용해서 array나 String 중 고유한 요소의 개수를 찾기
console.log(new Set('yosep'.size)); // 5
*/


/*
// [9-117] Maps: Fundamentals
// Map은 값을 키에 매핑하는 데 사용한다.
// 그래서 객체처럼 '키-값'을 가진다. 객체와의 차이는 맵의 키는 모든 유형을 가질 수 있다는 것이다. (객체의 키는 항상 String)

// Map을 채우기 위해서 set method를 사용
// mapName.set(키, 값)
// set 메서드는 map을 업데이트 할 뿐만 아니라, map을 return 한다.
const rest = new Map();
rest.set('name', 'Classico Italino');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));


// .set method를 한 번에 여러 번 불러올 수도 있다.
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');


// get method를 이용해서 key에 해당하는 value를 가져올 수 있다. (데이터 타입도 일치시켜야 한다!)
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));




// example (해당 방식으로 패턴을 남발하면 복잡하니까, 이해하는 용도로만 쓰자.)
const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// has method - 해당 key의 유무에 따라 boolean값 return
console.log(rest.has('categories')); // true

// delete method - key값을 기반으로 요소 삭제
rest.delete(2);

// size property
console.log(rest.size);

// clear method - 내부 요소 전부 삭제
rest.clear();


// 배열과 객체를 Map key로
rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // undefined
// [1, 2]로 검색하면 값을 잘 불러올 거 같지만 undefined를 출력한다. JS의 object type에 따라 두 [1, 2]는 같은 요소를 가진 array지만 heap에서는 같은 객체가 아닌 것으로 인식되기 때문이다. 그래서 잘 작동하게 하려면, set()에 들어갈 key array를 변수에 저장해주어야 한다. 그러면 동일한 메모리 위치를 참조하기 때문이다.
const arr = [1, 3];
rest.set(arr, 'Test');
console.log(rest.get(arr)); // undefined

// 객체도 Map key
rest.set(document.querySelector('h1'), 'Heading');
*/






// [9-118] Maps: Iteration
// 2중 Array를 map으로
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);


// Convert object to map
// Object.entries()를 이용한 2중 array를 map으로
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);


// map은 key값을 가지지만 그자체로 iterable하기 때문에 Object.entries()와 같은 과정 없이 바로 for문을 적용할 수 있다.
// destructuring을 할 때 [] 대괄호 사용
console.log(question.get('question'));
for ([key, value] of question) {
  if (typeof key === 'number') {
    console.log(`Answer ${key}: ${value}`);
  }
}
const answer = Number(prompt('Your answer'));
console.log(answer);

//answer === question.get('correct') ? console.log(question.get(true)) : console.log(question.get(false));
console.log(question.get(answer === question.get('correct'))); // 선생님의 답



// Convert map to array - 스프레드 연산자를 사용한 후 []로 감싸면 array로 다시 만들어진다.
console.log([...question]);
console.log([...question.key()]);
console.log([...question.values()]);

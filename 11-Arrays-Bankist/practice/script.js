'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// [Bankist]


const displayMovements = function(movements) {
  containerMovements.innerHTML = ``; // 기존에 있던 template 요소들을 모두 초기화
  
  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);







/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////



/*
// [11-142] Simple Array Methods
let arr = ['a', 'b', 'c', 'd', 'e'];

// slice(자르기를 시작할 위치, 끝 위치(포함X)) - 원래 배열을 변경하지 않고, 일부를 추출
arr.slice(2); // c d e 
arr.slice(2, 4); // c d
arr.slice(-2); // d e
arr.slice(1, -2);  // b c
arr.slice() // a b c d e <- slice를 이용해서 배열 복사 가능.
([...arr]) // a b c d e <- 또 다른 배열 복사 방법

// splice(시작지점, 추출할 요소의 개수) - slice와는 다르게 추출한 후 원래 배열에도 변동이 생긴다. 그리고 두 번째 파라미터도 다르다. 시작지점으로부터 몇 개를 없앨 것인지를 의미한다.
arr.splice(2); // c, d, e
arr.splice(arr); // a, b

arr.splice(-1); // e / [a b c d]

arr.splice(1, 2); // b c / a d e

// reverse() - 배열 순서 뒤집기, 원본 배열에도 영향을 준다. 
// let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h' ,'g', 'f'];
console.log(arr2.reverse()); // f g h i j
console.log(arr2); // f g h i j


// concat() - 두 배열을 연결
const letters = arr.concat(arr2);
console.log(letters); // a b c d e f g h i j
console.log([...arr, ...arr2]); // a b c d e f g h i j

// join() - 요소들을 결합하여 String으로 만듦.
console.log(letters.join(' - '))
*/

/*
// [11-143] The New at Method
// at은 대괄호 표기법과 유사해보인다.
const arr = [23, 11, 64];
console.log(arr[0]); // 23
console.log(arr.at(0)); // 23


// 배열의 길이를 모른다고 가정할 때, 맨 마지막 요소에 접근하는 방법.
console.log(arr[arr.length - 1]); // 64
console.log(arr.slice(-1)[0]); // 64

console.log(arr.at(-1)); // 64
console.log(arr.at(-2)); // 11
// 또, at 메소드는 'method chaining'에도 적합하다.


// at 메소드는 String에서도 작동한다.
console.log('jonas').at(0); // j
*/

/*
// [11-144] Looping Arrays: ForEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${movement}`);
  }
}


// forEach()는 High level function으로 콜백 함수가 필요하다.
// 콜백 함수는 가 배열의 요소가 반복될 때 실행된다.
// 배열의 요소는 콜백 함수의 인자로 전달된다. 
movements.forEach(function(movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${movement}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(-400)
// ...



// forEach를 통해 인덱스 정보를 가져오는 건 기존의 entries() 방식보다 더 편하다.
// forEach는 콜백함수의 매개변수 목록에 현재 element, index, 전체 배열을 전달한다. (순서 중요!)
// entries()는 인덱스, 현재 요소 순으로 forEach()와 순서가 반대된다. 
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...


// forEach문과 for문을 각각 언제 써야 할까? 
// forEach문에서는 break, continue가 작동하지 않는다. 따라서 forEach는 항상 전체 배열을 반복한다. 따라서 루프에서 꼭 벗어나야 하는 경우 for 문을 사용해야 한다.
// 그 외에는 개인 취향에 달렸다.
*/

/*
// [11-145] ForEach with Maps and Sets
// map의 forEach()의 콜백함수도 세 개의 인자를 받는다. 첫 번째는 배열의 현재 요소, 두 번째는 인덱스, 세 번째는 전체 맵이다.
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});


// Set - Set은 키, 인덱스의 개념이 없다. 하지만 forEach의 콜백함수 매개변수 종류가 데이터 타입마다 달라지면 혼동이 올 수 있다고 판단하여, 두 번째 파라미터를 그대로 유지시킨 후 첫 번째 것(value)과 같은 값이 들어가도록 설정했다.
const currenciesUnique = newSet(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`); // USD: USD // GBP: GBP // EUR: EUR
});
currenciesUnique.forEach(function(value, _, map) {
  console.log(`${value}: ${value}`); // USD: USD // GBP: GBP // EUR: EUR
});
*/
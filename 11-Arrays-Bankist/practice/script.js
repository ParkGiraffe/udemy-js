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

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = ``; // 기존에 있던 template 요소들을 모두 초기화

  const movs = sort? movements.slice().sort((a, b) => a - b) : movements; // sort()는 기존 배열에 영향을 주기 때문에, slice()를 이용해서 복사한 후 복사본을 수정

  movs.forEach(function(mov, i) {
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
// displayMovements(account1.movements);


// 각 account에 username(이름의 이니셜) property를 추가해주는 함수
// map을 이용해 기존 어레이에 영향을 주지 않으면서 새로운 어레이를 반환함.
// forEach통해 기존 어레이에 변동사항을 바로 적용시킴.
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  });
};
createUsernames(accounts);

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(acc) {
  const movements = acc.movements
  const incomes = movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${out}€`;

  const interest = movements.filter(mov => mov > 0).map(mov => (mov * acc.interestRate) / 100).filter((int, i, arr) => {
    console.log(arr);
    return int >= 1;
  }). reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}
// calcDisplaySummary(account1.movements);

function updateUI(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
};


// Event Handler
let currentAccount;

// 콜백함수에 preventDefault() 메소드를 부르면, 기본값으로 콜백함수가 작동하지 않도록 방지해준다.
btnLogin.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent form from submitting

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('LOGIN')
    // Display UI and message
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // Clear input field
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur(); // 아이디, 비밀번호 입력 칸에 키보드가 focus되어 있는 모습을 방지해준다.
    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('-----LOGIN FAILED-----');
  }
});




btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the Transfer
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  } else {
    console.log('Transfer failed');
  }
});


btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add Movement
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }

  inputLoanAmount = '';
});


btnClose.addEventListener('click', function(e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      console.log(index);

      // Delete Account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0;
    }

    inputClosePin = inputCloseUsername = '';
});




let sorted = false;
btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/*
const eurToUsd = 1.1;
// PIPELINE
// 이런 식으로 코딩했다가 중간에 문제가 발생한다면 고치기가 까다롭다.
// 그래서 중간에 map()이 콜백함수에 전체 배열을 전달하는 것을 이용해서 검사할 수 있다.
const totalDepositsUSD = movements.filter(mov => mov > 0).map((mov, i, arr) => {
  console.log(totalDepositsUSD);
  mov * eurToUsd;
}).reduce((acc, mov) => acc + mov, 0); 
*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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


/*
// [11-148] Coding Challenge #1

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

*/

/*
// [11-150] The Map method
// map()함수는 콜백함수를 인자로 받고, 모든 요소가 반복을 돌면서 콜백함수가 실행되게 끔 한다.
// 그리고 새 어레이를 리턴한다. (기존 어레이에 영향을 주진 않는다.)

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);


// map()도 forEach()처럼 콜백함수에 (mov, i ,arr)을 전달한다.
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);
// forEach와 map의 차이 : forEach 메서드는 단순히 반복문을 대체하기 위한 함수이고, (forEach의 반환값은 언제다 undefined) map 메서드는 요소값을 다른 값으로 mapping한 새로운 배열을 생성하기 위한 고차함수다. (그래서 map은 return이 꼭 필요) 
// 도움이 되는 링크 : https://d-cron.tistory.com/11
*/



// [11-151] Computing Usernames



/*
// [11-152] The filter Method
// filter()는 특정 조건을 만족하는 요소들로 이루어진 배열을 리턴한다. 콜백함수를 인자로 받는다. 그리고 콜백함수가 true를 리턴하는 경우 새 array에 추가된다.
const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// for문으로 만든다면?
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);
*/

/*
// [11-153] The reduce Method
// Reduce()는 모든 배열 요소를 하나의 단일 값으로 만든다.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// reduce함수의 파라미터: 콜백함수, 콜백함수에 들어갈 accumulator의 초기 값.
// reduce의 콜백함수 파라미터: accumulator, 현재 요소, 현재 인덱스, 전체 배열
// accumulator: 리턴하고자 하는 하나의 값으로 눈덩이와 같이 하나씩 축전되어 가는 값이다.
const balance = movements.reduce(function(acc, cur, i, arr) {
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance); // 3840 

// for 문으로 본다면,
let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);


// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max); // 3000
*/

/*
// [11-154] Coding Challenge #2
const calcAverageHumanAge= function(ages) {
  const humanAges = ages.map((age => (age <= 2 ? 2 * age: 16 + age * 4)));
  const adults = humanAges.filter(age => age >= 18);
  // const average = adults.reduce((acc, mov) => acc + mov, 0) / adults.length;
  const average = adults.reduce((acc, mov, i, arr) => acc + mov / arr.length);

  return average;
};
*/

/*
// [11-156] Coding Challenge #3

const calcAverageHumanAge = (ages) => {
  const average = ages.map((age => (age <= 2 ? 2 * age: 16 + age * 4)))
    .filter(age => age >= 18)
    .reduce((acc, mov, i, arr) => acc + mov / arr.length, 0);

  return average;
};
*/

/*
// [11-157] The find Method
// find()는 filter()처럼 bool을 반환하는 콜백함수를 인자로 받는다. 하지만 새 배열을 반환하지 않는다. 오로지 '첫 번째 요소'만을 반환한다.
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal); // -400 

// 실제 응용
// 특정 property value를 가지고 있는 object를 찾을 때 정말 탁월하다.
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/

/*
// [11-161] some and every

// includes: Equality
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.includes(-130)); // true

// some: Condition - 해당 조건을 만족하는 요소가 하나라도 있으면 true 반환
const anyDeposits = movements.some(mov => mov > 1500);
console.log(anyDeposits); // true

// every: 모든 요소가 참일 때 참 return
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // account4는 오로지 입금만 있는 계정. true

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/

/*
// [11-162] flat and flatMap
// flat: nested array 제거. 배열을 1차로 평평하게.
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // [1, 2, 3, 4, 5, 6, 7, 8]

// 기본적으로는 1단계 깊이를 flat하는데, 인수를 줌으로써 n단계 깊이까지 flat할 수 있다.
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8]

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap : flat과 map을 동시에 작업해주는 method이다. 
// flatMap의 주의점! : 무조건 한 단계 깊이만을 flat하기 때문에 그 이상의 깊이는 기존의 flat method를 사용해야 한다.
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

*/

/*
// [11-163] sorting Arrays
// sort는 array를 정렬해준다.
// sort()의 특징 - 원본 배열에도 영향을 준다.
const owners = ['j', 'z', 'a', 'm'];
owners.sort();
console.log(owners) // [a, j ,m ,z] <- 원본도 변형된 모습.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort()); // [-130, - 400, -650, -1300, 200, 3000, 450, 70] <-우리가 기대하는 방식으로 정렬되어 있지 않다.

// Js의 sort() 디폴트는 모든 요소를 String으로 바꾼 다음에 정렬을 수행하기 때문에 이런 문제가 발생한다.
// 이런 현상을 막기 위해선 sort()에 콜백 함수(bool 값을 return)를 전달해야 한다.

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// Ascending
movements.sort((a, b) => {
  if (a > b)
    return 1;
  if (b > a)
    return -1; 
}); 
// 위의 표현식을 수학으로 표현
movements.sort((a, b) => a - b); 
// 음수가 나올 경우 -1로 반환된다.

// Descending
movements.sort((a, b) => {
  if (a > b)
    return -1;
  if (b > a)
    return 1; 
});
movements.sort((a, b) => b - a); 

// sort()를 string과 number가 혼합된 배열에서는 사용할 수 없다.
*/

/*
// [11-164] More ways of creating and filling arrays
// Array()를 이용해 새로운 배열을 만들 경우, 인자를 number로 주면, 그 number의 수만큼 빈 요소를 가진 새 배열을 만든다.
const x = new Array(7);
console.log(x); // [empty x 7]
// [7]이 아니다.

// fill(채우고자 하는 숫자, 채우기 시작할 index, 최종 index(포함x)) 
// 기존에 있던 요소도 덮어서 채운다.
x.fill(1); // [1,1,1,1,1,1,1]
x.fill(1, 3, 5);
arr.fill(23, 2, 6)


// Array.from() - Array constructor에 from 메소드를 사용
const y = Array.from({length: 7}, () => 1); // [1,1,1,1,1,1,1]

// 콜백함수의 첫 번째 인자: 현재 요소, 두 번째 인자: 현재 인덱스
const z = Array.from({length: 7}, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7] <- map()의 기능

// Array.from()을 이용해서 배열에 넣을 요소를 가져온 후 바로 매핑해주기.
labelBalance.addEventListener('click', function() {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);
}); 
*/


const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

dogs.forEach(function(dog) {
  dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
});
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));


const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  } `
);


const ownersEatTooMuch = dogs.filter(function(dog) {
  return dog.curFood > dog.recFood;
}).flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

const ownersEatTooLittle = dogs.filter(function(dog) {
  return dog.curFood < dog.recFood;
}).flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

console.log(dogs.some(dog => dog.curFood === dog.recFood));

const checkEatingOkay = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
console.log(dogs.some(checkEatingOkay));

console.log(dogs.filter(checkEatingOkay));

const dogsCopy = dogs.slice(); 
dogsCopy.sort((a,b) => a.recFood - b.recFood);
console.log(dogsCopy);

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
// [12-170] Converting and Checking Numbers
// JS에서 Number은 부동 소수점 숫자로, 정수와 소수 모두 포함한다.
console.log(23 === 23.0); // true

// JS는 컴퓨터 용어답게 2진법을 사용하는데, 이는 분수 표현에 취약하다는 문제가 있다.
console.log(0.1 + 0.2); // 0.30000000000000004 <- 무한 소수
console.log(0.1 + 0.2 === 0.3) //false
// 10진법에서  3/10 = 3.3333333 인 것처럼 2진법일 때 무한 소수일 경우가 발생한다.


// Conversion
console.log(Number('23')); // 23
console.log(+'23'); // 23 <- Number
// +기호가 뒤에 오는 String 23을 타입 변환시킨다.

// Parsing
console.log(Number.parseInt('30px')); // 30 <- 숫자로 시작하는 문자열에서 숫자를 추출해낸다. (Number로 반환)
console.log(Number.parseInt('e23')); // NaN <- 숫자로 시작하지 않아서 NaN이 return
// 불필요한 기호를 제거하고 쉽게 숫자만 추출하기에 유용.

console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2


// isNaN: 해당 변수가 NaN인 여부에 따라 boolean값을 return - Check if value is NaN
console.log(Number.isNaN(20)); // false
console.log(Nubmer.isNaN('20')); // false

console.log(Number.isNaN(+'20px')); // true
console.log(Number.isNaN(23 / 0)); // false <- infinity도 NaN은 아니다.
console.log(23 / 0); // infinity 

// isFinite: 무한대가 아닌 Number인지 검사. - Check if value is Number
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false <- Stirng도 Number가 아니기 때문에 false를 반환
console.log(Number.isFinite(+'20X')); // false <- NaN은 당연히 false
console.log(Number.isFinite(23 / 0)); // false 

console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
*/

/*
// [12-171] Math and Rounding
// Math.sqrt(): 제곱근 
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));

// Math.max(): 최대값
console.log(Math.max(5, 18, 23, 11, 2)); // 23
console.log(Math.max(5, 18, '23', 11, 2)); // 23 <- type coercion
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN

// Math.min(): 최소값
console.log(Math.min(5, 18, 23, 11, 2)); // 2

// Math.PI: 3.141592~
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// Math.random(): 0 부터 1 사이의 값 임의로 생성
// Math.trunc(): 소수 부분 제거
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20)); 

// Rounding integers
// Math.round(): 반올림 
console.log(Math.round(23.3)); // 23
console.log(Math.round(23.9)); // 24

// Math.ceil(): 올림
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.9)); // 24

// Math.floor(): 내림 
console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.9')); // 23 <- type coercion

console.log(Math.trunc(23.3)); // 23
// trunc()와 floor()은 양수일 때는 똑같은 값을 return 한다. 하지만 음수일 때는 다르다.
console.log(Math.trunc(-23.3)); // -23
console.log(Math.floor(-23.3)); // -24

// Rounding decimals
// toFixed()는 해당 소수점 자리수를 유지하도록 반올림하고, String을 반환한다.
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // 2.35 <- Number

*/

/*
// [12-172] The Remainder(나누기에서 나머지 부분) operator
console.log(5 % 2); // 1
console.log(5 / 2); // 2.5

console.log(8 % 3) // 2

// Remainder를 이용해 짝수와 홀수 구하기.
console.log(6 % 2); // 0 <- 짝수
console.log(7 % 2); // 1 <- 홀수

const isEven = n => n % 2 === 0;
console.log(isEven(8)); // true
console.log(isEven(23)); // false

labelBalance.addEventListener('click', function() {
  [...document.querySelectorAll('.movements_row')].forEach(function(row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
*/

/*
// [12-173] Numeric Separators
// ES2021에 추가됨.

// 일상에서 우리는 숫자를 쉼표를 이용해서 천 단위의 구분 기호를 사용한다. JS에서도 이를 구현할 수 있다. '_'를 이용하면 된다.
// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter); // 287460000000
// 다만 JS엔진은 underscore를 무시한 채 콘솔에 숫자를 찍는다.
// 반대로 생각해보면 원하는 모든 위치에 숫자 구분 기호를 사용할 수 있다.

const price = 345_99; 
console.log(price); // 34599

const transferFee1 = 15_00; // 15달러 0센트
const transferFee2 = 1_500; // 1500달러
// 위의 두 Number는 JS에서 똑같은 수로 읽힌다. 하지만 개발자들 사이에는 각 숫자에 특별한 의미를 부여할 수 있다.

// 밑줄을 쓰기 위해선 무조건 숫자 사이여야 한다. 소수점이 있는 부분에서는 사용하면 SyntaxError가 발생한다. 숫자의 시작과 끝에도 사용할 수 없다.
const PI = 3.1415;
//const PI2 = 3._14;
console.log(PI);

// 문자열에서 Number로 변환할 때 underscore가 있으면 제대로 변환하지 못하고 NaN을 return한다.
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // NaN

*/
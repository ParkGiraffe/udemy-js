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

const formatMovementDate = function(date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 2) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // return `${year}/${month}/${day}`;
    return new Intl.DateTimeFormat(locale).format(date);
  } 
};

const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = ` 
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


const startLogOutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent= `${min}:${sec}`;

    // When 0 seconds, stop the timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    };

    // Decrease is
    time --;
  };
  // Set time to 5 minutes
  let time = 300;

  // Call the timer every second
  tick(); // setInterval()안에서는 1초 후부터 실행이 되기 때문에, 1초가 지나기 전까지 이전의 시간 데이터가 남아있다. 이를 방지하기 위해 먼저 한 번 함수를 호출해준다.
  const timer = setInterval(tick, 1000);

  return timer; // 타이머를 반환하여서, 사용자가 로그아웃을 했을 경우 타이머가 멈출 수 있도록 한다. (만약 이를 방지하지 않는다면, 다른 유저가 로그인 했을 때 두 타이머가 겹치는 문제를 볼 수 있다.)
};


///////////////////////////////////////
// Event handlers
let currentAccount, timer; // 전역변수 설정

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;






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

    // Create current date and time
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');;
    // const min = `${now.getMinutes()}`.padStart(2, '0');;
    // labelDate.textContent = `${year}/${month}/${day}, ${hour}:${min}`;
    // // year/month/day

    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric", // long, 2-digit
      year: "numeric",
      // weekday: 'long', <- 요일
    };
    // const locale = navigator.language; <- 유저의 브라우저가 사용하는 언어를 가져오기.
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);


    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer); // 기존에 타이머가 작동하고 있는 지 확인하고, 맞다면 초기화.
    timer = startLogOutTimer();

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

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString);
    receiverAcc.movements.push(new Date().toISOString);
 
    // Update UI
    updateUI(currentAccount);

    // Reset timer <- 작업을 실행하면 로그아웃되지 않고 계속 작업을 할 수 있도록 타이머 재설정.
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function() {
      // Add movement
      currentAccount.movements.push(amount);
  
      // Add loan  date
      currentAccount.movementsDates.push(new Date().toISOString);
  
      // Update UI
      updateUI(currentAccount);
  
      // Reset timer <- 작업을 실행하면 로그아웃되지 않고 계속 작업을 할 수 있도록 타이머 재설정.
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
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
  displayMovements(currentAccount, !sorted);
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

/*
// [12-174] Working with Bigint
// ES2020에 도입
// Working with BigInt
// 900719925470991가 JS가 나타낼 수있는 최대 Number
console.log(2 ** 53 - 1); // 900719925470991
console.log(Number.MAX_SAFE_INTEGER); // 900719925470991
console.log(2 ** 53 + 1); // 900719925470992 <- console 에는 올바르게 출력되지만, unsafe한 Number이다.
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// BigInt는 아무리 큰 수더라도 모두 받아들일 수 있다.
// 뒤에 n을 붙이면 된다.
console.log(4838430248342043823408394839483204n);
console.log(BigInt(48384302));

// Operations
console.log(10000n + 10000n); // 20000n
console.log(36286372637263726376237263726372632n * 10000000n); // 곱셈도 가능
// console.log(Math.sqrt(16n)); <- Bigint에서는 Math 연산자가 작동하지 않는다.
// Bigint에서는 Math 연산자가 작동하지 않는다.

const huge = 20289830237283728378237n;
const num = 23;
// console.log(huge * num) <- Error
console.log(huge * BigInt(num));
// BigInt와 Number를 같이 계산하면 에러가 발생한다. 

// Exceptions
console.log(20n > 15); // true - type coercion
console.log(20n === 20); // false - 등호가 세 개면 type coercion이 안 일어난다.
console.log(typeof 20n); // bigint
console.log(20n == '20'); // true - 등호가 두 개면 type coercion이 작동한다.

console.log(huge + ' is REALLY big!!!'); // bigint도 자동으로 string으로 변환된다.

// Divisions
// bigint에서 나누기를 하면, 소수점 이하 자릿수를 잘라내고 반환한다.
console.log(10n / 3n); // 3n
console.log(11n / 3n); // 3n
console.log(10 / 3);

*/

/*
// [12-175] Creating Dates
// Create a date

const now = new Date();
console.log(now); // 현재 날짜를 출력

// Date생성자의 구문분석을 통해 Date 생성
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

// Date 생성자에 Number 넣기 (년도, 월(0부터 시작해서, 실제값은 +1이 된다.), 일, 시간, 분, 초)
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // 12월 1일
// 11월에는 31일이 없다. 그럴 경우 자동으로 JS가 계산해서 12월 1일로 바꿔준다.

// Date 생성자에 밀리초를 넣을 수 있다. 기준 시간은 Unix시간이 생성된 1970년 1월 1일 새벽 1시
// + n일 차를 밀리초로 계산한 식 n * 24 * 60 * 60 * 1000
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3일 뒤를 밀리초로 계산한 식 


// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // 2037 <- getYear()도 있지만 절대 사용하지마라.
console.log(future.getMonth()); // 10 <- JS에서 month는 0기반이다. 따라서 현실에서는 11이다.
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 <- 요일을 나타내는 것으로 0은 일요일이고 4는 목요일이다.
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 국제 표준 ISO에 따르는 날씨표기를 String으로 반환
console.log(future.getTime()); // 2142256980000 <- 1970년 1월 1일 이후로 얼마나 지나갔는지 타임스탬프

console.log(new Date(2142256980000));

console.log(Date.now()); // 현재 타임스탬프

future.setFullYear(2040); // 날짜를 수정. setFullYear는 년도 수정
console.log(future);
*/

/*
// [12-177] Operations With Dates
// 타임스탬프를 이용해서 날짜 계산.
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);
*/



/*
// [12-178] Internationalizing Dates (INTL)
// API를 이용해서 국제화 해보기.
// Intl object와 DateTimeFormat(locale, option).format(date)메소드를 이용해서 Date를 불러온 후 국제화를 시킨다.
// 이때 option object를 전달해서 출력 방식을 지정할 수 있다.
// + navigator.language를 통해 유저가 사용하는 브라우저의 현재 언어 정보를 가져올 수 있다.
const now = new Date();
const options1 = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "numeric", // long, 2-digit
  year: "numeric",
  // weekday: 'long', <- 요일
};
// const locale = navigator.language; <- 유저의 브라우저가 사용하는 언어를 가져오기.
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  options1
).format(now);
*/


/*
// [12-179] Internationalizing Numbers (INTL)
// Intl object와 NumberFormat(locale, option).format(num)메소드를 이용해서 Number를 불러온 후 국제화를 시킨다.
// option의 style property를 통해서 어떤 유형의 숫자인지를 인식하고 국제화한다.
const num = 3884764.23;

const options1 = {
  style: 'unit',
  unit: 'mile-per-hour', // percent, celcius 등등
};

const options2 = {
  style: 'currency', 
  unit: 'celsius', // style이 currency일 경우 unit은 의미가 없어진다.
  currency: 'EUR', // currency는 국가별로 정의되는 것이 아니기에 locale에 사용되는 Stirng(eu-US)과 다른 모습이다.
  // useGrouping: false, 
};

console.log('US:      ', new Intl.NumberFormat('en-US', options2).format(num));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options2).format(num));
console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options2).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options2).format(num)
);

*/

/*
// [12-180] Timers: setTimeout and setInterval

// setTimeout(콜백함수, 밀리초, ...콜백함수에 들어올 인수들): 특정 시간이 지나면 콜백함수를 불러온다. (한 번만 불러옴)
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`),
  3000,
  ...ingredients
);
console.log('Waiting...');

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);
// clearTimeout(): setTimeout()의 두 번째 인수가 정한 시간이 지나가기 전에 취소해버릴 수 있다. -> 따라서 피자 콘솔이 찍히지 않는다.

// setInterval(콜백함수, 밀리초) : n초마다 반복해서 콜백함수를 불러온다.
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);
*/



// [12-181] Implementing a Countdown Timer


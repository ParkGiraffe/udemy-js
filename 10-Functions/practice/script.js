'use strict';

/*
// [10-128] Default Parameters
// ES6부터는 parameter 옆에 =와 함께 expression을 넣어주면 default 값으로 설정된다. 
const bookings = [];
const createBooking = function(flightNum, numPassengers = 1, price = 199 * numPassengers) {

// ES5 방식
// numPassengers = numPassengers || 1;
// price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);

// 매개변수를 건너 뛰고 싶은 경우, undefined로 넘어가서 기본값이 불러와지게 끔 한다.
createBooking('LH123', undefined, 800);
*/




/*
// [10-129] How Passing Arguments Works: Value VS. Reference 
// 함수에 인자를 전달할 때 전달한 데이터의 타입이 reference type이면, 함수 내에서 변경된 사항이 전역에서도 적용된다.
const flight = 'LH234';
const yosep = {
    name: 'park yosep',
    passport: 1243242351,
}

const checkIn = function(flightNum, passenger) {
    flightNum = 'LH999'; // primitve type이므로 단순 복사가 일어남
    passenger.name = 'Mr. ' + passenger.name; // object이므로 reference type이기에 참조 주소로 이어짐.

    if(passenger.passport === 1243242351) {
        alert('Checked In');
    } else {
        alert('Wrong Passport');
    }
}

checkIn(flight, yosep);
console.log(flight); // LH234 <- primitive type
console.log(yosep); // Mr. park yosep <- reference type


const newPassport = function(person) {
    person.passport = Math.trunc(Math.random() * 10000000000000);
};

newPassport(yosep);
checkIn(flight, passport); // Wrong passport
*/







// [10-130] First-Class and Higher-Order Functions






/*
// [10-131] Functions Accepting Callback Functions 
// JS에서 callback함수를 자주 사용하는 이유.
// 1. 분할하고, 재사용 가능하기 때문
// 2. Higher order function이 추상화(abstraction)에 유용. 너무 디테일하게 구현부터 하는 게 아니라, 대략적인 구상을 하는 데에 큰 도움을 준다.
  const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
  };
  
  const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
  };
  
  // Higher-order function
  // + 함수도 object type 답게 property를 가지는데, name property는 함수의 이름을 return 한다.
  const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
  
    console.log(`Transformed by: ${fn.name}`);
  };
  
  transformer('JavaScript is the best!', upperFirstWord);
  transformer('JavaScript is the best!', oneWord);
  
  // JS uses callbacks all the time
  const high5 = function () {
    console.log('👋');
  };
  document.body.addEventListener('click', high5); // high 5 - callBack function, addEventListener - higher order function
  ['Jonas', 'Martha', 'Adam'].forEach(high5); // forEach()의 콜백함수로 사용됨.
  
  */









/*
// [10-132] Functions Returning Functions
// 작동하는 순서는 closure의 순서와 같다.
const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    };
}

const greetHey = greet('Hey');
greetHey('Jonas'); // Hey Jonas
greetHey('Steven'); // Hey Steven

greet('Hello')('Yosep'); // Hello Yosep


// Challenge - arrow function으로 써보기
const greetArr = greeting => name => console.log(`${greeting} ${name}`);
greetArr('Hi')('Yosep'); // Hi Yosep
// 이렇게 쓰는 게 간단하기는 한데, 좀 더 혼란스럽게 보인다.
*/



// [10-133] The call and apply Methods
// The call and apply Methods
const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    },
};
lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

// Call method - 첫 번째 인수는 this가 가리킬 object를 목표로 해야 한다. 그리고 각 object 간의 property 이름이 동일해야 한다.

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};
const book = lufthansa.book;

// Does NOT work
// Book()은 일반함수이기 때문에, 사용된 this키워드기 undefined를 가리켜서 error가 발생한다.
// book(23, 'Sarah Williams'); // TypeError

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);



// Apply method - Array of arguments를 받아서 함수에 전달한다.
const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
};
  
book.call(swiss, 583, 'Mary Cooper');
  
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
  
book.call(swiss, ...flightData); // Array를 스프레드 연산자로 풀어서 call() method에 전달하는 방법도 있다.
  





// [10-134] The bind Method
// Bind method - 함수를 호출하진 않고, this 키워드가 있는 위치를 담은 새 함수를 반환한다. 

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Willians');

/*
book(flightNum, name) {
    console.log(
        `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
},
*/
// bind()는 기존 함수 인자의 일부를 미리 지정한 상태에서 남은 인자만 받으면 되는 함수를 return할 수 있다.
const bookEW23 = book.bind(eurowings, 23);
bookEW23('yosepPark');


// With Event Listners
lufthansa.planes = 300;
lufthansa.buyPlane = function() {
    console.log(this);

    this.planes++;
    console.log(this.planes);
};

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane);
// document는 항상 해당 Selector가 연결된 element에 연결이 된다. 그래서 this가 어디에 연결되어 있는 지 체크해보면 html element가 연결된 걸로 나온다. 그래서 오류가 발생한다.


document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
// 그래서 bind메서드로 this를 lufthansa로 지정해야 한다. 



// Partial application
// 매개변수를 미리 설정하기
// this키워드를 연결할 필요가 없을 경우 null로 지정한다.
const addTax = (rate, value) => value + value * rate;
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100)); // 123
 

// Challenge
const addTaxRate = function(rate) {
    return function(value) {
        return value + value * rate;
    };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));




// [10-135] Coding Challenge #1


const poll = {
    answers: new Array(4).fill(0),


    registerNewAnswer() {
        const selected = Number(prompt(```
            What is your favourite programming language?
            0: JavaScript
            1: Python
            2: Rust
            3: C++
            (Write option number)
        ```
        ));
        if (typeof selected === 'number' && selected >= 0 && selected <= this.answers.length) {
            this.answers[selected]++;
        }

        this.displayResults();
        this.displayResults('string');
    },

    displayResults(type = 'array') {
        if (type === 'array') {
          console.log(this.answers);
        } else if (type === 'string') {
          // Poll results are 13, 2, 4, 1
          console.log(`Poll results are ${this.answers.join(', ')}`);
        }
    },
};


document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));




// [10-136] Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
    console.log('This will never run again');
};
runOnce();

// IIFE - 함수를 괄호로 묶어서 즉시 호출시킴.
(function () {
    console.log('This will never run again');
    const isPrivate = 23;
})();
console.log(isPrivate); // Undefined


// 화살표 함수에도 적용가능
(() => console.log('This will ALSO never run again'))();

// 구식 변수 선언 방식인 var은 변수의 scope 보호가 전혀 이뤄지지 않는다. 그래서 사용 비추천.
{
    const isPrivate = 23;
    var notPrivate = 46;
}
console.log(isPrivate); // undefined
console.log(notPrivate); // 46 
  



// [10-137] Closure
// closure는 함수가 만들어진 곳의 연결을 항상 잃지 않도록 함으로써, 함수에 내장된 변수에 접근 가능하도록 해준다.
const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} Passengers`);
    };
};

const booker = secureBooking();

booker(); // 1
booker(); // 2
booker(); // 3  


// [10-138] More Closure Example
// Example 1
let f;

const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    };
};

const h = function() {
    const b = 777;
    f = function() {
        console.log(b * 2);
    };
}

g();
f(); // 46 

// Re-assigning f function
h(); 
f(); // 1554

// Example 2
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000); // n밀리 초 기다린 후에 실행

    console.log(`Will start boarding in ${wait} seconds`);
};


boardPassengers(180, 3);

// 코드의 순서가 setTimeout부터이지만,' console.log(`Will start boarding in ${wait} seconds`);' 가 먼저 실행되었다. boardPassengers()가 끝났음에도 setTimeout의 콜백함수 안의 변수 속에서 클로저가 작동하고 있음을 알 수 있다.
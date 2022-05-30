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

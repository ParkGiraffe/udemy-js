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







// [10-131] Functions Accepting Callback Functions 
// [10-132] Functions Returning Functions

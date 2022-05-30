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





// [10-129] How Passing Arguments Works: Value VS. Reference 






// [10-130] First-Class and Higher-Order Functions
// [10-131] Functions Accepting Callback Functions 
// [10-132] Functions Returning Functions

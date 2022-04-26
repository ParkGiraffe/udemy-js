// [2-9] Linking a JavaScript File
// let js = 'js';
// if (js === 'js') alert('js is amazing!');

// console.log(34+23+435);

// [2-10] Value and Variable
// 변수 선언 법
// let firstName = “Park”;


// 변수 선언 규칙 (이름) Variable name conventions
// 변수 이름에 : lowerCamelCase 사용
// ‘_’도 있지만 JS에서는 camelCase가 표준.
// 변수 이름을 대문자로 시작하는 것은 오류가 없으나, 컨벤션에 어긋난다.

// 변수 이름은 숫자로 시작할 수 없다.
// 그리고 오로지 포함 가능한 문자는 numbers, letters, underscores and the dollar sign.
// let park&yo = ‘Park’; //error

// 예약어(ex: new, function)도 사용 불가능하다.

//  + 변수 말고 상수에는 모든 문자를 대문자로 적는다. ex: const PI = 3.14

// 변수 이름을 지정할 때는 그 값이 어떤 것을 나타내는 지 쉽게 알 수 있도록 정해야 한다.
// let myFirstJob = 'Programmar';
// let myCurrentJob = 'Teacher';

// // 아래는 별로인 이름
// let job1 = 'Programmar';
// let job2 = 'Teacher';
//

// // [2-12] Data Types
// let javascriptIsFun = true;
// console.log(javascriptIsFun); // true

// console.log(typeof true); // boolean
// console.log(typeof javascriptIsFun); // boolean
// console.log(typeof 23); // number
// console.log(typeof 'joseph'); // string

// javascriptIsFun = 'YES!';
// console.log(javascriptIsFun); // YES!


// // undefined
// let year;
// console.log(year); // undefined
// console.log(typeof year); // undefined

// year = 1991;
// console.log(year); // 1991
// console.log(typeof year); // number

// // null
// console.log(typeof null); // object <- 아무 의미를 지니지 않는다. typeof에서 null일 경우 null이라고 출력하지 않고 object로 출력된다. 따라서 JS에서 버그나 에러로 간주한다. (legacy한 이유로 현재도 수정되지는 않는 버그이다. typeof사용에 유의해야 할 필요가 있는 정보이다.)

// // [2-13] let, const and var 
// // let은 변수 선언
// let age = 30;
// age = 31;

// // const는 상수 선언 (immutable)
// const birthYear = 1991;
// // birthYear = 1990; // TypeError

// // const job // 'const' declarations must be initialized. 상수는 무조건 초기값을 필요로 한다.

// // 변수 선언 방식으로 var도 있지만 이제는 쓰지 않는 방법이다. 
// // let, const와 var의 작동 방식은 매우 다르다. (Section7에서 설명 예정.)
// // let: block-scoped
// // var: function-scoped
// var job = 'programmar';
// jab = 'teacher';

// // let, var을 적지 않아도 변수는 선언되나 매우 끔직한 방식이다. 이렇게 설정하면 JS에서 전역변수로 설정하기 때문이다.
// lastName = 'Schmedtamnn';
// console.log(lastName);
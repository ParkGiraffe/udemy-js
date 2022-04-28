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

// // [2-13] Basic Operators
// // math operators
// // minus

// const now = 2022
// const ageYosep = now - 2000;
// const ageJonas = now - 1991;
// console.log(ageYosep, ageJonas);

// // times, devide, exponentiation
// console.log(ageJonas * 2, ageYosep / 2, 2 ** 3);

// // plus
// // plus operator는 String 결합에도 사용할 수 있다.'

// const firstName = 'Yosep';
// const lastName = 'Park';
// console.log(firstName + ' ' + lastName); // Yosep Park

// // typeof operator

// // assignment operators(할당 연산자, =)
// let x = 10 + 5; 
// console.log(x) // 15

// x += 10; // x = x + 10
// x *= 4; // x = x * 4
// x++; // x = x + 1
// x--; // x = x - 1

// // comparison operators
// // 참일 경우 true, 아니면 false.
// // >, <, >=, <=
// console.log(ageJonas > ageYosep); // true
// console.log(ageYosep <= 20); // false


// // 연산자의 실행 순서
// // 다른 종류의 연산자가 혼합되어 있을 경우, 계산을 먼저 한 후에, 비교를 한다.
// console.log(now - 1991 > now - 2018);

// // [2-15] Operator Precedence
// // 연산자 우선순위에 대해 설명한 사이트 (table에서 Precedence 숫자가 높을수록 우선순위가 높다.) : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence


// const now = 2037;
// const ageJonas = now - 1991;
// const ageSarah = now - 2018;

// console.log(now - 1991 > now - 2018);

// let x, y;
// x = y = 25 - 10 - 5; x = y = 10, x = 10 // '='는 right to left, 수학 연산자는 right to left
// console.log(x, y);

// // +,- 보다 *,/ 이 우선순위가 높기 때문에, 평균값을 구하는 경우에는 ()를 넣어줘야 한다.
// const averageAge1 = ageJonas + ageSarah / 2 // 55.5
// const averageAge2 = (ageJonas + ageSarah) / 2 // 32.5
// console.log(averageAge1, averageAge2)



///////////////////////////////////////////////////////
 // [2-16] Coding Challenge #1
 /*
 Coding Challenge #1

Mark and John are trying to compare their BMI (Body Mass Index), which is
calculated using the formula:
BMI = mass / height ** 2 = mass / (height * height) (mass in kg
and height in meter).


Your tasks:
1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs using the formula (you can even implement both
versions)
3. Create a Boolean variable 'markHigherBMI' containing information about
whether Mark has a higher BMI than John.


Test data:
§ Data 1: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95
m tall.
§ Data 2: Marks weights 95 kg and is 1.88 m tall. John weights 85 kg and is 1.76
m tall.

GOOD LUCK
 */

// const weightsMarks1 = 78;
// const heightsMarks1 = 1.69;
// const weightsJohn1 = 92;
// const heightsJohn1 = 1.95;


// const weightsMarks2 = 95;
// const heightsMarks2 = 1.88;
// const weightsJohn2 = 85;
// const heightsJohn2 = 1.76;


// function calculateBMI (weights, heights) {
//     let bmi = weights / (heights ** 2);
//     return bmi;
// }

// const markHigherBMI1 = calculateBMI(weightsMarks1, heightsMarks1) > calculateBMI(weightsJohn1, heightsJohn1);
// const markHigherBMI2 = calculateBMI(weightsMarks2, heightsMarks2) > calculateBMI(weightsJohn2, heightsJohn2);

// console.log(markHigherBMI1, markHigherBMI2);

///////////////////////////////////////////////////////////////

// // [2-17] Strings and Template Literals
// // template literals는 백틱(₩)을 사용해서 시작한다.
// // 그 다음 ${}를 이용해서 변수 값을 쉽게 String으로 변환하여 넣을 수 있다. 
// // 그래서 대부분 개발자들은 String을 선언할 때 백틱만 사용한다.
// const firstName = `joseph`;
// const year = 2022;
// const birthYear = 2000;
// const job = `teacher`;

// const joseph = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
// console.log(joseph);
// console.log(`Just a regular string....`);


// // template Strings가 있기 전에는 \n\을 이용해서 줄바꿈을 했다. (다른 언어는 대부분 \n이다.)
// console.log('String with \n\
// multiple \n\
// lines');


// // 현재는 template strings를 통해 단순히 return(enter)키만 눌러도 줄바꿈을 구현할 수 있다.
// console.log(`String with
// multiple
// lines`);






// [2-18] Taking Decisions: if / else Statements
const age = 22;
if (age >= 18) {
    console.log(`Joseph can start driving license 🚗`);
} else {
    const yearsLeft = 18 - age;
    console.log(`Joseph is too young. Wait another ${yearsLeft} years :)`);
}

// 이러한 if/else statements를 control structure라고 부른다.
// control structure는 코드 블록을 실행해야 하는 블록과 실행해야 하지 말아야 할 블록으로 나누어서 제어 권한을 제공한다.



// if else문을 통해서 조건부로 변수를 생성할 수 있다.
const birthYear = 2000;
let century;
if (birthYear <= 2000) {
    century = 20;
} else {
    century = 21;
}

console.log(century);
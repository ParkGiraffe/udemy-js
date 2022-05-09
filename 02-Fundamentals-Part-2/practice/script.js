// // [3-32] Activating Strict Mode

// 'use strict' 
// // 이 코드를 맨 처음에 작성하면 JS가 알아서 strict 모드를 실행한다. 무조건 맨 첫 줄에 있어야 한다.
// // 또한 Strict 모드를 only specific function or specific block에 적용할 수 있다. 

// // stict 모드는 안전한 코드를 위해 존재한다.
// // 1. 특정 행동을 금지한다.
// // 2. JS가 쉽게 지나칠 수 있는 오류를 발생하는 상황에서, 눈에 보이는 error를 우리에게 보여준다.


// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriverLicense = true; // Driver 뒤에 s가 빠짐. 하지만 error표시는 안 뜸. JS는 var이나 let 기호가 없어도 변수를 생성하기 때문이다.
// if (hasDriversLicense) console.log('I can drive :D'); // 아무것도 Console에 표시되지 않음.
// // 하지만 여기에 strict모드를 적용시키면, ReferenceError를 출력한다. 

// // 또한 예약어의 종류를 늘려서 체크해준다.
// // 나중에 업데이트된 기능의 이름은 기본 JS에선 예약어로 지정되어 있지 않는데, strict 모드가 그것을 예방해준다.
// const interface = 'Audio'; // SyntaxError: Unexpected strict mode reserved word
// const private = 534; // SyntaxError: Unexpected strict mode reserved word

// // 이 뿐만아니라 fuctions, objects, setting properties on primitive values and many more에도 strict 모드의 기능이 있지만, 다음 단계의 강의에서 차근차근 알아갈 예정이다.







// // [3-33] Functions
// // JS의 함수 키워드는 function 이다.
// // 함수를 불러온다는 표현으로 calling or running or invoking functions 라는 단어를 사용한다.

// function logger() {
//     console.log('My name is yosep');
// }
// logger();



// function fruitProcessor(apples, oranges) {
//     const juice = `Juice with ${apple} apples and ${oranges} oranges.`;
//     return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// // console.log()는 JS의 built-in function이다.

// const num = Number('23');
// // Number()도 JS의 built-in function이다. 








// // [3-34] Functions Declarations vs Expressions
// // return에 반환하고자 하는 expression을 적는다.

// // Function declaration
// function calcAge1(birthYear) {
//     return 2022 - birthYear;
// }

// const age1 = calcAge1(2000);
// console.log(age1); // 22


// // anonymous function.
// // Function expression
// const calcAge2 = function (birthYear) {
//     return 2022 - birthYear;
// }
// const age2 = calcAge2(2000);
// console.log(age1, age2); // 22 22 
// // function이 expression이 되어서 calcAge2에 저장된다. 그리고 calcAge2는 함수가 된다.
// // JS에서 function은 value가 된다. 물론 타입은 없다. string, number와 같은 타입은 없지만 value가 된다.


// // Functions Declarations vs Expressions의 차이 : Expressions의 경우 무조건 함수가 먼저 선언된 후에 call 할 수 있다.

// /*
// const age1 = calcAge1(2000);
// function calcAge1(birthYear) {
//     return 2022 - birthYear;
// }

// console.log(age1); // 22 - OK

// const age2 = calcAge2(2000);
// const calcAge2 = function (birthYear) {
//     return 2022 - birthYear;
// }
// console.log(age1, age2); // ReferenceError
// */

// // JS 개발자들은 각각 선호에 따라 두 방법을 혼용해서 사용한다. 그래서 두 방법에 대해 잘 숙지하고 있어야만 한다.







// // [2-35] Arrow Functions

// // Arrow Function
// // Arrow Function은 Function Exrpessions의 special form이다.

// // 한 줄 함수일 경우 : parameter => return할 Exrpession
// const calcAge3 = birthYear => 2022 - birthYear;

// // 여러 줄의 코드를 필요로 하는 경우 : {}를 삽입하고 그 안에 return 키워드를 사용한다.
// const yearsUntilRetirement = birthYear => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     return retirement;
// }

// // 여러 개의 parameter를 필요로 하는 경우 : parameter를 적는 부분에 ()를 넣고, 여러 개의 parameters를 적는다.
// const yearsUntilRetirement2 = (birthYear, firstName) => {
//     const age = 2037 - birthYear;
//     const retirement = 65 - age;
//     // return retirement;
//     return `${firstName} retires in ${retirement} years`;
// }
// console.log(yearsUntilRetirement2(2000, 'joseph'));


// // arrow function이 간단하고 좋긴 하지만, 그렇다고 arrow function만 쓸 수 있는 건 아니다. 대표적으로 'this'키워드를 사용할 수 없다.





// // [3-36] Functions Calling Other Functions
// // 함수 안에 또 함수를 불러오는 방법
// function cutFruitPieces(fruit) {
//     return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//     const applePieces = cutFruitPieces(apples);
//     const oragePieces = cutFruitPieces(oranges);

//     const juice = `Juice with ${applePieces} piece of apple and ${oragePieces} piece of orange.`;
//     return juice;
// }
// console.log(fruitProcessor(2, 3));






// // [3-37] Reviewing Functions

// const calcAge = function (birthYear) {
//     return 2022 - birthYear;
// }

// const yearsUntilRetirement = function (birthYear, firstName) {
//     const age = calcAge(birthYear);
//     const retirement = 65 - age;

//     if (retirement > 0) {
//         console.log(`${firstName} retires in ${retirement} years`);
//         return retirement;
//     } else {
//         console.log(`${firstName} has already retired`);
//         return -1;
//     }
// }
// yearsUntilRetirement(2000, 'Yosep');






// ////////////////////////////////////////////////////////
// /* [3-38] Coding Challenge #1
// Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new
// gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores is calculated (so
// one average score per team).
// A team only wins if it has at least double the average score of the other team.
// Otherwise, no team wins!

// Your tasks:
// 1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
// 2. Use the function to calculate the average for both teams
// 3. Create a function 'checkWinner' that takes the average score of each team
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs the winner
// to the console, together with the victory points, according to the rule above.
// Example: "Koalas win (30 vs. 13)"
// 4. Use the 'checkWinner' function to determine the winner for both Data 1 and
// Data 2
// 5. Ignore draws this time

// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
// § Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores �

// GOOD LUCK �

// */

// const calcAverage = (score1, score2, score3) => {
//     return (score1 + score2 + score3) / 3;
// }

// const checkWinner = (avgDolphins, avgKoalas) => {
//     if (avgDolphins >= avgKoalas * 2) {
//         console.log(`Dolphins win (${avgDolphins} vs ${avgKoalas})`);
//     } else if (avgKoalas >= avgDolphins * 2) {
//         console.log(`Koalas win (${avgKoalas} vs ${avgDolphins})`);
//     }
// }
// const avgDolphins = calcAverage(44, 23, 71);
// const avgKoalas = calcAverage(65, 54, 49);
// checkWinner(avgDolphins, avgKoalas);

// ////////////////////////////////////////////////////////







// // [3-39] Introduction to Arrays

// // Array literal syntax
// const friends = ['Michael', 'Steven'];

// // Array function
// const years = new Array(1991, 2004, 2000);


// // Array 안의 요소 불러오기
// console.log(friends[0]);
// console.log(friends[1-1]);
// // Array는 zero-based라서 0부터 시작.
// // [] 안에는 모든 종류의 number expressions가 들어올 수 있다. array를 선언할 때도 아니면 array를 호출할 때도.

// // Array 길이 return
// console.log(friends.length);
// console.log(friends[friends.length - 1]); // 맨 마지막 번째의 요소
// // '.length'를 객체의 property라고 부른다.
// // 요소의 개수를 말하는 것이기 때문에 '끝 번 요소 + 1'의 값이 나온다.



// // Array 요소 변경하기
// friends[1] = 'jay';
// console.log(friends);
// // friends array를 const로 선언했지만, 그 안의 요소는 변경할 수 있다. 왜냐하면 const는 primitive value만 교체할 수 없게 하고, array는 primitive value가 아니기 때문이다. 

// // 반대로 array 전체를 교체하는 것은 불가능하다.
// friends = ['jay', 'yosep']; // TypeError: Assignment to constant variable.



// // array 안에는 서로 다른 타입의 데이터도 함께 가질 수 있고, 다른 변수를 가져올 수도 있다.
// // 심지어 array를 요소로 가져올 수 있다.
// const firstName = 'yosep';
// const yosep = [firstName, 'park', 2022 - 2000, 'teacher', friends];
// console.log(yosep);









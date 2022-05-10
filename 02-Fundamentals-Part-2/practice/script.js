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






// [3-40] Basic Array Operations (Methods)

// Add elements
// arrayName.push() : push 함수는 ()안에 있는 argument를 array의 맨 뒤에 요소로 삽입시킨다.
// push()함수 자체는 array에 push하고 난 후, 그 array의 length를 return 한다.
const friends = ['Michael', 'Steven', 'Peter'];
const newLength = friends.push('Jay');
console.log(friends); // ['Michael', 'Steven', 'Peter', 'Jay'];
console.log(newLength); // 4

// arrayName.unshift() : unshift 함수는 ()안에 있는 argument를 array의 맨 앞에 요소로 삽입시킨다.
friends.unshift('John'); // ['John', 'Michael', 'Steven', 'Peter', 'Jay']


// Remove elements
// arrayName.pop() : push의 반대로 맨 뒤의 요소를 제거 한다.
// pop()함수는 pop한 값을 return 한다.
friends.pop();
const popped = friends.pop();
console.log(popped); // Peter
console.log(friends); // ['John', 'Michael', 'Steven']

// arrayName.unshift() : shift의 반대
// shift()함수도 제거한 값을 return 한다.
friends.shift();
console.log(friends); // ['Michael', 'Steven']

// 요소의 index를 계산하는 방법
// arrayName.indexOf()를 사용하면, ()안에 있는 argument와 동일한 arrayElement를 찾아서, 해당하는 arrayElement의 index값을 return 한다. (zero-based에 기반한다.)
// 이때 비교는 strict 비교이다.
console.log(friends.indexOf('Steven')); // 1
console.log(friends.indexOf('Bob')); // -1
// 해당하는 arrayElement가 없을 경우엔 -1을 return 한다.


// 특정 값이 array 안에 있는 지 확인하는 방법
// arrayName.includes() 함수를 사용하면, ()안에 있는 argument와 동일한 arrayElement를 찾아서, 여부에 따라 boolean 값을 return 한다.
// 이때 비교는 strict 비교이다.
console.log(friends.includes('Steven')); // true
console.log(friends.includes('Bob')); // false

// exercise
if (friends.includes('Steven')) {
    console.log('You have a friend called Steven');
}









// ////////////////////////////////////////////////////////
// /*
// [3-41] Coding Challenge #2
// Steven is still building his tip calculator, using the same rules as before: Tip 15% of
// the bill if the bill value is between 50 and 300, and if the value is different, the tip is
// 20%.
// Your tasks:
// 1. Write a function 'calcTip' that takes any bill value as an input and returns
// the corresponding tip, calculated based on the rules above (you can check out
// the code from first tip calculator challenge if you need to). Use the function
// type you like the most. Test the function using a bill value of 100
// 2. And now let's use arrays! So create an array 'bills' containing the test data
// below
// 3. Create an array 'tips' containing the tip value for each bill, calculated from
// the function you created before
// 4. Bonus: Create an array 'total' containing the total values, so the bill + tip
// Test data: 125, 555 and 44
// Hint: Remember that an array needs a value in each position, and that value can
// actually be the returned value of a function! So you can just call a function as array
// values (so don't store the tip values in separate variables first, but right in the new
// array) �
// GOOD LUCK �
// */

// function calcTip(bill) {
//     if (bill <= 300 && bill >= 50) {
//         return bill * 15 / 100;
//     } else {
//         return bill * 20 / 100;
//     }
// }

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]]



// ////////////////////////////////////////////////////////

// // [3-42] Introduction to Objects

// const yosepArray = [
//     'yosep',
//     'park',
//     2022-2000,
//     'teacher',
//     ['Michael', 'Peter'],
// ];
// // 위와 같은 Array는 각 요소에 이름을 붙일 수 없고, 오로지 index만 붙일 수 있다.
// // 각 요소에 이름을 붙이기 위해서 object를 사용한다.


// // object는 {}를 사용해서 선언하는 방식이 있다. (literal syntax)
// // object는 key-value로 이루어져있다. key: value
// // key는 property라고 부른다.
// const yosep = {
//     firstName: 'yosep',
//     lastName: 'park',
//     age: 2022 - 2000,
//     job: 'teacher',
//     friends: ['Michael', 'Peter'],
// } // 5개의 property를 가진 object 


// // property를 불러오려면 '.' 또는 []을 사용하면 된다.
// // 둘의 차이점은, '.'은 property의 이름만을, []은 expression 모두를 입력할 수 있다는 것이다.
// // 일치하는 게 없으면 undefined return
// console.log(yosep.lastName); // 'park'
// console.log(yosep['lastName']); // 'park'

// const nameKey = 'Name';
// console.log(yosep['first' + nameKey]); // yosep
// console.log(yosep['last' + nameKey]); // park

// const interestedIn = prompt('What do you want to know about yosep? Choose between firstName, lastName, age, job, and friends');
// if (yosep[interestedIn]){
//     console.log(yosep[interestedIn]);
// } else {
//     console.log(`Wrong request! Choose between firstName, lastName, age, job, and friends`);
// } 

// // object에 property 추가하는 법. dot notation과 [] 둘 다 사용 가능.
// yosep.location = 'Korea';
// yosep['twitter'] = '@yoseppark';
// console.log(yosep)



// // Challenge
// // "yosep has 3 friends, and his best friend is called Michael"
// console.log(`${yosep.firstName} has ${yosep.friends.length} friends, and his best friend is called ${yosep.friends[0]}`);






// [4-44] Object Methods
// object는 function(method)을 property로 가질 수 있다.

// const yosep = {
//     firstName: 'yosep',
//     lastName: 'park',
//     birthYear: 2000,
//     job: 'teacher',
//     friends: ['Michael', 'Peter'],
//     hasDriverLicense: true,

//     calcAge: function(birthYear) {
//         return 2022 - birthYear;
//     }
// };

// console.log(yosep.calcAge(2000)); // 22
// console.log(yosep['calcAge'](2000)); // 22


// object의 method가 property를 접근하려고 할 때는 'this' 키워드를 사용하면 된다.
// this 키워드는 해당 object 전체를 의미한다.
// this 키워드를 사용하는 이유는, 해당 object의 이름이 바뀔 경우 일일이 수정할 필요가 없기 때문이다. (사실 this 대신에 object 이름 그대로 사용해도 값은 출력된다. 하지만 하지 말자.)

// const yosep = {
//     firstName: 'yosep',
//     lastName: 'park',
//     birthYear: 2000,
//     job: 'teacher',
//     friends: ['Michael', 'Peter'],
//     hasDriverLicense: true,

//     calcAge: function() {
//         console.log(this); // yosep object를 return
//         return 2022 - this.birthYear;
//     }
// };

// console.log(yosep.calcAge()) // 22



// object의 내부 메서드를 이용해서 기존 property를 바꾸거나 새로 생성할 수 있다.
const yosep = {
    firstName: 'yosep',
    lastName: 'park',
    birthYear: 2000,
    job: 'teacher',
    friends: ['Michael', 'Peter'],
    hasDriverLicense: false,
    gender: 'male',

    calcAge: function() {
        this.age = 2022 - this.birthYear;
        return this.age;
    },
    
    // Challenge
    // "Yosep is a 22-year old teacher, and he has a/no driver's license"
    getSummary: function() {
        return `${yosep.firstName} is a ${yosep.age}-year old ${yosep.job}, and ${yosep.gender === 'male' ? 'he' : 'she'} has ${yosep.hasDriverLicense === true ? 'a' : 'no'} driver's license`;
    }
};

console.log(yosep.age);
console.log(yosep.getSummary());


// array도 내장함수(method) -push, shift, pop, unshift- 를 갖고 있으며, 이를 통해 element를 수정, 변경할 수 있기 때문에 array 또한 object라고 할 수 있다.
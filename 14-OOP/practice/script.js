'use strict';


// [14-208] Constructor Functions and The New Operator
// convention으로 생성자 함수는 항상 대문자로 시작.
// arrow function은 this 키워드가 없기 때문에, function 표현식을 사용한다.
// 생성자 함수와 일반함수의 가장큰 차이점은, 생성자 함수는 new 키워드를 사용해서 생성자를 호출한다는 것이다.

const Person = function(firstName, birthYear) {
    // Instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // Never to this - 생성자 함수 내부에 메서드를 만들지 마라!
    // 만약에 Person에 method가 천 개 정도 있다고 한다면, 인스턴스를 생성할 때마다 천 개의 복사본이 같이 발생하기 때문이다.
    // 대신에 JS에서는 프로토타입과 프로토타입 상속을 사용한다.
    // this.calcAge = function() {
    //     console.log(2022 - this.birthYear);
    // };
};

const jonas = new Person('Jonas', 1991); // 인스턴스 생성 예시
console.log(jonas);

// (위의) 생성자 함수 작동 4단계
// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {} -> 따라서 생성자 함수는 new 키워드 덕에 따로 return 키워드를 필요로 하지 않는다.

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);


// instanceof: 해당 클래스의 인스턴스인지 확인해준다.
console.log(jonas instanceof Person); // true

const jay = 'Jay';
console.log(jay instanceof Person); // false



// [14-209] Prototypes

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};
console.log(Person.prototype); // constructor(Person 원형의 property가 담김)와 calcAge가 들어있음.

jonas.calcAge();
matilda.calcAge();

console.log(jonas.__proto__); //calcAge가 들어있음
console.log(jonas.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(jonas)); // true
console.log(Person.prototype.isPrototypeOf(matilda)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species); // Homo Sapiens Homo Sapiens

console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false


// [14-211] Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__); // null

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__); // Array.prototype -> Array 내장함수들
console.log(arr.__proto__ === Array.prototype); // true

console.log(arr.__proto__.__proto__); // object.prototype -> array는 object 타입

// 프로토타입 확장
Array.prototype.unique = function () {
  return [...new Set(this)];
}; 
// 기존 프로토타입에 직접 메소드를 추가할 수 있다. 예를 들면, 나만의 내장함수를 만들어 모든 array prototype에 뿌릴 수 있다.
// 하지만 협업에서는 좋은 습관이 아니다. 개발자들이 해당 프로토타입 메소드의 존재를 모를 수 있고, 서로 따로 구현하고 있는 상황이 발생할 수 있다.  또, JS가 다음 버전에서 똑같은 이름의 메소드를 추가할 수 있다.

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(h1); 
// 모든 DOM 요소는 스크린 뒤에 작동하는 객체들이다. 
// h1 -> HTMLHeadingElement -> HTMLElement -> Element -> Node -> EventTarget -> object로 이어지는 prototype 체인으로 구성되어 있다.

console.dir(x => x + 1); 
// 함수도 객체형이다보니 prototype이 있다. 그래서 함수에서도 내장함수를 쓸 수 있는 것이다.



// [14-212] Coding Challenge #1
const Car = function(make, speed) {
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);

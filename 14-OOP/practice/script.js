'use strict';


// [14-208] Constructor Functions and The New Operator
// convention으로 생성자 함수는 항상 대문자로 시작.
// arrow function은 this 키워드가 없기 때문에, function 표현식을 사용한다.
// 생성자 함수와 일반함수의 가장큰 차이점은, 생성자 함수는 new 키워드를 사용해서 생성자를 호출한다는 것이다.

const Person = function(fullName, birthYear) {
    // Instance properties
    this.fullName = fullName;
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

console.log(jonas.hasOwnProperty('fullName')); // true
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


/*
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
*/

// [14-213] ES6 Classes
// 기존의 JS 프로토타입 방식을 사용하지만, 다른 언어의 Class와 유사하게 코드를 작성할 수 있는 방법이 업데이트 됐다.

// class를 선언하는 데에는 class exression과 class declaration 두 가지 방법이 있다. jonas는 declaration을 선호.
// class expression - 함수와 비슷하게 설정. 다만 인수는 없는 형식으로.
// const PersonCl = class {};

// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    } // this 키워드를 생성해주는 생성자.

    // Instance Method
    // Methods will be added to .prototype property
    calcAge() {
        console.log(2037 - this.birthYear );
    }
    // class declaration 방식에서 선언하는 메소드들은 모두 constructor 외부에서 PersonCl.prototype(__proto__)에서 선언된다. (자동으로 분리해서 추가해준다) 객체 내부에서 선언되는 것이 아니다. 

    greet() {
        console.log(`Hey ${this.fullName}`);
    }

    get age() {
        return 2037 - this.birthYear;
    }


    // 데이터 무결성을 위해 get과 set을 사용할 수 있다.
    // Set a property that already exists. 기존의 proeprty에 get과 set을 이용해서 데이터 무결성을 진행하는 경우.
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name;
        else alert(`${name} is not a full name!`);
    }

    get fullName() {
        return this._fullName;
    }

    // Static method
    static hey() {
        console.log('Hey there');
        console.log(this);
    }
};

// [14-215] Static Methods
Person.hey() = function() {
    console.log('Hey there');
    console.log(this);
};

const jessica = new PersonCl('jessica', 1996)
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === PersonCl.prototype); // true

// PersonCl.prototype.greet = function() {
//     console.log(`Hey ${this.fullName}`);
// }
jessica.greet();

// Class에 대해 명심해야 할 사항.
// 1. Classes ar NOT hoisted. Class declaration일 경우에도 마찬가지이다.
// hoisted의 의미: 코드가 선언되기 전에 그 코드를 사용할 수 있는 지에 대한 여부. 즉, 클래스가 선언되기 전의 코드는 작동하지 않음.
// 2. Class are first-class citizen. -> 함수에 전달할 수도, 함수에서 반환할 수도 있다. JS에서는 클래스도 사실 뒤에서 일종의 함수로 작동한다. 함수에 함수를 전달할 수 있는 것과 같다.
// 3. Classes are executed in strict mode. 전체 코드에 'use strict'를 하지 않았더라도, class 내부 코드는 자동으로 strict mode가 실행된다.






////
// [14-214] Setters and Getters
// JS의 모든 객체는 setter와 getter를 가질 수 있으며, 이를 assessor properties라고 부른다.

const account = {
    owner: 'Jonas',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);  
    },
};

// console.log(account.latest());
console.log(account.latest);
// getter는 몇 가지 계산을 필요로 하는 값을 속성처럼 읽고 싶을 때 사용한다.


// account.latest(50);
account.latest = 50;
// setter 메소드는 정확히 하나의 매개변수가 있어야 한다.
// setter 메소드는 getter메소드를 통해 만들어진 가상 property에 'ex)account.latest=' 와 같이 새로운 값을 할당하고자 할 때 어떤 방식으로 처리할 것인지를 지정해주는 함수이다. 


// 정리
// get – 인수가 없는 함수로, 프로퍼티를 읽을 때 동작함
// set – 인수가 하나인 함수로, 프로퍼티에 값을 쓸 때 호출됨
// 하나만 단독으로 쓰이는 것도 가능하다.


jessica.calcAge(); // 41
console.log(jessica.age); //41
// 계산된 getter property는 __proto__에 저장된다.


// getter와 setter는 데이터 유효성 검사에 매우 유용하다.


// [14-216] Object.create
// Object.create는 프로토타입을 만들어서 바로 객체에 연결해준다. 그리고 생성자 함수를 필요로 하지 않는다.
const PersonProto = {
    calcAge() {
        console.log(2022 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);
console.log(steven); // __proto__에 PersonProto가 연결되어 있음.
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge(); // 잘 작동함.

console.log(steven.__proto__ === PersonProto); // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// init()은 constructor()비슷하지만, 포로토타입이 아닌 객체 자체에 property를 생성해주는 것은 아니기에 전혀 다른 함수이다.



// [14-217] Coding Challenge #2
// const Car = function(make, speed) {
//     this.make = make;
//     this.speed = speed;
// };

// Car.prototype.accelerate = function() {
//     this.speed += 10;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function() {
//     this.speed -= 5;
//     console.log(`${this.make} is going at ${this.speed} km/h`);
// };

class Car {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }

    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    }

    get speedUS() {
        return this.speed / 1.6
    }

    set speedUS(speed) {
        this.speed = speed * 1.6
    }
}

const ford = new Car('Ford', 120);

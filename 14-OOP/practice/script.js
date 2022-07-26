'use strict';

// [14-208] Constructor Functions and The New Operator
// convention으로 생성자 함수는 항상 대문자로 시작.
// arrow function은 this 키워드가 없기 때문에, function 표현식을 사용한다.
// 생성자 함수와 일반함수의 가장큰 차이점은, 생성자 함수는 new 키워드를 사용해서 생성자를 호출한다는 것이다.

/*
const Person = function (fullName, birthYear) {
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
*/

/*
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
*/

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
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  } // this 키워드를 생성해주는 생성자.

  // Instance Method
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
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
    if (name.includes(' ')) this._fullName = name;
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
}
*/

/*
// [14-215] Static Methods
Person.hey = function () {
  console.log('Hey there');
  console.log(this);
};

const jessica = new PersonCl('jessica', 1996);
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
*/

/*
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
*/

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

/*
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
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new Car('Ford', 120);

*/

/*
// [14-218] Inheritance Between "Classes": Constructor Functions
// Inheritance Between "Classes": Constructor Functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

// Constructor Fuctions 방법일 때는, property는 ArrayName.call()을 사용해서 상속한다. 이때 'this'는 상속된 property의 위치를 정해준다.
// property 상속은 Object.create를 이용해서 한다. 먼저 Student의 프로토타입에 Person 프로토타입을 덮어씌운 후, 그 이후에 Student prototype에만 추가할 메소드를 추가한다.
// 이 순서가 반대로 되면, Object.create()에 덮어씌워져서 초기화된다. 주의해야 한다!

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__); // Student
console.log(mike.__proto__.__proto__); // Person

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true

// Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor); // Person()
*/

/*
// [14-219] Coding Challenge #3
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


const EV = function(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function() {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`);
};

const Tesla = new EV('Tesla', 120, 23);
Tesla.chargeBattery(90);
Tesla.accelerate();
*/

/*
// [14-220] Inheritance Between "Classes": ES6 Classes
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Method
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
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
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear); // 부모 클래스의 생성자이다.
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  // 부모 메소드 수정해보기. 원리는 prototype chain에서 child class의 메소드에서 같은 이름이 발견되면 더 이상 prototype chain을 안 거치기 때문이다.
  calcAge() {
    console.log(
      `I'm ${
        2022 - this.birthYear
      } years old, but as a student I feel more like ${
        2022 - this.birthYear + 10
      }`
    );
  }
}

// super()는 부모 클래스의 생성자이다. 여기에 부모 클래스의 생성자에 대한 인수를 전달하면 된다.
// super()가 항상 생성자 함수의 맨 처음에 나와야 한다. 그래야만 이후 하위 클래스의 this키워드에 접근이 가능하다. 이미 extends키워드를 통해 PersonCl의 생성자를 상속받은 상태이기에, 하위 클래스인 StudenCl은 생성자가 따로 없어도 괜찮다. 여기에 독자적인 property를 갖고자 한다면, 생성자 생성과 함께 super()를 넣어서 this키워드를 사용할 수 있게 해야 한다.

*/

/*
// [14-221] Inheritance Between "Classes": Object.create()

// Inheritance Between "Classes": Object.create
const PersonProto = {
    calcAge() {
      console.log(2037 - this.birthYear);
    },
  
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
};
  
  
const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function() {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

/*
// [14-222] Another Class Example
class Account {
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        this.pin = pin;
        this.movements = [];
        this.locale = navigator.language;

        console.log(`Thanks for opening an account ${owner}`);
    }


    // Public interface
    deposit(val) {
        this.movements.push(val);
    }

    withdraw(val) {
        this.deposit(-val);
    }

    approveLoan(val) {
        return true;
    }

    requestLoan(val) {
        if(this.approveLoan(val)) {
            this.deposit(val);
            console.log('Loan approved');
        }
    }

}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000); // <- 유저가 접근하면 안 되는 데이터
console.log(acc1);
console.log(acc1.pin); // <- 유저가 접근하면 안 되는 데이터

// 위와 같이 유저가 접근하면 안 되는 데이터가 존재한다. 이럴 경우, 데이터 캡슐화 및 데이터 개인 정보 보호가 정말로 필요하다. 다음 강의가 이에 대한 내용이다.
*/


/*
// [14-224] Encapsulation: Protected Properties and Methods

// Public fields
// Private fields
// Public methods
// Private methods

// Encapsulation: Protected Properties and Methods
// Encapsulation: Private Class  and Methods

// 1) Public fields
// 2) Private fields - #을 사용해서 private한 fields를 구현한다. fields를 선언할 때는 따로 const, let을 붙이지 않아도 된다.
// 는 constructor의 property와 동일하게 instance 내부에 저장되기 때문에 prototype에 포함되지 않는다. (애초에 property를 field라고 부르기도 하고, 둘이 같은 의미)
// 3) Public methods
// 4) Private methods - private method의 이름 앞에 #을 붙이면, private class field 로 인식하고선 property가 아니라 instance 자체에 해당 메소드를 집어넣는다. 그래서 _(underscore convention)를 사용한다. 
// (there is also the static version) -- static은 인스턴스가 아니라, 클래스 자체에서만 사용할 수 있는 것들이다. ex) Object.create()

class Account {
    // 1) Public fields (instances)
    locale = navigator.language;
  
    // 2) Private fields (instances)
    #movements = [];
    #pin;
    // pin은 생성자에 대한 입력값을 기반으로 하는데, private할 필요가 있다. 이럴 경우 #을 붙인 빈 변수를 만든 후, constructor에서 그 값을 재정의하도록 한다.
  
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.#pin = pin;
  
      // Protected property
      // this._movements = [];
      // this.locale = navigator.language;
  
      console.log(`Thanks for opening an account, ${owner}`);
    }
  
    // 3) Public methods
  
    // Public interface
    getMovements() {
      return this.#movements;
    }
  
    deposit(val) {
      this.#movements.push(val);
      return this;
    }
  
    withdraw(val) {
      this.deposit(-val);
      return this;
    }
  
    requestLoan(val) {
      // if (this.#approveLoan(val)) {
      if (this._approveLoan(val)) {
        this.deposit(val);
        console.log(`Loan approved`);
        return this;
      }
    }
  
    static helper() {
      console.log('Helper');
    }
  
    // 4) Private methods
    // #approveLoan(val) {
    _approveLoan(val) {
      return true;
    }
  }
  
  const acc1 = new Account('Jonas', 'EUR', 1111);
  
  // acc1._movements.push(250);
  // acc1._movements.push(-140);
  // acc1.approveLoan(1000);
  
  acc1.deposit(250);
  acc1.withdraw(140);
  acc1.requestLoan(1000);
  console.log(acc1.getMovements());
  console.log(acc1);
  Account.helper(); // Static method
  
  // console.log(acc1.#movements); // SyntaxError
  // console.log(acc1.#pin); // SyntaxError
  // console.log(acc1.#approveLoan(100));
  

// Chaining
// method에 'return this;'를 함으로써 아래의 chaining이 오류없이 작동되도록 설정.
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());


*/


// [14-226] Coding Challenge #4

/*
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


const EV = function(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function() {
  this.speed += 20;
  this.charge--;
  console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`);
};

const Tesla = new EV('Tesla', 120, 23);
Tesla.chargeBattery(90);
Tesla.accelerate();
*/

class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }

    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    }
    
    brake () {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    };
}

class EVCl extends CarCl {

    #charge;

    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
      
    accelerate() {
        this.speed += 20;
        this.charge--;
        console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.chargeBattery(30).accelerate().brake().accelerate();
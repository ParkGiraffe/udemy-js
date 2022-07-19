'use strict';

/*
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

*/
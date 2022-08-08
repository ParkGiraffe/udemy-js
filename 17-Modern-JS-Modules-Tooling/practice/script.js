// Importing Module

/* 
//[17-272]  Exporting and Importing in ES6 Modules

import { addToCart, totalPrice as price, tq } from "./shoppingCart"; 
// 중괄호 안에 export한 변수와 정확힌 똑같은 이름으로 가져와야 한다.
// as 키워드를 이용해서 불러온 데이터의 변수명을 변경해줄 수 있다. 이는 export의 경우에도 적용 가능


console.log('Importing Module');

addToCart('Shoes', 2);
console.log(price, tq);


import * as ShoppingCart from "./shoppingCart";
// *을 쓴다는 것은 모든 export 데이터를 한 번에 가져온다는 것이다. 관행으로 해당 파일명을 이름으로 한 객체에 저장해서 가져온다.
ShoppingCart.addToCart('Shoes', 2);
console.log(ShoppingCart.totalPrice); // 237

// 기본 내보내기의 경우에는 중괄호 없이 이름만 쓰면 된다.
import add from "./shoppingCart";
add("Shoes", 2);


명명 내보내기와 기본 내보내기를 동시에 사용할 수는 있는데, 일반적으로는 이렇게 안 쓴다. (걍 쓰지 마라. 쓰면 나중에 혼남) 그냥 가능만하다고 참고하면 된다.
import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
console.log(price);


import add, { cart } from "./shoppingCart";
add("Shoes", 2);
add("Shirts", 1);
add("Pants", 1);

console.log(cart);
// 비록 다른 파일에서 import 해왔음에도 불구하고, 위에 add한 요소가 cart 배열 안에 그대로 다 들어가 있다. 이는 JS가 사본을 복사하는 것이 아니라, Live connection으로 모듈을 가지고 옴을 뜻한다. 화면 뒤에서는 동일한 개체로 작동한다.
*/

/*
// [17-273] Top-Level Await (ES2022)
// html script Tag에서 module을 사용하면, Module를 비동기로 불러오는 방식이다보니, 이제는 async 키워드가 없어도 await를 사용할 수 있다. 만약에 Import대상 모듈에서 상위 await문을 사용한다면, 그 작업이 다 끝날 때까지 import를 받을 모듈이 실행되는 것을 막는다. 그래서 차상위 await를 사용할 때는 항상 주의를 하고 사용해야 한다. 안 그러면 프로그램이 매우 느려진다.
console.log('Start fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data);
console.log('Something');



const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// Not very clean - 원래는 await를 async 함수 안에서만 써야했기에 차상위 레벨에서는 then()을 무조건 써야 했다.
lastPost.then(last => console.log(last));

const lastPost2 = await getLastPost();
console.log(lastPost2);
*/

/*
// [17-274] The Module Pattern
// 모듈 패턴의 주요 목표는 기능을 캡슐화하여 개인 데이터를 보호하고 공개 API를 노출하는 것이다. 그리고 이를 잘 실현시키는 방식은 바로 함수를 이용하는 것이다. 함수는 private 데이터를 접근하여 어떠한 값을 return 해주기 때문이다. 그래서 공개 API가 될 수 있다.

// IIFE 내부에서 선언된 변수는 외부에서 볼 수 없다. (== 기능범위를 만들 수 있다. private scope제작 가능) 그리고 IIFE는 변수에 할당할 수 잆는 값을 리턴할 수 있다. 그래서 이를 통해 Module Pattern을 만든다.
// Module Parttern은 closure를 이용한 scope에 의한 방식이다. 그러다보니 객체랑은 다르다. 당장 밑의 함수만 봐도 this 키워드 없이 작동한다. 함수가 실행이 됐지만, return을 통해 값이 Top-level로 나와있는 상황이고, 그러다보니 birthPlace가 여전히 존재하기 때문에 IIFE 모듈 안의 값을 계속 접근할 수 있는 것이다. (다시 이 내용에 대해 공부하고 싶으면 closure 강의 참조)
const ShoppingCart2 = (function () {
  const cart = [];
  const shoppincCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({
      product: product,
      quantity: quantity
    });
    console.log(`${quantity} ${product} added to cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({
      product: product,
      quantity: quantity
    });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return { // 함수 안에 있는 비공개 데이터를 공개하는 API
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  }
})();

ShoppingCart2.addToCart('Shoes', 2);
ShoppingCart2.addToCart('Shirts', 1);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shoppincCost); // undefined <- private함.

// 이 기능은 ES6에서 native module이 생기기 전에 사용했던 방식이다. 다만 이 방식은 export import가 안 되다보니 한 파일에 하나의 모듈을 저장하려고 하면 애로사항이 발생한다.
*/


// [17-274] The Module Pattern

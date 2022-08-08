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
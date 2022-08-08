// Exporting Module
console.log('Exporting Module');

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({
    product: product,
    quantity: quantity
  });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };
// 중괄호를 이용해서 여러 개를 같이 보낼 수 있다. 
// as 키워드를 이용해서 불러온 데이터의 변수명을 변경해줄 수 있다. 이는 import의 경우에도 적용 가능

// 모듈 당 하나의 항목만 내보내려는 경우 default 키워드를 사용한다.
export default function (product, quantity) {
  cart.push({
    product: product,
    quantity: quantity
  });
  console.log(`${quantity} ${product} added to cart`);
};
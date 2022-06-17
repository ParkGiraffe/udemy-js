'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); // href, a와 같은 하이퍼링크 태그는 디폴트 값으로 클릭 시  사이트 맨  위로 스크롤 한다는 문제가 있다. e.preventDefault()는 이를 방지해준다.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



////////////////////////////////////////////////////////
////////////////////////////////////////////////////////


// [13-186] Selecting, Creating, and Deleting Elements
// Selecting elements
console.log(document.documentElement); // <- 전체 HTML 호출
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section'); // NodeList를 반환. HTML에 변경이 일어나도, NodeList의 내부 요소에는 변화가 없다.
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // 모든 요소를 HTMLCollection에 저장해서 return. <- NodeList와는 다르게 HTMLCollection은 해당 HTML Element에 변경사항이 있으면 즉시 적용된다. 

document.getElementsByClassName('btn'); // 얘도 querySelectorAll와는 다르게 HTMLCollection을 반환한다.
// 일부 상황에서만 HTMLCollection을 사용하고, 대부분 querySelector를 사용한다.


// Creating and inserting elements
// .insertAdjacentHTML

const message = document.createElement('div'); // DOM 요소를 생성 후 변수에 저장. 이를 페이지에 삽입하는 과정이 있기 전까지는 DOM에 올려진 게 아니다.
message.classList.add('cookie-message'); // 해당 DOM 요소에 클래스 추가
message.textContent = 'We use cookied for improved functionality and analytics.'; // 텍스트 삽입
message.innerHTML = '<button class="btn btn--close--cookie">Got it!</button>'; // HTML 삽입

// DOM에 삽입하기.
header.prepend(message); // header에 해당 DOM요소를 맨 처음 부분에 삽입해서 DOM에 올림.
header.append(message); // header에 해당 DOM요소를 맨 마지막 부분에 삽입해서 DOM에 올림. 
// 똑같은 요소를 추가할 경우, 마지막에 실행된 작업 위치에만 해당 DOM 요소가 있게 된다. 위의 상황의 경우 append()인 맨 마지막에 위치한다. 이런 경우, 실제로 삽입과 제거가 일어나진 않고 위치 이동만 시킨다.
// 그래서 해당 메소드를 DOM 요소 추가 제거 뿐만 아니라 위치 이동을 위해 사용할 수도 있다.
// DOM 요소는 한 번에 하나만 존재할 수 있다. 하지만 굳이 복사를 원한다면? cloneNode(true) 메소드를 사용하면 된다.
header.append(message.cloneNode(true));



header.before(message);
header.after(message);
// before()과 after()로도 해당 요소의 전후에 DOM 요소를 추가할 수 있다.


// Delete elements
document.querySelector('.btn--close--cookie').addEventListener('click', function() {
  message.remove();
  message.parentElement.removeChild(message); // DOM 순회를 이용해서 부모노드를 이용하여 자식노드인 해당 노드를 제거.
});



// [13-187] Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // empty <- JS, CSS에서 지정한 style값만 읽어올 수 있다. 아무값도 지정하지 않았을 때 default 방식에 의해 html에 보여지는 style 값은 가져올 수 없다.
// 만약에 페이지에 보여지는 style을 가져오고 싶다면? getComputedStyle()을 이용하면 된다.

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); // 43.x

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'

document.documentElement.style.setProperty('--color-primary', 'oranged ')
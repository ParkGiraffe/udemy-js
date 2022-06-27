'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

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

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect(); // section1의 위치 <- 이 위치는 현재 윈도우 viewport에 따라 상대적이다.
  console.log(s1coords); 

  console.log(e.target.getBoundingClientRect()); // 버튼의 상대적 위치

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // 브라우저 현재 윈도우의 위치

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth // scorllbar는 고려하지 않음.
  ); // 브라우저 현재 윈도우의 크기 (윈도우 보기 상자 크기);

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset 
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 현대적인 방식으로 부드러운 스크롤 구현. (최신 브라우저에서만 작동)
  section1.scrollIntoView({ behavior: 'smooth' });

});


///////////////////////////////////////
// Page Navigation

/*
// 기존의 forEach를 이용해서 NavBar 구현
document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('LINK'); 
    // 해당 anchor HTML요소들에는 href attribtue가 설정되어 있어서, 클릭하면 href 링크(HTML 요소)로 이동한다.
    const id = this.getAttribute('href'); // 해당 HTML 요소의 속성 값을 알아내는 법.
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); 
  });
});
*/
/*
// Event delegation 이용해서 NavBar 구현
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav_links').addEventListener('click', function(e) {
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href'); // 해당 HTML 요소의 속성 값을 알아내는 법.
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); 
  }
});
*/








////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

/*
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
*/

/*
// [13-187] Styles, Attributes and Classes

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // empty <- JS, CSS에서 지정한 style값만 읽어올 수 있다. 아무값도 지정하지 않았을 때 default 방식에 의해 html에 보여지는 style 값은 가져올 수 없다.
// 만약에 페이지에 보여지는 style을 가져오고 싶다면? getComputedStyle()을 이용하면 된다.

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); // 43.x

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'oranged'); // 해당 CSS 속성의 색상 값을 oranged로 변경.

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt); // 해당클래스의 속성을 property로 받아옴. 
console.log(logo.src);
console.log(logo.className); // .nav__logo

logo.alt = 'Beautiful minimalist logo'; // Attribute 수정

// Non-standard
console.log(logo.designer); // undefined <- 이런 방식은 html 태그의 표준 속성만 가능하고, 임의로 만든 속성일 경우 위의 방식으로 불러오지 못한다.
// 굳이 가져오고 싶다면? getAttribute()메소드를 이용한다.
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist'); // 새로운 Attribute 생성

console.log(logo.src); // http:// ~~ img/logo.png <- 로고 이미지의 절대주소
console.log(logo.getAttribute('src')); // img/logo.png<- 로고 이미지의 상대주소

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // http:// ~~ #
console.log(link.getAttribute('href')); // #

// Data attributes
console.log(logo.dataset.versionNumber); // 해당 html 요쇼의 속성 중 data-로 시작하는 속성의 값을 가져옴. html: data-version-number 인데 여기선 camelCase로 가져와야 함.

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes

// Don't use
logo.className = 'jonas'; // <- 이럴 경우 기존의 모든 클래스를 초기화하고, 해당 클래스 하나만으로 재정의해버린다.

*/

/*
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
  const s1coords = section1.getBoundingClientRect(); // section1의 위치 <- 이 위치는 현재 윈도우 viewport에 따라 상대적이다.
  console.log(s1coords); 

  console.log(e.target.getBoundingClientRect()); // 버튼의 상대적 위치

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset); // 브라우저 현재 윈도우의 위치

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth // scorllbar는 고려하지 않음.
  ); // 브라우저 현재 윈도우의 크기 (윈도우 보기 상자 크기);

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset 
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 현대적인 방식으로 부드러운 스크롤 구현. (최신 브라우저에서만 작동)
  section1.scrollIntoView({ behavior: 'smooth' });

});
*/

/*
// [13-189] Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

*/

/*
// [13-190] Event Propagation : Bubbling and Capture
// [13-191] Event Propagation in Practice

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this); // true

  // Stop propagation
  // e.stopPropagation(); // 해당 요소만 색깔이 바뀌고, 부모 요소로 이벤트 전파가(bubbling) 일어나지 않는다.
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
*/










// [13-192] Event Delegation: Implementing Page Navigation



// [13-194]
/*
// DOM Traversing
const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
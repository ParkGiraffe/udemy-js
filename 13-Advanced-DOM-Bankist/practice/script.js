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
//이런 방식으로 구현할 경우, 해당 요소가 수백개일 때 그만큼의 복사본을 가져야해서 프로그램이 매우 느려진다.

// Event delegation 이용해서 NavBar 구현
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function(e) {
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    console.log('LINK');
    const id = e.target.getAttribute('href'); // 해당 HTML 요소의 속성 값을 알아내는 법.
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); 
  }
});



// [13-194] Building a Tabbed Component
// Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', function() {
//   console.log('TAB')
// }));

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab'); // closet() - 상위 요소(부모 element) 중에 해당 클래스가 있는지 찾고, 있으면 그것을 반환. 없으면 null을 반환.
  console.log(clicked);

  // Guard clause
  // Container의 빈 구간을 클릭 시에 함수가 작동하는 것을 방지하기 위함.
  if(!clicked) return;

  // Remove active classes
  // 기존에 활성화된 다른 탭들을 비활성화 시킴.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  
  // Activate tab (위에 타원 3개)
  clicked.classList.add('operations__tab--active');

  // Active content area (타원 3개 밑의 컨텐츠 박스)
  console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

// [13-195] Passing Arguments to Event Handlers
// Menu fade animation
const nav = document.querySelector('.nav');

// const handleHover = function(e, opacity) {
//   if(e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(el => {
//       if(el !== link) el.style.opacity = opacity;
//     })
//     logo.style.opacity = opacity;
//   }
// };

// nav.addEventListener('mouseover', handleHover); <- 이럴 경우 핸들러에 인자를 전달할 수가 없다.
// nav.addEventListener('mouseover', handleHover(e, 0.5)); 역시나 <- 작동하지 않는다.

// mouseover와 mouseenter은 유사하나, 큰 차이가 있다면 mouseenter는 bubble이 일어나지 않고, mouseover은 boubble이 일어난다는 것이 있다. 그래서 위처럼 bubbling이 필요하다면 mouseover을 사용하자.
// mouseenter <-> mouseleave || mouseover <-> mouseout


// nav.addEventListener('mouseover', function(e) {
//   handleHover(e, 0.5);
// }); // -> 이렇게 함수 안에 함수를 넣으면 된다.
// nav.addEventListener('mouseout', function(e) {
//   handleHover(e, 1);
// });

// 더 좋은 방안: bind()를 사용한다.


const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// bind()는 함수의 복사본을 만든다. 그리고 함수 호출에 this 키워드를 설정한다.
// 복사본을 만들어서 새로운 함수를 리턴하는 개념이기 때문에 Listner의 콜백함수이면서 인자를 받을 수 있게 됐다.
// 기본적으로 핸들러의 함수는 하나의 매개변수 만을 가질 수 있다. 다만 bind()에는 하나의 파라미터만 받도록 해야 하지만, this 키워드를 이용해서 여러 인자를 받을 수는 있다.


/*
// [13-196] Implementing a Sticky Navigation: The Scroll Event (좋지는 않은 방식으로 일단 구현해보기)
// Sticky navigation
const initialCoords = section1.getBoundingClientRect()

window.addEventListener('scroll', function(e) {
  console.log(window.scrollY);

  if(this.window.screenY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky'); 
});
// 이와 같이 스크롤 이벤트를 사용하는 방식은 성능이 매우 좋지 않다. 아주 작은 스크롤 변경 사항이 있어도 계속 함수가 호출되기 때문이다.
*/

// [13-197] A Better Way: The Intersection Observer API
// Sticky navigation: Intersection Observer API

/*
const obsCallback = function(entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
};

const obsOptions = {
  root: null,
  threshold: 0.1,
};

// root: 대상 객체의 가시성을 확인할 대 사용되는 뷰포트 요소. 이는 대상 객체의 조상요소이어야 한다. 기본값은 브라우저 뷰포트이며, root값이 Null이거나 지정되지 않을 대 기본값으로 설정된다. 이 속성의 값은 CSS의 margin 속성과 유사합니다. e.g. "10px 20px 30px 40px" (top, right, bottom, left). 이 값은 퍼센티지가 될 수 있습니다. 이것은 root 요소의 각 측면의 bounding box를 수축시키거나 증가시키며, 교차성을 계산하기 전에 적용됩니다. 기본값은 0입니다.
// rootMargin: root가 가진 여백입니다. (px)
// threshold: 임계값. 대상 요소가 root에 지정된 요소 내에서 n% (0.1로 표기 ==> 10%) 보여질 때 콜백이 호출될 것을 의미한다.
// threshold에 대한 긴 설명 - observer의 콜백이 실행될 대상 요소의 가시성 퍼센티지를 나타내는 단일 숫자 혹은 숫자 배열입니다. 만일 50%만큼 요소가 보여졌을 때를 탐지하고 싶다면, 값을 0.5로 설정하면 됩니다. 혹은 25% 단위로 요소의 가시성이 변경될 때마다 콜백이 실행되게 하고 싶다면 [0, 0.25, 0.5, 0.75, 1] 과 같은 배열을 설정하세요. 기본값은 0이며(이는 요소가 1픽셀이라도 보이자 마자 콜백이 실행됨을 의미합니다). 1.0은 요소의 모든 픽셀이 화면에 노출되기 전에는 콜백을 실행시키지 않음을 의미합니다.



const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height; // 반응형 사이트일 경우 nav의 높이는 화면 크기에 따라 달라진다. 이에 맞춰서 실제 표시되는 높이값을 불러와줄 필요가 있다. getBoundingClinedRect()를 사용하면 실제 사용자의 화면에 보여지는 크기에 대한 다양한 정보를 객체형으로 가져올 수 있다.

const stickNav = function(entries) {
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);





// [13-198] Revealing Elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;
  
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});



 
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, observer) {
  const [entry] = entries;
  
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);

};

const imgObeserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObeserver.observe(img);
});



// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn slider__btn--left');
const btnRight = document.querySelector('.slider__btn slider__btn--right');

let curSlide = 0
const maxSlide = slides.length;

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)})`);
}

goToSlide(0);
// 0%, 100%, 200%, 300%

// Next Slide
const nextSlide = function() {
  if(curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  
  goToSlide(curSlide);
  // curSlide = 1; -100%, 0%, 100%, 200%
}

const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
}


btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

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
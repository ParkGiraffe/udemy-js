'use strict';

// id의 경우 getElementById()로 불러올 수 있다. 이때는 #을 안 붙여도 된다.
// (querySelector()에 비해 아주 살짝 빠르다고 한다.)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
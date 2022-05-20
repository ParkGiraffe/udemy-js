'use strict';

// id의 경우 getElementById()로 불러올 수 있다. 이때는 #을 안 붙여도 된다.
// (querySelector()에 비해 아주 살짝 빠르다고 한다.)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Startinc Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

btnRoll.addEventListener('click', function() {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // img의 src attribute 수정은 이렇게 하면 된다.

    if (dice !== 1) {
        current0El += currentScore;
        current0El.textContent = current0El;
    } else {
        
    }
});
'use strict';

// id의 경우 getElementById()로 불러올 수 있다. 이때는 #을 안 붙여도 된다.
// (querySelector()에 비해 아주 살짝 빠르다고 한다.)
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.getElementById('player--0')
const player1El = document.getElementById('player--1')
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

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;


function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    //toggle()은 없을 때는 add, 있을 대는 Remove 해주는 function이다.
}

btnRoll.addEventListener('click', function() {
    if(playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);
    
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`; // img의 src attribute 수정은 이렇게 하면 된다.
    
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }

});

btnHold.addEventListener('click', function() {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});


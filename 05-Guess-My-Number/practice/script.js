'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/


// addEventListener(name of the event that, we're listening for, event handler)는 어떤 이벤트가 일어났을 때 event handler가 실행되도록 해준다.
// 그리고 Event handler는 function이다.

const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value); // JS는 input 받은 데이터를 String으로 반환한다.
    console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = '🛑 No number!';
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct Number';
        document.querySelector('body').style.backgroundColor ='#60b347';
        document.querySelector('.number').style.width = '30rem';
    } else if (guess < secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'Too low!';
            score--;
            document.querySelector('.score').textContent = score; // data가 변할 때마다 DOM이 불러와서 rewrite 하도록 함.
        } else {
            document.querySelector('.message').textContent = 'You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    } else if (guess > secretNumber) {
        if (score > 1) {
            document.querySelector('.message').textContent = 'Too high!';
            score--;
            document.querySelector('.score').textContent = score; // data가 변할 때마다 DOM이 불러와서 rewrite 하도록 함.
        } else {
            document.querySelector('.message').textContent = 'You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    }
});

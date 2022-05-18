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
document.querySelector('.check').addEventListener('click', function() {
    const guess = Number(document.querySelector('.guess').value); // JS는 input 받은 데이터를 String으로 반환한다.
    console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = '🛑 No number!';
    }
});

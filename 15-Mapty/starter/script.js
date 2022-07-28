'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position) {
    // 위치를 얻는 데 성공했을 경우 인자로 받아올 수 있다.
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    
}, function() {
    alert('Could not get your postion');
});
// getCurrentPosition()
// successCallback : 위치를 불러오는 데 성공했을 경우의 callback. 위치를 얻는 데 성공했을 경우 인자로 받아올 수 있다.
// errorCallback : 위치를 불러오는 데 실팼을 경우의 callback
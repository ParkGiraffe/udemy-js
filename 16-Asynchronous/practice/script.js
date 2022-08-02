'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// new URL of the API
// https://restcountries.com/v2/

/*
// 과거의 방식으로 AJAX 사용해보기. - XMLHttpRequest()
// open(CRUD 명령어 유형, 데이터를 받아올 서버 url) - 서버에 요청할 내용 작성
// send()- 서버에 요청 보내고 데이터를 받음. (비동기)
// 비동기 방식일 때 'load' 콜백 함수를 만들어주면 쉽게 값을 확인할 수 있다.
// resonseText에 JSON파일이 들어오는데, JSON.parse()를 통해 object로 변환한다.

const getCountryData = function(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v2/name/${country}`);
    request.send()
    
    request.addEventListener('load', function() {
        const [data] = JSON.parse(this.responseText);
        console.log(data);
    
        const html = `
            <article class="country">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}M people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
              </div>
            </article>
        `;
        countriesContainer.insertAdjacentHTML('beforeend', html);
        countriesContainer.style.opacity = 1;
    });
};

getCountryData('portugal');
getCountryData('usa');
*/

/*

// [15-250] Welcome to Callback Hell
// 비동기과정에서 이처럼 콜백함수가 여러 개가 중첩이 되는 현상이 발생하는데, 보기 흉하고 버그를 야기하기 좋다. ES6이후로 생긴 promise를 통해 이 문제를 해결할 수 있다. (다음 강의로)
const getCountryAndNeighbour = function (country) {
    // AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
    request.send();
  
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
  
      // Render country 1
      renderCountry(data);
  
      // Get neighbour country (2)
      const [neighbour] = data.borders;
  
      if (!neighbour) return;
  
      // AJAX call country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
      request2.send();
  
      request2.addEventListener('load', function () {
        const data2 = JSON.parse(this.responseText);
        console.log(data2);
  
        renderCountry(data2, 'neighbour');
      });
    });
  };
  
  // getCountryAndNeighbour('portugal');
  getCountryAndNeighbour('usa');
  
  setTimeout(() => {
    console.log('1 second passed');
    setTimeout(() => {
      console.log('2 seconds passed');
      setTimeout(() => {
        console.log('3 second passed');
        setTimeout(() => {
          console.log('4 second passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
  */

// [15-251] Promises and the Fetch API
// [15-252] Consuming Promises
// fetch(url) : url로부터 데이터를 얻어온다. promise를 반환한다.
// promise.prototype.then(함수) : promise가 fulfilled 상태일 때 작동. then 안의 함수는 fulfilled promise의 결과값을 인자로 받을 수 있다. (이 인자를 response라고 많이 표기함. AJAX 용어)
// fetch()를 통해 가져온 데이터는 바로 읽을 수는 없는 ReadableStream형식으로 전달된다. 이를 해결하는 방법으로 '.json()' 메소드를 이용하는 것인데, json()또한 async함수라서 또 promise를 반환한다. 그래서 또 then() 메소드로 처리를 할 필요가 있다.

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
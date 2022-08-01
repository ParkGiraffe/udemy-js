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
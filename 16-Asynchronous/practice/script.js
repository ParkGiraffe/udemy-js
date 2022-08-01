'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// new URL of the API 
// https://restcountries.com/v2/


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
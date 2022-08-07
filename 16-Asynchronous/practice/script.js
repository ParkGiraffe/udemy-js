'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
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

// [16-250] Welcome to Callback Hell
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

/*
// [16-251] Promises and the Fetch API
// [16-252] Consuming Promises

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
*/

/*
// [16-253] Chaining promises
// then()메소드는 우리가 무엇을 반환하던 간에 promise를 항상 반환한다. 만약에 return 23이라고 하고 Number를 반환한다면, fulfillment value가 23인 promise를 then()은 반환할 것이다. 그래서 또 뒤에 then() 메소드를 사용할 수 있게 된다.
// 일련의 promise 체인은 콜백지옥과는 다르게 보기 쉽고 직관적인 모습을 보인다. 이를 Flat chain이라고도 부르는 것으로 보인다.
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour')); // alpha로 가져온 값은 array가 안 씌워져 있음.
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

getCountryData('usa');
*/

/*
// [16-254] Handling Rejected Promises
// catch() 메소드는 promises chain에서 종합적인 에러를 한 번에 잡아주는 역할을 해준다. 따라서 중간중간마다 복잡하게 error handling을 해주지 않아도 된다.
// 이때 catch()가 반환하는 Error도 JavaScript 객체이다. 그래서 err.message로 메시지만 빼올 수 있다.

// finally()는 promise가 성공하든 실패하든 호출하는 함수이다. 가장 좋은 예시는 '로딩스피너 제거'이다.
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      console.log(neighbour);
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour')) // alpha로 가져온 값은 array가 안 씌워져 있음.
    .catch(err => {
      console.err(`ERROR: ${err}`);
      renderError(`Something went wrong. ${err.message}. Try again!`);
    })
    .finally(() => countriesContainer.style.opacity = 1);
};

const renderError = function(msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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
  // countriesContainer.style.opacity = 1;
};

btn.addEventListener('click', function() {
  getCountryData('usa');
});

*/

/*
// [16-255] Throwing Errors Manually
// 'throw new Error()'를 통해 미리 설정해놓은 에러상황에 맞추어 Error 객체를 던질 수 있다.
// promisePrototype.ok는 데이터를 가져온 여부를 bool타입으로 갖는다. promisePrototype.status는 통신 결과 Http 숫자(200, 404)를 가진다.
const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json;
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');
      return getJSON(
        `https://restcountries.com/v2/name/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour')) // alpha로 가져온 값은 array가 안 씌워져 있음.
    .catch(err => {
      console.error(`ERROR: ${err}`);
      renderError(`Something went wrong. ${err.message}. Try again!`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
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
  // countriesContainer.style.opacity = 1;
};

btn.addEventListener('click', function () {
  getCountryData('usa');
});
*/
/*

// [16-256] Coding Challenge #1

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
  // countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=370004336917070805707x7354`
  )
    .then(res => {
      if (!res.ok)
        throw new Error(`Problem with geocoding (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.region}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json()
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.error(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

whereAmI(52.508, 13.38); // Berlin, Germany
*/

/*
// [16-259] Building a Simple Promise
// Promise를 직접 만들 때는 함수를 생성자에 전달한다. 이 함수는 두 개의 인자를 생성자로부터 받는데, reslove()와 reject()이다. resolve()는 promise의 요청이 fulfilled 됐을 때, reject()는 요청이 reject 됐을 때 각각 성공과 실패 값을 전달해주는 함수이다.

// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮'); // - microtasks queue
  setTimeout(function () { // 비동기 지점 & callback queue
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000); // - callback queue
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x)); // - microtasks queue
Promise.reject(new Error('Problem!')).catch(x => console.error(x)); // - microtasks queue
*/

/*
// [16-260] Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition()은 두 개의 함수를 인자로 받는데, 첫 번째는 위치를 불러오는 데 성공했을 경우, 두 번째는 실패했을 경우를 위한 함수이다.

const getPosition = function () {
  return new Promise(function (reslove, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(reslove, reject);
  });
};

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=370004336917070805707x7354`
      );
    })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(`You are in ${data.region}, ${data.country}`);
      // console.log(data);
      return fetch(`https://restcountries.com/v2/alpha/${data.state}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      renderCountry(data);
    })
    .catch(err => {
      console.error(`${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', whereAmI);

*/

/* [16-261] Coding Challenge #2
const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    const imgContainer = document.querySelector('.images');

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.err(err));
*/

/*
// [16-262] Consuming Promises with Async/Await
// 현대 자바스크립트는 async/await로 더 쉽게 promise consume을 할 수 있다.
// fetch받은 promise를 json() 할 때도 await를 사용해야 한다.
const getPosition = function () {
  return new Promise(function (reslove, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(reslove, reject);
  });
};

const whereAmI = async function() {
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json&auth=370004336917070805707x7354`);
  const geoData = await geoRes.json();
  const res = await fetch(`https://restcountries.com/v2/alpha/${geoData.state}`);
  const data = await res.json();
  renderCountry(data);
}
*/

/*
// [16-263] Error Handling with Try...Catch
// try-catch 구문은 async/await 나오기 전부터 있었다. 그래서 둘이 원래는 아무 관련이 없는데, 비동기 함수 오류를 잡는데에 탁월해서 같이 잘 쓰인다.


// 간단한 예제
try {
  const x = 1;
  x = 3; // 상수에 대입은 불가능.
} catch (err) {
  alert(err.message)
};


const getPosition = function () {
  return new Promise(function (reslove, reject) {
    navigator.geolocation.getCurrentPosition(reslove, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const geoRes = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=370004336917070805707x7354`
    );
    if (!geoRes.ok) throw new Error('Problem getting location data');
    const geoData = await geoRes.json();
    const res = await fetch(
      `https://restcountries.com/v2/alpha/${geoData.state}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data);
  } catch (err) {
    console.err(`${err}`);
    renderError(err);
  }
};

whereAmI();
// fetch()로 가져온 promise의 경우 403 또는 404 에러일 때는 reject()가 일어나지 않는다. 그래서 promise.prototype.ok를 이용해서 따로 오류를 던지는 구문을 만들어줘야 한다.
*/

/*
// [16-264] Returning Values from Async Functions
const getPosition = function () {
  return new Promise(function (reslove, reject) {
    navigator.geolocation.getCurrentPosition(reslove, reject);
  });
};

const whereAmI = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    const geoRes = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=370004336917070805707x7354`
    );
    if (!geoRes.ok) throw new Error('Problem getting location data');
    const geoData = await geoRes.json();
    const res = await fetch(
      `https://restcountries.com/v2/alpha/${geoData.state}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data);

    return geoData.state;
  } catch (err) {
    console.err(`${err}`);
    renderError(err);

    // Reject promise returned from async function
    // 비동기 함수는 항상 promise를 반환하는데, 내부에 에러가 있음에도 fulfilled and not rejected 상태가 된다. 그래서 then()의 콜백함수가 작동한다. 따라서 catch 구문에서 한 번 error를 던질 필요가 있다. 그래서 오류를 다음으로 전파해야 한다.
    throw err;
  }
};

(async function () {
  try {
    const city = whereAmI();
  } catch (error) {
    console.err(`2: ${err.message}`);
  }

  console.log(`3: Finished getting location`);
})();

*/

/*
// [16-265] Running promises in Parallel
// Promise.all()은 static method로 promise array를 인자로 받은 후 promise들을 병렬로 처리해준다. 그리고 새로운 promise를 반환한다. 이 안에는 array 데이터가 들어있다. 만약 이 중 하나가 rejected되면, 모든 promise가 rejected가 된다.
const get3Countries = async function () {
  try {
    // 직렬로 진행
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    // 병렬로 진행
    const data = function (c1, c2, c3) {
      [
        getJSON(`https://restcountries.com/v2/name/${c1}`),
        getJSON(`https://restcountries.com/v2/name/${c2}`),
        getJSON(`https://restcountries.com/v2/name/${c3}`),
      ];
    };
    console.log(data.map(e => e.capital));
  } catch (error) {
    console.error(error);
  }
};

get3Countries('portugal', 'canada', 'usa');

// Promise.all()처럼 여러 promise를 결합해주는 함수를 combinator functions라고 부른다. 그리고 그 종류는 다양하며 다음 강의에서 배운다.
*/

/*
// [16-266] Other Promise Combinators: Race, Allsetteled and Any

// Promise combinator의 특징 : Promise 배열을 수신하고 Promise를 반환한다.
// Promise.race() : 가장 먼저 settled(완료)되는 Promise만을 리턴하는데, 이 Promise가 resolve되는지 reject되는지는 상관 없다.
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/usa`),
  ]);
  console.log(res);
})();

// 응용 -> 연결 시간이 초과되는 경우
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took to long!'));
    }, s * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res))
  .catch(err => console.err(err));

// Promise.allSettled() : ES2020에서 업데이트 됐다. Promise.all()은 배열 안의 Promise 중 하나라도 reject되면 전체가 reject되고 종료되는데, allSettled()는 하나가 reject되어도 나머지를 계속 실행한다.
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res)); // fulfilled와 rejected promise들이 담긴 Array

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err)); // error문

// Promise.any() : ES2021에 업데이트 됐다. 강의영상을 보면 최신 기능이라서 당시 크롬에서 지원을 안 했다고 한다. Promise.race()와 비슷하게 가장 먼저 resolve된 Promise를 반환하는데, race()와의 차이점은 rejected된 Promise는 무시한다는 것이다.
// 실습해보니 현재 크롬 브라우저에서는 Promise.any()가 잘 작동한다.
Promise.any([
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
  */

// [16-267] Coding Challenge #3
/*
const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    const imgContainer = document.querySelector('.images');

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2)
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.err(err));
*/

// 그로고보니 왜 굳이 setTimeout()을 promise에 엮어서 사용할까? 이 이유를 알기 위해서 다시 공부할 필요가 있다. 아마 JS의 call stack 부분과 연관이 있을 듯하다.
const wait = function (sec) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sec * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    const imgContainer = document.querySelector('.images');

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

/*
const loadNPause = async function() {
  try {
    let img = await createImage('img/img-1.jpg');
    console.log(1);
    await wait(2);
    img.style.display = 'none';
    img = await createImage('img/img-2.jpg');
    console.log(2);
    await wait(2);
    img.style.display = 'none';
  } catch (error) {
    console.error(error);
  }
}

loadNPause();
*/

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    console.log(imgs);
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => img.classList.add('parallel'));
    console.log(imgsEl);
  } catch (error) {
    console.error(error);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);

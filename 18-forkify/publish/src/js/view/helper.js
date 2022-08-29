// helpers.js는 프로젝트에서 계속 재사용 될 함수를 저장하는 곳이다.
// 예를 들면 JSON을 가져오는 함수.

import { TIMEOUT_SEC } from "../config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST", // HTTP 메소드
          headers: {
            "Content-Type": "application/json", // json 타입을 보낸다.
          },
          body: JSON.stringify(uploadData), // 보낼 데이터
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error; // 여기서 에러를 안 던지면 이미 이 안에서 에러가 처리된 채 종료되고, getJSON이 사용된 try-catch 구문에서 일단 Promise불러왔기 때문에 성공적인 promise가 되어서 오류인 줄 모르고 넘어가게 된다.
  }
};

/*
export const getJSON = async function(url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error; // 여기서 에러를 안 던지면 이미 이 안에서 에러가 처리된 채 종료되고, getJSON이 사용된 try-catch 구문에서 일단 Promise불러왔기 때문에 성공적인 promise가 되어서 오류인 줄 모르고 넘어가게 된다.
  }
}




export const sendJSON = async function(url, uploadData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST', // HTTP 메소드
      headers: {
        'Content-Type': 'application/json' // json 타입을 보낸다.
      },
      body: JSON.stringify(uploadData), // 보낼 데이터
    });

    // 데이터를 POST하는 경우에도, 보낸 데이터(uploadData)를 다시 Promise로 반환한다. 이 데이터를 이용해서 인터페이스에도 데이터 추가와 같은 변화를 준다.
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error; 
  }
}*/

export const numberToFraction = function (amount) {
  // This is a whole number and doesn't need modification.
  if (parseFloat(amount) === parseInt(amount)) {
    return amount;
  }
  // Next 12 lines are cribbed from https://stackoverflow.com/a/23575406.
  const gcd = function (a, b) {
    if (b < 0.0000001) {
      return a;
    }
    return gcd(b, Math.floor(a % b));
  };
  const len = amount.toString().length - 2;
  let denominator = Math.pow(10, len);
  let numerator = amount * denominator;
  var divisor = gcd(numerator, denominator);
  numerator /= divisor;
  denominator /= divisor;
  let base = 0;
  // In a scenario like 3/2, convert to 1 1/2
  // by pulling out the base number and reducing the numerator.
  if (numerator > denominator) {
    base = Math.floor(numerator / denominator);
    numerator -= base * denominator;
  }
  amount = Math.floor(numerator) + "/" + Math.floor(denominator);
  if (base) {
    amount = base + " " + amount;
  }
  return amount;
};

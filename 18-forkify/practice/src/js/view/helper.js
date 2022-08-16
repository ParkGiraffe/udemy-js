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


export const getJSON = async function(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
  
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error; // 여기서 에러를 안 던지면 이미 이 안에서 에러가 처리된 채 종료되고, getJSON이 사용된 try-catch 구문에서 일단 Promise불러왔기 때문에 성공적인 promise가 되어서 오류인 줄 모르고 넘어가게 된다.
  }
}

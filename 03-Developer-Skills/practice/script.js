// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// PROBLEM 1 :
// We work for a company building a smart home thermometer. Our most recent task is this: "Given an array of temeratures of one day, calculate the temperature amplitude Keep in mind that sometimes there might be a sensor error."

const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

// 1) Understanding the problem
// - What is tem amplitude? Answer: difference between highest and lowest temp
// - How to compute max and min tempratures?
// - What's a sensor error? And what to do?

// 2) Breaking up into sub-problems
// - How to ignore errors?
// - Find max value in temp array
// - Find min value in temp array
// - Subtract min From max (amplitude) and return it

const calcTemAmplitude = function (temps) {
  let min = temps[0];
  let max = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];
    if (typeof currTemp === 'string');

    if (currTemp > max) max = currTemp;
    if (currTemp < min) min = currTemp;
  }

  return max - min;
};
const amplitude = calcTemAmplitude(temperatures);

console.log(amplitude);

// PROBLEM 2 :
// Function should new recieve 2 arrays of temps

// 1) Understanding the problem
// - With 2 arrays, should we implement functionality twice? NO! Just merge two arrays

// 2) Breaking up into sub-problems
// - Merge 2 arrays

// LINK: https://tutorialpost.apptilus.com/code/posts/js/js-array-concat/
// Array.prototype.concat() 메서드는 인수로 받은 값을 원본 배열의 끝에 새로운 요소로 추가한 뒤 새로운 배열을 반환합니다. 만약 인수로 전달받은 값이 배열이라면 한번 분해한 뒤 요소로 추가하게 됩니다.

const temperatures2 = [0, -1, 23, 27, 31];

const calcTemAmplitudeNew = function (tp1, tp2) {
  const temps = tp1.concat(tp2);
  let min = temps[0];
  let max = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const currTemp = temps[i];
    if (typeof currTemp === 'string');

    if (currTemp > max) max = currTemp;
    if (currTemp < min) min = currTemp;
  }

  return max - min;
};
const newAmplitude = calcTemAmplitudeNew(temperatures, temperatures2);

console.log(newAmplitude);

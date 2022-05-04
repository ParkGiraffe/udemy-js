// [3-32] Activating Strict Mode

'use strict' 
// 이 코드를 맨 처음에 작성하면 JS가 알아서 strict 모드를 실행한다. 무조건 맨 첫 줄에 있어야 한다.
// 또한 Strict 모드를 only specific function or specific block에 적용할 수 있다. 

// stict 모드는 안전한 코드를 위해 존재한다.
// 1. 특정 행동을 금지한다.
// 2. JS가 쉽게 지나칠 수 있는 오류를 발생하는 상황에서, 눈에 보이는 error를 우리에게 보여준다.


let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriverLicense = true; // Driver 뒤에 s가 빠짐. 하지만 error표시는 안 뜸. JS는 var이나 let 기호가 없어도 변수를 생성하기 때문이다.
if (hasDriversLicense) console.log('I can drive :D'); // 아무것도 Console에 표시되지 않음.
// 하지만 여기에 strict모드를 적용시키면, ReferenceError를 출력한다. 

// 또한 예약어의 종류를 늘려서 체크해준다.
// 나중에 업데이트된 기능의 이름은 기본 JS에선 예약어로 지정되어 있지 않는데, strict 모드가 그것을 예방해준다.
const interface = 'Audio'; // SyntaxError: Unexpected strict mode reserved word
const private = 534; // SyntaxError: Unexpected strict mode reserved word

// 이 뿐만아니라 fuctions, objects, setting properties on primitive values and many more에도 strict 모드의 기능이 있지만, 다음 단계의 강의에서 차근차근 알아갈 예정이다.
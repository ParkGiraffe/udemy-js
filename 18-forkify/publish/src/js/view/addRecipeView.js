import View from './view';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View{
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was succefully upload';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');


  /** 페이지가 로드되자마자 핸들러가 호출되기를 원한다. 근데 모델 데이터(state)를 필요로 하는 작업이 아니라서, 따로 컨트롤러에서 subscriber-publisher 할 필요가 없다. 그래서 객체가 생성되자 마자 함수가 실행될 수 있도록 여기서 생성자를 만든 후 호출한다. */
  constructor() {
    super(); // View에서 상속받았기 때문에, super()를 써야 this키워드에 접근 가능.
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  /** 핸들러 내부에서 this키워드를 사용하면 리스너가 연결된 대상(여기서는 _btnOpen)을 가리킨다. 그래서 핸들러 함수를 메소드로 따로 뺀 후, this 키워드를 bind로 연결해주어야 한다. ex: this.toggleWindow.bind(this)*/
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }


  /** 기존 handler와는 다르게 controller에서 간섭을 할 필요가 없는 메소드이기 때문에 private(_)로 선언 */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 현대적인 브라우저 api로 FormData가 있다. 원하는 클래스 안에 있는 form 안의 여러 개의 value를 하나로 묶어줌.
      // FormData의 생성자 인자로 form인 요소를 전달해야 한다. 핸들러 안에서는 핸들러가 추가되는 대상이 this이며 실제로 form element이므로 this를 넣어준다.
      // FormData는 당장 우리가 쓸 수 없는 객체를 반환하므로, spread 연산자와 []를 이용해 우리가 쓸 수 있는 배열로 변환시킨다.
      const dataArr = [...new FormData(this)];
      // ES2019 이후로 항목(entries)을 개체(object)로 바꿀 수 있다. Object.fromEntries([key, value]로 이루어진 배열)
      const data = Object.fromEntries(dataArr);

      handler(data);


    })
  }
}

export default new AddRecipeView();

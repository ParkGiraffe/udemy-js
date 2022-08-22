import icons from 'url:../../img/icons.svg';

export default class View {
  // 뷰는 클래스 형식으로 구현한다. View라는 부모 클래스를 만들어서 각 뷰마다 상속하면 매우 좋다.
  // 팁! - 각 뷰에 parentElement 변수를 만들어서, 해당 뷰가 담겨질 부모 요소를 저장해놓으면 정말 편한다.
  // 아래의 두 private 변수는 모든 뷰에서 공통적으로 들어간다.
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';
  // #으로 작성하면 parcel과 babel이 아직 인식을 못해서 _로 변경함.

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    // #clear도 모든 View에서 사용하기 좋음. 부모 요소(ex: container)를 초기화해주기 때문.
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
        <svg> 
        <use href="${icons}.svg#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

import View from './view';
import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
 
class RecipeView extends View{
  // 뷰는 클래스 형식으로 구현한다. View라는 부모 클래스를 만들어서 각 뷰마다 상속하면 매우 좋다.
  // 팁! - 각 뷰에 parentElement 변수를 만들어서, 해당 뷰가 담겨질 부모 요소를 저장해놓으면 정말 편한다.
  // 아래의 두 private 변수는 모든 뷰에서 공통적으로 들어간다.
  _parentElement = document.querySelector('.recipe');
  _data;
  _errorMessage = 'We could not find that recipe. Please try another one!';
  _message = '';
  // #으로 작성하면 parcel과 babel이 아직 인식을 못해서 _로 변경함.

  // handler function을 인자로 받아서 subscriber에 대한 엑세스를 얻는다.
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--increase-servings');
      if(!btn) return;

      const { updateTo } = btn.dataset;
      if(+updateTo > 0) handler(+updateTo);
    });
  }

  /** recipe view는 recipe데이터를 불러온 후, 마크업을 나중에 만들어서 보여주는 형식이라 바로 해당 클래스에 핸들러를 추가할 수 없다. 이럴 때는 상위요소에서 이벤트를 수신 한 후 하위 요소로 핸들러를 위임해주는 방식을 사용하면 된다.*/
  addHandlerRenderAddBookmark(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--bookmark');
      if(!btn) return
      handler();
    })
  }

  _generateMarkupIngredient(ing) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
  `;
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings - 1}">
                <svg>
                  <use href="${icons}.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings" data-update-to="${this._data.servings + 1}">
                <svg>
                  <use href="${icons}.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}.svg#icon-user"></use>
            </svg>
          </div>

          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}.svg#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${this._data.ingredients
              .map(this._generateMarkupIngredient) // === .map(ing => this._generateMarkupIngredient(ing))
              .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }
}

export default new RecipeView(); // 강연자 만의 방식! - 생성자를 export하기 때문에, 컨트롤러에서 따로 생성자를 불러올 필요도, 데이터를 전달할 필요도 없다. 대신에 render() 메소드를 만든 후 여기로 데이터를 전달한다.

// RecipeView.render(model.state.recipe)
// vs
// const recipeView = new RecipeView(model.state.recipe)

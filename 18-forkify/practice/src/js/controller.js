import * as model from './model.js';
import recipeView from './view/recipeView.js';

// import icons from '../img/icons.svg'; // parcel 1
import icons from 'url:../img/icons.svg'; // parcel 2 - 프로그래밍 파일이 아닌 정적 자신(static asset)일 경우에는 앞에 url:을 붙여야 한다.
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // const id = window.location.hash.slice(1);
    const id = `5ed6604591c37cdc054bc886`;
    
    // 1) Loading Recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id); // async함수는 promise를 반환하기에 await를 사용해줘야 함을 잊지 말자.

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    
  } catch (error) {
    recipeView.renderError();
  }
};

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
}
init();

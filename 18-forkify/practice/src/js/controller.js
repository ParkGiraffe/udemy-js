import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';

// import icons from '../img/icons.svg'; // parcel 1
import icons from 'url:../img/icons.svg'; // parcel 2 - 프로그래밍 파일이 아닌 정적 자신(static asset)일 경우에는 앞에 url:을 붙여야 한다.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = `5ed6604591c37cdc054bc886`;

    // 1) Loading Recipe
    recipeView.renderSpinner();
    await model.loadRecipe(id); // async함수는 promise를 반환하기에 await를 사용해줘야 함을 잊지 말자.

    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResult(query);

    // 3) render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());

    // 4) render pagination
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  // 1) render new results
  resultView.render(model.getSearchResultPage(goToPage));

  // 2) render new pagination buttons  
  paginationView.render(model.state.search);
};

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.render(model.state.recipe);
}

  const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();


import * as model from './model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';

// import icons from '../img/icons.svg'; // parcel 1
import icons from 'url:../img/icons.svg'; // parcel 2 - 프로그래밍 파일이 아닌 정적 자신(static asset)일 경우에는 앞에 url:을 붙여야 한다.
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import bookmarksView from './view/bookmarksView.js';
import addRecipeView from './view/addRecipeView.js';
import { async } from 'regenerator-runtime';
import { MODAL_CLOSE_SEC } from './config.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const id = `5ed6604591c37cdc054bc886`;

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Update results view to mark selected search result
    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

    // 1) Loading Recipe
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

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add/Remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else if(model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}


const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);


    // Success message
    addRecipeView.renderMessage();

    // Render bookmark vie w
    bookmarksView.render(model.state.bookmarks); // 새로운 요소를 삽입하는 것이기 때문에 update X

    // Change ID in URL
    // 브라우저의 history API를 사용한다.
    // pushState()를 통해 페이지를 리로딩 하지 않고서 url를 변경할 수 있다. 이 메소드는 세 개의 인자를 받는다. (state, title, url)이다. 여기서 url이 가장 중요하다. 
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function() {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);

  } catch (error) {
    console.error(error);
    addRecipeView.renderError(error.message);

  }
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerRenderAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

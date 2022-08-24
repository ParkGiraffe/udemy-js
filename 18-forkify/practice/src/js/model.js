import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './view/helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    // 기존에 fetch해온 레시피 객체를 새로운 객체에 담기
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if(state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
      else state.recipe.bookmarked = false;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    state.search.page = 1;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const getSearchResultPage = function(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

export const updateServings = function(newServings) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = element.quantity * newServings / state.recipe.servings
  });

  state.recipe.servings = newServings;
};


export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;
}

/** 일반적으로, 무언가를 추가할 때는 전체 데이터를 넣고, 제거할 때는 해당 id만을 parameter로 받는다. */
export const deleteBookmark = function (id) {
  // Delete Bookmark
  const index = state.bookmarks.findIndex(e => e.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if(id === state.recipe.id) state.recipe.bookmarked = false;
}
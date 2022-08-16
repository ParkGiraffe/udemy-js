import { async } from 'regenerator-runtime';
import { API_URL } from './config';
import { getJSON } from './view/helper';

export const state = {
  recipe: {},
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
    console.log(state.recipe, typeof state.recipe);
  } catch (error) {
    console.error(error)
  }
};

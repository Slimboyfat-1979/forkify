import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import 'core-js';
import 'regenerator-runtime';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    // 1. Loading Recipe
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  //1. Get search query
  const query = searchView.getQuery();
  if (!query) {
    return;
  }
  try {
    //2. Load search results
    await model.loadSearchResults(query);
    //3. Render results
    console.log(model.state.search.results);
  } catch (err) {}
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

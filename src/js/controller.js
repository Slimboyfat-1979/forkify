import * as model from './model.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js';
import 'regenerator-runtime';

// if(module.hot){
//     module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    // 1. Loading Recipe

    resultsView.update(model.getSearchResultsPage());
    
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe);
 
  } catch (err) {
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
    resultsView.renderSpinner();

    //2. Load search results
    await model.loadSearchResults(query);
    //3. Render results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage(3));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

//   recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();

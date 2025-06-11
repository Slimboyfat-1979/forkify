import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeview.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import AddRecipeView from './views/AddRecipeView.js';

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
    bookmarksView.update(model.state.bookmarks);
    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe);

    //3. Updating bookmarks view
  } catch (err) {
    recipeView.renderError();
    console.error(err);
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

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function(newRecipe) {
    try {
        //Show loading spinner
        AddRecipeView.renderSpinner();

       await model.uploadRecipe(newRecipe);
       recipeView.render(model.state.recipe);

       AddRecipeView.renderMessage()
       //close form window

       bookmarksView.render(model.state.bookmarks);

       window.history.pushState(null, '', `#${model.state.recipe.id}`);
       

       setTimeout(function() {
        AddRecipeView.toggleWindow()
       }, MODAL_CLOSE_SEC * 1000);

    }catch(err) {
        console.log(err);
        AddRecipeView.render(err.message)
    }
    //upload the new recipe data
}

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  AddRecipeView.addHandlerUpload(controlAddRecipe)
};

init();

const clearBookmarks = function() {
    localStorage.clear('bookmarks');
}

// clearBookmarks();
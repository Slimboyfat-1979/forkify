import * as model from './model.js';
import recipeView from './views/recipeview.js';


import 'core-js';
import 'regenerator-runtime';
const recipeContainer = document.querySelector('.recipe');



// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) {
      return;
    }
    recipeView.renderSpinner();
    // 1. Loading Recipe
    await model.loadRecipe(id);
    //2. Rendering recipe
    recipeView.render(model.state.recipe)
  } catch (err) {
    console.log(err);
    recipeView.renderError()
  }
};


const init = function() {
    recipeView.addHandlerRender(controlRecipes)
}

init();


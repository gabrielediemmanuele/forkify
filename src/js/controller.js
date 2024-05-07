import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

//! Forkify Recipes Web Sites:  https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return; // GuardClass -> se non ci sono id(ricette), non fare nulla.
    recipeView.renderSpinner();

    //* 1) Loading Recipe
    await model.loadRecipe(id);

    //* 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
/* //!Ottimizzato sopra.
window.addEventListener('hashchange', showRecipe);
window.addEventListener('load', showRecipe);
 */

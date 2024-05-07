import * as model from './model.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

//! Forkify Recipes Web Sites:  https://forkify-api.herokuapp.com/v2
//parcel..
/* if (module.hot) {
  module.hot.accept();
} */

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
    console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) get search query
    const query = searchView.getQuery();

    if (!query) return;

    //2) load search results
    await model.loadSearchResults(query);

    //3)"render" resaults
    /*  console.log(model.state.search.results); */
    /* resultsView.render(model.state.search.results); */
    resultsView.render(model.getSearchRsultsPage());
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();

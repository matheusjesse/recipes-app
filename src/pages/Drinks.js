import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import contextGlobal from '../context';
import ButtonCategory from '../components/ButtonCategory';

function Drinks() {
  const { drinksRecipes,
    oneRecipes,
    resultsDrinks,
    drinksCategory, resultsFilterDrinks, handleAllFilter } = useContext(contextGlobal);
  const checkingValues = drinksRecipes.length <= 0 ? resultsDrinks : drinksRecipes;
  const checkingfilter = resultsFilterDrinks.length <= 0
    ? checkingValues : resultsFilterDrinks;
  return (
    <section>
      <Header name="Drinks" />
      <button
        type="button"
        onClick={ handleAllFilter }
        data-testid="All-category-filter"
      >
        All
      </button>
      {
        drinksCategory && drinksCategory.map((category, index) => {
          const maxCategory = 5;
          return index < maxCategory && (
            <ButtonCategory
              key={ index }
              category={ category }
            />);
        })
      }
      {
        oneRecipes && oneRecipes.map((element, index) => {
          const { idDrink } = element;
          return (
            <Redirect
              key={ index }
              to={ `/drinks/${idDrink}` }
            />
          );
        })
      }
      {
        checkingfilter && checkingfilter.map((recipe, index) => {
          const maxRecipes = 12;
          return index < maxRecipes && (
            <RecipeCard
              key={ index }
              data-testid={ `${index}-recipe-card` }
              index={ index }
              recipe={ recipe }
            />);
        })
      }
      <Footer />
    </section>
  );
}

export default Drinks;

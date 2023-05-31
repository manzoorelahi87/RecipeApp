import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react'
import './App.css';
import Recipe from './pages/Recipe';
import Header from './components/Header'

const App = () => {
  const APP_ID = "4f7e69ea";
  const APP_KEY = "9c9e651c164491605a6f6510652cfa6a";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query])
  const getRecipes = async () => {
    const response = await fetch
          (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
 
  
  };


  const updateSearch = e => {
    setSearch(e.target.value);
  };


  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }
  
  return (
    <div className="App">
      <Header  />
      <form className="search-form" onSubmit={getSearch}  >
        <input className="search-bar" type="text" value={search}
             onChange={updateSearch} />
        <button className="search-button" type="submit" >
             Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />  
        ))}
      </div>
  
    </div>
  );
}

export default App;

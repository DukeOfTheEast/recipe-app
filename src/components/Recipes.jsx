import React from "react";
import style from "../components/Recipes.module.css";
import axios from "axios";
import { useState } from "react";

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [modal, setModal] = useState();

  const API_KEY = "9f3a3cf71ef949a4a43c47caf1b105fb"; // Replace with your Spoonacular API Key

  const getRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/search`,
        {
          params: {
            query,
            apiKey: API_KEY,
          },
        }
      );
      setRecipes(response.data.results);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("i love you");
  };

  return (
    <div className={style.recipe}>
      <h1>Recipe Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter ingredient or dish"
          className={style.recipeSearch}
        />
        <button type="submit">Search</button>
      </form>
      <div className={style.recipeCards}>
        {recipes.map((recipe) => (
          <div key={recipe.id} className={style.recipeCard}>
            <img
              src={`https://spoonacular.com/recipeImages/${recipe.image}`}
              alt={recipe.title}
              className={style.recipeImg}
            />
            <h2>{recipe.title}</h2>
            <p>Ready in {recipe.readyInMinutes} minutes</p>
            <button className={style.btnRecipe} onClick={handleClick}>
              Ingredients
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;

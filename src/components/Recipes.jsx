import React from "react";
import style from "../components/Recipes.module.css";
import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Recipes = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

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
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const getIngredients = async (recipeId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`,
        {
          params: {
            apiKey: API_KEY,
          },
        }
      );
      setIngredients(response.data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
    getIngredients(recipeId);
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
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
          <div
            key={recipe.id}
            style={{
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 3px 10px 0 #aaa",
              padding: "10px",
              width: "200px",
              height: "350px",

              backgroundColor:
                selectedRecipe === recipe.id ? "#f0f0f0" : "white", // Highlight selected recipe
            }}
            className={`recipe ${
              selectedRecipe === recipe.id ? "selected" : ""
            }`}
            onClick={() => handleRecipeClick(recipe.id)}
          >
            <img
              src={`https://spoonacular.com/recipeImages/${recipe.image}`}
              alt={recipe.title}
            />
            <h2>{recipe.title}</h2>
            <p>Ready in {recipe.readyInMinutes} minutes</p>
            <button style={{ marginTop: "auto" }} onClick={handleOpenModal}>
              Ingredients
            </button>
            {selectedRecipe === recipe.id && (
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                style={{
                  content: {
                    maxWidth: "400px",
                    margin: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    padding: "20px",
                  },
                }}
              >
                <h3>Ingredients:</h3>
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.name}</li>
                  ))}
                </ul>
                <button onClick={handleCloseModal}>Close</button>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;

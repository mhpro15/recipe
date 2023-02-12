import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${query}&app_id=${"6ff8d166"}&app_key=${"515b46dbf38cab7d4f29871fd1e067f0"}`
        );
        setRecipes(response.data.hits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchRecipes();
    }
  }, [query]);

  return (
    <div>
      <h1>Recipe Search</h1>
      <form preventDefault="true">
        <input type="text" id="search" />
        <button
          type="submit"
          onClick={(e) => {
            let val = document.getElementById("search").value;

            setQuery(val);
            document.getElementById("search").value = "";
            e.preventDefault();
          }}
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {recipes.length > 0 && (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.recipe.label}>
              <div className="item">
                <div className="pic">
                  <img
                    src={recipe.recipe.image}
                    alt={recipe.recipe.label}
                    className="thumb"
                  />
                </div>
                <div className="des">
                  <h2>{recipe.recipe.label}</h2>
                  <p className="source">({recipe.recipe.source})</p>
                  <br></br>
                  <p className="ingredients">
                    {recipe.recipe.ingredientLines.map((ingre) => ingre + ", ")}
                  </p>
                  <button>
                    <a href={recipe.recipe.url} target="blank">
                      View Recipe
                    </a>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeSearch;

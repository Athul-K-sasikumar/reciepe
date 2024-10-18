import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching recipe details');
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.recipeCard}>
        <h1 style={styles.recipeTitle}>{recipe.name}</h1>
        <img src={recipe.image} alt={recipe.name} style={styles.recipeImage} />

        <div style={styles.recipeDetails}>
          <h3 style={styles.sectionTitle}>Ingredients:</h3>
          <ul style={styles.ingredientsList}>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} style={styles.listItem}>{ingredient}</li>
            ))}
          </ul>

          <h3 style={styles.sectionTitle}>Instructions:</h3>
          <ol style={styles.instructionsList}>
            {recipe.instructions.map((instruction, index) => (
              <li key={index} style={styles.listItem}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    textAlign: 'center',
  },
  recipeTitle: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  recipeImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  recipeDetails: {
    textAlign: 'left',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  },
  ingredientsList: {
    paddingLeft: '20px',
    marginBottom: '20px',
  },
  instructionsList: {
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '1rem',
    marginBottom: '10px',
    lineHeight: '1.6',
  },
};

export default RecipeDetails;

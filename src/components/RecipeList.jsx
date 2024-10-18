import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, searchRecipesByCuisine } from '../redux/actions/reciepeActions';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const dispatch = useDispatch();
  const { recipes, loading, error } = useSelector((state) => state.recipes);
  const [cuisine, setCuisine] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchRecipes(page));
  }, [dispatch, page]);

  const handleSearch = () => {
    if (cuisine.trim() !== '') {
      dispatch(searchRecipesByCuisine(cuisine));
    }
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div style={styles.container}>
      <h1>Recipe List</h1>
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={cuisine}
          placeholder="Search by cuisine"
          onChange={(e) => setCuisine(e.target.value)}
          style={styles.searchInput}
        />
        <button onClick={handleSearch} style={styles.searchButton}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {recipes.length === 0 && <p>No recipes found</p>}

      <div style={styles.gridContainer}>
        {recipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <img src={recipe.image} alt={recipe.name} style={styles.image} />
            <h2 style={styles.recipeName}>{recipe.name}</h2>
            <Link to={`/recipes/${recipe.id}`}>
              <button style={styles.viewMoreButton}>View More</button>
            </Link>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button onClick={handlePrevPage} disabled={page === 1} style={styles.paginationButton}>
          Previous
        </button>
        <button onClick={handleNextPage} style={styles.paginationButton}>Next</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center',
    transition: 'transform 0.3s',
  },
  cardHover: {
    transform: 'scale(1.05)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  recipeName: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  viewMoreButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  paginationButton: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default RecipeList;

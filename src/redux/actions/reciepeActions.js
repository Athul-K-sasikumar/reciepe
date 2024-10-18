import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/recipes?limit=10&skip=${(page - 1) * 10}`);
      return response.data.recipes;
    } catch (error) {
      return rejectWithValue('Error fetching recipes');
    }
  }
);

export const searchRecipesByCuisine = createAsyncThunk(
  'recipes/searchRecipesByCuisine',
  async (cuisine, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://dummyjson.com/recipes`);
      const recipes = response.data.recipes;

      const filteredRecipes = recipes.filter((recipe) =>
        recipe.cuisine.toLowerCase().includes(cuisine.toLowerCase())
      );

      return filteredRecipes;
    } catch (error) {
      return rejectWithValue('Error searching recipes by cuisine');
    }
  }
);


export const fetchRecipeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_RECIPE_REQUEST' });

    const response = await axios.get(`https://dummyjson.com/recipes/${id}`);

    dispatch({
      type: 'FETCH_RECIPE_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_RECIPE_FAIL',
      payload: error.message,
    });
  }
};


import { createSlice } from '@reduxjs/toolkit';
import { fetchRecipes, searchRecipesByCuisine } from '../actions/reciepeActions';

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    recipes: [],
    loading: false,
    error: null,
    page: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(searchRecipesByCuisine.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchRecipesByCuisine.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = action.payload;
    });
    builder.addCase(searchRecipesByCuisine.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
   
  },
});

export default recipeSlice.reducer;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes } from '../redux/actions/reciepeActions';

const SearchBar = () => {
    const [cuisine, setCuisine] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(fetchRecipes(1, cuisine));
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                value={cuisine} 
                onChange={(e) => setCuisine(e.target.value)} 
                placeholder="Search by Cuisine"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;

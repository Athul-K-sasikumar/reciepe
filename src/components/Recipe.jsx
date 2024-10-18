import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { fetchRecipesById } from '../redux/actions/reciepeActions';
const Recipe = () => {
    const dispatch = useDispatch();
    const { id } = useParams();  
    const { recipes, status } = useSelector((state) => state.recipes);

 
    const recipe = recipes.find((r) => r.id === parseInt(id));

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRecipesById());  
        }
    }, [dispatch, status]);

    if (!recipe) {
        return <p>Loading recipe details...</p>; 
    }

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-6">
                    <img src={recipe.image} alt={recipe.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h2>{recipe.name}</h2>
                    <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <p><strong>Instructions:</strong> {recipe.instructions}</p>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
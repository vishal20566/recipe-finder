import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RecipeInfo = styled.div`
  padding: 15px;
`;

const RecipeTitle = styled.h3`
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 1.2rem;
`;

const RecipeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const UsedIngredients = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #27ae60;
`;

const MissingIngredients = styled.div`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #e74c3c;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const RecipeList = ({ recipes, onRecipeSelect }) => {
  if (!recipes.length) {
    return (
      <NoResults>
        No recipes found. Try searching with different ingredients!
      </NoResults>
    );
  }

  return (
    <Grid>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} onClick={() => onRecipeSelect(recipe)}>
          <RecipeImage src={recipe.image} alt={recipe.title} />
          <RecipeInfo>
            <RecipeTitle>{recipe.title}</RecipeTitle>
            <RecipeMeta>
              <span>Ready in {recipe.readyInMinutes} mins</span>
              <span>{recipe.servings} servings</span>
            </RecipeMeta>
            <UsedIngredients>
              Used: {recipe.usedIngredientCount} ingredients
            </UsedIngredients>
            <MissingIngredients>
              Missing: {recipe.missedIngredientCount} ingredients
            </MissingIngredients>
          </RecipeInfo>
        </RecipeCard>
      ))}
    </Grid>
  );
};

export default RecipeList; 
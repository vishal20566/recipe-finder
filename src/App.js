import React from 'react';
import styled from 'styled-components';
import RecipeSearch from './components/RecipeSearch';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
`;

function App() {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const [searchResults, setSearchResults] = React.useState([]);

  return (
    <AppContainer>
      <Header>
        <Title>Recipe Finder</Title>
        <Subtitle>Find recipes based on your available ingredients</Subtitle>
      </Header>
      
      <RecipeSearch setSearchResults={setSearchResults} />
      
      {selectedRecipe ? (
        <RecipeDetail 
          recipe={selectedRecipe} 
          onBack={() => setSelectedRecipe(null)} 
        />
      ) : (
        <RecipeList 
          recipes={searchResults} 
          onRecipeSelect={setSelectedRecipe} 
        />
      )}
    </AppContainer>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DetailContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const BackButton = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const Header = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 400px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  
  @media (max-width: 600px) {
    width: 100%;
    height: 250px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin: 0 0 15px 0;
  color: #2c3e50;
`;

const Meta = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: #7f8c8d;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const Error = styled.div`
  text-align: center;
  padding: 40px;
  color: #e74c3c;
  font-size: 1.2rem;
`;

const RecipeDetail = ({ recipe, onBack }) => {
  const [detailedRecipe, setDetailedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information`,
          {
            params: {
              apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY
            }
          }
        );
        setDetailedRecipe(response.data);
      } catch (err) {
        setError('Failed to fetch recipe details. Please try again.');
        console.error('Error fetching recipe details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipe.id]);

  if (loading) return <Loading>Loading recipe details...</Loading>;
  if (error) return <Error>{error}</Error>;
  if (!detailedRecipe) return null;

  return (
    <DetailContainer>
      <BackButton onClick={onBack}>← Back to Results</BackButton>
      
      <Header>
        <Image src={detailedRecipe.image} alt={detailedRecipe.title} />
        <Info>
          <Title>{detailedRecipe.title}</Title>
          <Meta>
            <span>Ready in {detailedRecipe.readyInMinutes} mins</span>
            <span>{detailedRecipe.servings} servings</span>
            <span>{detailedRecipe.dishTypes.join(', ')}</span>
          </Meta>
        </Info>
      </Header>

      <Section>
        <SectionTitle>Ingredients</SectionTitle>
        <List>
          {detailedRecipe.extendedIngredients.map((ingredient, index) => (
            <ListItem key={index}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </ListItem>
          ))}
        </List>
      </Section>

      <Section>
        <SectionTitle>Instructions</SectionTitle>
        <List>
          {detailedRecipe.analyzedInstructions[0].steps.map((step, index) => (
            <ListItem key={index}>
              <strong>Step {step.number}:</strong> {step.step}
            </ListItem>
          ))}
        </List>
      </Section>

      {detailedRecipe.nutrition && (
        <Section>
          <SectionTitle>Nutrition Information</SectionTitle>
          <List>
            {detailedRecipe.nutrition.nutrients.map((nutrient, index) => (
              <ListItem key={index}>
                {nutrient.title}: {nutrient.amount} {nutrient.unit}
              </ListItem>
            ))}
          </List>
        </Section>
      )}
    </DetailContainer>
  );
};

export default RecipeDetail; 
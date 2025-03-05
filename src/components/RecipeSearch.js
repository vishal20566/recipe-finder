import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchContainer = styled.div`
  margin-bottom: 30px;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #bdc3c7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
`;

const RecipeSearch = ({ setSearchResults }) => {
  const [ingredients, setIngredients] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`,
        {
          params: {
            apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
            ingredients: ingredients,
            number: 10,
            ranking: 2,
            ignorePantry: true
          }
        }
      );

      setSearchResults(response.data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Recipes'}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SearchForm>
    </SearchContainer>
  );
};

export default RecipeSearch; 
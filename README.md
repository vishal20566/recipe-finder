# Recipe Finder

A web application that helps you find recipes based on the ingredients you have available. Built with React and the Spoonacular API.

## Features

- Search for recipes using available ingredients
- View detailed recipe information including:
  - Ingredients list
  - Step-by-step instructions
  - Nutritional information
  - Cooking time and servings
- Responsive design that works on all devices
- Clean and intuitive user interface

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Spoonacular API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/recipe-finder.git
cd recipe-finder
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Spoonacular API key:
```
REACT_APP_SPOONACULAR_API_KEY=your_api_key_here
```

You can get a Spoonacular API key by signing up at [https://spoonacular.com/food-api](https://spoonacular.com/food-api)

4. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

## Usage

1. Enter your available ingredients in the search box (comma-separated)
2. Click "Search Recipes" to find matching recipes
3. Click on a recipe card to view detailed information
4. Use the "Back to Results" button to return to the search results

## Technologies Used

- React
- Styled Components
- Axios
- Spoonacular API

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

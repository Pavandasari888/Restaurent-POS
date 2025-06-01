
    require('dotenv').config();
    const axios = require('axios');

    const FOOD_API = process.env.FOOD_API;

    const categoryMap = {
    'burger': 'burgers',
    'pizza': 'pizzas',
    'drinks': 'drinks',
    'french fries': 'sides',
    'veggies': 'sides'
    };

        const fetchMenuData = async (category) => {
    const apiCategory = categoryMap[category.toLowerCase()] || 'burgers';
    const url = `https://free-food-menus-api-production.up.railway.app/${apiCategory}`;
    console.log('Fetching URL:', url);  

    const response = await axios.get(url);
    return response.data;
    };


    module.exports = fetchMenuData;

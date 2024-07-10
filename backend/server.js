const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

// Load JSON data
const mealsData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/meals.json'), 'utf-8'));

// Helper function to fetch Unsplash image
const fetchUnsplashImage = async (url) => {
    try {
        const photoId = url.split('/').pop();
        const response = await axios.get(`https://api.unsplash.com/photos/${photoId}`, {
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
            }
        });
        return response.data.urls.small;
    } catch (error) {
        return url;
    }
};

// API for meals.json
app.get('/api/meals', async (req, res) => {
    try {
        const updatedMeals = await Promise.all(mealsData.meals.map(async (meal) => {
            try {
                // Fetch meal image
                meal.img = await fetchUnsplashImage(meal.img);

                // Fetch drink images
                if (meal.drinks && Array.isArray(meal.drinks)) {
                    meal.drinks = await Promise.all(meal.drinks.map(async (drink) => {
                        try {
                            drink.img = await fetchUnsplashImage(drink.img);
                            return drink;
                        } catch (error) {
                            return drink;
                        }
                    }));
                }
                return meal;
            } catch (error) {
                return meal;
            }
        }));
        res.json(updatedMeals);
    } catch (error) {
        console.error('Server error:', error.message);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
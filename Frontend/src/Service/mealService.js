import axios from 'axios';

const getMeals = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/meals');
        return response.data;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};

export default getMeals;
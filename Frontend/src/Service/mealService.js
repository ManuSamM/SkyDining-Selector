import axios from 'axios';

const getMeals = async () => {
    try {
        const response = await axios.get('https://backend-six-sigma-22.vercel.app/api/meals');
        return response.data;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};

export default getMeals;


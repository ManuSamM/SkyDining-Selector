/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import MealItem from './Components/MealItem.jsx';
import PassengerList from './Components/PassengerList.jsx';
import MealFilters from './Components/MealFilters.jsx';
import getMeals from './Service/mealService.js';
import './MealsList.css';

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [passengers, setPassengers] = useState(['Passenger 1']);
    const [activePassenger, setActivePassenger] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState('');

    useEffect(() => {
        const fetchMealsData = async () => {
            try {
                const data = await getMeals();
                setMeals(data);
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMealsData();
    }, []);

    const selectMeal = (meal) => {
        if (!activePassenger) return;
        setSelectedMeals((prevSelectedMeals) => ({
            ...prevSelectedMeals,
            [activePassenger]: { meal, drink: null },
        }));
        calculateTotalPrice({ ...selectedMeals, [activePassenger]: { meal, drink: null } });
    };

    const selectDrink = (drink) => {
        if (!activePassenger) return;
        const meal = selectedMeals[activePassenger]?.meal;
        if (!meal) return;
        setSelectedMeals((prevSelectedMeals) => ({
            ...prevSelectedMeals,
            [activePassenger]: { meal, drink },
        }));
        calculateTotalPrice({ ...selectedMeals, [activePassenger]: { meal, drink } });
    };

    const clearSelections = (passenger) => {
        const updatedSelectedMeals = { ...selectedMeals };
        delete updatedSelectedMeals[passenger];
        setSelectedMeals(updatedSelectedMeals);
        calculateTotalPrice(updatedSelectedMeals);
    };

    const calculateTotalPrice = (meals) => {
        let total = 0;
        Object.values(meals).forEach(({ meal, drink }) => {
            total += meal.price + (drink ? drink.price : 0);
        });
        setTotalPrice(total.toFixed(2));
    };

    const addPassenger = () => {
        if (passengers.length < 6)
            setPassengers([...passengers, `Passenger ${passengers.length + 1}`]);
    };

    const removePassenger = () => {
        if (passengers.length > 0) {
            const updatedPassengers = passengers.slice(0, -1);
            const lastPassenger = passengers[passengers.length - 1];
            const updatedSelectedMeals = { ...selectedMeals };
            delete updatedSelectedMeals[lastPassenger];
            setPassengers(updatedPassengers);
            setSelectedMeals(updatedSelectedMeals);
            calculateTotalPrice(updatedSelectedMeals);
        }
    };

    const handlePassengerClick = (passenger) => {
        setActivePassenger(activePassenger === passenger ? null : passenger);
    };

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const filteredMeals = selectedFilter
        ? meals.filter((meal) => meal.labels.includes(selectedFilter))
        : meals;

    return (
        <div className="container">
            <div className="meals-container">
                <MealFilters
                    meals={meals}
                    selectedFilter={selectedFilter}
                    handleFilterChange={handleFilterChange}
                />
                <div className="meals-list">
                    {filteredMeals.map((meal) => (
                        <MealItem
                            key={meal.id}
                            meal={meal}
                            selectMeal={selectMeal}
                            selectDrink={selectDrink}
                        />
                    ))}
                </div>
            </div>
            <div className="passenger-list">
                <i className="fa-solid fa-plane fa-2xl"></i>
                <button onClick={addPassenger}>Add Passenger</button>
                <button onClick={removePassenger}>Remove Passenger</button>
                {passengers.map((passenger) => (
                    <PassengerList
                        key={passenger}
                        passenger={passenger}
                        activePassenger={activePassenger}
                        selectedMeals={selectedMeals}
                        handlePassengerClick={handlePassengerClick}
                        clearSelections={clearSelections}
                    />
                ))}
                <div className="total-price">Total for all Passengers: Rs {totalPrice}</div>
            </div>
        </div>
    );
};

export default MealsList;
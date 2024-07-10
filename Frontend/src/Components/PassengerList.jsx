/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const PassengerList = ({ passenger, activePassenger, selectedMeals, handlePassengerClick, clearSelections }) => (
    <div className={`passenger-item ${activePassenger === passenger ? 'active' : ''}`}
        onClick={() => handlePassengerClick(passenger)} >

        <div className="passenger-name">{passenger}</div>

        <div className="meal-details">
            <div><b>Meal:</b> {selectedMeals[passenger]?.meal.title}</div>
            <div><b>Drink:</b> {selectedMeals[passenger]?.drink?.title}</div>
        </div>

        <button
            className="clear-button"
            onClick={(e) => {
                e.stopPropagation();
                clearSelections(passenger);
            }}
        >
            Clear
        </button>
    </div>
);

export default PassengerList;

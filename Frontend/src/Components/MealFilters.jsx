/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const MealFilters = ({ meals, selectedFilter, handleFilterChange }) => {
    return (
        <div className="filters">
            <button onClick={() => handleFilterChange('')} className={!selectedFilter ? 'active' : ''}>
                All
            </button>
            {Array.from(new Set(meals.flatMap((meal) => meal.labels))).map((label) => (
                <button
                    key={label}
                    onClick={() => handleFilterChange(label)}
                    className={selectedFilter === label ? 'active' : ''}>
                    {label}
                </button>
            ))}
        </div>
    );
};

export default MealFilters;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const MealItem = ({ meal, selectMeal, selectDrink }) => (
    <div className="meal-item">
        <div className='meal-img-div'>
            <img className="meal-img" src={meal.img} alt={meal.title} />
        </div>
        <div className="meal-details">
            <div className="meal-title">{meal.title}</div>
            <div>{meal.starter}</div>
            <div>{meal.desert}</div>
            <div className="meal-labels">
                {meal.labels.map((label) => (
                    <div className="meal-label" key={label}>
                        {label}
                    </div>
                ))}
            </div>
            <div className="meal-price">Price: Rs {meal.price}</div>

            <button onClick={() => selectMeal(meal)}>
                Select
            </button>
            
            <ul className="drinks-list">
                {meal.drinks.map((drink) => (
                    <li className="drink-item" key={drink.id}>
                        <img
                            className="drink-img"
                            src={drink.img}
                            alt={drink.title}
                            onClick={() => selectDrink(drink)}
                        />
                        <div className="drink-title">
                            <b>{drink.title}<br/>Rs {drink.price}</b>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default MealItem;
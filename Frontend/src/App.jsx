/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MealsList from './MealsList.jsx';
import './App.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' Component={MealsList} />
      </Routes>
    </>
  );
}

export default App;
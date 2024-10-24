import { useEffect, useState } from 'react';
import MealItem from './MealItem';

function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const res = await fetch('http://localhost:3000/meals');
      if (!res.ok) {
        //...
      }
      const resData = await res.json();
      setLoadedMeals(resData);
    }
    fetchMeals();
  }, []);

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;

import useHttp from '../hooks/useHttp';
import MealItem from './MealItem';
import Error from './Error';

// NOTE: the config OBJECT needs to be created outside the component
// otherwise, it will be re-created over and over again in each render
const requestConfig = {};

function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) return <p className='center'>Fetching meals...</p>;
  if (error) return <Error title='Failed to fetch meals' message={error} />;

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default Meals;

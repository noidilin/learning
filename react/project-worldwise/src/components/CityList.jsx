import styles from './CityList.module.css';
import { useCities } from '../contexts/CitiesContext';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message='add your first city by clicking on a city on the map.' />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}
export default CityList;
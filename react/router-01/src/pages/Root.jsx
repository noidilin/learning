import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';

function Root() {
  // useNavigation: display whether loader is loading or not
  // const nav = useNavigation();
  return (
    <>
      <MainNav />
      <main>
        {/* {nav.state === 'loading' && <p>Loading...</p>} */}
        <Outlet /> {/* define where the children route should be placed */}
      </main>
    </>
  );
}

export default Root;

import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';

function Root() {
  return (
    <>
      <MainNav />
      <main>
        <Outlet /> {/* define where the children route should be placed */}
      </main>
    </>
  );
}

export default Root;

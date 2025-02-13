import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';

function Root() {
  return (
    <>
      <MainNav />
      <main>
        {/* define where the children route should be placed */}
        <Outlet />
      </main>
    </>
  );
}

export default Root;

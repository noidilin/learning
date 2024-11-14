import { Outlet } from 'react-router-dom';
import MainNav from '../components/MainNav';

function Root() {
  return (
    <>
      <MainNav />
      <Outlet />
    </>
  );
}

export default Root;

import { Outlet, useNavigation } from 'react-router';

import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  // react-router provides hook to indicate navigation state
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className='layout'>
      {isLoading && <Loader />}
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayout;

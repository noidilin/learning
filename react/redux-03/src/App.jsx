import { useEffect } from "react";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

import store from "./store/store";
import { fetchCartData, sendCartData } from "./store/cartActions";

// HACK: bad practice - only triiger effect once at startup
let isInitial = true;

function App() {
	const cartVisible = useSelector((state) => state.ui.cartVisible);
	const notification = useSelector((state) => state.ui.notification);
	const cart = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		// BUG: still brake backend code in strict mode
		if (isInitial) {
			isInitial = false;
			return;
		}
		if (cart.changed) dispatch(sendCartData(cart));
	}, [cart, dispatch]); // react-redux will ensure that dispatch will never change.

	return (
		<Provider store={store}>
			{notification && <Notification {...notification} />}
			<Layout>
				{cartVisible && <Cart />}
				<Products />
			</Layout>
		</Provider>
	);
}

export default App;

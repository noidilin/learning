import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import store from "./store/store.js";

function App() {
	const isAuth = useSelector((state) => state.auth.isAuth);

	return (
		<Provider store={store}>
			<Header />
			{isAuth ? <UserProfile /> : <Auth />}
			<Counter />
		</Provider>
	);
}

export default App;

import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store/counterSlice";
import classes from "./Counter.module.css";

function Counter() {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter.counter);
	const show = useSelector((state) => state.counter.showCounter);

	function handleInc() {
		dispatch(counterActions.inc(5));
	}

	function handleDec() {
		dispatch(counterActions.dec(5));
	}

	function handleToggle() {
		dispatch(counterActions.toggle());
	}

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{show && <div className={classes.value}>{counter}</div>}
			<div>
				<button type="submit" onClick={handleDec}>
					Dec
				</button>
				<button type="submit" onClick={handleInc}>
					Inc
				</button>
			</div>
			<button type="submit" onClick={handleToggle}>
				Toggle
			</button>
		</main>
	);
}

export default Counter;

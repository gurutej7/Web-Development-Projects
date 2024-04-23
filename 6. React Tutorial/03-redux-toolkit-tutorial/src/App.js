import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculateTotals } from "./features/cart/cartSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal";

function App() {
	const dispatch = useDispatch();

	const { cartItems } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems]);
	return (
		<main>
			{isOpen && <Modal></Modal>}
			<Navbar></Navbar>
			<CartContainer></CartContainer>
		</main>
	);
}
export default App;

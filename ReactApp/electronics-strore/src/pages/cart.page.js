import { useSelector } from "react-redux";
// Import custom components
import CartView from "../components/cart/cart.component";

export default function Cart() {
  const ids = useSelector((state) => state.cart.items);

  return ids.length ? <CartView ids={ids} /> : <p>No items in your cart</p>;
}

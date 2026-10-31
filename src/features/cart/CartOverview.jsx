import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    cart.length > 0 && (
      <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 uppercase sm:px-6 md:text-base">
        <p className="space-x-6 font-semibold text-stone-300 md:space-x-4">
          <span>{totalQuantity} pizzas</span>
          <span>${totalPrice}</span>
        </p>
        <Link to="/cart">Open cart &rarr;</Link>
      </div>
    )
  );
}

export default CartOverview;

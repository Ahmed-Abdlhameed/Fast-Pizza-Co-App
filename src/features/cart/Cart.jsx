import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  console.log(cart);

  if (cart.length === 0) {
    return <EmptyCart />;
  } else {
    return (
      <div className="px-4 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
        <ul>
          {cart.map((item) => (
            <CartItem item={item} key={item.name} />
          ))}
        </ul>
        <div className="mt-6 space-x-2">
          <Button to="/order/new">Order pizzas</Button>
          <Button onClick={() => dispatch(clearCart())} type="delete_md">
            Clear cart
          </Button>
        </div>
      </div>
    );
  }
}

export default Cart;

import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { removeItem } from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  return (
    <li className="flex items-center justify-between border-b-2 border-stone-200 py-3">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-2">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateQuantity id={pizzaId} quantity={quantity} />
        <Button onClick={() => dispatch(removeItem(pizzaId))} type="delete_sm">
          Remove
        </Button>
      </div>
    </li>
  );
}

export default CartItem;

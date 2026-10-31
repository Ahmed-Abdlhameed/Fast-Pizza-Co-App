import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../cart/cartSlice";

function UpdateQuantity({ id, quantity }) {
  const dispatch = useDispatch();
  const styles =
    "text-md h-8 w-8 cursor-pointer rounded-full bg-stone-300 font-semibold transition-colors duration-300 hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-stone-200";

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => dispatch(decreaseQuantity(id))}
        className={styles}
        disabled={quantity === 1}
      >
        -
      </button>
      <span>{quantity}</span>
      <button onClick={() => dispatch(increaseQuantity(id))} className={styles}>
        +
      </button>
    </div>
  );
}

export default UpdateQuantity;

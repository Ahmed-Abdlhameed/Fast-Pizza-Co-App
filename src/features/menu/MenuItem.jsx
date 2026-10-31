import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const inCart = cart.find((item) => item.pizzaId === id);

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex basis-50 flex-col items-start gap-4 border-b-2 border-stone-200 py-4 last:border-b-0 md:basis-0 md:flex-row md:items-center">
      <img
        src={imageUrl}
        alt={name}
        className={`h-50 w-50 md:h-24 md:w-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />

      <div className="flex flex-col gap-1 md:basis-80">
        <p className="text-lg">{name}</p>
        <p className="text-sm capitalize">
          Ingredients: {ingredients.join(", ")}
        </p>
        <div className="text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-red-400 uppercase">Sold out</p>
          )}
        </div>
      </div>

      {inCart && (
        <div className="flex flex-col gap-2 md:ml-auto md:flex-row">
          <UpdateQuantity id={id} quantity={inCart.quantity} />
          <Button onClick={() => dispatch(removeItem(id))} type="delete_sm">
            Remove from cart
          </Button>
        </div>
      )}

      {!soldOut && !inCart && (
        <Button
          onClick={handleAddToCart}
          type="primary_sm"
          liveStyles={`md:ml-auto`}
        >
          Add to cart
        </Button>
      )}
    </li>
  );
}
export default MenuItem;

import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="border-y-1 border-stone-200 p-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <p>
          <span className="text-semibold">{quantity}&times;</span> {name}
        </p>
        <p className="text-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm text-stone-400 capitalize">
        {isLoadingIngredients
          ? "Loading ingredients..."
          : `Ingredients: ${ingredients.join(", ")}`}
      </p>
    </li>
  );
}

export default OrderItem;

import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const {
    username,
    address,
    status: addressStatus,
    position,
    error: addressError,
  } = user;
  const cartPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const priorityPrice = withPriority ? (15 * cartPrice) / 100 : 0;
  const totalPrice = cartPrice + priorityPrice;
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5">
          <label className="mb-3 ml-3 block md:ml-6">First Name:</label>
          <input
            type="text"
            name="customer"
            required
            placeholder={"Enter your name"}
            className="input"
            defaultValue={username}
          />
        </div>

        <div className="mb-5">
          <label className="mb-3 ml-3 block md:ml-6">
            Phone number:
            {formErrors?.phone && (
              <p className="error text-red-400">{formErrors.phone}</p>
            )}
          </label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              placeholder={"Enter your phone number"}
              className="input"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-3 ml-3 block md:ml-6">
            Address:
            {addressStatus === "error" && (
              <p className="error text-red-400">Error: {addressError}</p>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              required
              placeholder={"Enter your address"}
              className="input"
              defaultValue={address}
              disabled={addressStatus === "loading"}
            />

            {!position.latitude && !position.longitude && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                type="primary_sm"
                liveStyles="absolute right-1 top-1 z-10"
                disabled={addressStatus === "loading"}
              >
                Get your location
              </Button>
            )}
          </div>
        </div>

        <div className="mb-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="mx-3 mb-5 h-5 w-5 accent-yellow-400"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">
            Do you want to give your order a priority - Additional cost (15%)?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button
            disabled={isSubmitting || addressStatus === "loading"}
            onClick={() => {
              setTimeout(() => {
                dispatch(clearCart());
              });
            }}
          >
            {isSubmitting
              ? "Placing order..."
              : `Order now from $${totalPrice}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line
export async function action({ request }) {
  // Get the form data
  // request.formData() is a built-in function that allows us to get the form data.
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  // Distructure the data
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  console.log(order);

  // Handle order errors
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Error: Please enter a valid phone number.";
  if (Object.keys(errors).length > 0) return errors;

  // Create the order
  const newOrder = await createOrder(order);
  console.log(newOrder);

  // Returning:
  return redirect(`/order/${newOrder.id}`);

  /* 
    Note that we couldn't use the useNavigate() hook here as it's a hook and 
    this is a function and not a component so we used the redirect() function
    which do the same thing but it's imported from react-router-dom.
  */
}

export default CreateOrder;

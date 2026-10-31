import { configureStore } from "@reduxjs/toolkit";
import userReducer, {
  initialState as userInitialState,
} from "./features/user/userSlice";
import cartReducer, {
  initialState as cartInitialState,
} from "./features/cart/cartSlice";

// Only the cart items and the username are saved, so they survive a refresh.
// The address/position are not saved on purpose (they are re-fetched on demand).
const STORAGE_KEY = "fast-pizza-state";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;

    const saved = JSON.parse(raw);
    return {
      cart: {
        ...cartInitialState,
        cart: Array.isArray(saved.cart) ? saved.cart : [],
      },
      user: {
        ...userInitialState,
        username: typeof saved.username === "string" ? saved.username : "",
      },
    };
  } catch {
    // Storage blocked or data corrupted: start fresh.
    return undefined;
  }
}

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  try {
    const { cart, user } = store.getState();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ cart: cart.cart, username: user.username }),
    );
  } catch {
    // Ignore storage errors (private mode, quota, etc.)
  }
});

export default store;

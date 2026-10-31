// Imports:
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components:
import Home from "./ui/Home";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import { action as createOrderAction } from "./features/order/CreateOrder";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import Layout from "./ui/Layout";
import Error from "./ui/Error";

// Router creation:
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "menu",
        loader: menuLoader,
        errorElement: <Error />,
        element: <Menu />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        errorElement: <Error />,
        loader: orderLoader,
        element: <Order />,
        action: UpdateOrderAction,
      },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";

function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  console.log(isLoading);

  return (
    // Main Layout:
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {/* Loader: */}
      {isLoading && <Loader />}

      {/* Header: */}
      <Header />

      {/* Main - Outlet: */}
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      {/* CartOverview: */}
      <CartOverview />
    </div>
  );
}

export default Layout;

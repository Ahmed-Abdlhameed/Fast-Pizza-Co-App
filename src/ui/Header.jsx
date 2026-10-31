import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex flex-col items-center justify-between border-b border-stone-200 bg-yellow-500 px-6 py-3 uppercase md:flex-row md:px-4">
      <Link to="/" className="mb-2 tracking-widest md:mb-0">
        Fast Pizza Co.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;

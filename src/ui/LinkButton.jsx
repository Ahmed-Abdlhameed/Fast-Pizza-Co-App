import { Link } from "react-router-dom";

function LinkButton({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
    >
      {children}
    </Link>
  );
}

export default LinkButton;

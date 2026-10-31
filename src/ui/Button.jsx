import { Link } from "react-router-dom";

function Button({ children, disabled, onClick, to, liveStyles, type }) {
  const baseStyles = `cursor-pointer rounded-full font-semibold tracking-wide uppercase transition-colors duration-300 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-200 ${liveStyles}`;

  const typeStyles = {
    primary_md: "text-md px-4 py-3 bg-yellow-400 hover:bg-yellow-500",
    primary_sm: "text-sm px-3 py-2 bg-yellow-400 hover:bg-yellow-500",
    delete_md: "text-md px-4 py-3 bg-stone-300 hover:bg-red-400",
    delete_sm: "text-sm px-3 py-2 bg-stone-300 hover:bg-red-400",
  };

  const finalStyles = type
    ? baseStyles + " " + typeStyles[type]
    : baseStyles + " " + typeStyles.primary_md;

  // If there's a "to" prop, render a Link component
  if (to) {
    return (
      <Link to={to} className={finalStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} onClick={onClick} className={finalStyles}>
      {children}
    </button>
  );
}

export default Button;

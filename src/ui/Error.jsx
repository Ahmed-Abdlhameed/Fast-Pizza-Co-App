import { useNavigate, useRouteError } from "react-router-dom";
import Button from "./Button";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div className="p-4">
      <h1>Something went wrong 😢</h1>
      {/* Provided by the useRouteError hook */}
      <p className="my-2">{error.data || error.message}</p>
      <Button onClick={() => navigate(-1)}>&larr; Go back</Button>
    </div>
  );
}

export default Error;

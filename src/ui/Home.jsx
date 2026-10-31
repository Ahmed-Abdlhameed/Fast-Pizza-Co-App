import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* Checking if the user is logged in or not */}
      {username ? (
        <Button to="/menu">Welcome back {username}, continue ordering!</Button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
}

export default Home;

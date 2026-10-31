import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);

  return (
    <ul className="flex flex-row flex-wrap justify-center gap-x-4 px-4 md:flex-col">
      {menu.map((ele) => (
        <MenuItem pizza={ele} key={ele.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

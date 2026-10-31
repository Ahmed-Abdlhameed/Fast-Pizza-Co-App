import { updateOrder } from "../../services/apiRestaurant";
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make a priority</Button>
    </fetcher.Form>
  );
}
export default UpdateOrder;

// eslint-disable-next-line
export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

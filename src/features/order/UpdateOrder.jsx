import { updateOrder } from "../../services/apiRestaurant";
import { Form } from "react-router-dom";
import Button from "../../ui/Button";

function UpdateOrder() {
  return (
    <Form method="PATCH">
      <Button type="primary_md">Make a priority</Button>
    </Form>
  );
}
export default UpdateOrder;

// eslint-disable-next-line
export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

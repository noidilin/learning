import { useFetcher } from 'react-router';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // submit the form and revalidate the page without navigation
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// redux knows the data has changed as the result of this action,
// and it will revalidate the page to sync (re-fetch, re-redner) with the lastest data.
export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

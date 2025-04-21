import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { cartActions } from './cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button
      type='small'
      onClick={() => dispatch(cartActions.deleteItem(pizzaId))}
    >
      Delete
    </Button>
  );
}

export default DeleteItem;

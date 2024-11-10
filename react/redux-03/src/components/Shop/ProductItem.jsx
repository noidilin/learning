/* eslint-disable react/prop-types */

import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cartSlice';

function ProductItem({ title, price, description, id }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
      }),
    );
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;

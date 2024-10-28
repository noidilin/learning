import { PropTypes } from 'prop-types';

export function Item({
  id,
  description,
  quantity,
  packed,
  onDeleteItems,
  onToggleItems,
}) {
  return (
    <li>
      <input
        type='checkbox'
        value={packed}
        onChange={() => onToggleItems(id)}
      />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItems(id)}>❌</button>
    </li>
  );
}
Item.propTypes = {
  id: PropTypes.number,
  description: PropTypes.string,
  quantity: PropTypes.number,
  packed: PropTypes.bool,
  onDeleteItems: PropTypes.func,
  onToggleItems: PropTypes.func,
};

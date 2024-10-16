import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { Item } from './Item';

export function PackingList({
  itemList,
  onDeleteItems,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState('packed');

  let sortedItemList;

  if (sortBy === 'input') sortedItemList = itemList;
  if (sortBy === 'description')
    sortedItemList = itemList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    sortedItemList = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItemList.map((item) => (
          <Item
            key={item.id}
            {...item}
            onDeleteItems={onDeleteItems}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
      <div className='actions'>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>
        <button onClick={onClearList}>clear list</button>
      </div>
    </div>
  );
}
PackingList.propTypes = {
  itemList: PropTypes.array,
  onDeleteItems: PropTypes.func,
  onToggleItems: PropTypes.func,
  onClearList: PropTypes.func,
};

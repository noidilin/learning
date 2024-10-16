import { PropTypes } from 'prop-types';

export function Stats({ itemList }) {
  if (!itemList.length) {
    return (
      <footer className='stats'>
        <em>Start adding some items to your packing list</em>
      </footer>
    );
  }
  const numItems = itemList.length;
  const numPacked = itemList.filter((i) => i.packed).length;
  return (
    <footer className='stats'>
      <em>
        {numPacked === numItems
          ? 'You got everything! Ready to go'
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${Math.floor((numPacked / numItems) * 100)}%)`}
      </em>
    </footer>
  );
}
Stats.propTypes = {
  itemList: PropTypes.array,
};

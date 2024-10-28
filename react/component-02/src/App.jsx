import { useState } from 'react';
import { Logo } from './components/Logo';
import { Form } from './components/Form';
import { PackingList } from './components/PackingList';
import { Stats } from './components/Stats';

/* const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: true },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
]; */

export default function App() {
  const [itemList, setItemList] = useState([]);

  function handleAddItems(item) {
    setItemList((i) => [...i, item]);
  }

  function handleDeleteItems(id) {
    setItemList((i) => i.filter((item) => item.id !== id));
  }

  function handleToggleItems(id) {
    setItemList((i) =>
      i.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      'Are you sure you want to deleted all items?',
    );
    if (confirmed) setItemList([]);
  }

  return (
    <div>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        itemList={itemList}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItems}
        onClearList={handleClearList}
      />
      <Stats itemList={itemList} />
    </div>
  );
}

/* eslint-disable react/prop-types */

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export function App() {
  const [showForm, setShowForm] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedID, setSelectedID] = useState(null);

  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowForm(false);
  }

  function handleSetSelectedID(id) {
    setSelectedID((s) => (s === id ? null : id));
    setShowForm(false);
  }

  function handleSplitBill(value) {
    setFriends((s) =>
      s.map((c) =>
        c.id === selectedID ? { ...c, balance: c.balance + value } : c,
      ),
    );
    setSelectedID(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSetSelectedID}
          selectedID={selectedID}
        />
        {showForm && (
          <FormAddFriend friends={friends} onSetFriends={handleAddFriends} />
        )}
        <Button onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedID && (
        <FormSplitBill
          selectedFriend={friends.filter((c) => c.id === selectedID)[0]}
          onSplitBill={handleSplitBill}
          key={selectedID}
        />
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedID }) {
  return (
    <ul>
      {friends.map((c) => (
        <Friend
          key={c.id}
          selectedID={selectedID}
          onSelection={onSelection}
          {...c}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ id, name, image, balance, onSelection, selectedID }) {
  const isSelected = id === selectedID;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3> {name}</h3>
      {balance > 0 && (
        <p className="green">
          {name} owes you {Math.abs(balance)}
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      {balance < 0 && (
        <p className="red">
          You owes {name} {Math.abs(balance)}
        </p>
      )}
      <Button onClick={() => onSelection(id)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onSetFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSetFriends(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onSetFriends(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSetFriends}>
      <label>- Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>- Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoPaid, setWhoPaid] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoPaid === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>- Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>- Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value),
          )
        }
      ></input>
      <label>- {selectedFriend.name} expense</label>
      <input type="text" disabled value={paidByFriend}></input>
      <label>- Who is paying the bill</label>
      <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

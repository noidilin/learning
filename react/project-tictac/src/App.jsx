/* eslint-disable react/prop-types */

// import { useState } from 'react';

function Board() {
  return (
    <>
      <div className='board-row'>
        <Square value='1' />
        <Square value='2' />
        <Square value='3' />
      </div>
      <div className='board-row'>
        <Square value='4' />
        <Square value='5' />
        <Square value='6' />
      </div>
      <div className='board-row'>
        <Square value='7' />
        <Square value='8' />
        <Square value='9' />
      </div>
    </>
  );
}

function Square({ value }) {
  return <button className='square'>{value}</button>;
}

function App() {
  return (
    <>
      <Board />
    </>
  );
}

export default App;

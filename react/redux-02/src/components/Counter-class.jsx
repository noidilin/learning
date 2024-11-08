/* eslint-disable react/prop-types */

import { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Counter.module.css';

class Counter extends Component {
  handleIncrement() {
    this.props.increment();
  }

  handleDecrement() {
    this.props.decrement();
  }

  handleToggleCounter() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.handleDecrement.bind(this)}>Decrement</button>
          <button onClick={this.handleIncrement.bind(this)}>Increment</button>
        </div>
        <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

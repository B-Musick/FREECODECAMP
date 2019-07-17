import React from 'react';
import {createStore} from 'redux';
import {provider} from 'redux';
import logo from '../../logo.svg';
import './App.css';

// Import combined reducers
import reducers from '../../reducers/'

// Provider component we use to pass store down to its children

// store is created from reducers, it holds state and dispatches
const store = createStore(reducers)

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </Provider>
  );
}

export default App;

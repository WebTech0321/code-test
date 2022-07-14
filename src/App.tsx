import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from "./store"
import Course from './Course';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Course />
      </Provider>
    </div>
  );
}

export default App;

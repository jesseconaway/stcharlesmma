import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
}

export default App;

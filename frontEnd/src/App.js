import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Coaches from './components/coachesPage';
import Fighters from './components/fightersPage';
import Schedule from './components/schedulePage';
import Classes from './components/classesPage';
import BeltRankings from './components/beltRankingsPage';
import About from './components/aboutPage';
import Contact from './components/contactPage';
import Footer from './components/footer';
import Admin from './components/adminPage';
import Waiver from './components/waiver';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/waiver" component={Waiver} />
        <Route path="/admin" component={Admin} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/beltrankings" component={BeltRankings} />
        <Route path="/classes" component={Classes} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/fighters" component={Fighters} />
        <Route path="/coaches" component={Coaches} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;

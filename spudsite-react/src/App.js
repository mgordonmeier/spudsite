import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Spuds from './components/Spuds';
import Music from './components/Music';
import Shows from './components/Shows';
import Contact from './components/Contact';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/spuds">
          <Spuds />
        </Route>

        <Route path="/music">
          <Music />
        </Route>

        <Route path="/shows">
          <Shows />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

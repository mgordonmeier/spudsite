import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

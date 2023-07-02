import './App.css';
import { Landing, Home, Detail, CreatePokemon } from './views';
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from "react-router-dom";


function App() {

  const location = useLocation();
  return (
    <div className="App">

      { location.pathname !== "/" && <NavBar/>}
      <Route exact path="/">
      <Landing />
      </Route>
      <Route exact path="/home">
      <Home />
      </Route>
      <Route path="/home/:id">
      <Detail />
      </Route>
      <Route exact path="/pokemons">
      <CreatePokemon />
      </Route>    
    </div>
  );
}

export default App;

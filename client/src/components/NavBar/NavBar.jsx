import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { getPokemons, removeDetail } from "../../redux/actions";


const NavBar = () => {
    const dispatch = useDispatch();

    const handleHomeClick = () => {
    dispatch(getPokemons()); 
    dispatch(removeDetail())
  };
    return (
        <div className={styles.mainContainer}>
        <Link to="/home" onClick={handleHomeClick}><button className={styles.buttonBar}>Home </button></Link>
        <Link to="/pokemons"><button className={styles.buttonBar}>New Pokémon &#10010;</button></Link>
        <SearchBar></SearchBar>
        </div>
       
    )
}

export default NavBar;
import styles from "./Landing.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/International_Pokémon_logo.svg.png";
import photo from "../../assets/Daco_5392079.png";


const Landing = () => {
    return (
        <div className={styles.mainContainer}>
        <div className={styles.leftDiv}>
            <img src={logo} alt="PokeAPI"/>
            <Link to="/home"><button>Let's start!</button></Link>
        </div>
        <div className={styles.rightDiv}>
            <img className={styles.pokemons} src={photo} alt="Welcome"  />
        </div>
        </div>
    )
}


export default Landing;
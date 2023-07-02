import styles from "./SearchBar.module.css";
import { useState } from "react";
import { getPokemonName } from "../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " "))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name !== ''){
            dispatch(getPokemonName(name))
            setName("")
        }
    }


    return (
        <div className={styles.divBar}>
         <input 
         value={name}
         onChange={(event) => handleInputChange(event)}
         className={styles.inputBar} 
         type='search' />
         <button 
         style={{marginLeft: "-25px", height: "50px", borderRadius: "1em"}}
         className={styles.buttonBar} 
         onClick={handleSubmit}>Find &#128270;</button>
      </div>
    )
}

export default SearchBar;
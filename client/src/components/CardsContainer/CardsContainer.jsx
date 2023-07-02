import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/Card";
import styles from "./CardsContainer.module.css";
import { useEffect } from "react";
import { getPokemons } from "../../redux/actions";

const CardsContainer = () => {

    const pokemons = useSelector(state => state.pokemons);
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(getPokemons())
    }, [dispatch])
    

    return (
        <div className={styles.mainContainer}>
            {
                pokemons.map((poke) => {
                    return <Card 
                    key={poke.id}
                    id={poke.id}
                    name={poke.name}
                    image={poke.image}
                    types={poke.types} 
                    />
                })
            }
        </div>
    )
}

export default CardsContainer;
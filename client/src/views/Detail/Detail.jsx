import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import { getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const pokemon = useSelector(state => state.detail);

    let formattedTypes = "";
    if (pokemon.types && pokemon.types.length === 1) {
    formattedTypes = pokemon.types[0];
    } else if (pokemon.types && pokemon.types.length > 1) {
    formattedTypes = pokemon.types.join("/");
     }

    // let nameFormatted = pokemon.name[0].toUpperCase().concat(pokemon.name.slice(1, pokemon.name.length))


    useEffect(  () =>  {
        dispatch(getDetail(id))
    }, 
    [dispatch, id])

    return (
        <div className={styles.detailContainer}>
            <div className={styles.divLeft}>
             <img src={pokemon.image} alt={pokemon.name}/>
            </div>
            <div className={styles.pokeDetail}>
                <h1>Name: {pokemon.name}</h1>
                <h4 style={{marginTop: "60px"}}><span>&#9829;</span>  Health: {pokemon.health}</h4>
                <h4><span>&#9876;</span>  Attack: {pokemon.attack}</h4>
                <h4><span>&#128737;</span>  Defense: {pokemon.defense}</h4>
                <h4><span>&#9761;</span>  Speed: {pokemon.speed}</h4>
                <h4><span>&#8593;</span>  Height: {pokemon.height}</h4>
                <h4><span>&#163;</span>  Weight: {pokemon.weight}</h4>
                <h4><span>&#9733;</span>  Type: {formattedTypes} </h4>
            </div>
        </div>
    )
}


export default Detail;
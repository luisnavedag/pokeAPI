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


    useEffect(() => {
        dispatch(getDetail(id))
    },
        [dispatch, id])

    return (
        <div className={styles.detailContainer}>
            <div className={styles.divLeft}>
                <img src={pokemon.image} alt={pokemon.name} />
            </div>
            <div className={styles.pokeDetail}>
                <div className={styles.info}>
                    <h1>Name: {pokemon.name}</h1>
                    <h4 style={{ marginTop: "30px" }}><span><i class='bx bx-heart'></i></span>  Health: {pokemon.health}</h4>
                    <h4><span>&#9876;</span>  Attack: {pokemon.attack}</h4>
                    <h4><span><i class='bx bx-shield-alt-2'></i></span>  Defense: {pokemon.defense}</h4>
                    <h4><span><i class='bx bx-run'></i></span>  Speed: {pokemon.speed}</h4>
                    <h4><span><i class='bx bxs-chevron-up'></i></span>  Height: {pokemon.height}</h4>
                    <h4><span><i class='bx bx-body'></i></span>  Weight: {pokemon.weight}</h4>
                    <h4><span>&#9733;</span>  Type: {formattedTypes} </h4>
                </div>
            </div>
        </div>
    )
}


export default Detail;
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, filterCreated, orderByNameOrStrengh, filterPokemonsByType, removeDetail, getTypes, reloadPokemons } from "../../redux/actions";
import Paginado from "../../components/Paginado/Paginado";
import pokebola from "../../components/pokebola.png";
import Card from "../../components/Card/Card";
import notFound from "../../assets/NicePng_togepi-png_6158331.png"
import loading from "../../assets/loading.png"

const Home = () =>{

    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons)
    const all = useSelector(state => state.allPokemons);
    const types = useSelector(state=> state.types)

    const [pokemonLoaded, setPokemonLoaded] = useState(all.length ? true : false)
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [orden, setOrden] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const endIndex = currentPage * pokemonsPerPage;
    const startIndex = endIndex - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(startIndex, endIndex);

    const paginado = (number) => {
        setCurrentPage(number)
    }

    useEffect(() => {
        // dispatch(removeDetail());
        dispatch(getTypes())
        dispatch(getPokemons())
    }, [pokemonLoaded, dispatch])

    useEffect(() => {
        setCurrentPage(1);
    }, [allPokemons.length, setCurrentPage])

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    //   };
    // console.log(currentPokemons[0])
    // const handleClick = (event) => {
    //     event.preventDefault();
    //     dispatch(reloadPokemons())
    // }   

    const handleFilterCreated = (event) => {
        const selectedValue = event.target.options[event.target.selectedIndex].value;
        dispatch(filterCreated(selectedValue));
    }
    
    const handleFilterByType = (event) =>{
        dispatch(filterPokemonsByType(event.target.value))
    }

    const handleSort = (event) => {
        event.preventDefault();
        dispatch(orderByNameOrStrengh(event.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${event.target.value}`)
    }

    return (
        <div className={styles.mainContainer}>
        {/* <button onChange={event => handleClick(event)}>RELOAD</button> */}
        <div className={styles.sortFilter}>
            <select onChange={event => handleSort(event)}>
                <option value="normal">Normal</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
                <option value="HAttack">Highest Attack</option>
                <option value="LAttack">Lowest Attack</option>
            </select>    
            <select onChange={event => handleFilterCreated(event)}>
                <option value="All">All</option>
                <option value="API">API</option>
                <option value="Created">Created</option>
            </select>    
            <select onChange={event => handleFilterByType(event)} >
                <option value="All">All Types</option>
                {
                    types.map( type => (
                        <option value={type.name} key={type.name}>{type.name}</option>
                    ))
                }
            </select>
        </div>
        <Paginado  
        pokemonsPerPage={pokemonsPerPage}
        allPokemons={allPokemons.length}
        paginado={paginado}
        page={currentPage} />
         <div className={styles.cards}>
            {
                currentPokemons.length ? 
                typeof currentPokemons[0] === 'object' ?
                currentPokemons.map( el => {
                    return(
                        <div key={el.id}>
                            <Link to={"/home/" + el.id} style={{textDecoration:'none'}} key={el.id}>
                                <Card name={el.name} types={el.types} image={el.image ? el.image : pokebola} id={el.id} weight={el.weight} height={el.height} key={el.id} /> 
                            </Link>
                        </div>
                    )
                }) :
                <div className={styles.notFound}>
                    <img src={notFound} alt="Pokemon not found" width='200px'/>
                    <div className={styles.divLetters}>
                    <span>{currentPokemons[0]} not found...</span>
                    </div>
                </div>
                :
                <div className={styles.loading}>
                    <img src={loading} alt="Loading" />
                    <h3>Loading...</h3>
                </div>
            }
            </div>
        </div>
    )
}

export default Home;
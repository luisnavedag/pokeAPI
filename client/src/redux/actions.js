import axios from 'axios';
export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const RELOAD_POKEMONS = "RELOAD_POKEMONS";
export const POST_POKEMON = "POST_POKEMON";
export const GET_POKEMON_NAME = "GET_POKEMON_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const REMOVE_DETAILS = "REMOVE_DETAILS";
export const FILTER_BY_TYPES = "FILTER_BY_TYPES";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_BY_NAME_OR_STRENGH = "ORDER_BY_NAME_OR_STRENGH";






// GET POKEMONS
export function getPokemons(){
    return async function(dispatch){
        const apiData = await axios.get("https://pokeapi-back-u5o9.onrender.com/pokemons");
        const pokemons = apiData.data;
        
        dispatch({
            type: GET_POKEMONS,
            payload: pokemons
        })
    }
}

//GET TYPES
export function getTypes(){
    return async function(dispatch){
        const apiData = await axios.get("https://pokeapi-back-u5o9.onrender.com/types");
        const types = apiData.data;

        dispatch({ 
            type: GET_TYPES,
            payload: types
        })
    }
}

//POST POKEMONS
export function postPokemon(payload){
    return async function(dispatch){
        const pokemon = await axios.post("https://pokeapi-back-u5o9.onrender.com/pokemons", payload)
        
        return {
            type:POST_POKEMON,
            payload: pokemon
        }
    }
}

// GET POKEMON BY NAME
export function getPokemonName(name){
    return async function (dispatch){
        try{
            const apiData = await axios.get("https://pokeapi-back-u5o9.onrender.com/pokemons/name?name=" + name)
            const pokemon = apiData.data;

            return dispatch({
                type: GET_POKEMON_NAME,
                payload: pokemon
            })
        } catch(error){
            console.log(error)
            return dispatch({
                type: GET_POKEMON_NAME,
                payload: ['Pokemon']
            })
        }
    }
}

// GET POKEMON BY ID
export function getDetail (id){
    return async function (dispatch){
        try{
            let apiData = await axios.get("https://pokeapi-back-u5o9.onrender.com/pokemons/" + id);
            let pokemon = apiData.data;

            return dispatch({
                type: GET_DETAILS,
                payload: pokemon
            }) 
        } catch(error){
            console.log(error)
        }
    }
}

//REMOVE DETAIL INFO
export function removeDetail(){
    return {
        type: REMOVE_DETAILS,
    }
}

// FILTER POKEMON BY TYPE
export function filterPokemonsByType(payload){
        return {
            type: FILTER_BY_TYPES,
            payload
        }
    }

// FILTER POKEMON BY CREATED IN DB
export function filterCreated(payload){
    
        return {
            type: FILTER_CREATED,
            payload
        }
    }

// FILTER BY NAME OR STRENGH
export function orderByNameOrStrengh(payload){
    
    return {
        type: ORDER_BY_NAME_OR_STRENGH,
        payload
    }
}

// RELOAD POKEMONS
export function reloadPokemons(){
    return {
        type: RELOAD_POKEMONS,
    }
}







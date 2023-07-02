import { GET_POKEMONS, GET_TYPES, POST_POKEMON, GET_POKEMON_NAME, GET_DETAILS, REMOVE_DETAILS, FILTER_BY_TYPES, FILTER_CREATED, ORDER_BY_NAME_OR_STRENGH, RELOAD_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

const rootReducer = (state = initialState, {type, payload}) =>{
    switch(type){
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: payload,
                allPokemons: payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: payload,
                }    
        case POST_POKEMON:
            return{
                ...state
                    } 
        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: payload
                        } 
        case GET_DETAILS:
            return {
                ...state,
                detail: payload
            }  
        // case REMOVE_DETAILS:
        //     return {
        //         ...state,
        //         detail: []
        //     } 
        case FILTER_BY_TYPES:
            const allPokemons = state.allPokemons;
            const statusFiltered = payload === "All" ? allPokemons : allPokemons.filter(el=> el.types.includes(payload))
            return{
                ...state,
                pokemons: statusFiltered.length ? statusFiltered : [`${payload} Pokemons`]
            } 
        case FILTER_CREATED:
            const allPokemons2 = state.allPokemons;
            const statusFiltered2 = payload === "Created" ? allPokemons2.filter(el=> el.hasOwnProperty("createdInDB")) : allPokemons2.filter(el => !el.createdInDB)  
            return {
                ...state,
                pokemons: payload === "All" ? allPokemons2 : statusFiltered2.length > 0 ? statusFiltered2 : ["Pokemons created in DB"]
            }
        case RELOAD_POKEMONS:
            const apiPokesSort = state.allPokemons.filter( el => !el.createdInDB).sort((a, b) => {
                if(a.id > b.id) return 1;
                if(b.id > a.id) return -1;
                else return 0
            })  
            const dbPokesSort = state.allPokemons.filter( el => el.createdInDB).sort((a, b) => {
                if(a.id > b.id) return 1;
                if(b.id > a.id) return -1;
                else return 0
            })  
            let newArray = [...apiPokesSort,...dbPokesSort];
            return {
                ...state,
                pokemons: newArray
            }

        case ORDER_BY_NAME_OR_STRENGH:
            let sortedArray;
            
            if(payload === "asc"){
                sortedArray = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return 1;
                    if(b.name > a.name) return -1;
                    else return 0
                })
            }
            if(payload === "desc"){
                sortedArray = state.pokemons.sort((a, b) => {
                    if(a.name > b.name) return -1;
                    if(b.name > a.name) return 1;
                    else return 0
                })
            }
            if(payload === "HAttack"){
                sortedArray = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return -1;
                    if(b.attack > a.attack) return 1;
                    else return 0
                })
            }
            if(payload === "LAttack"){
                sortedArray = state.pokemons.sort((a, b) => {
                    if(a.attack > b.attack) return 1;
                    if(b.attack > a.attack) return -1;
                    else return 0
                })
            }
            if(payload === "normal"){
                const apiPokes = state.pokemons.filter(el => !el.createdInDB).sort((a, b)=> {
                    if(a.id > b.id) return 1;
                    if(b.id > a.id) return -1;
                    else return 0
                }) 
                const dbPokes = state.pokemons.filter(el => el.createdInDB).sort((a, b)=> {
                    if(a.id > b.id) return 1;
                    if(b.id > a.id) return -1;
                    else return 0
                }) 
                sortedArray = [...apiPokes, ...dbPokes]
            }

            return{
                ...state,
                pokemons: sortedArray
            }

        default:
            return {...state}
    }
}

export default rootReducer;
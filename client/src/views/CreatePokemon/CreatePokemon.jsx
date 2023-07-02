import { useState, useEffect } from "react";
import validate from "./validate";
import { getPokemons, postPokemon, getTypes } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import styles from "./CreatePokemon.module.css";
import charizard from "../../assets/Charizard-PNG-Free-Download.png";

const CreatePokemon = () => {
    const dispatch = useDispatch();
    const types = useSelector(state => state.types);
    const pokemons = useSelector(state => state.allPokemons.map( poke => poke.name));
    const history = useHistory();
    
    const [errors, setErrors] = useState({});
    const [section, setSection] = useState(1);

    const [input, setInput] = useState({
        name: "",
        // image: "",
        health: "",
        attack: "",
        defense: "",
        height: "",
        weight: "",
        speed: "",
        types: [],
    })


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    const changeHandler = (event) => {
        setInput({
            ...input,
            [event.target.name] : event.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        })

        setErrors(validate({
            ...input,
            [event.target.name] : event.target.value
        }, pokemons))
    }

    const handleSection = (event) => {
      event.preventDefault();

      Object.keys(errors).length === 1 && errors.types.length ?
      setSection(section === 1 ? 2 : 1)
      :
      alert("You have to complete this first section")
    }

    const handleChecked = (event) => {
      const checked = event.target.checked;
      const value = event.target.value;
        if(checked){
          setInput({
            ...input,
            types: [...input.types, value]
          })

          setErrors(validate({
            ...input,
            types: [...input.types, value]
          }))
        } 
        else if(!checked){
          setInput({
            ...input,
            types: [...input.types.filter(el => el !== value)]
          })

          setErrors(validate({
            ...input,
            types: input.types.filter(el => el !== value)
          }, pokemons))
        }
      };



    const handleSubmit = (event) => {
        event.preventDefault();
    
        if (Object.keys(errors).length === 0 && input.name.length) {
          dispatch(postPokemon(input));
          dispatch(getPokemons());
          alert("Pokemon created successfully!");
          setInput({
            name: "",
            // image:"",
            health: "",
            attack: "",
            defense: "",
            speed: "",
            weight: "",
            height: "",
            types: [],
          });
          history.push("/home")
        } else {
          alert("You must choose at least one type!");
        }
      };
    


    return (
      <div className={styles.pagina}>
        <div className={styles.paginaLeft}>
          <img src={charizard} alt="Charizard" />
        </div>
        <div className={styles.container}>
        <form onSubmit={ (event) => handleSubmit(event) }>
          <section className={section === 1 ? styles.show : styles.hide}>
          <h2>Create New Pokémon: </h2>
            <div className={styles.formdiv}>
                <label key={input.name}>Name: </label>
                <input type="text"
                value={input.name}
                name="name"
                onChange={changeHandler} 
                autoComplete="off"/>
            </div>
                {
                    errors.name ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.name}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Health: </label>
                <input type="number"
                value={input.health}
                name="health"
                onChange={changeHandler} />
            </div>
               {
                    errors.health ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.health}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Attack: </label>
                <input type="number"
                value={input.attack}
                name="attack"
                onChange={changeHandler} />
            </div>
                {
                    errors.attack ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.attack}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Defense: </label>
                <input type="number"
                value={input.defense}
                name="defense"
                onChange={changeHandler} />
            </div>
                {
                    errors.defense ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.defense}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Height: </label>
                <input type="number"
                value={input.height}
                name="height"
                onChange={changeHandler}/>
            </div>
                {
                    errors.height ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.height}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Weight: </label>
                <input type="number"
                value={input.weight}
                name="weight"
                onChange={changeHandler} />
            </div>
                {
                    errors.weight ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.weight}</p>
                            ) :
                            (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <div className={styles.formdiv}>
                <label key={input.name}>Speed: </label>
                <input type="number"
                value={input.speed}
                name="speed"
                onChange={changeHandler} />
            </div>
                {
                    errors.speed ? (
                          <p style={{textAlign: "start", marginLeft: "35px"}}>&#9940; {errors.speed}</p>
                            ) :
                          (<p style={{textAlign: "start", marginLeft: "35px"}}>&#9989;</p>)
                }
            <button className={styles.buttonNext} onClick={event => handleSection(event)}>Next</button>
            </section>
            <section className={section === 2 ? styles.show : styles.hide}>
            <h2>Select Up to 2 Types: </h2>
            <div className={styles.containerTypes}>
            {
                types.map( type => (
                  <label htmlFor={type.name} key={type.name} className={styles.checked}>
                  <div className={styles.bytype} > 
                    <input 
                    key={type.name}
                    type="checkbox" 
                    id={type.name} 
                    value={type.name}
                    onChange={(event) => handleChecked(event)}
                    />
                        <div style={{marginRight: "5px"}} className={styles.checkmark}></div>      
                        {type.name}
                  </div>
                  </label>
                  ))
                  }  
             </div> 
            {
                    errors.types ? (
                          <p>&#9940; {errors.types}</p>
                            ) :
                            (<p>&#9989; Goog Job!</p>)
                }
            <div style={{display:'flex', flexFlow:'row nowrap'}}> 
                  <button className={styles.previous} onClick={(event) => {handleSection(event)}}>Previous</button>
                 <button className={styles.create} type='submit'>Create Pokemon</button>
            </div>
            </section>

        </form>
        </div>
      </div>
    )
}




export default CreatePokemon;



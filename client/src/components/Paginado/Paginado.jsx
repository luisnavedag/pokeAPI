import styles from "./Paginado.module.css";


const Paginado = ({ pokemonsPerPage, allPokemons, paginado, page }) => {
  const pageNumbers = []

  for (let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage) - 1; i++){
    pageNumbers.push(i + 1)
  }

    return (
      <nav>
        <ul className={styles.paginado}>
          {
            pageNumbers && pageNumbers.map( number => (
              <li key={number} style={{ listStyle: "none"}}>
                <button className={styles.buttons} style={ page === number ? {color: "white", backgroundColor: "black"} : {}} onClick={() => paginado(number)}>{number} </button>
              </li>
            ))
          }

        </ul>
      </nav>
    )
}

export default Paginado;
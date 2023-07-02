import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";


const Card = ({image, id, name, types}) => {
  let formattedTypes = "";
  if (types && types.length === 1) {
    formattedTypes = types[0];
  } else if (types && types.length > 1) {
    formattedTypes = types.join("/");
  }

  let nameFormatted = name[0].toUpperCase().concat(name.slice(1, name.length))
    return (
      
      <div className={styles.container}>
        <NavLink className={styles.link} exact to={`/home/${id}`}>
            <img src={image} alt={name}  />
            <h2>{nameFormatted}</h2>
            <p> <span>Types:</span>  {formattedTypes}</p>
        </NavLink>
      </div>
    )
}

export default Card;
import { createContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
export let data = createContext();
export function Provider({ children }) {
  Provider.propTypes = {
    children: PropTypes.element.isRequired,
  };
  let [recipe, setRecipe] = useState([]);

  let SearchTerm = async (term) => {
    try {
      let reponse = await axios.get(
        `https://dummyjson.com/recipes/search?q=${term}`
      );
      if (reponse.data.recipes.length > 0) {
        setRecipe(reponse.data.recipes[0]);
      } else {
        setRecipe("null");
      }
    } catch (error) {
      console.log("errorrrr", error);
    }
  };
  let valuetoShare = {
    SearchTerm,
    recipe,
  };
  return <data.Provider value={valuetoShare}>{children}</data.Provider>;
}

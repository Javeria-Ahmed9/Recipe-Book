import { useContext } from "react";
import { data } from "./Provider";
import { BsEmojiFrown } from "react-icons/bs";

export function ShowRecipe() {
  let { recipe } = useContext(data);
  return (
    <div id="content" className="container  text-center mb-16">
      <div id="innerContent" className=" container col border mt-10">
        {typeof recipe.name !== "undefined" ? (
          <>
            <div className="row text-left">
              <h3 className="col-3 my-2">Recipe Name:</h3>
              <h5 className="col-6">
                {" "}
                ``
                {recipe.name}``
              </h5>
            </div>
            <div className="row  text-left">
              <h3 className="col-3 mt-2 mb-3">Meal Type:</h3>
              <h4 className="col-6 ">
                {recipe.mealType.map((val, ind) => (
                  <p key={ind}>
                    <li>{val}</li>
                  </p>
                ))}
              </h4>
            </div>
            <div className="text-left  ">
              <h3 className="col-5 mb-2">Ingredients:</h3>
              <div className=" container row">
                <h4 className="col-6">
                  {recipe.ingredients.map((val, ind) => (
                    <li key={ind}>{val}</li>
                  ))}
                </h4>
                <img src={recipe.image} className="col-6" />
              </div>
            </div>

            <div className="row text-left">
              <h3 className="col-3 my-2">Instructions:</h3>
            </div>
            <h4 className="text-left mb-2">
              {recipe.instructions.map((val, ind) => (
                <li key={ind}>{val}</li>
              ))}
            </h4>
          </>
        ) : recipe === "null" ? (
          <div id="errordiv">
            <h6>
              <BsEmojiFrown />
              404
              <div id="page">Page not found</div>
            </h6>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

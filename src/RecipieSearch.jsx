import { useContext, useState } from "react";
import { data } from "./Provider";

export function RecipieSearch() {
  let { SearchTerm } = useContext(data);
  let [input, setInput] = useState("");
  let handleInput = (event) => {
    setInput(event.target.value);
  };
  let handlesubmit = (event) => {
    event.preventDefault();
    conditionCheckBefore();
  };
  let onButtonClick = () => {
    conditionCheckBefore();
  };
  let conditionCheckBefore = () => {
    if (input !== "") {
      SearchTerm(input);
      setInput("");
    }
  };
  return (
    <div className=" container mx-auto px-4 text-center">
      <h1 className="mb-8 mt-4">Recipe Book</h1>
      <form onSubmit={handlesubmit}>
        <input
          onChange={handleInput}
          value={input}
          className="border-2 border-indigo-600 h-8 w-60 "
          placeholder="Search Recipe"
        />
      </form>
      <button onClick={onButtonClick} className="mt-1">
        Search
      </button>
    </div>
  );
}

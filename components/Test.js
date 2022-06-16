import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactDOM from "react-dom";

function CheckedValues(props) {
  const router = useRouter();
  const handleChecked = (e) => {
    const hero = props.filterName[e.target.dataset.id];

    let newCheckedValues = props.checkedValue.filter((item) => item !== hero);

    if (e.target.checked) newCheckedValues.push(hero);
    props.setCheckedValues(newCheckedValues);
    router.push({
      query: {
        name: props.checkedValue.join(", "),
      },
    });
  };

  return (
    <div className="App">
      {props.filterName.map((hero, id) => (
        <label key={id}>
          <input type="checkbox" data-id={id} onClick={handleChecked} /> {hero}
        </label>
      ))}
      <hr />
      <h3>Results</h3>
      <p>{props.checkedValue.join(", ")}</p>
    </div>
  );
}
export default CheckedValues;

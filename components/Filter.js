import { useRouter } from "next/router";
import React, { useState } from "react";

const Filter = (props) => {
  const [queryname, setQueryname] = useState({
    name: [],
    res: [],
  });
  const router = useRouter();

  const handleChangeforName = (e) => {
    const { value, checked } = e.target;
    const { name } = queryname;

    if (checked) {
      setQueryname({
        name: [...name, value],
        res: [...name, value],
      });
    } else {
      setQueryname({
        name: name.filter((e) => e !== value),
        res: name.filter((e) => e !== value),
      });
    }
    router.push({
      query: queryname.name,
    });
  };

  return (
    <div>
      {props.filterName.map((name, i) => (
        <label key={i}>
          <input
            type="checkbox"
            data-id={i}
            onClick={handleChangeforName}
            value={name}
          />{" "}
          {name}
        </label>
      ))}
      <p>{queryname.name.join(", ")}</p>
    </div>
  );
};

export default Filter;

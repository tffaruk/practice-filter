import { useState, useRef, useReducer, useEffect } from "react";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { useRouter } from "next/router";
import { getAlltag } from "../lib/post";
import Filter from "../components/Filter";
import CheckedValues from "../components/Test";

// const initialState = { username: "", email: "" };
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "field":
//       return { ...state, [action.fieldName]: action.payload };
//     case "field2":
//       return { ...state, [action.fieldName]: action.payload };
//     default:
//       return state;
//   }
// };

var GithubSlugger = require("github-slugger");

const pagelist = [
  {
    name: "next",
    theme: "business",
  },
  {
    name: "next",
    theme: "constraction",
  },
  {
    name: "next",
    theme: "portfolio",
  },
  {
    name: "hugo",
    theme: "business",
  },
  {
    name: "hugo",
    theme: "constraction",
  },
  {
    name: "hugo",
    theme: "portfolio",
  },
];

export default function Home({ posts }) {
  const filterName = [...new Set(pagelist.map((d) => d.name))];
  // const heroes = ["Batman", "Superman", "Aquaman", "Flash", "Green Lantern"];
  // // const [checkedValue, setCheckedValues] = useState([]);
  const [nameValue, setNameValue] = useState([]);

  // const cvProps = { filterName, checkedValue, setCheckedValues };

  // // const dataSet = [
  // //   {
  // //     name: "rasel",
  // //     email: "yahoo",
  // //   },
  // //   {
  // //     name: "rasel",
  // //     email: "hotmail",
  // //   },
  // //   {
  // //     name: "farhad",
  // //     email: "gmail",
  // //   },
  // // ];

  // // const [state, dispatch] = useReducer(reducer, initialState);
  // // console.log(state);

  // const [data, setData] = useState([]);

  // const router = useRouter();

  // let uniqueName = [];
  // let checkedValues = [];

  // const handleChangeforName = (e) => {
  //   console.log(e.target.dataset);
  //   console.log(dataSet[e.target.dataset.id].name);
  //   const name = uniqueName[e.target.dataset.id].name;
  //   const filter = dataSet.filter((d) => d.name == name);
  //   const filterbyName = data.filter((data) => data.name !== name);

  //   if (e.target.checked) filterbyName = filter;
  //   setData(filterbyName);

  //   checkedValues.push(uniqueName[e.target.dataset.id].name);

  //   console.log(checkedValues);
  // };

  // useEffect(() => {
  //   if (data.length > 0) {
  //     if (state.username != "") {
  //       const filterbyName = data.filter((data) => data.name == state.username);
  //       setData(filterbyName);
  //     } else if (state.email != "") {
  //       const filterbyEmail = data.filter((data) => data.email == state.email);
  //       setData(filterbyEmail);
  //     }
  //   } else {
  //     if (state.username != "") {
  //       console.log(state.username != "");
  //       const filterbyName = dataSet.filter(
  //         (data) => data.name == state.username
  //       );
  //       setData(filterbyName);
  //     } else if (state.email != "") {
  //       const filterbyEmail = dataSet.filter(
  //         (data) => data.email == state.email
  //       );
  //       setData(filterbyEmail);
  //     } else {
  //       setData([]);
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [state]);
  // console.log(state);

  // console.log(data, data.length);

  const newProps = { filterName, nameValue, setNameValue };

  return (
    <div className={styles.container}>
      {/* {uniqueName.map((name, i) => (
        <label key={i}>
          <input
            data-id={i}
            type="checkbox"
            value={name.name}
            onClick={
              // dispatch({
              //   type: "field",
              //   fieldName: "username",
              //   payload: e.target.checked ? e.target.value : "",
              // })
              handleChangeforName
            }
          />
          {name.name}
        </label>
      ))}

      {dataSet.map((name, i) => (
        <input
          key={i}
          type="checkbox"
          value={name.email}
          onChange={(e) =>
            // dispatch({
            //   type: "field",
            //   fieldName: "username",
            //   payload: e.target.checked ? e.target.value : "",
            // })
            handleChange(e)
          }
        />
      ))}
      {data.map((data) => (
        <p key={data.email}>{data.name}</p>
      ))} */}
      <form>
        <Filter {...newProps} />
      </form>

      {/* <form>
        <CheckedValues {...cvProps} />
      </form> */}
    </div>
  );
}
export const getStaticProps = () => {
  const data = getAlltag();

  const file = fs.readdirSync(path.join("post"));
  const posts = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("post", file),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);
    return {
      frontmatter,
      content,
    };
  });

  return {
    props: {
      posts: posts,
    },
  };
};

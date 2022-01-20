import { useState } from "react";
import styles from "../styles/Home.module.css";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
var GithubSlugger = require("github-slugger");

export default function Home({ posts }) {
  const slagger = new GithubSlugger();
  console.log(slagger.slug("string1,string2,string3,string4"));
  const handleSearch = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    reset();
  };
  let options = { year: "numeric", month: "long", day: "numeric" };
  const currentDate = new Date();
  const dateFormate = (date) => {
    const dateFormate =
      currentDate.getFullYear() > new Date(date).getFullYear() ? (
        new Date(date).toLocaleDateString("en-US", options)
      ) : currentDate.getMonth() > new Date(date).getMonth() ? (
        new Date(date).toLocaleDateString("en-US", options)
      ) : currentDate.getDate() == new Date(date).getDate() ? (
        <span>Today</span>
      ) : currentDate.getDate() - new Date(date).getDate() <= 3 ? (
        <span>{currentDate.getDate() - new Date(date).getDate()} day ago </span>
      ) : (
        new Date(date).toLocaleDateString("en-US", options)
      );
    return dateFormate;
  };
  console.log(dateFormate("2019-11-07T05:00:00Z"));

  return (
    <div className={styles.container}>
      <input
        type="text"
        onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
      />
      {/* {key.map((k) => (
        <Link key={k} href="#">
          <a href="#" style={{ margin: "10px" }} key={k}>
            {k}
          </a>
        </Link>
      ))}
      <p>{array}</p>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      /> */}
      {posts.map((d) => (
        <div key={d.title1}>
          <h1>{d.frontmatter.title}</h1>
          {d.frontmatter.key.map((k) => (
            <Link key={k} href="#">
              <a style={{ margin: "20px" }}>{k}</a>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
export const getStaticProps = () => {
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

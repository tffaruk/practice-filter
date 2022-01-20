import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export const getAlltag = () => {
  var slugger = new GithubSlugger();
  let tagCount = {};
  const file = fs.readdirSync(path.join("post"));
  file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("post", file),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(metaDataWithFrontMatter);
    if (frontmatter) {
      frontmatter.key.forEach((i) => {
        const formatedKey = slugger.slug(i);
        if (formatedKey in tagCount) {
          tagCount[formatedKey] += 1;
        } else {
          tagCount[formatedKey] = 1;
        }
      });
    }
  });

  console.log(tagCount);
  return tagCount;
};

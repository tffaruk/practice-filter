import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

export const getAlltag = () => {
  const file = fs.readdirSync(path.join("content"));
  const data = file.map((file) => {
    const metaDataWithFrontMatter = fs.readFileSync(
      path.join("content", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(metaDataWithFrontMatter);
    if (frontmatter.published === true) {
      const updatedFrontmatter = {
        ...frontmatter,
        updatedOn: new Date().toISOString(),
      };

      file.data = updatedFrontmatter;
      const updatedFileContent = matter.stringify(file);
      fs.writeFile(path, updatedFileContent);
    }
  });

  return data;
};

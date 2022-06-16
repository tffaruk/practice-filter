import React from "react";

import { getAlltag } from "../../lib/post";

const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.name}</h1>
    </div>
  );
};

export async function getStaticPaths() {
  const tags = getAlltag();

  const paths = Object.keys(tags).map((d) => ({
    params: {
      slug: d,
    },
  }));

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { slug } = params;
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1

  // Pass post data to the page via props
  return { props: { post: "ya kiya sin he", slug: slug } };
}
export default Post;

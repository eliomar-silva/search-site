import { PostCart } from "../components/PostCart";

import "./styles.css";

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (
      <PostCart
        key={post.id}
        cover={post.cover}
        title={post.title}
        id={post.id}
        body={post.body}
      />
    ))}
  </div>
);

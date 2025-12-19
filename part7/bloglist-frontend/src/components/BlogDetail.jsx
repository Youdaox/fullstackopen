import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addLike,
  initializeBlogs,
  createComment,
} from "../reducers/blogReducer";
import { addNotification } from "../reducers/notificationReducer";
import { useEffect, useState } from "react";

const BlogDetail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const [comment, setComment] = useState("");

  const id = useParams().id;
  const blog = useSelector((state) => state.blog.find((b) => b.id === id));

  if (!blog) {
    return null;
  }

  const handleUpdateBlog = async () => {
    const updatedBlog = {
      likes: blog.likes + 1,
    };
    try {
      await dispatch(addLike(updatedBlog, blog.id));
      dispatch(addNotification(`blog ${blog.title} updated`, 3000, true));
    } catch (error) {
      dispatch(addNotification(error.message, 3000, false));
    }
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const commentObj = {
      comment: comment,
    };
    await dispatch(createComment(commentObj, id));
    setComment("");
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes
        <button onClick={handleUpdateBlog}> like </button>
      </p>
      <p> added by {blog.author}</p>
      <div>
        <h4>comments</h4>
        <form onSubmit={handleComment}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((c) => (
            <li key={c}> {c} </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetail;

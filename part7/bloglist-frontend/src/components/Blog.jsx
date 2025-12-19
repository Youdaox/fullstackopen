import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";

import { Link } from "react-router-dom";
import {
  TableCell,
  TableRow,
} from "@mui/material"

const Blog = ({ blog, ownBlog }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id));
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  );
};

export default Blog;

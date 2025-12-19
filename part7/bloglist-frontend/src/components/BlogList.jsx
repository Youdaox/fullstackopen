import Blog from "./Blog";
import { useSelector } from "react-redux";
import {
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material"

const BlogList = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.login);

  return (
    <TableContainer component={Paper}>
      <TableBody>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                blog={blog}
                ownBlog={blog.user.username === user.username ? true : false}
              />
            );
          })}
      </TableBody>
    </TableContainer>
  );
};

export default BlogList;

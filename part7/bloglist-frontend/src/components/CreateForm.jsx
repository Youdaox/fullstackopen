import { useDispatch } from "react-redux";
import TextInput from "./TextInput";
import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { addNotification } from "../reducers/notificationReducer";
import {
  Button,
} from "@mui/material"

const CreateForm = ({ createFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const handleCreateBlog = async (event) => {
    try {
      event.preventDefault();
      dispatch(createBlog({ title, author, url }));
      createFormRef.current.toggle();
      dispatch(addNotification(`a new blog ${title} added`, 3000, true));
    } catch (error) {
      dispatch(addNotification("cannot add blog", 3000, false));
    }
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <TextInput
          text="title:"
          value={title}
          setValue={setTitle}
          data-testid="titleid"
        />
        <TextInput
          text="author:"
          value={author}
          setValue={setAuthor}
          data-testid="authorid"
        />
        <TextInput
          text="url:"
          value={url}
          setValue={setUrl}
          data-testid="urlid"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default CreateForm;

import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(b => b.id !== id)
    },
    updateBlog(state, action) {
      const blogToUpdate = action.payload
      return state.map(b => b.id !== blogToUpdate.id ? b : blogToUpdate)
    }
  }
})

const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.createBlog(blog)
    dispatch(addBlog(newBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const addLike = (blog, id) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.updateBlog(blog, id)
    dispatch(updateBlog(returnedBlog))
  }
}

export const createComment = (comment, id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(comment, id)
    dispatch(updateBlog(updatedBlog))
  }
}
export default blogSlice.reducer
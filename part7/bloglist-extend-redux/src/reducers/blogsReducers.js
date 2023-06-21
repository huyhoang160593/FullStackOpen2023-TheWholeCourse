import { createSlice } from '@reduxjs/toolkit'
import blogServices from 'services/blogs'

const initialState = /** @type {Blog[]} */ ([])

const blogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    /** @param {{payload: Blog | Blog[], type: string}} action  */
    appendBlogs(state, action) {
      return state.concat(action.payload)
    },
    /** @param {{payload: Blog, type: string}} action  */
    updateBlog(state, action) {
      return state.map((blog) =>
        action.payload.id === blog.id ? action.payload : blog
      )
    },
  },
})

const { appendBlogs, updateBlog } = blogsReducer.actions

/** All Thunk Actions */

/**
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogServices.getAll()
      dispatch(appendBlogs(blogs))
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {Pick<Blog, 'author' | 'title' | 'url'>} blogObject
 * @param {User} user
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const addBlog = (blogObject, user) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogServices.create(blogObject)
      const injectUser = {
        id: newBlog.user,
        name: user.name,
        username: user.username,
      }
      newBlog.user = injectUser
      dispatch(appendBlogs(newBlog))
    } catch (error) {
      return error
    }
  }
}

/**
 * @param {string} blogId
 * @param {Pick<Blog, 'author' | 'title' | 'url' | 'likes'>} blogObject
 * @param {User} user
 * @returns {import("@reduxjs/toolkit").ThunkAction<Promise<void | any>, import('store.js').RootState, unknown, import('@reduxjs/toolkit').AnyAction>}
 */
export const changeBlog = (blogId, blogObject, user) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogServices.put(blogId, blogObject)
      const injectUser = {
        id: updatedBlog.user,
        name: user.name,
        username: user.username,
      }
      updatedBlog.user = injectUser
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      return error
    }
  }
}

export default blogsReducer.reducer
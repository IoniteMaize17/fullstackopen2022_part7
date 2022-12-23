import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useEffect, useRef } from 'react'
import { Togglable } from '../components/Togglable'
import { BlogForm } from '../components/BlogForm'
import { Blog } from '../components/Blog'
import { setNotification } from '../reducers/notification.reducer'
import { blogService } from '../services/blogs'
import { setListBlog, appendInfoBlog, updateInfoBlog, removeOneBlog } from '../reducers/blogs.reducer'

const BlogsPageComponent = ({ blogs, user, setNotification, setListBlog, appendInfoBlog, updateInfoBlog, removeOneBlog }) => {
  useEffect(() => {
    blogService.setToken(user.token)
    blogService.getAll().then((blogs) => setListBlog(blogs))
  }, [])

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setNotification( `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 's', 5)
      appendInfoBlog({
        ...returnedBlog,
        user: {
          name: user.name,
          username: user.username,
        },
      })
    } catch (exception) {
      setNotification('create failed', 'e', 5)
    }
  }

  const handlePlusLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
      })
      updateInfoBlog({
        ...updatedBlog,
        user: blog.user
      })
    } catch (exception) {
      setNotification('Like failed', 'e', 5)
    }
  }

  const handleRemove = async (blog) => {
    try {
      await blogService.remove(blog.id)
      removeOneBlog(blog.id)
    } catch (exception) {
      setNotification('remove failed', 'e', 5)
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreate} />
    </Togglable>
  )
  return (
    <div>
      {blogForm()}
      <ListGroup>
        {[...blogs]
          .sort((a, b) => {
            return b.likes - a.likes
          })
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handlePlusLike={handlePlusLike}
              handleRemove={handleRemove}
              isRemove={user.username === blog.user.username}
            />
          ))}
      </ListGroup>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  setListBlog,
  appendInfoBlog,
  updateInfoBlog,
  removeOneBlog,
}

export const BlogsPage = connect(mapStateToProps, mapDispatchToProps)(BlogsPageComponent)
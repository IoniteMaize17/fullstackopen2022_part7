import { Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Comments } from '../components/Comments'
import { blogService } from '../services/blogs'
import { setNotification } from '../reducers/notification.reducer'
import { setListBlog, updateInfoBlog } from '../reducers/blogs.reducer'

const BlogDetailPageComponent = ({ user, setListBlog, updateInfoBlog }) => {
  const [ blog, setBlog ] = useState(null)
  const { blog_id } = useParams()
  useEffect(() => {
    blogService.setToken(user.token)
    blogService.getAll().then((res_blogs) => {
      setListBlog(res_blogs)
      setBlog(res_blogs.find(u => u.id === blog_id))
    })
  }, [])

  const handleCommentAction = async (comment) => {
    try {
      const updatedBlog = await blogService.actionComment(blog.id, comment)
      const blogInfoUpdated = {
        ...updatedBlog,
        user: blog.user
      }
      updateInfoBlog(blogInfoUpdated)
      setBlog(blogInfoUpdated)
    } catch (exception) {
      setNotification('Like failed', 'e', 5)
    }
  }

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        likes: blog.likes + 1,
      })
      const blogInfoUpdated = {
        ...updatedBlog,
        user: blog.user
      }
      updateInfoBlog(blogInfoUpdated)
      setBlog(blogInfoUpdated)
    } catch (exception) {
      setNotification('Like failed', 'e', 5)
    }
  }

  if (blog !== null) {
    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{blog.author}</Card.Subtitle>
            <Card.Text>Added by {blog.user.name}</Card.Text>
            <Card.Text><Button variant="warning" onClick={handleLike}>{blog.likes} Like</Button></Card.Text>
            <Card.Link href={blog.url}>Click here for detail</Card.Link>
          </Card.Body>
        </Card>
        <Card className='mt-3'>
          <Card.Body>
            <Comments blog={blog} handleCommentAction={handleCommentAction} />
          </Card.Body>
        </Card>
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setListBlog,
  updateInfoBlog
}

export const BlogDetailPage = connect(mapStateToProps, mapDispatchToProps)(BlogDetailPageComponent)
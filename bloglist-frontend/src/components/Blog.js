import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Blog = ({ blog }) => {
  return (
    <ListGroup.Item>
      <div>
        <span className="titleAndAuthor">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </span>
      </div>
    </ListGroup.Item>
  )
}

import { ListGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { usersService } from '../services/users'
import { setListUsers } from '../reducers/users.reducer'

const UserDetailPageComponent = ({ setListUsers }) => {
  const [ user, setUser ] = useState(null)
  const { user_id } = useParams()
  useEffect(() => {
    usersService.getAll().then((res_users) => {
      setListUsers(res_users)
      setUser(res_users.find(u => u.id === user_id))
    })
  }, [])

  if (user !== null) {
    return (
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          <h5>Blogs with {user.name}</h5>
        </ListGroup.Item>

        {user.blogs.map(blog => (
          <ListGroup.Item key={blog.id} as="li">{blog.title}</ListGroup.Item>
        ))}

      </ListGroup>
    )
  }
  return null
}

const mapStateToProps = () => {
  return {}
}

const mapDispatchToProps = {
  setListUsers
}

export const UserDetailPage = connect(mapStateToProps, mapDispatchToProps)(UserDetailPageComponent)
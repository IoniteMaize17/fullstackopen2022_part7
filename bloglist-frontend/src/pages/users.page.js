import { Table  } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { usersService } from '../services/users'
import { setListUsers } from '../reducers/users.reducer'
import { Link } from 'react-router-dom'

const UsersPageComponent = ({ users, setListUsers }) => {
  useEffect(() => {
    usersService.getAll().then((blogs) => setListUsers(blogs))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th></th>
            <th>Full Name</th>
            <th>Number Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  setListUsers
}

export const UsersPage = connect(mapStateToProps, mapDispatchToProps)(UsersPageComponent)
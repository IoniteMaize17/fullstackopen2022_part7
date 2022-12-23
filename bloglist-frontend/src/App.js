import { Container, Button, Form  } from 'react-bootstrap'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { Notification } from './components/Notification'
import { Navigation } from './components/Navigation'
import { BlogsPage } from './pages/blogs.page'
import { UsersPage } from './pages/users.page'
import { UserDetailPage } from './pages/user-detail.page'
import { BlogDetailPage } from './pages/blog-detail.page'
import { loginService } from './services/login'
import { setListBlog } from './reducers/blogs.reducer'
import { setNotification } from './reducers/notification.reducer'
import { KEY_LOCAL_SAVE_USER, pushInfoUser, removeUser } from './reducers/user.reducer'
import { Routes, Route } from 'react-router-dom'

const AppComponent = ({ user, setNotification, setListBlog, pushInfoUser, removeUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(KEY_LOCAL_SAVE_USER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      pushInfoUser(user)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      pushInfoUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('wrong username or password', 'e', 5)
    }
  }

  const handleLogut = () => {
    removeUser()
    setListBlog([])
  }

  if (user === null) {
    return (
      <Container>
        <h2 className='mt-5'>Login to Application</h2>
        <Notification />
        <Form className="mb-3" onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control name="Username" type="text" placeholder="Enter username" value={username} onChange={({ target }) => setUsername(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={({ target }) => setPassword(target.value)} />
          </Form.Group>
          <Button className='mt-3' variant="primary" type="submit">Login</Button>
        </Form>
      </Container>
    )
  }

  const container = {
    marginTop: '100px',
    marginBottom: '20px'
  }

  return (
    <div>
      <Navigation user={user} handleLogut={handleLogut} />
      <Container style={container}>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:user_id" element={<UserDetailPage />} />
          <Route path="/blogs/:blog_id" element={<BlogDetailPage />} />
        </Routes>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  pushInfoUser,
  setListBlog,
  removeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent)
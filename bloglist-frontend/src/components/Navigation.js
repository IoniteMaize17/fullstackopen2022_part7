import { Link } from 'react-router-dom'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'


export const Navigation = ({ user, handleLogut }) => {
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
  }
  const authWelcomeStyle = {
    display: 'flex',
    alignItems: 'center'
  }
  const authNameStyle = {
    marginRight: '10px'
  }
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Blogs App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link style={linkStyle} to="/">Blogs</Link></Nav.Link>
            <Nav.Link><Link style={linkStyle} to="/users">Users</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={authWelcomeStyle}>
            <span style={authNameStyle}>Hello {user.name}</span>
            <Button variant="danger" onClick={handleLogut}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
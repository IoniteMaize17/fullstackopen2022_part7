import { Button, Form   } from 'react-bootstrap'
import { useState } from 'react'

export const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <Form className="mb-3" onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control type="text" placeholder="Enter author" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url</Form.Label>
          <Form.Control type="text" placeholder="Enter url" value={url} onChange={({ target }) => setUrl(target.value)} />
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}

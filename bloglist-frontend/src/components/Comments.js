import { Row, Col, Form , FloatingLabel , Button } from 'react-bootstrap'

export const Comments = ({ blog, handleCommentAction }) => {
  const handleComment = (event) => {
    event.preventDefault()
    handleCommentAction(event.target[0].value)
    event.target[0].value = ''
  }
  return (
    <div>
      <h2>comments</h2>
      <Form onSubmit={handleComment}>
        <Row>
          <Col md={8}>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Comments"
              className="mb-3"
            >
              <Form.Control as="textarea" placeholder="Leave a comment here" />
            </FloatingLabel>
          </Col>
          <Col md={4}><Button type="submit" variant="outline-primary">Comment</Button></Col>
        </Row>
      </Form>
      <div>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
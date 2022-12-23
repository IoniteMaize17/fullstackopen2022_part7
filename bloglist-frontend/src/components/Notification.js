import { Alert   } from 'react-bootstrap'
import { connect } from 'react-redux'

export const NotificationComponent = ({ notification }) => {

  return notification.messages !== null ? (
    <Alert variant={notification.type === 'e' ? 'danger' : 'success' }>
      {notification.messages}
    </Alert>
  ) : null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export const Notification = connect(mapStateToProps)(NotificationComponent)

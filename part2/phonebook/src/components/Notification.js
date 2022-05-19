const Notification = ({  message }) => {

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === '') {
    return null
  }

  return(
    <div style={ message.indexOf('failed') === -1 ? errorStyle  :  notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
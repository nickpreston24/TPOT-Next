export const UnderConstruction = (message = '') => {
  console.warn(message)
  return (
    <div>
      <p>This view could not be rendered properly. We're sorry for the inconvenience!</p>
      <p>
        Please notify
        <b>
          <href a='harvesthavenapps@gmail.com'> harvesthavenapps@gmail.com</href>
        </b>
      </p>
    </div>
  )
}

export default UnderConstruction

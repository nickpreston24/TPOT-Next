function Error({ statusCode }) {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ response, error }) => {
  const statusCode = response ? response.statusCode : error ? error.statusCode : 404

  return { statusCode }
}

export default Error

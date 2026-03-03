import React from 'react'
import { useRouteError } from 'react-router-dom' 

const ErrorPage = () => {

  const error = useRouteError();  

  return (
    <div>
      <h1>Oops! some error occured</h1>
      {error && <p>{error.data}</p>}
    </div>
  )
}

export default ErrorPage
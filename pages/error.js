import React from 'react'

const Error = () => {

  return (
    <section className={ 'error' }>
      <div className={ 'error__info' }>
        <p className={ 'error__title' }>
          <strong>Error:</strong>
        </p>
        <p className={ 'error__message' }>
          <strong>Message:</strong>
        </p>
      </div>
    </section>
  )
}

export default Error

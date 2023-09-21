import React from 'react'

export function UnsuccesfullValidation ({ fieldName, error}) {
  if (error === false) return null
  const dataTestId = fieldName + "Message"
    return (
      <div className='sectionMessage' data-testid={dataTestId}>
        {error}
      </div>
    )
  
}

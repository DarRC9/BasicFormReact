import React from 'react'

export function UnsuccesfullValidation ({ sectionType, error, errorLocation }) {
  if (error === false) return null
  const dataTestId = sectionType + "Message"
  if (errorLocation === sectionType) {
    return (
      <div className='sectionMessage' data-testid={dataTestId}>
        {error}
      </div>
    )
  }
    
}

export function nameValidation ({ error }) {
  if (error === false) return null

  return (
    <div className='sectionMessage' data-testid="nameMessage">
      {error}
    </div>
  )  
}

export function surnameValidation ({ error }) {
  if (error === false) return null

  return (
    <div className='sectionMessage' data-testid="surnameMessage">
      {error}
    </div>
  )  
}

export function idValidation ({ error }) {
  if (error === false) return null

  return (
    <div className='sectionMessage' data-testid="idMessage">
      {error}
    </div>
  )  
}
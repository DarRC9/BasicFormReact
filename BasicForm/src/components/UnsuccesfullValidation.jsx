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

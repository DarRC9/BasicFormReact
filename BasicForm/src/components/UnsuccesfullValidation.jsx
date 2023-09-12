import React from 'react'

export function UnsuccesfullValidation ({ sectionType, error }) {
  if (error === false) return null
  const dataTestId = sectionType + "Message"
  // let error = false
  //   switch (sectionType) {
  //     case 'username':
  //       if (value.length > 10) {
  //         error = true
  //       }
  //       break;

  //     case 'name':
        
  //       break;

  //     case 'surname':
        
  //       break;

  //     case 'country':
        
  //       break;
    
  //     default:
  //       break;
  //   }

    

    return (
        <div className='sectionMessage' data-testid={dataTestId}>
          {error}
        </div>
    )
}
import React from 'react'

export function UnsuccesfullValidation ({ value, sectionType, error }) {
  if (error === false) return null

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
        <div className='validationMessage' data-testid="warnMessage">
          {error}
        </div>
    )
}
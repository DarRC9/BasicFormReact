import React, { useState } from 'react'

export function ValidationMessage ({ isValidated, confirmationFunction }) {

    if (isValidated === false) return null

    return (
        <div className='submitMessage' data-testid="validationMessage">
            Data succesfully sent
            <button onClick={confirmationFunction}>Understood</button>
        </div>
        
    )
}
    

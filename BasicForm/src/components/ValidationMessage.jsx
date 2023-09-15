import React, { useState } from 'react'

export function ValidationMessage ({ isValidated }) {
if (error === false) return null


    return (
        <div className='submitMessage' data-testid="validationMessage">
            Data succesfully sent
        </div>
    )
}
    

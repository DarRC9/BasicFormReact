import React, { useState } from 'react'
export function FieldForm ({ sectionType, validatingFunction}) {
    //if (error === false) return null

    const [validated, setValidated] = useState(false)
    const dataTestId = sectionType + "Message"
    const handleChange = (input) => {
        const value = input.target.value
        const validationResult = validatingFunction(value)
        setValidated(validationResult)
        const className = `formInput ${validationResult ? '' : 'has-error'}` 
    }
    return (
        <div className='section'>
            <label className='formLabel'>sername</label>
            <input 
                data-testid={dataTestId} 
                
                placeholder="JR0" 
                onChange={handleChange} 
                maxLength={10}
            />
        </div>
    )
    
      
}



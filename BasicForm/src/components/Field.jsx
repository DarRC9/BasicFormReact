import React, { useState } from 'react'

export function FieldForm ({ validatingFunction, sectionType, placeholderInput, inputLength, value, blurFunction }) {
  const [className, setClassName] = useState("formInput")

  const inputDataTestId = sectionType + "Input"
  const labelName = sectionType.charAt(0).toUpperCase() + sectionType.slice(1)

  const handleChange = (input) => {
    const value = input.target.value
    const isValid = validatingFunction(value)

    setClassName(`formInput ${isValid ? '' : 'has-error'}` )
  }

  const handleBlur = (input) => {
    const value = input.target.value
    const isValid = blurFunction(value)
    console.log("blur", isValid)
    setClassName(`formInput ${isValid ? '' : 'has-error'}` )
  }


  if (sectionType !== "country") {
    return (
      <div className='section'>
          <label className='formLabel'>{labelName}</label>
          <input data-testid={inputDataTestId} className={className} placeholder={placeholderInput} onChange={handleChange} maxLength={inputLength} onBlur={handleBlur}/>
      </div>
    )
  } else {
    return (
      <div className='section'>
      <label className='formLabel'>Country</label>
      <select data-testid={inputDataTestId} className="formInput" name='Country' onChange={(input) => validatingFunction(input.target.value)}>
        <option value="SELECT A COUNTRY">SELECT A COUNTRY</option>
        <option value="SPAIN">SPAIN</option>
        <option value="JAPAN">JAPAN</option>
      </select>
      
    </div>
    )
  }
    
}


// import React, { useState } from 'react'
// export function FieldForm ({ sectionType, validatingFunction}) {
//     //if (error === false) return null

//     const [validated, setValidated] = useState(false)
//     const dataTestId = sectionType + "Message"
//     const handleChange = (input) => {
//         const value = input.target.value
//         const validationResult = validatingFunction(value)
//         setValidated(validationResult)
//         const className = `formInput ${validationResult ? '' : 'has-error'}` 
//     }
//     return (
//         <div className='section'>
//             <label className='formLabel'>sername</label>
//             <input 
//                 data-testid={dataTestId} 
                
//                 placeholder="JR0" 
//                 onChange={handleChange} 
//                 maxLength={10}
//             />
//         </div>
//     )
    
      
// }


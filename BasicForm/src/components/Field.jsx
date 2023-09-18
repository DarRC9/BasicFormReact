import React, { useState } from 'react'

export function FieldForm ({ validatingFunction, sectionType, placeholderInput, inputLength, value, blurFunction }) {
  const [className, setClassName] = useState("formInput")
  const [isValid, setIsValid] = useState(true)

  const inputDataTestId = sectionType + "Input"
  const labelName = sectionType.charAt(0).toUpperCase() + sectionType.slice(1)

  const handleChange = (input) => {
    const value = input.target.value
    const validation = validatingFunction(value)
    setIsValid(validation)
    setClassName(`formInput ${validation ? '' : 'has-error'}` )
  }

  const handleBlur = (input) => {
    const value = input.target.value
    if (isValid) {
      let validation = blurFunction(value)
      setClassName(`formInput ${validation ? '' : 'has-error'}` )
    }
  }

  if (sectionType !== "country") {
    return (
      <div className='section'>
          <label className='formLabel'>{labelName}</label>
          <input data-testid={inputDataTestId} className={className} placeholder={placeholderInput} onChange={handleChange} maxLength={inputLength} onBlur={handleBlur} value={value}/>
      </div>
    )
  } else {
    return (
      <div className='section'>
      <label className='formLabel'>Country</label>
      <select data-testid={inputDataTestId} value={value} className="formInput" name='Country' onChange={(input) => validatingFunction(input.target.value)}>
        <option value="SELECT A COUNTRY">SELECT A COUNTRY</option>
        <option value="SPAIN">SPAIN</option>
        <option value="JAPAN">JAPAN</option>
      </select>
      
    </div>
    )
  }
    
}



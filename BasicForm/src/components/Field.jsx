import React, { useEffect, useState } from 'react'
import { UnsuccesfullValidation } from './UnsuccesfullValidation'
import { countryList } from './Constants'

export function FieldForm ({ fieldType, validatingFunction, fieldName, placeholderInput, inputLength, value, getValue ,blurFunction }) {
  const [className, setClassName] = useState("formInput")
  const [error, setError] = useState(null)

  const inputDataTestId = fieldName + "Input"
  const labelName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1)

  const handleChange = (input) => {
    const value = input.target.value
    getValue(value)
    const hasError = validatingFunction(value)
    setError(hasError)
    setClassName(`formInput ${hasError ? 'has-error' : ''}` )
  }

  const handleBlur = (input) => {
    const value = input.target.value
    if (error === null) {
      const hasError = blurFunction(value)
      setError(hasError)
      setClassName(`formInput ${hasError ? 'has-error' : ''}` )
    }
  }
//selectField
  const [options, setOptions] = useState([])

  useEffect(() => {
    const optionElements = countryList.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))
    if (JSON.stringify(options) !== JSON.stringify(optionElements)) {
      setOptions(optionElements);
    }
  }, [countryList])


  if (fieldType === "inputField") {
    return (
      <div>
        <div className='section'>
          <label className='formLabel'>{labelName}</label>
          <input data-testid={inputDataTestId} className={className} placeholder={placeholderInput} onChange={handleChange} maxLength={inputLength} onBlur={handleBlur} value={value}/>
        </div>
        <UnsuccesfullValidation  fieldName={fieldName} error={error} />
      </div>
      
    )
  } else if (fieldType === "selectField") {
    return (
      <div className='section'>
      <label className='formLabel'>Country</label>
      <select data-testid={inputDataTestId} value={value} className="formInput" name='Country' onChange={handleChange}>
        {options}
      </select>
    </div>
    )
  }
    
}



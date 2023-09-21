import React, { useState, useEffect } from 'react';

export const GenerateOptions = () => {
  const [options, setOptions] = useState([])
  const countryList = ['SELECT COUNTRY', 'SPAIN', 'JAPAN']

  useEffect(() => {
    // Generate options from the array
    const optionElements = countryList.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))

    // Update the state with the generated options
    if (JSON.stringify(options) !== JSON.stringify(optionElements)) {
      setOptions(optionElements);
    }
  }, [countryList, options])

  return (
    <select>
      {options}
    </select>
  );
}


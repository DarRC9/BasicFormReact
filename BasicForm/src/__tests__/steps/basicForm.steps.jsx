/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import  App  from '../../App.jsx'

const getSectionInput = (sectionName) => {
  const testId = sectionName + "Input"
    return testId
}

// const getSectionMessage = (sectionName) => {
//   let testId
//     switch (sectionName) {
//       case "username":
//         testId = "usernameMessage"
//         break;
//       case "name":
//         testId = "nameMessage"
//         break;
//       case "surname":
//         testId = "surnameMessage"
//         break;
//       case "id":
//         testId = "idMessage"
//         break;
//       default:
//         testId = "countryMessage"
//         break;
//     }
//     return testId
// }

const selectCountry = (country) => {
  const selectElement = screen.getByRole('combobox', {name: '' })
  fireEvent.change(selectElement, {target: { value: country}})
  //expect(screen.getByRole('option', { name: 'SPAIN'}).selected).toBe(true)
}

const fillSectionInput = (data, sectionType) => {
  const testId = getSectionInput(sectionType)
  const section = screen.getByTestId(testId)
  fireEvent.change(section, {target: {value: data}})
}

const inputFormData = (formData) => {
  const information = {}
  const lines = formData.trim().split('\n')
  lines.forEach(line => {
    const [key, value] = line.split(':')
    information[key.trim()] = value.trim()
  })
  const usernameData = Object.values(information)[0]
  const nameData = Object.values(information)[1]
  const surnameData = Object.values(information)[2]
  const countryData = Object.values(information)[3]
  const idData = Object.values(information)[4]

  fillSectionInput(usernameData, "username")
  fillSectionInput(nameData, "name")
  fillSectionInput(surnameData, "surname")
  fillSectionInput(idData, "id")
  selectCountry(countryData)
}

export const basicFormSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let app
  let fieldUsed

  Given(/^the user opens the basic user data form$/, () => {
    app = render(<App/>)
  })

  Then(/^all inputs should be enabled$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      expect(input).not.toHaveClass('input is-disabled')
    })
  })

  Then(/^submit button should be disabled$/, () => {
    const submitButton = screen.getByTestId("submitButton")
    expect(submitButton.disabled).toBe(true)
  })

  Then(/^all placeholders should be in capital letters$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      let placeholderValue = input.getAtributte("placeholder")
      expect(placeholderValue).toEqual(placeholderValue.toUpperCase())
    })
  })

  Then(/^all inputs should be without error$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      let inputClassName = input.className
      expect(inputClassName).not.toHaveClass("formInput has-error")
    })
  })

  Given(/^the user clicks the "(.*)" field$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.click(field)
  })

  When(/^the user clicks out of the "(.*)" field$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.blur(field)
  })

  Then(/^the "(.*)" field should show an error$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    expect(field).toHaveClass("formInput has-error")
  })

  And(/^the user types "(.*)" inside the "(.*)" field$/, (inputWritten, fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.change(field, {target: {value: inputWritten}})
  })
  
  When(/^the user earases all inputs inside the "(.*)" field$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.change(field, {target: {value: ''}})
  })

  And(/^the user selects "(.*)" option inside the list$/, (selection) => {
    const selectElement = screen.getByRole('combobox', {name: '' })
    fireEvent.change(selectElement, {target: { value: selection}})
  })

  Then(/^the "(.*)" button should be enabled$/, (buttonName) => {
    const button = screen.getByTestId(buttonName + "Button")
    expect(button.disabled).toBe(false)
  });

  And(/^the user presses the "(.*)" button$/, (buttonName) => {
    const button = screen.getByTestId(buttonName + 'Button')
    fireEvent.click(button)
  })

  Then(/^the form should be cleared$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })
}


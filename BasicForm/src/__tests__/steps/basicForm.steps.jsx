/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import  App  from '../../App.jsx'

const getSectionInput = (sectionName) => {
  let testId
    switch (sectionName) {
      case "username":
        testId = "usernameInput"
        break;
      case "name":
        testId = "nameInput"
        break;
      case "surname":
        testId = "surnameInput"
        break;
      case "id":
        testId = "idInput"
        break;
      default:
        testId = "countryInput"
        break;
    }
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
  let sectionUsed

  Given(/^the user opens the app$/, () => {
    app = render(<App/>)
  })

  Then(/^all inputs should be enabled$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      expect(input).not.toHaveClass('input is-disabled')
    })
  })

  Then(/^all buttons should be disabled$/, () => {
    const buttons = app.container.querySelectorAll("formButton")
    buttons.forEach(button => {
      expect(button.disabled).toBe(true)
    })
  })

  Then('all placeholders should be in capital', () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      let placeholderValue = input.getAtributte("placeholder")
      expect(placeholderValue).toEqual(placeholderValue.toUpperCase())
    })
  })

  Then('all inputs should be without error', () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      let inputClassName = input.className
      expect(inputClassName).not.toHaveClass("formInput has-error")
    })
  })

  Given(/^the user selects the ['"](.*)['"] section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    sectionUsed = section
    fireEvent.click(section)
  })

  When(/^the user deselects the ['"](.*)['"] section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    fireEvent.blur(section)
  })

  Then(/^the ['"](.*)['"] section should show an error$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const input = screen.getByTestId(testId)
    expect(input).toHaveClass("formInput has-error")
  })

  When(/^the user types ['"](.*)['"]$/, (inputWritten) => {
    const section = sectionUsed
    fireEvent.change(section, {target: {value: inputWritten}})
  })

  When(/^the user deletes his input$/, () => {
    const section = sectionUsed
    fireEvent.change(section, {target: {value: ''}})
  })

  Given(/the user completes the form with the next data$/, (formData) => {
    inputFormData(formData)
  });

  Then(/the app should warn the user$/, () => {
    const testId = getSectionInput("username")
    const input = screen.getByTestId(testId)
    expect(input).toHaveClass("formInput has-error")
  })

  Then('the submit button should be enabled', () => {
    const button = screen.getByTestId("submitButton")
    expect(button.disabled).toBe(false)
  })

  Then(/^the ['"](.*)['"] section should show a list$/, (sectionName) => {
    const selectElement = screen.getByRole('combobox', {name: '' })
    expect(screen.getByRole('option', { name: 'SPAIN'}).selected).toBe(false)
    expect(screen.getByRole('option', { name: 'JAPAN'}).selected).toBe(false)
  })

  And(/^the user selects ['"](.*)['"]$/, (selection) => {
    const selectElement = screen.getByRole('combobox', {name: '' })
    fireEvent.change(selectElement, {target: { value: selection}})
  })

  When(/^the users presses the ['"](.*)['"] button$/, (buttonType) => {
    const button = screen.getByTestId(buttonType + 'Button')
    fireEvent.click(button)
  })

  Then(/^the app should validate the user$/, () => {
    const validationMessage = screen.getByTestId("validationMessage")
    expect(validationMessage.textContent).not.toBe(null)
  })

}


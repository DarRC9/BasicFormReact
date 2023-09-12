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

const getSectionMessage = (sectionName) => {
  let testId
    switch (sectionName) {
      case "username":
        testId = "usernameMessage"
        break;
      case "name":
        testId = "nameMessage"
        break;
      case "surname":
        testId = "surnameMessage"
        break;
      case "id":
        testId = "idMessage"
        break;
      default:
        testId = "countryMessage"
        break;
    }
    return testId
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
    render(<App/>)
  })

  Then(/^all inputs should be enabled$/, () => {
    render(<App/>)
    const inputs = screen.getAllByTestId("formInput")

    inputs.forEach(input => {
      expect(input).not.toHaveClass('input is-disabled')
    })
  })

  Then(/^all buttons should be enabled$/, () => {
    render(<App/>)
    const buttons = screen.getAllByTestId("formButton")

    buttons.forEach(button => {
      expect(button).not.toHaveClass('input is-disabled')
    })
  })

  Given(/^the user selects the ['"](.*)['"] section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    sectionUsed = section
    fireEvent.click(section)
  })

  When(/^the user selects the "(.*)" section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    sectionUsed = section
    fireEvent.click(section)
  })

  Then(/^the ['"](.*)['"] section should show an error$/, (sectionName) => {
    const testId = getSectionMessage(sectionName)
    const sectionMessage = screen.getByTestId(testId)
    expect(sectionMessage).not.toBe(false)
  })

  When(/^the user types ['"](.*)['"]$/, (inputWritten) => {
    const section = sectionUsed
    fireEvent.change(section, {target: {value: inputWritten}})
  })

  Given(/the user completes the form with the next data$/, (formData) => {
    inputFormData(formData)
  });

  Then(/the app should warn the user$/, () => {
    const testId = getSectionMessage("username")
    const sectionMessage = screen.getByTestId(testId)
    expect(sectionMessage).not.toBe(false)
  });
}


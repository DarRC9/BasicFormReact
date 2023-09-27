/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'
import  App  from '../../App.jsx'

const getSectionInput = (sectionName) => {
  const testId = sectionName + "Input"
    return testId
}

const getSectionMessage = (sectionName) => {
  const testId = sectionName + "Message"
  return testId
}

export const basicFormSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let app

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

  // Then(/^the "(.*)" field should show an error$/, (fieldName) => {
  //   const testId = getSectionInput(fieldName)
  //   const field = screen.getByTestId(testId)
  //   expect(field).toHaveClass("formInput has-error")
  // })

  Then(/^the "(.*)" field should show no error$/, (fieldName) => {
    const testId = getSectionMessage(fieldName)
    const message = screen.getByTestId(testId)
    expect(message.textContent).toBe("")
  });

  Then(/^the "(.*)" field should show the "(.*)" error$/, (fieldName, errorType) => {
    const testId = getSectionMessage(fieldName)
    const message = screen.getByTestId(testId)
    //console.log(message.textContent)
    expect(message.textContent).toEqual(errorType)
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

  Then(/^the form should be "(.*)"$/, (formAction) => {
    
    if (formAction === "cleared") {
      const inputs = app.container.querySelectorAll("formInput")
      inputs.forEach(input => {
        expect(input.value).toBe('')
      })
    } else if (formAction === "validated") {
      const validationMessage = screen.getByTestId("validationMessage")
      expect(validationMessage.textContent).not.toBe(null)
    }
    
  })

  Then(/^the form should be cleared$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })
}


/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../../App.jsx'

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

export const basicFormSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let app

    Given("the user opens the app", () => {
      render(<App/>)
    })

    Then("all inputs should be enabled", () => {
      render(<App/>)
      const inputs = screen.getAllByTestId("formInput")

      inputs.forEach(input => {
        expect(input).not.toHaveClass('pointer-events-none')
      })
    })

    Then("all buttons should be enabled", () => {
      render(<App/>)
      const buttons = screen.getAllByTestId("formButton")

      buttons.forEach(button => {
        expect(button).not.toHaveClass('pointer-events-none')
      })
    })

    // Then("all placeholders should be in capital", () => {
    //   render(<App/>)
    //   const placeholders = screen.getAllByTestId("formInput")
    //   //prop
    //   placeholders.forEach(placeholder => {
    //     const data = placeholder.getElementsByClassName('placeholder')
    //     expect(data).not.toContain('a' )
    //   })
    // })
    Given(/^the user selects the "(.*)" section$/, (sectionName) => {
      render(<App/>)
      const testId = getSectionInput(sectionName)

      const section = screen.getByTestId(testId)
      fireEvent.click(section)
    });

    And(/^the user selects the "(.*)" section$/, (sectionName) => {
      render(<App/>)
      const testId = getSectionInput(sectionName)

      const section = screen.getByTestId(testId)
      fireEvent.click(section)
    });

    Then(/^the "(.*)" section should show an error$/, (sectionName) => {
      render(<App/>)
      const testId = getSectionMessage(sectionName)
      const sectionMessage = screen.getByTestId(testId)
      expect(sectionMessage).not.toBe(false)

    });

}
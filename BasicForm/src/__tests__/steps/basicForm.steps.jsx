/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from '../../App.jsx'


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
      let testId
      switch (sectionName) {
        case "username":
          testId = 
          break;
        case "name":
          
          break;
        case "surname":
          
          break;
        case "id":
          
          break;
        default:
          break;
      }
    });

    And(/^the user selects the "(.*)" section$/, (sectionName) => {

    });

    Then(/^the "(.*)" section should show "(.*)"$/, (sectionName, message) => {

    });

}
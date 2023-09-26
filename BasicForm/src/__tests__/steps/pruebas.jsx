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

  Then('all placeholders should be in capital letters', () => {
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
  Given(/^the user clicks the (.*) text field$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fieldUsed = field
    fireEvent.click(field)
  });


  Given(/^the user selects the ['"](.*)['"] section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    fieldUsed = section
    fireEvent.click(section)
  })

  When(/^the user clicks out of the (.*) section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    fireEvent.blur(section)
  })

  When(/^the user deselects the ['"](.*)['"] section$/, (sectionName) => {
    const testId = getSectionInput(sectionName)
    const section = screen.getByTestId(testId)
    fireEvent.blur(section)
  })

  Then(/^the (.*) section should show an error$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    expect(field).toHaveClass("formInput has-error")
  })

  // Then(/^the ['"](.*)['"] field should show an error$/, (sectionName) => {
  //   const testId = getSectionInput(sectionName)
  //   const input = screen.getByTestId(testId)
  //   expect(input).toHaveClass("formInput has-error")
  // })



  When(/^the user types ['"](.*)['"]$/, (inputWritten) => {
    const section = fieldUsed
    fireEvent.change(section, {target: {value: inputWritten}})
  })

  And(/^the user types (.*) inside the (.*) field$/, (inputWritten, fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.change(field, {target: {value: inputWritten}})
  });

  When(/^the user deletes his input$/, () => {
    const section = fieldUsed
    fireEvent.change(section, {target: {value: ''}})
  })

  When(/^the user earases all inputs inside the (.*) field$/, (fieldName) => {
    const testId = getSectionInput(fieldName)
    const field = screen.getByTestId(testId)
    fireEvent.change(field, {target: {value: ''}})
  });

  

  Given(/the user completes the form with the next data$/, (formData) => {
    inputFormData(formData)
  });

  Then(/^the ['"](.*)['"] button should be enabled$/, (buttonType) => {
    const button = screen.getByTestId(buttonType + "Button")
    expect(button.disabled).toBe(false)
  })

  Then(/^the ['"](.*)['"] section should show a list$/, (sectionName) => {
    const selectElement = screen.getByRole('combobox', {name: '' })
    expect(screen.getByRole('option', { name: 'SPAIN'}).selected).toBe(false)
    expect(screen.getByRole('option', { name: 'JAPAN'}).selected).toBe(false)
  })

  And(/^the user selects "(.*)"$/, (selection) => {
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

  Then(/^the app should be cleared$/, () => {
    const inputs = app.container.querySelectorAll("formInput")
    inputs.forEach(input => {
      expect(input.value).toBe('')
    })
  })
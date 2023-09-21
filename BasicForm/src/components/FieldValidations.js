export const checkUsername = (usernameInput, name, surname) => {
    let error = null
    if (usernameInput !== usernameInput.toUpperCase()) {
      error = "Username must be written in capital letters"
    } else if (usernameInput.length > 10){
      error = "Username can't surpass 10 characters"
    } else if (usernameInput === "") {
      error = "Username can't be empty"
    } else if (usernameInput.includes(name) && name !== '') {
      error = "Username can't contain name"
    } else if (usernameInput.includes(surname) && surname !== ''){
      error = "Username can't contain surname"
    }
    return error
  }
  

export const checkName = (nameInput, username) => {
    let error = null
    if (nameInput !== nameInput.toUpperCase()) {
      error = "Name must be written in capital letters"
    } else if (nameInput === '') {
      error = "Name can't be empty"
    } else if (username.includes(nameInput)) {
      error ="Name must no be in username"
    } 
    return error
  }

export const checkSurname = (surnameInput, username) => {
    let error = null
    if (surnameInput !== surnameInput.toUpperCase()) {
      error = "Surname must be written in capital letters"
    } else if (surnameInput === '') {
      error = "Surame can't be empty"
    } else if (username.includes(surnameInput)) {
      error = "Surame must no be in username"
    } 
    return error
  }

const validateSpanishId = (id) => {
    let error = null
    if (id.length === 9) {
      const letter = id.substring(8,9)
      const numbers = id.substring(0,8)
      if (letter === letter.toUpperCase() && letter >= 'A' && letter <= 'Z' && /^\d+$/.test(numbers)) { ///^\d+$/ checks if the string to test has only numbers [0-9]
      } else {
        error = "ID format error"
      }
    } else {
      error = "ID format error"
    }
    return error
  }


const validateJapaneseId = (id) => {
    let error = null
    if (id.length === 12 && /^\d+$/.test(id)) {
    } else {
      error = "ID format error"
    }
    return error
  }

export const checkId = (idInput, country) => {
    let error = null
    if (country !== '') {
      switch (country) {
        case "SPAIN":
          error = validateSpanishId(idInput)
          break;
        case "JAPAN":
          error = validateJapaneseId(idInput)
          break;
        default:
          break;        
      }
    } else if (idInput === '') {
      error = "Id can't be empty"
    } else if (idInput !== idInput.toUpperCase()) {
      error = "Id must be written in capital letters"
    }
    return error
  }

export const checkCountry = (countryInput) => {
    let error = null
    if (countryInput === "SELECT COUNTRY") {
      error = "Must select a country"
    }
    return error
  }

export const handleEmptyInput = (inputValue) => {
    let hasError = null
    if (inputValue === '') {
      hasError = "Can't leave text input empty"
    } 
    return hasError
  }
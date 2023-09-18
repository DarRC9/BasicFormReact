export const checkUsername = (usernameInput) => {
    let validation = false
    setUsername(usernameInput)
    if (usernameInput !== usernameInput.toUpperCase()) {
      setError("Username must be written in capital letters")
      setErrorLocation('username')
    } else if (usernameInput.length > 10){
      setError("Username can't surpass 10 characters")
    } else if (usernameInput === "") {
      setError("Username can't be empty")
    } else {
      setError(false)
      validation = true
    }
    return validation
  }

export const checkName = (nameInput, username, setName) => {
    let validation = false
    setName(nameInput)

    if (nameInput !== nameInput.toUpperCase()) {
      setError("Name must be written in capital letters")
      setErrorLocation('name')
    } else if (nameInput === '') {
      setError("Name can't be empty")
    } else if (username.includes(nameInput)) {
      setError("Username must not contain name")
    } 
      else {
      setError(false)
      validation = true
    }
    return validation
  }

export const checkSurname = (surnameInput, username) => {
    let validation = false
    setSurname(surnameInput)
    if (surnameInput !== surnameInput.toUpperCase()) {
      setError("Surname must be written in capital letters")
      setErrorLocation('surname')
    } else if (surnameInput === '') {
      setError("Surame can't be empty")
    } else if (username.includes(surnameInput)) {
      setError("Username must not contain surname")
    } 
      else {
      setError(false)
      validation = true
    }
    return validation
  }

export const validateSpanishId = (id) => {
    let validation = false
    if (id.length === 9) {
      const letter = id.substring(8,9)
      const numbers = id.substring(0,8)
      if (letter === letter.toUpperCase() && letter >= 'A' && letter <= 'Z' && /^\d+$/.test(numbers)) { ///^\d+$/ checks if the string to test has only numbers [0-9]
        validation = true
      }
    }
    return validation
  }

export const validateJapaneseId = (id) => {
    let validation = false
    if (id.length === 12 && /^\d+$/.test(id)) {
      validation = true
    }
    return validation
  }

export const checkId = (idInput, country) => {
    setId(idInput)
    let validation
    switch (country) {
      case "SPAIN":
        validation = validateSpanishId(idInput)
        break;
      case "JAPAN":
        validation = validateJapaneseId(idInput)
        break;
      default:
        validation = true
        break;        
    }
    if (validation === false) {
      setError("Invalid ID, check country or ID")
      setErrorLocation('id')
    } else if (validation === true) {
      setError(false)
    }
    return validation
  }

export const getCountry = (countryInput) => {
    let validation = false
    setCountry(countryInput)
    if (countryInput !== "SELECT A COUNTRY") {
      validation = true
    }
    return validation
  }

export const checkForm = (username, name, surname, country, id, error) => {
    let validation = true
    if (username !== '' 
        && name !== ''
        && surname !== ''
        && country !== ''
        && id !== ''
        && error === false) {
          validation = false
        }
    return validation
  }

export const handleEmptyInput = (inputValue) => {
    let isValid = true
    if (inputValue === '') {
      isValid = false
    } 
    return isValid
  }
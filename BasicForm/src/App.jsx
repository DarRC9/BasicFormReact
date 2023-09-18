import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { UnsuccesfullValidation } from './components/UnsuccesfullValidation'
import { FieldForm } from './components/Field'
import { ValidationMessage } from './components/ValidationMessage'
function App() {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [country, setCountry] = useState('')
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  const [errorLocation, setErrorLocation] = useState('')
  const [validForm, setValidForm] = useState(false)

  const checkUsername = (usernameInput) => {
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

  const checkName = (nameInput, username) => {
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

  const checkSurname = (surnameInput, username) => {
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

  const validateSpanishId = (id) => {
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

  const validateJapaneseId = (id) => {
    let validation = false
    if (id.length === 12 && /^\d+$/.test(id)) {
      validation = true
    }
    return validation
  }

  const checkId = (idInput, country) => {
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

  const getCountry = (countryInput) => {
    let validation = false
    setCountry(countryInput)
    if (countryInput !== "SELECT A COUNTRY") {
      validation = true
    }
    return validation
  }

  const checkForm = (username, name, surname, country, id, error) => {
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

  const handleEmptyInput = (inputValue) => {
    let isValid = true
    if (inputValue === '') {
      isValid = false
    } 
    return isValid
  }

  const submitInformation = (click) => {
    click.preventDefault()
    setValidForm(true)
  }

  const clearForm = () => {
    setUsername('')
    setName('')
    setSurname('')
    setCountry("SELECT A COUNTRY")
    setId('')
    setError('')
    setValidForm(false)
  }

  return (
    <div className='page' data-testid="page">
      <h1>Formulario</h1>
      <header className="header" data-testid="header">
        <form className="form" data-testid="form" name='form'>
          <div className='formBody'>
            <FieldForm 
              validatingFunction={checkUsername} 
              sectionType={"username"} 
              placeholderInput={"JAX99"} 
              inputLength={10}
              value={username}
              blurFunction={handleEmptyInput}
            />

            <UnsuccesfullValidation value={username} sectionType={'username'} error={error} errorLocation={errorLocation}/>
            <FieldForm 
              validatingFunction={(value) => checkName(value, username)} 
              sectionType={"name"} 
              placeholderInput={"JAVIER"} 
              inputLength={"none"}
              value={name}
              blurFunction={handleEmptyInput}
            />

            <UnsuccesfullValidation value={username} sectionType={'name'} error={error} errorLocation={errorLocation}/>
            <FieldForm 
              validatingFunction={(value) => checkSurname(value, username)} 
              sectionType={"surname"} 
              placeholderInput={"TORRES"} 
              inputLength={"none"}
              value={surname}
              blurFunction={handleEmptyInput}
            />  
            <UnsuccesfullValidation value={username} sectionType={'surname'} error={error} errorLocation={errorLocation}/>

            <FieldForm  
              validatingFunction={getCountry}
              sectionType={"country"} 
              value={country}
              inputLength={"none"}/>
              
            
            <FieldForm 
              validatingFunction={(value) => checkId(value, country)} 
              sectionType={"id"} 
              placeholderInput={"12345678D"} 
              inputLength={"none"}
              value={id}
              blurFunction={handleEmptyInput}
            />  
            <UnsuccesfullValidation value={username} sectionType={'id'} error={error} errorLocation={errorLocation}/>
          </div>
          <div className='section'>
            <button data-testid="submitButton" disabled={checkForm(username, name, surname, country, id, error)}  className='formButton' onClick={submitInformation} value="Submit" type='submit' >Submit</button>
            <button data-testid="clearButton" onClick={clearForm} className='formButton' value="Clear" type='clear'>Clear</button>
          </div>
          <ValidationMessage isValidated={validForm} confirmationFunction={clearForm}/>
        
          
        </form>
      </header>
    </div>
  )
}

export default App

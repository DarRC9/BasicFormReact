import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { UnsuccesfullValidation } from './components/UnsuccesfullValidation'
import { FieldForm } from './components/Field'
function App() {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [country, setCountry] = useState('')
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  const [errorLocation, setErrorLocation] = useState('')
  const [html, setHtml] = useState(null)

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

  const checkInputValue = (input) => {
    const newUsername = username
    if (newUsername === '') {
      setError("Username can't be empty")
    } 
  }

  const checkName = (nameInput, username) => {
    let validation = false
    setName(nameInput)
    if (nameInput === '') {
      setError(false)
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
    if (surnameInput === '') {
      setError(false)
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
      if (letter === letter.toUpperCase() && /^\d+$/.test(numbers)) { ///^\d+$/ checks if the string to test is has only number [0-9]
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
        validation = null
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

  function renderHtml () {
    return(
        <div className='submitMessage' data-testid="validationMessage">
        Data succesfully sent
    </div>
    )
  }


  return (
    <div className='page' data-testid="page">
      <h1>Formulario</h1>
      <header className="header" data-testid="header">
        <form className="form" data-testid="form">
          <div className='formBody'>
            <FieldForm 
              validatingFunction={checkUsername} 
              sectionType={"username"} 
              placeholderInput={"JAX99"} 
              inputLength={10}
              blurFunction={handleEmptyInput}
            />

            <UnsuccesfullValidation value={username} sectionType={'username'} error={error} errorLocation={errorLocation}/>
            <FieldForm 
              validatingFunction={(value) => checkName(value, username)} 
              sectionType={"name"} 
              placeholderInput={"JAVIER"} 
              inputLength={"none"}
              value={username}
              blurFunction={handleEmptyInput}
            />

            <UnsuccesfullValidation value={username} sectionType={'name'} error={error} errorLocation={errorLocation}/>
            <FieldForm 
              validatingFunction={(value) => checkSurname(value, username)} 
              sectionType={"surname"} 
              placeholderInput={"TORRES"} 
              inputLength={"none"}
              value={username}
              blurFunction={handleEmptyInput}
            />  
            <UnsuccesfullValidation value={username} sectionType={'surname'} error={error} errorLocation={errorLocation}/>

            <FieldForm  
              validatingFunction={getCountry}
              sectionType={"country"} 
              inputLength={"none"}/>
              
            
            <FieldForm 
              validatingFunction={(value) => checkId(value, country)} 
              sectionType={"id"} 
              placeholderInput={"12345678D"} 
              inputLength={"none"}
              value={country}
              blurFunction={handleEmptyInput}
            />  
            <UnsuccesfullValidation value={username} sectionType={'id'} error={error} errorLocation={errorLocation}/>
          </div>
          <div className='section'>
            <button disabled={checkForm(username, name, surname, country, id, error)} onClick={(() => setHtml(renderHtml()))} data-testid="submitButton" className='formButton' value="Submit" type='submit' >Sign Up</button>
            <button disabled={checkForm(username, name, surname, country, id, error)} data-testid="clearButton" className='formButton' value="Clear" type='clear'>Clear</button>
          </div>
          {html}
          
        </form>
      </header>
      <main>

      </main>
    </div>
    
  )
}

export default App



{/* <div className='section'>
<label className='formLabel'>Username</label>
<input data-testid="usernameInput" className="formInput" placeholder="JR09" onChange={checkUsername} maxLength={10}/>
</div> */}
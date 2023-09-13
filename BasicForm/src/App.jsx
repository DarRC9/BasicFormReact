import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { UnsuccesfullValidation } from './components/UnsuccesfullValidation'
import { FieldForm } from './components/Fields'
function App() {

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  const [errorLocation, setErrorLocation] = useState('')

  const checkUsername = (input) => {
    const newUsername = input.target.value

    setUsername(newUsername)

    if (newUsername !== newUsername.toUpperCase()) {
      setError("Username must be written in capital letters")
      setErrorLocation('username')
    } else if (newUsername.length > 10){
      setError("Username can't surpass 10 characters")
    } else if (newUsername === "") {
      setError("Username can't be empty")
    } else {
      setError(false)
    }
    
  }

  const checkPreviousInput = (inputName) => {
    const newUsername = username
    if (newUsername === '') {
      setError("Username can't be empty")
    } 
  }

  const checkName = (input) => {
    const newUsername = username
    const newName = input.target.value
    setName(newName)

    if (newName === '') {
      setError(false)
    } else if (newUsername.includes(newName)) {
      setError("Username must not contain the name")
      console.log(newName)
    } 
      else {
      setError(false)
    }
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

  const checkId = (input) => {
    const id = input.target.value
    const newCountry = country
    // if (newCountry === "SPAIN") {
    //   let validate = validateSpanishId(id)
    //   if (validate === false) {
    //     setError("Invalid ID, check country or ID")
    //   }
    // } else if (newCountry === "JAPAN") {
    //   let validate = validateJapaneseId(id)
    // }
    let validation
    switch (newCountry) {
      case "SPAIN":
        validation = validateSpanishId(id)
        break;
      case "JAPAN":
        validation = validateJapaneseId(id)
        break;
      default:
        validation = null
        break;        
    }
    console.log(validation)
    if (validation === false) {
      setError("Invalid ID, check country or ID")
      setErrorLocation('id')
    } else if (validation === true) {
      setError(false)
    }
  }



  const getCountry = (input) => {
    const country = input.target.value
    setCountry(country)
    // if (id !== ''){
    //   checkId(id)
    // }
  }

  return (
    <div className='page' data-testid="page">
      <h1>Formulario</h1>
      <header className="header" data-testid="header">
        <form className="form" data-testid="form">
          <div className='formBody'>
            <FieldForm sectionType={'username'} validatingFunction={checkUsername}/>

            <div className='section'>
              <label className='formLabel'>Username</label>
              <input data-testid="usernameInput" className="formInput" placeholder="JR09" onChange={checkUsername} maxLength={10}/>
            </div>
            <UnsuccesfullValidation value={username} sectionType={'username'} error={error} errorLocation={errorLocation}/>
            <div className='section firstName'>
              <label className='formLabel'>First Name</label>
              <input data-testid="nameInput" className='formInput' placeholder="JORGE" onChange={checkName} onFocus={checkPreviousInput}/>
            </div>
            <UnsuccesfullValidation value={username} sectionType={'name'} error={error} errorLocation={errorLocation}/>
            <div className='section surname'>
              <label className='formLabel'>Surname</label>
              <input data-testid="surnameInput" className='formInput' placeholder="RAMIREZ" />
            </div>
            <UnsuccesfullValidation value={username} sectionType={'surname'} error={error} errorLocation={errorLocation}/>
            <div className='section country'>
              <label className='formLabel'>Country</label>
              <select data-testid="countryInput" className="formInput" name='Country' onChange={getCountry}>
                <option value="SELECT A COUNTRY">SELECT A COUNTRY</option>
                <option value="SPAIN">SPAIN</option>
                <option value="JAPAN">JAPAN</option>
              </select>
              
            </div>
            <div className='section id'>
              <label className='formLabel'>ID</label>
              <input data-testid="idInput" className='formInput' placeholder="12345678D" onChange={checkId}/>
            </div>
            <UnsuccesfullValidation value={username} sectionType={'id'} error={error} errorLocation={errorLocation}/>
     
          </div>
          <div className='section button'>
            <button data-testid="formButton" className='submitButton' type='submit'>Sign Up</button>
            <button data-testid="formButton" className='clearButton' type='clear'>Clear</button>
          </div>
          
        </form>
      </header>
      <main>

      </main>
    </div>
    
  )
}

export default App

import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { FieldForm } from './components/Field'
import { ValidationMessage } from './components/ValidationMessage'
import { checkUsername, checkName, checkSurname, checkCountry, checkId, handleEmptyInput, checkForm} from './components/FieldValidations'

function App() {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [country, setCountry] = useState('')
  const [id, setId] = useState('')
  const [error, setError] = useState(false)
  const [validForm, setValidForm] = useState(false)

  const submitInformation = (click) => {
    click.preventDefault()
    setValidForm(true)
  }

  const handleClear = (click) => {
    click.preventDefault()
    clearForm()
  }

  const clearForm = () => {
    setUsername('')
    setName('')
    setSurname('')
    setCountry("")
    setId('')
    setError(false)
    setValidForm(false)
  }

  return (
    <div className='page' data-testid="page">
      <h1>Basic User Form</h1>
      <header className="header" data-testid="header">
        <form className="form" data-testid="form" name='form'>
          <div className='formBody'>
            <FieldForm 
              fieldType={"inputField"}
              validatingFunction={(value) => checkUsername(value, name, surname)} 
              fieldName={"username"} 
              placeholderInput={"JAX99"} 
              inputLength={10}
              value={username}
              blurFunction={handleEmptyInput}
              getValue={setUsername}
            />

            <FieldForm 
              fieldType={"inputField"}
              validatingFunction={(value) => checkName(value, username)} 
              fieldName={"name"} 
              placeholderInput={"JAVIER"} 
              inputLength={"none"}
              value={name}
              blurFunction={handleEmptyInput}
              getValue={setName}
            />

            <FieldForm 
              fieldType={"inputField"}
              validatingFunction={(value) => checkSurname(value, username)} 
              fieldName={"surname"} 
              placeholderInput={"TORRES"} 
              inputLength={"none"}
              value={surname}
              blurFunction={handleEmptyInput}
              getValue={setSurname}
            />  

            <FieldForm  
              fieldType={"selectField"}
              validatingFunction={checkCountry}
              fieldName={"country"} 
              value={country}
              inputLength={"none"}
              getValue={setCountry}/>
              
            <FieldForm
              fieldType={"inputField"}
              validatingFunction={(value) => checkId(value, country)} 
              fieldName={"id"} 
              placeholderInput={"12345678D"} 
              inputLength={"none"}
              value={id}
              blurFunction={handleEmptyInput}
              getValue={setId}
            />  

          </div>
          <div className='section'>
            <button data-testid="submitButton" disabled={checkForm(username, name, surname, country, id, error)}  className='formButton' onClick={submitInformation} value="Submit" type='submit' >Submit</button>
            <button data-testid="clearButton" onClick={handleClear} className='formButton' value="Clear" type='clear'>Clear</button>
          </div>
          <ValidationMessage isValidated={validForm} confirmationFunction={clearForm}/>
        </form>
      </header>
    </div>
  )
}
export default App

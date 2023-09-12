import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { UnsuccesfullValidation } from './components/UnsuccesfullValidation'

function App() {

  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)

  const checkUsername = (input) => {
    const newUsername = input.target.value

    setUsername(newUsername)

    if (newUsername.length > 10) {
      setError("Username too large (10 char. max)")
    } else if (newUsername === "") {
      setError("Username can't be empty")
    } else {
      setError(false)
    }
    
  }

  const checkPreviousInput = (inputName) => {
    const newUsername = username
    console.log(newUsername)
    if (newUsername === '') {
      setError("Username can't be empty")
    }
  }


  return (
    <div className='page' data-testid="page">
      <h1>Formulario</h1>
      <header className="header" data-testid="header">
        <form className="form" data-testid="form">
          <div className='formBody'>
            <div className='section'>
              <label className='formLabel'>Username</label>
              <input data-testid="usernameInput" className="formInput" placeholder="JR09" onChange={checkUsername} maxLength={10}/>
            </div>
            <UnsuccesfullValidation value={username} sectionType={'username'} error={error} />
            <div className='section firstName'>
              <label className='formLabel'>First Name</label>
              <input data-testid="nameInput" className='formInput' placeholder="JORGE" onFocus={checkPreviousInput}/>
            </div>
            <UnsuccesfullValidation value={username} sectionType={'name'} error={error} />
            <div className='section surname'>
              <label className='formLabel'>Surname</label>
              <input data-testid="surnameInput" className='formInput' placeholder="RAMIREZ" />
            </div>
            <UnsuccesfullValidation value={username} sectionType={'surname'} error={error} />
            <div className='section country'>
              <label className='w-4/12'>Country</label>
              <select className="w-8/12" name='Country'>
                <option value="ESPAÑA">ESPAÑA</option>
                <option value="JAPON">jAPON</option>
              </select>
              
            </div>
            <div className='section id'>
              <label className='formLabel'>ID</label>
              <input data-testid="formInput" className='formInput' placeholder="12345678D" />
            </div>
            <UnsuccesfullValidation value={username} sectionType={'country'} error={error} />
     
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

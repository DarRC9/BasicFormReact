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
    } else {
      setError(false)
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
              <input data-testid="usernameInput" className="formInput" placeholder="JR09" onChange={checkUsername}/>
              
            </div>
            <UnsuccesfullValidation data-testid="usernameMessage" value={username} sectionType={'username'} error={error} />
            <div className='section firstName'>
              <label className='formLabel'>First Name</label>
              <input data-testid="nameInput" className='formInput' placeholder="JORGE" />
            </div>
            <UnsuccesfullValidation data-testid="nameMessage" value={username} sectionType={'username'} error={error} />
            <div className='section surname'>
              <label className='formLabel'>Surname</label>
              <input data-testid="usernameInput" className='formInput' placeholder="RAMIREZ" />
            </div>
            <UnsuccesfullValidation data-testid="surnameMessage" value={username} sectionType={'username'} error={error} />
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
            <UnsuccesfullValidation data-testid="idMessage" value={username} sectionType={'username'} error={error} />
     
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

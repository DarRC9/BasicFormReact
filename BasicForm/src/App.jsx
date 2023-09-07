import { useState } from 'react'
import './App.css'
import { UnsuccesfullValidation } from './components/UnsuccesfullValidation'

function App() {

  const [username, setUsername] = useState('')

  const checkValidationSection = (sectionValue) => {
    console.log(sectionValue)
  }

  return (
    <div className='page' data-testid="page">
      <h1>Formulario</h1>
      <header className="w-11/12" data-testid="header">
        <form className="border-solid border-white border-4 rounded-lg p-5 w-" data-testid="form">
          <div className='formBody'>
            <div className='flex flex-col items-center content-center text-lg m-1 sm:flex-row sm:text-base sm:m-0.5'>
              <label className='w-4/12'>Username</label>
              <input className="w-8/12 border-dashed border-2 border-white rounded-lg" placeholder="JR09" onChange={(username) => checkValidationSection(username.target.value)}/>
            </div>
            <div className='section firstName'>
              <label className='formLabel'>First Name</label>
              <input className='formInput' placeholder="JORGE" />
            </div>
            <div className='section surname'>
              <label className='formLabel'>Surname</label>
              <input className='formInput' placeholder="RAMIREZ" />
            </div>
            <div className='section country'>
              <label className='w-4/12'>Country</label>
              <select className="w-8/12" name='Country'>
                <option value="ESPAÑA">ESPAÑA</option>
                <option value="JAPON">jAPON</option>
              </select>
              
            </div>
            <div className='section id'>
              <label className='formLabel'>ID</label>
              <input className='formInput' placeholder="12345678D" />
            </div>
     
          </div>
          <div className='section button'>
            <button className='submitButton' type='submit'>Sign Up</button>
            <button className='clearButton' type='clear'>Clear</button>
          </div>
          
        </form>
        <UnsuccesfullValidation error={false}/>
      </header>
      <main>

      </main>
    </div>
    
  )
}

export default App

import { useState } from 'react'
import './App.css'
import { UserCard } from './components/UserCard'
import { removeAccents } from './utils.js'

function App () {
  const [age, setAge] = useState('')
  const [name, setName] = useState('')
  const [userList, setUserList] = useState([])
  const [errorText, setErrorText] = useState('')

  function addUser (name, age) {
    if (name === '') {
      setErrorText('El nombre no puede estar vacio')
      return
    }
    const newUserList = [...userList]
    const nameUpdated = removeAccents(name.toLowerCase())
    const userId = nameUpdated + age

    const isAlreadyAdded = newUserList.some(user => user.id === userId)

    if (isAlreadyAdded) {
      setErrorText('El usuario ya existe')
      return
    }
    newUserList.push({
      id: userId,
      name,
      age
    })
    setUserList(newUserList)
    handleResetForm()
  }

  const handleResetForm = () => {
    setName('') // resetea el input name
    setAge(15) // resetea el input age
    setErrorText('') // elimina el error
  }

  const getErrorClassName = () => {
    return errorText === '' ? 'hidden' : 'show'
  }

  return (
    <section>
      <h1>Nombre y Edad</h1>
      {/*
          En el valor que tendrá definido será el nombre que hemos creado,
          y en el onChange cada vez que cambie usaremos esa función
      */}
      <form>
        <div>
          <label>Nombre:</label>
          <input
            autoComplete='name'
            type='text'
            name='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            autoComplete='age'
            type='text'
            age='age'
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <span className={getErrorClassName()}>{errorText}</span>
      </form>

      <div>
        <p>Hola, {name}. Tienes {age} años.</p>
        <button
          className='addUser'
          onClick={() => addUser(name, age)}
        >
          Crear Usuario
        </button>
      </div>
      <div className='usersList'>
        {
          userList.map((user) =>
            <UserCard key={user.id} user={user} />
          )
        }
      </div>
    </section>
  )
}

export default App

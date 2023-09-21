import { useState } from 'react'
import './App.css'
import { UserCard } from './components/UserCard'
import { removeAccents } from './utils.js'

const initialUsers = []

function App () {
  const [age, setAge] = useState(15)
  const [name, setName] = useState('')
  const [userList, setUserList] = useState(initialUsers)
  const [errorIsVisible, setErrorIsVisible] = useState('hidden')
  const [errorText, setErrorText] = useState('')

  function ageChange (age) { // recibimos la variable
    setAge(age.target.value) // seteamos el nombre que recibimos
  }

  function nameChange (name) { // recibimos la variable
    setName(name.target.value) // seteamos el nombre que recibimos
  }

  function addUser (name, age) {
    if (name === '') {
      setErrorIsVisible('show')
      setErrorText('El nombre no puede estar vacio')
      return
    }
    setErrorIsVisible('hidden')
    const newUserList = [...userList]
    const nameUpdated = removeAccents(name.toLowerCase())
    const userId = nameUpdated + age

    const isAlreadyAdded = newUserList.some(user => user.id === userId)

    if (isAlreadyAdded) {
      setErrorIsVisible('show')
      setErrorText('El usuario ya existe')
      return
    }
    setErrorIsVisible('hidden')
    newUserList.push({
      id: userId,
      name,
      age
    })
    setUserList(newUserList)
    setName('') // vacia el input name
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
            onChange={nameChange}
          />
        </div>

        <div>
          <label>Edad:</label>
          <input
            autoComplete='age'
            type='number'
            name='age'
            value={age}
            onChange={ageChange}
          />
        </div>
        <span className={errorIsVisible}>{errorText}</span>
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

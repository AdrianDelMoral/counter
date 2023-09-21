import { useState } from 'react'
import './App.css'
import { UserCard } from './components/UserCard'
import { removeAccents } from './utils.js'

const initialUsers = []

function App () {
  const [age, setAge] = useState(15)
  const [name, setName] = useState('')
  const [userList, setUserList] = useState(initialUsers)

  function ageChange (age) { // recibimos la variable
    setAge(age.target.value) // seteamos el nombre que recibimos
  }

  function nameChange (name) { // recibimos la variable
    setName(name.target.value) // seteamos el nombre que recibimos
  }

  function addUser (name, age) {
    if (name !== '') { // comprueba si el name está vacio
      const newUserList = [...userList]
      const nameUpdated = removeAccents(name.toLowerCase())
      const userId = nameUpdated + age

      const isAlreadyAdded = newUserList.some(user => user.id === userId)

      if (!isAlreadyAdded) { // si no existe el usuario, dejará crearlo
        newUserList.push({
          id: userId,
          name,
          age
        })
        setUserList(newUserList)
        setName('') // vacia el input name
      }
    }
  }

  return (
    <section>
      <h1>Nombre y Edad</h1>
      {/*
          En el valor que tendrá definido será el nombre que hemos creado,
          y en el onChange cada vez que cambie usaremos esa función
      */}
      <form>
        <label>Nombre:</label>
        <input
          autoComplete='name'
          type='text'
          name='name'
          value={name}
          onChange={nameChange}
        />

        <br />

        <label>Edad:</label>
        <input
          autoComplete='age'
          type='number'
          name='age'
          value={age}
          onChange={ageChange}
        />
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

      {
        userList.map((user) =>
          <UserCard key={user.id} user={user} />
        )
      }
    </section>
  )
}

export default App

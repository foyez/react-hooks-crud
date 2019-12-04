import React, { Fragment, useState } from 'react'

import UsersTable from './tables/UsersTable'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {
  const usersData = [
    { id: 1, name: 'Tania', username: 'tania' },
    { id: 2, name: 'Sohel', username: 'sohel' },
    { id: 3, name: 'Foyez', username: 'foyez' },
  ]
  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
    setEditing(false)
  }

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ ...user })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          { editing ? (
            <Fragment>
              <h2>Edit user</h2>
              <EditUserForm
                editing={ editing }
                setEditing={ setEditing }
                currentUser={ currentUser }
                updateUser={ updateUser }
              />
            </Fragment>
          ) : (
              <Fragment>
                <h2>Add user</h2>
                <AddUserForm addUser={ addUser } />
              </Fragment>
            ) }
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UsersTable
            users={ users }
            editRow={ editRow }
            deleteUser={ deleteUser }
          />
        </div>
      </div>
    </div>
  );
}

export default App;

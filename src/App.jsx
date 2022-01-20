import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Components/Login-page";
import MainApp from "./Components/Main-app";



export default function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  function signIn(user) {
    setCurrentUser(user)

    navigate('/logged-in')
  }

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(response => response.json())
      .then(usersFromServer => setUsers(usersFromServer));
  }, [])

  function logOut() {
    setCurrentUser(null)
  }

  return (
    <div className="App">
      {<Routes>
        <Route index element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login users={users} setUsers={setUsers} signIn={signIn} />} />
        <Route path='/logged-in' element={<MainApp currentUser={currentUser} logOut={logOut} users={users} />} />
        <Route path='/logged-in/:id' element={<MainApp currentUser={currentUser} logOut={logOut} users={users} />} />
      </Routes>}
    </div>
  );
}
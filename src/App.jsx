import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login-page";
import MainApp from "./Components/main-app";



export default function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(response => response.json())
      .then(usersFromServer => setUsers(usersFromServer));
  }, [])

  console.log(users)

  return (
    <div className="App">
      {<Routes>
        <Route index element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<Login users={users} setUsers={setUsers} />} />
        <Route path='/logged-in' element={<MainApp />} />
        <Route path='/logged-in/:id' element={<MainApp />} />
      </Routes>}
    </div>
  );
}
import { useState } from "react"
import { Link, useParams } from "react-router-dom"




function User(props) {
    const user = props.user

    return (<Link to="/logged-in"><li>
        <button className="user-selection">
            <img
                className="avatar"
                width="50"
                height="50"
                src={`https://robohash.org/${user.id}`}
                alt=""
            />
            <h3>{user.firstName + user.lastName}</h3>
        </button>
    </li></Link>)
}


function AddUserModal(props) {


    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    function addNewUser() {
        return fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "firstName": firstName,
                "lastName": lastName,
                'phoneNumber': phoneNumber,
                'avatar': `https://avatars.dicebear.com/api/avataaars/${firstName + lastName}.svg`

            })
        }).then(function (resp) {
            return resp.json()
        })
    }


    return <form className="modal">
        <h4 id="firstName">First Name</h4>
        <textarea onChange={(e) => {
            setFirstName(e.target.value)
        }} value={firstName} id="firstName" />
        <h4 id="lastName">Last Name</h4>
        <textarea onChange={(e) => {
            setLastName(e.target.value)
        }} value={lastName} id="lastName" />
        <h4 id="phoneNumber">Phone Number</h4>
        <textarea onChange={(e) => {
            setPhoneNumber(e.target.value)
        }} value={phoneNumber} id="phoneNumber" />
        <button onClick={() => {
            addNewUser()
        }} type="submit">Create User</button>
    </form>
}


export default function Login(props) {

    const [addUser, setAddUser] = useState(false)

    const users = props.users
    const setUsers = props.setUsers

    const existingUsers = users.map((user) => {
        return <User user={user} />
    })

    return (
        <div className="main-wrapper login">
            <section className="login-section">
                <h2>Choose your user!</h2>
                <ul>
                    {existingUsers}
                    <li>
                        <button onClick={() => {
                            setAddUser(true)
                        }} className="user-selection"><h3>+ Add a new user</h3></button>
                    </li>
                </ul>
            </section>
            {addUser && <AddUserModal />}
        </div>


    )
}
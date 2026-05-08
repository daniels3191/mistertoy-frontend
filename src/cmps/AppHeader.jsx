import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'


export function AppHeader() {
    const navigate = useNavigate()
    const [user, setUser] = useState(userService.getLoggedinUser())
    
    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser(user) {
        setUser(user)
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Toy App</h1>
                {/* {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )} */}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    {/* <NavLink to="/about" >About</NavLink> */}
                    <NavLink to="/toy" >Toys</NavLink>
                    {/* <NavLink to="/dashboard" >Dashboard</NavLink> */}
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}

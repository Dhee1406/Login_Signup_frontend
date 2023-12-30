import React, { useEffect, useState } from 'react'
import './navbar.css';
import { IoIosBody } from 'react-icons/io'
import AuthPopup from '../AuthPopup/Authpopup';

function Navbar() {
    const [isloggedin, setIsloggedin] = useState(false)
    const [showpopup, setshowpopup] = useState(false)

    const checklogin = async () => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/checklogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });

            if (response.ok) {
                setIsloggedin(true);
            } else {
                setIsloggedin(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        checklogin();
    }, [showpopup]);

    return (
        <div className='navbar'>
            <nav className="adminlinks">
            <a href='/'>Home</a>
            <a href='/about'>About</a>
            <a href='/profile'><IoIosBody></IoIosBody></a>
            {
                isloggedin ?
                <button onClick={() => {
                setIsloggedin(false)
                }}>Logout</button>
                :
                <button onClick={() => {
                setshowpopup(true)
                }}>Login</button>
            }
            </nav>
            {
                showpopup && <AuthPopup setshowpopup = {setshowpopup}/>
            }
        </div>
    )
}

export default Navbar

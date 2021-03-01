import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {

    const [show, setShow ] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setShow(true);
            } else setShow(false);
        });
        return () => {
            window.removeEventListener("scroll");   
        };
    }, [])

    return (
        <div className={`nav ${ show && "nav_black" }`} >
            <img className="nav_logo" src="https://img.icons8.com/ios/452/retro-tv.png" alt="Binge App"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Avatar" className="nav_avatar"/>
        </div>
    )
}

export default Nav

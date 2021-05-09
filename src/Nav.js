import React, { useEffect, useState } from "react";
import "./Nav.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      try {
        window.removeEventListener("scroll");
      } catch {
        console.log("scroll event doesn't exist");
      }
    };
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <Link to="/">
        <img
          className="nav_logo"
          src="https://img.icons8.com/ios/452/retro-tv.png"
          alt="Binge App"
        />
      </Link>
      <Link to="/search">
        <img
          src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/search-512.png"
          className="nav_search"
          alt="search-icon"
        />
      </Link>
    </div>
  );
}

export default Nav;

"use client"

// Updated Navbar.js with event listener approach
import "./Navbar.css"
import SearchBox from "./SearchBox"
import Location from "./Location"
import PersonIcon from "@mui/icons-material/Person"
import { Link, useNavigate } from "react-router-dom" // Import useNavigate
import { useState, useEffect } from "react"
import { useSearch } from "./SearchContext" // Import useSearch

export default function Navbar({ city, setCity }) {
  const [user, setUser] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const { searchTerm, setSearchTerm } = useSearch() // Use global search state
  const navigate = useNavigate() // Initialize useNavigate

  // Check if user is logged in when component mounts
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")
      if (userData && userData !== "undefined") {
        setUser(JSON.parse(userData))
      }
    } catch (err) {
      console.error("Invalid user JSON in localStorage:", err)
      localStorage.removeItem("user") // Clean invalid data
    }

    const handleUserLogin = (event) => {
      setUser(event.detail)
    }

    const handleUserLogout = () => {
      setUser(null)
    }

    window.addEventListener("userLogin", handleUserLogin)
    window.addEventListener("userLogout", handleUserLogout)

    return () => {
      window.removeEventListener("userLogin", handleUserLogin)
      window.removeEventListener("userLogout", handleUserLogout)
    }
  }, [])

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setShowProfileMenu(false)

    // Dispatch logout event
    window.dispatchEvent(new CustomEvent("userLogout"))

    window.location.href = "/" // Redirect to home
  }

  // Handle search input change and navigation
  const handleSearchChangeAndNavigate = (value) => {
    setSearchTerm(value)
    // Navigate to search results page if there's a search term
    if (value) {
      navigate(`/search?q=${encodeURIComponent(value)}`)
    } else {
      // Optionally navigate back to home or current page if search term is cleared
      navigate("/")
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo-link">
          <img src="/images/gmr-cafeterias-logo.png" alt="GMR Logo" className="logo" />
        </a>
      </div>

      <div className="navbar-center">
        {/* Pass global search term and handler to SearchBox */}
        <SearchBox value={searchTerm} onSearchChange={handleSearchChangeAndNavigate} />
      </div>

      <div className="navbar-right">
        <Location city={city} setCity={setCity} />

        {user ? (
          // Show user profile if logged in
          <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="profile-icon">
              <PersonIcon />
            </div>
            <span className="user-name">{user.name}</span>
            <div className="dropdown-arrow">▼</div>

            {showProfileMenu && (
              <div className="profile-dropdown" style={{ zIndex: 2000 }}>
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/orders" className="dropdown-item">
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      handleLogout()
                    }
                  }}
                  className="dropdown-item logout-btn"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="nav-link signup">
              Sign Up
            </Link>
            <Link to="/login" className="nav-link login">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

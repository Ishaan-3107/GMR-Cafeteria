import './Navbar.css';
import SearchBox from './SearchBox';
import Location from './Location';
import { Link } from 'react-router-dom';

export default function Navbar({city, setCity}) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <a href="/" className="logo-link">
                    <img src="/gmr-group.png" alt="GMR Logo" className="logo" />
                </a>
            </div>

            <div className="navbar-center">
                <SearchBox />
            </div>

            <div className="navbar-right">
                <Location city={city} setCity={setCity} />
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/login" className="nav-link">Log In</Link>
            </div>

        </div>
    )
}
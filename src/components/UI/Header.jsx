import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="navbar-container">
      {/* Left Div */}
      <div className="logo-section">
        <h1>CustomCart</h1>
      </div>

      {/* Right Div */}
      <div className="nav-section">
        <ul className="nav-links">
          <NavLink to={"/"} className="navLink">
            <li>Home</li>
          </NavLink>
          <NavLink to={"/about"} className="navLink">
            <li>About</li>
          </NavLink>
          <NavLink to={"/inbox"} className="navLink">
            <li>Inbox</li>
          </NavLink>
          <NavLink to={"/profile"} className="navLink">
            <li>Profile</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}

export default Header
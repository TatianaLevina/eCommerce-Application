import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/login">Sign In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
        <li>
          <Link to="/profile">Your Profile</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;

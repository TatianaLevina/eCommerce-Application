import './App.scss';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import About from '@/pages/About/About';
import Users from '@/pages/Users/Users';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/about">Контакты</Link>
            </li>
            <li>
              <Link to="/users">Пользователи</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={
              <Login
                onLogin={(value) => {
                  console.log('Success', value);
                }}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

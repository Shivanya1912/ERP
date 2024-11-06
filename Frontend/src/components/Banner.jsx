import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed for API requests
import NABL from '../../public/NABL.jpg';

function Banner() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null); // Store JWT token

  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  // Click outside detection (as previously implemented)

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    if (username && password && email) {
      try {
        await axios.post('http://localhost:5000/api/register', { username, password, email });
        alert('Registration successful! Please login.');
        setShowRegisterForm(false);
      } catch (error) {
        alert('Registration failed: ' + error.response.data);
      }
    } else {
      alert('Please fill in all fields for registration');
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      setToken(response.data.token);
      setIsLoggedIn(true);
      setShowLoginForm(false);
    } catch (error) {
      alert('Invalid username or password');
    }
  };

  // Render service options if logged in
  const renderServiceOptions = () => (
    <div>
      <h2 className="mt-4">Options:</h2>
      <button className="btn btn-primary">Service Request Entry Form</button>
      <button className="btn btn-secondary">View Certification</button>
    </div>
  );

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row">

        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-32">
          <h1 className="text-3xl font-bold mb-20">
            Ensuring Precision with Every Certification
            Your Trusted Partner for{' '}
            <span className="text-blue-600">Calibration Certificates</span>
          </h1>

          {/* Registration and Login Buttons */}
          {!isLoggedIn && (
            <>
              <button
                onClick={() => setShowRegisterForm(!showRegisterForm)}
                className="bg-green-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-800"
              >
                Create Account
              </button>
              <button
                onClick={() => setShowLoginForm(!showLoginForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800"
              >
                User Login
              </button>
            </>
          )}

          {/* Registration Form */}
          {showRegisterForm && (
            <form
              ref={registerFormRef}
              onSubmit={handleRegister}
              className="mt-4"
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <button type="submit" className="btn btn-success w-full">
                Register
              </button>
            </form>
          )}

          {/* Login Form */}
          {showLoginForm && (
            <form
              ref={loginFormRef}
              onSubmit={handleLogin}
              className="mt-4"
            >
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full mb-2"
              />
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </form>
          )}

          {isLoggedIn && renderServiceOptions()}
        </div>

        <div className="order-1 w-full md:w-1/2">
          <img src={NABL} className="w-100 h-100 mr-2 md:mb-40 mt-10" alt="Calibration" />
        </div>
      </div>
    </>
  );
}

export default Banner;





import React, { useState, useRef, useEffect } from 'react';
import logo from '../../public/logo.jpg';

function Navbar() {
  const [loginType, setLoginType] = useState(''); // To track the selected login type
  const [showLoginForm, setShowLoginForm] = useState(false); // To toggle login form visibility
  const loginFormRef = useRef(null); // Reference for the login form

  const navItems = (
    <>
      <li><a>Home</a></li>
      <li>
        <details>
          <summary>Category</summary>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </details>
      </li>
      <li><a>Events</a></li>
      <li>
        <details>
          <summary>Directory</summary>
          <ul className="p-1">
            <li><a>Callibration Lab</a></li>
          </ul>
        </details>
      </li>
    </>
  );

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginTypeSelect = (type) => {
    setLoginType(type);
  };

  const closeLoginForm = () => {
    setLoginType(''); // Reset login type when closing form
    setShowLoginForm(false);
  };

  // Effect to detect clicks outside the login form
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginFormRef.current && !loginFormRef.current.contains(event.target)) {
        closeLoginForm();
      }
    }
    // Add event listener when login form is open
    if (showLoginForm) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Remove event listener when login form is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLoginForm]);

  return (
    <>
      <div className="max-w-screen-2x1 container mx-auto md:px-20 px-4">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navItems}
              </ul>
            </div>
            <img src={logo} alt="" className="h-10 w-10 mr-1 object-cover" />
            <a className="text-2xl font-bold curser-pointer">Error Detector</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="Search" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
              </label>
            </div>
            
            {/* Login Section */}
            <div className="relative">
              <a
                className="bg-black text-white px-20 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                onClick={handleLoginClick}>
                Login
              </a>
              {showLoginForm && (
                <div ref={loginFormRef} className="absolute bg-white shadow-md rounded-md p-4 mt-4 z-10">
                  {!loginType ? (
                    <div>
                      <h3 className="text-lg font-bold">Select Login Type</h3>
                      <button
                        className="btn btn-outline mt-2 w-full"
                        onClick={() => handleLoginTypeSelect('Admin')}>
                        Admin
                      </button>
                      <button
                        className="btn btn-outline mt-2 w-full"
                        onClick={() => handleLoginTypeSelect('Technician')}>
                        Technician
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-bold">{loginType} Login</h3>
                      <form>
                        <input
                          type="text"
                          placeholder="Username"
                          className="input input-bordered w-full mt-2"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="input input-bordered w-full mt-2"
                        />
                        <button type="submit" className="btn btn-primary mt-2 w-full">
                          Login
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { DarkModeContext } from '../darkModeContext'

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <DarkModeContext.Consumer>
          {({ darkMode, toggleDarkMode }) => (
            <>
              <nav
                className={
                  darkMode
                    ? ' top-0 z-50 bg-slate-900 text-gray-300'
                    : ' top-0 z-50 bg-gray-100'
                }
              >
                <ul className='flex justify-between p-4'>
                  <div className='absolute right-12 flex gap-4'>
                    <li>
                      <Link to='/'>Dashboard</Link>
                    </li>
                    <li>
                      <Link to='/mitglieder'>Mitglieder</Link>
                    </li>
                    <li>
                      <Link to='/verein'>Verein</Link>
                    </li>
                  </div>
                  <button
                    onClick={toggleDarkMode}
                    className='p-1 rounded-md ml-12'
                  >
                    {darkMode ? 'Make Light' : 'Make Dark'}
                  </button>
                </ul>
              </nav>

              <div
                className={darkMode ? 'text-gray-300 bg-slate-900' : 'bg-gray-100'}
              >
                <Outlet />         
              </div>
            </>
          )}
        </DarkModeContext.Consumer>
      </DarkModeContext.Provider>
    </>
  );
};

export default Layout;

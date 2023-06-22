import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { DarkModeContext } from '../darkModeContext'
import HeaderIMG from './HeaderIMG';

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
               
                <ul className='flex justify-between p-4 ml-8'>
                <HeaderIMG />
            
                  <div className='absolute right-12 flex gap-4 mt-3'>
                    <li>
                      <Link to='/mitglieder'>Mitglieder</Link>
                    </li>
                    <li>
                      <Link to='/verein'>Verein</Link>
                    </li>
                  <button
                    onClick={toggleDarkMode}
                    className=''
                  >
                    {darkMode ? 'Make Light' : 'Make Dark'}
                  </button>
                  </div>
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

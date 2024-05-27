  import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { DarkModeContext } from '../darkModeContext'
import HeaderIMG from './HeaderIMG';
import { DarkMode, LightMode, Person }from '@mui/icons-material';

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
                    ? 'top-0 z-50 bg-gray-700 text-gray-300'
                    : 'top-0 z-50 bg-[#f5f5f7]'
                }
              >
               
                <ul className='flex justify-between p-4 ml-8 mr-8'>
                <HeaderIMG />
            
                  <div className='absolute right-12 flex gap-6 mt-3 text-xs leading-6 text-[#00000080]'>
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
                    {darkMode ? <LightMode style={{ color: 'white' }} /> : <DarkMode />}
                  </button>
                  <button
                    // onClick={toggleUserBubble}
                    className=''
                  >
                    <Person className=''/>
                  </button>
                  </div>
                </ul>
              </nav>

              <main
                className={darkMode ? 'text-gray-300 bg-gray-700' : 'bg-gray-100'}
              >
                <Outlet />         
              </main>
            </>
          )}
        </DarkModeContext.Consumer>
      </DarkModeContext.Provider>
    </>
  );
};

export default Layout;

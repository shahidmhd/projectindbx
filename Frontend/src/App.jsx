import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Company from './Pages/Company';
import Service from './Pages/Service';
// import Login from './Login/Login';
import Home from './Pages/Home';
import Notfound from './Pages/Notfound';
import Print from './Pages/Print';
import Invoicetable from './Pages/Invoicetable';
import Detailpage from './Pages/Detailpage';
import Loginpage from './Pages/Loginpage';
import { useSelector } from 'react-redux'
import Report from './Pages/Report';
import Billing from './Pages/Billing';
import Changepassword from './Components/Changepassword/Changepassword';
import { useDispatch } from 'react-redux';
import { setLogout } from './Redux/Authslice';
import jwtDecode from 'jwt-decode';



const App = () => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();
  let inactivityInterval;
  
  useEffect(() => {
    const handleActivity = () => {
      setIsActive(true);
  
      // Clear the inactivity interval when there's activity
      clearInterval(inactivityInterval);
  
      // Restart the inactivity interval
      inactivityInterval = setInterval(() => {
        handleInactivity();
      }, 21 * 60 * 1000); // 30 seconds in milliseconds
    };
  
    const handleInactivity = () => {
      setIsActive(false);
      dispatch(setLogout());
    };
  
    // Add event listeners to track user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
  
    // Start the inactivity interval
    inactivityInterval = setInterval(() => {
      handleInactivity();
    }, 21 * 60 * 1000); // 30 seconds in milliseconds
  
    // Clean up by removing event listeners and clearing the interval
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(inactivityInterval);
    };
  }, [dispatch]);
  
  const token = useSelector((state) => state.Authslice.token);
  // Function to check if a token has expired
const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.exp) {
      return true; // Token does not have an expiration time
    }

    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime; // Compare expiration time
  } catch (error) {
    return true; // Error occurred while decoding the token
  }
};

// Usage
const hasTokenExpired = isTokenExpired(token);

if (hasTokenExpired) {
  console.log('Token has expired.');
  dispatch(setLogout());
}
 else {
  console.log('Token is still valid.');
}

  return (
    <>
      < BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={token ? <Home /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/login'
            element={token ? <Navigate to={'/'} /> : <Loginpage />}
          />
          <Route
            path='/company'
            element={token ? <Company /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/Service'
            element={token ? <Service /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/print/:id'
            element={token ? <Print /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/table'
            element={token ? <Invoicetable /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/detail/:id'
            element={token ? <Detailpage /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/Report'
            element={token ? <Report/> : <Navigate to={'/login'} />}
          />
           <Route
            path='/invoice'
            element={token ? <Billing/> : <Navigate to={'/login'} />}
          />
            <Route
            path='/change-password'
            element={token ?<Changepassword/>:<Navigate to={'/login'} />}
          />
      
          <Route path="*" element={<Notfound />} />
        </Routes>
      </ BrowserRouter>
    </>
  );
}

export default App;
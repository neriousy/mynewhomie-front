import React, { useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Characteristics from './Characteristics/Characteristics';
import Navbar from './Navbar/Navbar';
import MyProfile from './MyProfile/MyProfile';
import Search from './Search/Search';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
import ResetPassword from './ResetPassword/ResetPassword';
import SearchProfile from './SearchProfile/SearchProfile';
import PrivateChat from '../components/Chat/PrivateChat';
import Login2 from './Login2/Login2';
import Footer from './Footer/Footer';
import EmailConfirm from './EmailConfirm/EmailConfirm';
import Characteristicsv2 from '../components/Characteristicsv2/Characteristicsv2';
import Chat from './Chat/Chat';
import MyProfilev2 from '../components/MyProfilev2/MyProfilev2';
import { useChat } from '../hooks/useChat';
import { Button, CircularProgress, IconButton, Snackbar } from '@mui/material';
import { useChatContext } from '../hooks/useChatContext';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmHousing from './ConfirmHousing/ConfirmHousing';

function App() {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowNotification(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        ZAMKNIJ
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const { user, characteristics } = useAuthContext();
  const { messageArrived } = useChatContext();

  const location = useLocation();
  const hideFooter = location.pathname === '/chat';

  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show the notification if messageArrived is true and not in the chat page
    if (messageArrived && location.pathname !== '/chat') {
      setShowNotification(true);

      // After 4 seconds, hide the notification
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [messageArrived, location.pathname]);

  return (
    <>
      <Navbar />
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Otrzymano wiadomość"
        action={action}
      />
      <Routes>
        {user && characteristics == false ? (
          <>
            <Route path="*" element={<Navigate to="/characteristics" />} />
            <Route path="/characteristics" element={<Characteristicsv2 />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />

            <Route
              path="/characteristics"
              element={user ? <Characteristicsv2 /> : <Navigate to="/" />}
            />

            <Route
              path="/search"
              element={user ? <Search /> : <Navigate to="/" />}
            />

            <Route
              path="/myProfile"
              element={user ? <MyProfilev2 /> : <Navigate to="/" />}
            />

            <Route path="/confirmEmail" element={<EmailConfirm />} />
            <Route path="/confirmHousing" element={<ConfirmHousing />} />

            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="/" />}
            ></Route>

            <Route
              path="/search/user/:id"
              element={user ? <SearchProfile /> : <Navigate to="/" />}
            />

            <Route path="/resetPassword" element={<ResetPassword />}></Route>
          </>
        )}
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;

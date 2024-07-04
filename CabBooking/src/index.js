import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Maps from "./search";
import App from './App';

// import PassengerSignUp from './PassengerSignUp';
// import App from './user_profile';
// import NavbarProfile from './ProfileInNavbar';

// import Maps from './search4';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// import SearchPlaces from './searchAndplace';
// import SendRequestButton from './send_ride_request_passenger';
// import DisplayRideRequest from './display-ridereq';
// import DocumentUploadForm from './DocumentUploadForm';
// import SignUpForm from './SignUpForm';
// import DisplayCoordinates from './displaycoordinates';
// import Uber from './uber';
// import Maps from './search4';
// import DriverSignupForm from './driver_signup';

// import DriverSignUp from './sign-up';
// import AdminPanel from './Admin';
import { BrowserRouter as Router } from 'react-router-dom';
// import DocumentUploadForm from './otp_send';
// import BookRide from './BookRide';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DriverSignupForm/> */}
    <App/>
    
    {/* <DriverSignUp/> */}
    {/* <DocumentUploadForm/> */}
    {/* <Router>  */}
      {/* <BookRide/> */}
      {/* <AdminPanel/> */}
      
    {/* </Router>  */}
    {/* <Uber/> */}
    {/* <Maps />  */}
    {/* <DriverSignUp/> */}
    {/* <SearchPlaces/> */}
    {/* <DisplayCoordinates/> */}
    {/* <SendRequestButton/> */}
    {/* <DisplayRideRequest/> */}
    {/* <NavbarProfile/> */}
    
    {/* <Router>
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/document-upload" element={<DocumentUploadForm />} />
      </Routes>
    {/* <PassengerSignUp /> */}
  {/* </Router> */} 
  {/* document.getElementById('root') */}
    

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

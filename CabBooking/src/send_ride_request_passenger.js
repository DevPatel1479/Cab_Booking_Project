import React from 'react';
import axios from 'axios';

const SendRequestButton = () => {
  const onSendRequest = async()=>{
     const response = await axios.post("http://192.168.0.128:9800/api/send-ride-request", {request : true})
     console.log(response);
  }  
  return (
    <button onClick={onSendRequest} className="send-request-button">
      Send Request
    </button>
  );
};

export default SendRequestButton;

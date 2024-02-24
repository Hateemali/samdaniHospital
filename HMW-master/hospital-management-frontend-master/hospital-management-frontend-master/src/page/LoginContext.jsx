import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();
export default function LoginContext(props) {
const [isAuthenticated, isUserAuthenticated] = useState(true);
const navigate = useNavigate();
  const handleSubmit = (values) => {
    if (values.username === "" && values.password === "") {
      console.log(values.username);
      isUserAuthenticated(true);
      navigate("/");
    } 
  };
  
    return (
    <div><UserContext.Provider value={{
        isAuthenticated,
        handleSubmit,
    }}>
      {props.children}
    </UserContext.Provider></div>
  )
}

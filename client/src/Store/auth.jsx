import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));

  const [oneTodo,setOneTodo] = useState({});

  const [user,setUser] = useState("");

  const [loader,setLoader]= useState(true); 

  const GlobalAuthToken = `Bearer ${token}`

  const setTokenInLocalStorage = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setTokenInLocalStorage("");
    localStorage.removeItem("token");
  };

  const userAuthorization = async() => {
    try {
        setLoader(true);

        const response = await fetch("http://localhost:5000/api/v1/users"
            , {
            method: "GET",
            headers:{
                Authorization: GlobalAuthToken
            },
        })
        
        if(response.ok)
        {
          const data = await response.json(); 
          setUser(data);
          setLoader(false)
        }
        else{
            setLoader(false)
        }
    } catch (error) {
        console.log("error while fetching userd data",error)
    }
  }

  useEffect(()=>{
    userAuthorization()
  },[user,userAuthorization])

  return (
    <AuthContext.Provider
      value={{
        setTokenInLocalStorage,
        isLoggedIn,
        LogoutUser,
        user,
        GlobalAuthToken,
        loader,
        oneTodo,
        setOneTodo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//custom hook to use data provide by our provider it is know as consumer
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within the AuthProvider");
  }
  return authContextValue;
};

import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = async (user, password) => {
    try { 

      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({          
          email: `${user}`,
          password: `${password}`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();

      localStorage.setItem('token', data.token);
      setUser({
        id : data.user.id
      })
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      return false;
    }
    
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setUser({});
      setIsLoggedIn(false);
      navigate("/home");
    } catch (error) {
      
    }
    
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
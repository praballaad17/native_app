import { useContext, createContext, useState } from "react";
import { USERS } from "../constants/index";
export const UserContext = createContext();

export function useUserType() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(USERS.DOCTOR);
  // Function to toggle between 'patient', 'doctor' and 'executive'
  const changeUserType = (type) => {
    setUser(type);
  };

  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default useUserType;

import { useContext, createContext, useState, useEffect } from "react";
import { USERS } from "../constants/index";
export const UserContext = createContext();

export function useUserType() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  // const [user, setUser] = useState(USERS.EXECUTIVE);
  const [user, setUser] = useState();
  const [userType, setUserType] = useState();

  useEffect(() => {
    if (user && user.type) {
      if (user.type === USERS.DOCTOR) setUserType(USERS.DOCTOR);
      else if (user.type === USERS.EXECUTIVE) setUserType(USERS.EXECUTIVE);
      else if (user.type === USERS.PATIENT) setUserType(USERS.PATIENT);
    }
  }, [user, user?.type]);

  console.log(user, userType);

  const value = {
    user,
    setUser,
    userType,
    setUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default useUserType;

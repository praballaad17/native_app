import { useContext, createContext, useState, useEffect } from "react";
import { PROFILETYPE, USERS } from "../constants/index";
import { getUser } from "../services/comonService";
import useAuthListener from "../hooks/useAuthListener";
export const UserContext = createContext();

export function useUserType() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }) => {
  const { userId } = useAuthListener();
  const [user, setUser] = useState();
  const [userType, setUserType] = useState();
  // const [userType, setUserType] = useState(USERS.EXECUTIVE);

  useEffect(() => {
    console.log("fetching user", userId);
    if (userId) {
      const fetchUser = async () => {
        console.log("fetching user");
        const res = await getUser(userId, "adfdf");
        console.log("fetching user", res);
        if (res.user.userType === USERS.DOCTOR) setUserType(USERS.DOCTOR);
        else if (res.user.userType === USERS.EXECUTIVE)
          setUserType(USERS.EXECUTIVE);
        else if (res.user.userType === USERS.PATIENT)
          setUserType(USERS.PATIENT);
      };
      fetchUser();
    }
  }, [userId]);

  useEffect(() => {
    if (user && user.userType) {
      if (user.userType === USERS.DOCTOR) setUserType(USERS.DOCTOR);
      else if (user.userType === USERS.EXECUTIVE) setUserType(USERS.EXECUTIVE);
      else if (user.userType === USERS.PATIENT) setUserType(USERS.PATIENT);
    }
  }, [user, user?.userType]);

  // useEffect(() => {
  //   const getter = async (userType) => {
  //     console.log("getter: ", userType);
  //     const res = await getUser(user._id, userType);
  //     console.log(res);
  //     setUser(res);
  //   };
  //   console.log("user changed to: ", userType);
  //   if (userType === USERS.EXECUTIVE) {
  //     getter(PROFILETYPE.EXECUTIVE);
  //   } else if (userType === USERS.PATIENT) {
  //     getter(PROFILETYPE.PATIENT);
  //   } else if (userType === USERS.DOCTOR) {
  //     getter(PROFILETYPE.DOCTOR);
  //   }
  // }, [userType]);

  // console.log(user, userType);

  const value = {
    user,
    setUser,
    userType,
    setUserType,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default useUserType;

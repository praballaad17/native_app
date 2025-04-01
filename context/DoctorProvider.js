import React, { createContext, useContext, useEffect, useState } from "react";
import useUserType from "./UserProvider";

export const DoctorContext = createContext();

function useDoctor() {
  return useContext(DoctorContext);
}

export const DoctorProvider = ({ children }) => {
  const { user } = useUserType();
  const [doctorId, setDoctorId] = useState();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (user && user.doctorId) {
      setDoctorId(user.doctorId._id);
      setProfile(user.doctorId);
    }
  }, [user && user.doctorId]);

  console.log("DoctorId: ", profile);

  return (
    <DoctorContext.Provider
      value={{
        doctorId,
        profile,
        setProfile,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
export default useDoctor;

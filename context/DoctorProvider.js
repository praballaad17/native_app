import React, { createContext, useContext, useEffect, useState } from "react";
import useUserType from "./UserProvider";

export const DoctorContext = createContext();

function useDoctor() {
  return useContext(DoctorContext);
}

export const DoctorProvider = ({ children }) => {
    const { user } = useUserType();
    const [doctorId, setDoctorId] = useState();

    useEffect(() => {
        if (user && user.doctorId) {
            setDoctorId(user.doctorId._id);
        }
    }, [user && user.doctorId]);

    console.log("DoctorId: ", doctorId);

 return (
    <DoctorContext.Provider
      value={{
        doctorId,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
export default useDoctor;
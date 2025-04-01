import React, { createContext, useContext, useEffect, useState } from "react";
import useUserType from "./UserProvider";

export const PatientContext = createContext();

function usePatient() {
  return useContext(PatientContext);
}

export const PatientProvider = ({ children }) => {
  const { user } = useUserType();
  const [patientId, setPatientId] = useState();
  const [profile, setProfile] = useState({}); // patient profile

  useEffect(() => {
    if (user && user.patientId) {
      setPatientId(user.patientId._id);
      setProfile(user.patientId);
    }
  }, [user && user.patientId]);

  return (
    <PatientContext.Provider
      value={{
        patientId,
        profile,
        setProfile,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
export default usePatient;

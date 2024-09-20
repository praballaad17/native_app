import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { USERS } from "../constants";

export default function Index() {
  const [user, setUser] = useState(null);

  // const handlePress = (buttonName) => {
  //   Alert.alert(`You pressed ${buttonName}`);
  // };
  useEffect(() => {
    // setUser(USERS.PATIENT);
    // setUser(USERS.DOCTOR);
    // setUser(USERS.EXECUTIVE);
  }, []);

  if (!user) {
    return <Redirect href="/role" />;
  }

  console.log(user);

  if (user === USERS.PATIENT) {
    return <Redirect href="/patient-home" />;
  } else if (user === USERS.DOCTOR) {
    return <Redirect href="/doctor-home" />;
  } else if (user === USERS.EXECUTIVE) {
    return <Redirect href="/executive-home" />;
  }
  return <Redirect href="/role" />;
}

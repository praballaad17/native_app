// import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from "jwt-decode";
import { getToken } from "../services/AuthenticationServices";
import { useState } from "react";

export default function useAuthListener() {
  const [userId, setUserId] = useState();
  const [jwt, setJwt] = useState();
  // let userId, jwt;

  const getter = async () => {
    resjwt = await getToken();
    setJwt(resjwt);
    res = jwtDecode(jwt);
    if (res && res.id) {
      console.log("userId: ", res);
      // res = res.id;
      setUserId(res.id);
    }
  };

  try {
    console.log("useAuthListener");
    getter();
  } catch (error) {
    userId = null;
    console.log("useAuthListener: unable to fetch jwt token");
  }

  return { userId, jwt };
}

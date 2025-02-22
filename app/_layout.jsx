import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect, useState } from "react";
import { UserProvider } from "../context/UserProvider";
import { StatusBar } from "expo-status-bar";
import { FileProvider } from "../context/FileProvider";
import useAuthListener from "../hooks/useAuthListener";
import { getToken } from "../services/AuthenticationServices";
import { LoaderProvider } from "../hooks/useLoader";
import { ExecutiveProvider }  from "../context/ExecutiveProvider.js";
import { PatientProvider } from "../context/PatientProvider.js";
import { DoctorProvider } from "../context/DoctorProvider.js";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  // const [userId, setUserId] = useState();
  // const { userId } = useAuthListener();

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  // useEffect(() => {
  //   const getter = async () => {
  //     jwt = await getToken();
  //     userId = jwtDecode(jwt);
  //     if (userId && userId.id) {
  //       console.log("userId: ", userId);
  //       setUserId(userId.id);
  //     }
  //   };

  //   getter();
  // }, []);

  // console.log("index userId: ", userId);

  return (
    <UserProvider>
      <FileProvider>
      <ExecutiveProvider>
        <PatientProvider>
          <DoctorProvider>
        <LoaderProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(executive)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(doctor)"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="(patient)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(common)"
              options={{
                headerShown: false,
              }}
            />
            {/* <Stack.Screen name="/search/[query]" options={{
        headerShown: false,
      }} /> */}
            <StatusBar backgroundColor="#161622" style="light" />
          </Stack>
        </LoaderProvider>
        </DoctorProvider>
        </PatientProvider>
        </ExecutiveProvider>
      </FileProvider>
    </UserProvider>
  );
}

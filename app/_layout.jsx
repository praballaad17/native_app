import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { UserProvider } from "../context/UserProvider";
import { StatusBar } from "expo-status-bar";
import { FileProvider } from "../context/FileProvider";

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();

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

  return (
    <UserProvider>
      <FileProvider>
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
      </FileProvider>
    </UserProvider>
  );
}

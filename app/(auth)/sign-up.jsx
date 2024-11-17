import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import useFile from "../../context/FileProvider";
import { generateOTP, verifyOtp } from "../../services/AuthenticationServices";
import Loader from "../../components/Loader";
import useUserType from "../../context/UserProvider";

const SignUp = () => {
  const [number, setNumber] = useState();
  const [otp, setOtp] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpId, setOtpId] = useState();
  const { writeData } = useFile();

  const sendOTP = async () => {
    setIsSubmitting(true);
    try {
      const res = await generateOTP(number);
      console.log(res);
      setVisible(true);
      setOtpId(res.otpId);
      await writeData("number", number);
      setIsSubmitting(false);
      // Alert.alert("Form Submitted", "Your details have been submitted!");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setVisible(false);
      Alert.alert("Error", "Unable To generate OTP");
    }
  };

  const submit = async () => {
    console.log("Submit");
    try {
      const res = await verifyOtp({ otp, otpId });
      console.log(res);
      if (res.status === 202) {
        console.log(res.data);
        setNumber("");
        setOtp("");
        setVisible(false);
        router.push("/role");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("In-Correct OTP", "Your entered In-correct OTP!");
      setVisible(true);
      setOtp("");
    }
  };

  if (isSubmitting) {
    return <Loader />;
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Image
              source={images.logo}
              resizeMode="contain"
              className="w-[115px] h-[35px]"
            />
            <Text className="text-2xl text-semibold mt-10 font-psemibold">
              Sign Up
            </Text>
            <FormField
              title="Number"
              value={number}
              placeholder={"number"}
              handleChangeText={(e) => setNumber(e)}
              otherStyle="mt-7"
              numeric={true}
            />

            {visible ? (
              <FormField
                title="OTP"
                value={otp}
                placeholder={"enter OTP"}
                handleChangeText={(e) => setOtp(e)}
                otherStyle="mt-7"
                numeric={true}
              />
            ) : (
              <></>
            )}

            <CustomButton
              title={visible ? "Verify" : "Send OTP"}
              handlePress={visible ? submit : sendOTP}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className=" justify-center pt-5 flex-row gap-2">
              <Text className="text-lg font-pregular">Already User!</Text>
              <Link
                className="text-secondary font-psemibold text-lg"
                href="/sign-in"
              >
                {" "}
                Log In
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignUp;

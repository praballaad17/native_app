import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Modal } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import CustomDropdownSelect from "../../components/CustomDropDownSelect";
import { BLOODGROUPOPTIONS, GENDEROPTIONS } from "../../constants";
import FormField from "../../components/FormField";
import { addPatientByExecutive } from "../../services/executiveServices";
import useUserType from "../../context/UserProvider";
import CustomForm from "../../components/CustomForm";

const PatientProfileForm = () => {
  const [form, setForm] = useState({
    name: "",
    height: "",
    weight: "",
    bloodGrp: "",
    gender: "",
    dob: "",
    photo: "",
    contact: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const [isvisible, setIsVisible] = useState(false);
  const [otp, setOtp] = useState(0);
  const [error, setError] = useState("");
  const { userId } = useUserType();

  const fields = [
    {
      label: "Patient Name",
      key: "name",
      placeholder: "Enter Patient Name",
      type: "text",
    },
    {
      label: "Contact",
      key: "contact",
      placeholder: "Enter Patient contact",
      type: "number",
    },
    {
      label: "Weight",
      key: "weight",
      placeholder: "Enter Patient weight",
      type: "number",
    },
    {
      label: "Height",
      key: "height",
      placeholder: "Enter Patient height",
      type: "number",
    },
    {
      label: "Date of Birth",
      key: "dob",
      placeholder: "Select the date of Birth",
      type: "date",
    },
    {
      label: "Gender",
      key: "gender",
      placeholder: "Select the gender",
      type: "dropdown",
      options: GENDEROPTIONS,
    },
    {
      label: "Blood Group",
      key: "bloodGrp",
      placeholder: "Select the Blood Group",
      type: "dropdown",
      options: BLOODGROUPOPTIONS,
    },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const sendOTP = () => {
    console.log("send otp is send");
    setIsVisible(true);
    //send otp and also check if user with the given number is registered or not.
  };

  const verifyAndSend = async () => {
    if (otp === "1234" || otp === 1234) {
      setIsVisible(false);
      try {
        const res = await addPatientByExecutive(form, userId);
        console.log(res);
      } catch (error) {
        console.log("error creating patient profile: ", error);
      }

      setOtp(0);
      setError("");
    } else {
      setError("OTP is not correct, re-enter");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full min-h-[85vh] px-4 ">
            <Text className="text-2xl mb-3 font-bold">
              Patient Profile Form
            </Text>

            <CustomForm fields={fields} onSubmit={sendOTP} />
            <Modal
              className="bg-gray-100"
              animationType="slide"
              transparent={true}
              visible={isvisible}
              onRequestClose={() => {
                setIsVisible(false);
              }}
            >
              <View
                // className="bg-white"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  className="bg-gray-200"
                  style={{
                    padding: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text>
                    Enter the OTP, recieved on Patient's registered mobile
                    number.
                  </Text>
                  <TextInput
                    className="border border-slate-300 my-2 px-3"
                    keyboardType="numeric"
                    maxLength={6}
                    autoCorrect={false}
                    autoFocus={true}
                    value={otp}
                    onChangeText={setOtp}
                    onSubmitEditing={verifyAndSend}
                    placeholder="Enter OTP"
                  />
                  {error.length !== 0 && (
                    <Text className="text-red-600 ">{error}</Text>
                  )}
                  <View className="flex-row justify-around">
                    <Button
                      className=" bg-secondary-100"
                      title="Verify"
                      onPress={verifyAndSend}
                    />
                    <Button
                      className="px-4 mx-2"
                      title="close"
                      onPress={() => setIsVisible(false)}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default PatientProfileForm;

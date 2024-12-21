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
        <View className="w-full min-h-[85vh] px-4 my-6">
          <Text className="text-2xl my-3 font-bold">Patient Profile Form</Text>

          <CustomForm fields={fields} onSubmit={sendOTP} />

          {/* <View className="w-full px-4 py-7 rounded-lg justify-center bg-white">
              <FormField
                title="Name"
                value={form.name}
                placeholder={"Name"}
                handleChangeText={(e) => setForm({ ...form, name: e })}
                otherStyle="mt-7"
              />

              <FormField
                title="Age"
                value={form.age}
                placeholder={"Age"}
                handleChangeText={(e) => setForm({ ...form, age: e })}
                otherStyle="mt-7"
              />

              <FormField
                title="Contact"
                value={form.contact}
                placeholder={"Contact"}
                handleChangeText={(e) => setForm({ ...form, contact: e })}
                otherStyle="mt-7"
              />

              <Text className="font-pmedium text-lg mt-2">Gender</Text>
              <CustomDropdownSelect
                options={GENDEROPTIONS}
                placeholder="select gender"
                onSelect={(e) => setForm({ ...form, gender: e })}
                selectedValue={form.gender}
                dropdownStyle="border-2 border-black-500"
              />

              <FormField
                title="Height"
                value={form.height}
                placeholder={"height"}
                handleChangeText={(e) => setForm({ ...form, height: e })}
                otherStyle="mt-7"
              />

              <FormField
                title="Blood Group"
                value={form.bloodGrp}
                placeholder={"blood group"}
                handleChangeText={(e) => setForm({ ...form, bloodGrp: e })}
                otherStyle="mt-7"
              />

              <FormField
                title="Date of Birth"
                value={form.dob}
                placeholder={"Date of Birth"}
                handleChangeText={(e) => setForm({ ...form, dob: e })}
                otherStyle="mt-7"
              />

              <FormField
                title="Weight"
                value={form.weight}
                placeholder={"Weight"}
                handleChangeText={(e) => setForm({ ...form, weight: e })}
                otherStyle="mt-7"
              />

              <CustomButton
                title="Submit"
                containerStyles="mt-4 border-slate-300  min-h-[42px]"
                textStyles=" text-sm"
                handlePress={sendOTP}
              />

              
            </View> */}
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
                  Enter the OTP, recieved on Patient's registered mobile number.
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

import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ConsultDoctorList } from "../../services/patientServices";

const Consult = () => {
  const [doctorList, setDoctorList] = useState(null);
  const areas = [
    "Cardiologist (Heart)",
    "Neurologist (Nervous System, Brain, Spinal Cord)",
    "Oncologist (Cancerous Tissues and Organs)",
    "Orthopedic Surgeon (Bones, Joints, Muscles)",
    "Gastroenterologist (Digestive System: Stomach, Intestines, Liver)",
    "Dermatologist (Skin, Hair, Nails)",
    "Endocrinologist (Hormonal System: Thyroid, Pancreas)",
    "Pulmonologist (Lungs, Respiratory System)",
    "Nephrologist (Kidneys)",
    "Rheumatologist (Joints, Immune System)",
    "Hematologist (Blood)",
    "Ophthalmologist (Eyes)",
    "Urologist (Urinary Tract, Male Reproductive Organs)",
    "Infectious Disease Specialist (Infectious Agents: Bacteria, Viruses, Fungi)",
    "Pediatrician (Infants, Children, Adolescents)",
  ];
  const handlePress = (doctorID) => {
    router.push({
      pathname: "/appointment",
      params: {
        doctorID: 123,
      },
    });
  };

  const getDoctorListBySpeciality = async (speciality) => {
    console.log(speciality);
    try {
      const res = await ConsultDoctorList(speciality);
      setDoctorList(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <View className="flex flex-row flex-wrap">
              <Text className="text-lg font-pbold">
                Select The Specilist You want to see
              </Text>
              {areas.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => getDoctorListBySpeciality(item)}
                  className="border border-gray-400 rounded-xl p-1 m-1"
                >
                  <Text className="text-primary">{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex ">
              <TouchableOpacity
                className="w-full flex flex-row border border-gray-400 rounded-xl p-2 m-1"
                onPress={() => handlePress("someParamValue")}
              >
                <View
                  resizeMode="contain"
                  className="w-1/2 h-28 border border-black "
                />
                <View className="w-1/2 ml-3 justify-center">
                  <Text>Name</Text>
                  <Text>Education</Text>
                  <Text>Ratting</Text>
                  <Text>Total Experiece</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Consult;

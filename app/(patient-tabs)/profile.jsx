import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import CustomButton from "../../components/CustomButton";

export default function profile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const primaryTabs = [
    {
      name: "My consultations",
      icon: <FontAwesome name="stethoscope" size={24} color="black" />,
    },
    {
      name: "My Lab Tests",
      icon: <Fontisto name="test-tube" size={24} color="black" />,
    },
    {
      name: "Membership Plan",
      icon: <Fontisto name="test-tube" size={24} color="black" />,
    },
    {
      name: "Manage payments methods",
      icon: <FontAwesome5 name="credit-card" size={24} color="black" />,
    },
    {
      name: "Pill Reminder",
      icon: <FontAwesome5 name="pills" size={24} color="black" />,
    },
    {
      name: "Refer and earn",
      icon: <FontAwesome name="share" size={24} color="black" />,
    },
  ];
  const secondaryTabs = ["Need help?", "Settings", "About us"];

  const patient = {
    name: "John Doe",
    age: 35,
    gender: "Male",
    contact: "+1 234 567 8901",
    address: "123, Baker Street, London",
    profileImage: "https://via.placeholder.com/100", // Replace with actual image or from your assets
  };

  const submit = () => {
    //
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="mt-2" style={styles.container}>
            {/* Left - Patient Image */}
            <TouchableOpacity onPress={() => router.push("/image-picker")}>
              <Image
                source={{ uri: patient.profileImage }}
                style={styles.profileImage}
              />
            </TouchableOpacity>

            {/* Right - Profile Information */}
            <View style={styles.infoContainer}>
              <Text style={styles.nameText}>{patient.name}</Text>
              <Text style={styles.detailText}>Age: {patient.age}</Text>
              <Text style={styles.detailText}>Gender: {patient.gender}</Text>
              <Text style={styles.detailText}>Contact: {patient.contact}</Text>
              <Text style={styles.detailText}>Address: {patient.address}</Text>

              {/* Edit Profile Button */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push("")}
              >
                <FontAwesome name="edit" size={20} color="blue" />
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full justify-center h-100 px-4 my-1 bg-gray-50">
            {primaryTabs.map((item, index) => (
              <TouchableOpacity
                onPress={() => router.push("/patient-consultations")}
                className="w-full flex flex-row justify-between my-3"
                key={index}
              >
                <View className="flex flex-row">
                  {item.icon}
                  <Text className="font-psemibold mx-2">{item.name}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
          </View>

          <View className="w-full justify-center h-100 px-4 my-1 bg-gray-50">
            {secondaryTabs.map((item, idx) => (
              <TouchableOpacity
                onPress={() => router.push("/patient-consultations")}
                className="w-full flex flex-row justify-between my-3"
                key={idx}
              >
                <View className="flex flex-row">
                  <FontAwesome name="stethoscope" size={24} color="black" />
                  <Text className="font-psemibold mx-2">{item}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
            <CustomButton
              title={"Sign out"}
              handlePress={submit}
              containerStyles="mt-4 bg-white border border-slate-300  min-h-[42px]"
              textStyles="text-orange-600 text-sm"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 3,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  editText: {
    fontSize: 16,
    color: "blue",
    marginLeft: 5,
  },
});

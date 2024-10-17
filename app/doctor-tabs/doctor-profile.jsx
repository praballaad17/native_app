import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import CustomButton from "../../components/CustomButton";
import BottomSheetModal from "../../components/BottomModal";
import { DOCTORFIELDS, images, secondaryTabs, USERS } from "../../constants";
import UserToggleSwitch from "../../components/UserToggleSwich";

export default function DoctorProfile() {
  const params = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "John Doe",
    age: 35,
    gender: "Male",
    contact: "+1 234 567 8901",
    address: "123, Baker Street, London",
    profileImage: "",
  });

  const overlayOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of 0
  const bottomSheetTranslateY = useRef(new Animated.Value(300)).current; // Initial translateY position offscreen

  const primaryTabs = [
    {
      name: "My apointments",
      icon: <FontAwesome name="stethoscope" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Membership Plan",
      icon: <Fontisto name="test-tube" size={24} color="black" />,
      url: "/select-membership",
    },
    {
      name: "Manage payments methods",
      icon: <FontAwesome5 name="credit-card" size={24} color="black" />,
      url: "/apointments",
    },
    {
      name: "Pill Reminder",
      icon: <FontAwesome5 name="pills" size={24} color="black" />,
      url: "/pill-reminder",
    },
    {
      name: "Refer and earn",
      icon: <FontAwesome name="share" size={24} color="black" />,
      url: "/refer-earn",
    },
  ];

  const logout = () => {
    //
  };

  const handleEditProfile = () => {
    router.push({
      pathname: "/edit-profile",
      params: {
        user: USERS.DOCTOR,
        Profile: JSON.stringify(doctor),
        Fields: JSON.stringify(DOCTORFIELDS),
      },
    });
  };

  const openModal = () => {
    setVisible(true);

    // Animate the overlay and bottom sheet appearance
    Animated.timing(overlayOpacity, {
      toValue: 1, // Fully visible
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.spring(bottomSheetTranslateY, {
      toValue: 0, // Move the bottom sheet to its original position
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(overlayOpacity, {
      toValue: 0, // Fully hidden
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false); // Hide modal after animation
    });

    Animated.spring(bottomSheetTranslateY, {
      toValue: 300, // Move bottom sheet down offscreen
      useNativeDriver: true,
    }).start();
  };

  const updateProfileImage = (url) => {
    setDoctor({
      ...doctor,
      profileImage: url,
    });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="mt-2" style={styles.container}>
            {/* Left - Doctor Image */}
            <TouchableOpacity onPress={openModal}>
              {doctor.profileImage && doctor.profileImage.length ? (
                <Image
                  source={{ uri: doctor.profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Image source={images.profile} style={styles.profileImage} />
              )}
            </TouchableOpacity>

            {/* Right - Profile Information */}
            <View style={styles.infoContainer}>
              <Text style={styles.nameText}>Dr. {doctor.name}</Text>
              <Text style={styles.detailText}>Age: {doctor.age}</Text>
              <Text style={styles.detailText}>Gender: {doctor.gender}</Text>
              <Text style={styles.detailText}>Contact: {doctor.contact}</Text>
              <Text style={styles.detailText}>Address: {doctor.address}</Text>

              {/* Edit Profile Button */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={handleEditProfile}
              >
                <FontAwesome name="edit" size={20} color="#FF9C01" />
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white rounded-lg mx-4 px-4">
            <UserToggleSwitch />
          </View>

          <View className="w-full justify-center h-100 px-4 my-6 bg-gray-50">
            {primaryTabs.map((item, index) => (
              <TouchableOpacity
                onPress={() => router.push(item.url)}
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

          <View className="w-full justify-center h-100 px-4 my-5px bg-gray-50">
            {secondaryTabs.map((item, idx) => (
              <TouchableOpacity
                onPress={() => router.push(item.url)}
                className="w-full flex flex-row justify-between my-3"
                key={idx}
              >
                <View className="flex flex-row">
                  {item.icon}
                  <Text className="font-psemibold mx-2">{item.name}</Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
            <CustomButton
              title={"Sign out"}
              handlePress={logout}
              containerStyles="mt-4 bg-white border border-slate-300  min-h-[42px]"
              textStyles="text-orange-600 text-sm"
              isLoading={isSubmitting}
            />
          </View>

          <BottomSheetModal
            closeModal={closeModal}
            visible={visible}
            updateProfileImage={updateProfileImage}
          />
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
    color: "#FF9C01",
    marginLeft: 5,
  },
});

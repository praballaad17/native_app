import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
//import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { images } from "../../constants";

const teamMembers = [
  { id: "1", name: "Sidharth ", role: "CEO", image: images.member1 },
  { id: "2", name: "Jane Smith", role: "CTO", image: images.member2 },
  { id: "3", name: "David Brown", role: "Designer", image: images.member2 },
];

const feature = [
  {
    heading: "User Registration & Login",
    details: [
      "Register as a **Patient, Doctor, Executive, or Admin**",
      "Mobile number verification via OTP (SMS)",
      "Secure login using mobile number & password",
    ], 
  },
  {
    heading: "Patients",
    details: [
      "Edit profile (photo, weight, blood group, etc.)",
      "Manage medical notes, records, and prescriptions (Add/Edit/Remove)",
      "Grant profile access to doctors upon request",
    ],
  },
  {
    heading: "Doctors",
    details: [
      "Edit profile (including license documents)",
      "Request access to patient profiles",
      "Manage medical notes, records, and prescriptions",
      "Verify self-uploaded patient documents",
      "Create new patient accounts",
    ],
  },
  {
    heading: "Executives",
    details: [
      "Edit profile information",
      "Create new patient accounts",
      "Manage medical notes, records, and prescriptions on behalf of patients",
    ],
  },
  {
    heading: "Admin",
    details: [
      "Verify newly registered doctors",
      "Verify newly registered executives",
    ],
  },
  {
    heading: "A Dynamic Experience",
    details: [
      "Our platform is designed with a sleek, modern interface that includes **subtle animations** to enhance user experience without compromising performance. Navigating through our app feels intuitive, making healthcare management more accessible than ever.",
      "Join atkans medicare today and take the next step towards a **smarter, connected, and efficient** healthcare ecosystem!",
    ],
  },
];


const AboutUs = () => {
  return (
    <GestureHandlerRootView >
      <SafeAreaView className="h-full">
        <ScrollView>
          {/* Header Image */}
          {/* <Image
        source={{ uri: "https://via.placeholder.com/800x300" }}
        className="w-full h-48"
      /> */}

          {/* About Text */}
          <View className="p-6">
            <Text className="text-3xl font-bold ">About Us</Text>
            <Text className="text-gray-700 mt-4 first-letter:capitalize">
              Welcome to{" "}
              <Text className="text-secondary font-bold">Atkans Medicare</Text>{" "}
              the innovative healthcare management platform designed to
              streamline patient care and medical recordkeeping with ease. Our
              mission is to empower patients, doctors, and healthcare executives
              with seamless digital tools, ensuring a more efficient and
              transparent healthcare experience.
            </Text>
          </View>

          <View className="p-6">
            <Text className="text-3xl font-bold ">Vision</Text>
            <Text className="text-gray-700 mt-4 first-letter:capitalize">
              We aim to bridge the gap between patients and healthcare providers
              through a secure, user-friendly platform that prioritizes
              accessibility, efficiency, and trust. By integrating cutting-edge
              technology with intuitive functionalities, we are transforming the
              way medical data is managed and shared.
            </Text>
          </View>
          {/* Features */}
          <View className="p-6">
            <Text className="text-2xl font-bold ">
              Key Features & User Roles
            </Text>
            {feature.map((item) => (
              <View className="">
                <Text className="text-lg font-semibold mt-2">{item.heading}</Text>
                {item.details.map((subItem) => (
                  <View className="flex-row  mt-2">
                  <View className="flex-row items-center">
                    <FontAwesome name="circle" size={8} color="black"/>
                    </View>
                  <Text  className="ml-2  first-letter:capitalize" >{subItem}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Team Section */}
          <Text className="text-2xl font-bold  px-6 mt-4">Meet Our Team</Text>
          <View className="flex-row justify-center flex-wrap">
          {teamMembers.map((member) => (
            <View className="items-center mx-3 my-4">
              <Image source={member.image} className="w-20 h-20 rounded-full" />
              <Text className="font-semibold mt-2">{member.name}</Text>
              <Text className="text-gray-500">{member.role}</Text>
            </View>
          ))}
          </View>

          {/* Social Media Links */}
          <View className="flex-row justify-center space-x-6 mt-6 mb-6">
            <TouchableOpacity>
              <FontAwesome name="facebook" size={28} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="twitter" size={28} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome name="linkedin" size={28} color="#0077b5" />
            </TouchableOpacity>
          </View>
          </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default AboutUs;

import { View, Text, TextInput, TouchableOpacity, Image, Alert, Linking } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { postMessage } from "../../services/comonService";

const NeedHelp = () => {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handlePress = () => {
    try {
      if (data.name && data.email && data.message) {
        alert("Message sent successfully!");
        postMessage(data);
      } else {
        alert("Please fill all the fields!");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  const handleCallPress = () => {
    Linking.openURL(`tel:1234567890`);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="mx-2 my-4">
            {/* <Text className="font-pbold text-2xl">Need Help</Text> */}
            <View className="flex-1 bg-white p-6">
      {/* Heading */}
      <Text className="text-3xl font-bold text-blue-600">Contact Us</Text> 
      <Text className="text-gray-700 mt-2">We’d love to hear from you!</Text>

      {/* Input Fields */}
      <View className="mt-6">
        <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mt-3">
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput onChangeText={(text) => setData({...data, name: text})}  className="ml-2 flex-1" placeholder="Your Name" />
        </View>

        <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mt-3">
          <Ionicons name="mail-outline" size={20} color="gray" />
          <TextInput onChangeText={(text) => setData({...data, email: text})} className="ml-2 flex-1" placeholder="Your Email" keyboardType="email-address" />
        </View>

        <View className="flex-row items-center border border-gray-300 rounded-lg p-3 mt-3 h-32">
          <Ionicons name="chatbox-outline" size={20} color="gray" />
          <TextInput onChangeText={(text) => setData({...data, message: text})} className="ml-2 flex-1" placeholder="Your Message" multiline />
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handlePress} className="bg-blue-600 p-3 rounded-lg mt-4">
          <Text className="text-white text-center font-semibold">Send Message</Text>
        </TouchableOpacity>
      </View>

      {/* Map Preview */}
      {/* <Text className="text-lg font-semibold text-blue-600 mt-6">Our Location</Text>
      <Image
        source={{ uri: "https://via.placeholder.com/400x200" }}
        className="w-full h-48 mt-3 rounded-lg"
      /> */}

      {/* Contact Buttons */}
      <View className="flex-row justify-center space-x-6 mt-6">
        <TouchableOpacity onPress={handleCallPress} className="flex-row items-center bg-green-500 p-3 rounded-lg">
          <Ionicons name="call-outline" size={20} color="white" />
          <Text className="text-white ml-2">Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-blue-500 p-3 rounded-lg">
          <Ionicons name="mail-outline" size={20} color="white" />
          <Text className="text-white ml-2">Email</Text>
        </TouchableOpacity>
      </View>
    </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default NeedHelp;

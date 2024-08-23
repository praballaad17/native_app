import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";

const PatientConsultations = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const goTOConsultationPage = (consultationId) => {
    router.push({
      pathname: "/consultation-details",
      params: {
        consultationId: consultationId,
      },
    });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <View className="flex ">
              <View className="w-full flex flex-row border border-gray-400 rounded-xl p-2 m-1">
                <View
                  resizeMode="contain"
                  className="w-1/2 h-28 border border-black "
                />
                <View className="w-1/2 ml-3 justify-center">
                  <Text>Doctor Name</Text>
                  <Text>last Date of visit</Text>
                  <CustomButton
                    title={"View More"}
                    handlePress={() => goTOConsultationPage("someParamValue")}
                    containerStyles="mr-3 min-h-[42px]"
                    textStyles="text-sm"
                    isLoading={isSubmitting}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PatientConsultations;

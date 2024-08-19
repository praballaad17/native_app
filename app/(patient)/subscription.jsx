import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";

const Subscription = () => {
  const [plan, setPlan] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submit = () => {
    //
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[70vh] px-4 my-6">
            <Text className="text-2xl my-4 text-semibold mt-10 font-psemibold">
              Subscription / Payment
            </Text>
            <TouchableOpacity
              onPress={() => setPlan(1)}
              className={`p-3 rounded-xl border-2 border-black ${
                plan === 1 ? "bg-secondary" : ""
              }`}
            >
              <Text className="text-xl  text-semibold font-psemibold">
                ₹236/monthly{" "}
              </Text>
              <Text className="text-sm font-pmedium">
                Gain unlimited access to all the content we have to offer!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPlan(2)}
              className={`p-3 my-2 rounded-xl border-2 border-black ${
                plan === 2 ? "bg-secondary" : ""
              }`}
            >
              <Text className="text-xl  text-semibold font-psemibold ">
                ₹2,000/yearly{" "}
              </Text>
              <Text
                className={`text-sm font-pmedium ${
                  plan === 2 ? "text-white" : ""
                }`}
              >
                Gain unlimited access to all the content we have to offer!
              </Text>
            </TouchableOpacity>

            <CustomButton
              title={"Proceed"}
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Subscription;

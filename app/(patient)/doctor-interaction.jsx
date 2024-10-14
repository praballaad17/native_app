import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import StarRating from "../../components/ratingStarts";
import { getAllowedDoctors } from "../../services/patientServices";

const DoctorInteraction = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const doctorsData = [
    {
      name: "report 2",
      education: "mbbs",
      totalExp: 5,
      ratting: 4,
    },
    {
      name: "report 2",
      education: "mbbs",
      totalExp: 5,
      ratting: 3.5,
    },
  ];

  useEffect(() => {
    const getter = async () => {
      const res = await getAllowedDoctors(patientId);
      console.log("res", res);
    };

    getter();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-primary font-pbold">
              Allowed Doctor's Access s
            </Text>

            <View>
              {doctorsData.map((item, index) => (
                <View className="bg-white p-3 my-2" key={index}>
                  <Text>
                    <Text className="font-bold">Name: </Text>
                    {item.name}
                  </Text>
                  <Text>
                    <Text className="font-bold">Education: </Text>
                    {item.education}
                  </Text>
                  <Text>
                    <Text className="font-bold">Ratting: </Text>
                    {item.ratting}
                    <StarRating rating={item.ratting} />
                  </Text>
                  <Text>
                    <Text className="font-bold">Total Experiece: </Text>
                    {item.totalExp}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default DoctorInteraction;

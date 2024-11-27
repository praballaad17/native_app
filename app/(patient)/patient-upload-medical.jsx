import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";

const UploadMedical = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const records = [
    {
      name: "report 1",
      url: "",
      date: "24-08-2024",
      uploadedBy: "doctor",
    },
    {
      name: "report 2",
      url: "",
      date: "24-08-2024",
      uploadedBy: "doctor",
    },
  ];

   // Fetch all doctors when component loads or page changes
   useEffect(() => {
    const getter = async () => {
      if (loading) return; // Prevent multiple calls if already loading

      setLoading(true);
      try {
        const res = await FetchAllDoctorList(page); // Pass the page
        console.log(res);
        if (res.doctors.length > 0) {
          setDoctorList((prev) => [...prev, ...res.doctors]); // Append new doctors to the list
        } else {
          setHasMore(false); // No more data to load
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    getter();
  }, [page]); // Trigger when page changes

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-primary font-pbold">
              Your Medical Records
            </Text>
            <CustomButton
              title={"Upload New Document"}
              handlePress={() => router.push("/patient-medical-data-form")}
              containerStyles="my-2 min-h-[40px] bg-white border border-secondary"
              textStyles="text-secondary"
              isLoading={isSubmitting}
            />
            <View>
              {records.map((item, index) => (
                <View className="bg-white p-3 my-2" key={index}>
                  <Text>{item.name}</Text>
                  <Text>{item.date}</Text>
                  <Text>{item.uploadedBy}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UploadMedical;

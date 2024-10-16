import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  ConsultDoctorList,
  FetchAllDoctorList,
} from "../../services/patientServices";
import { CONSULTAREAS } from "../../constants/index";

const Consult = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch all doctors when component loads or page changes
  useEffect(() => {
    const getter = async () => {
      if (loading) return; // Prevent multiple calls if already loading

      setLoading(true);
      try {
        const res = await FetchAllDoctorList(page); // Pass the page number
        if (res.length > 0) {
          setDoctorList((prev) => [...prev, ...res]); // Append new doctors to the list
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

  // Function to load more doctors (increment page number)
  const loadMoreDoctors = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number to fetch more data
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
              {CONSULTAREAS.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => getDoctorListBySpeciality(item.key)}
                  className="border border-gray-400 rounded-xl p-1 m-1"
                >
                  <Text className="text-primary">{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex ">
              {doctorList.map((doctor, idx) => (
                <TouchableOpacity
                  className="w-full flex flex-row border border-gray-400 rounded-xl p-2 m-1"
                  onPress={() => handlePress(item)}
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
              ))}

              {/* Show loading spinner or Load More button */}
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : hasMore ? (
                <TouchableOpacity
                  onPress={loadMoreDoctors}
                  className="border border-gray-400 rounded-xl p-2 m-1 text-center"
                >
                  <Text className="text-primary">Load More</Text>
                </TouchableOpacity>
              ) : (
                <Text>No more doctors to load</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Consult;

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  ConsultDoctorList,
  FetchAllDoctorList,
} from "../../services/patientServices";
import { CONSULTAREAS, URLS } from "../../constants/index";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomButtonFlex from "../../components/CustomButtonFlex";

const Consult = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isvisible, setIsVisible] = useState(false);

  // Fetch all doctors when component loads or page changes
  useEffect(() => {
    const getter = async () => {
      if (loading || !hasMore) return; // Prevent multiple calls if already loading

      setLoading(true);
      try {
        const res = await FetchAllDoctorList(page); // Pass the page
        if (res.doctors.length > 0) {
          setDoctorList((prev) => [...prev, ...res.doctors]); // Append new doctors to the list
          if (res.currentPage == res.totalPages) {
            setHasMore(false);
          }
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

  const handlePress = (doctorId) => {
    router.push({
      pathname: URLS.PATIENTBOOKAPPOINTMENT,
      params: {
        doctorId: doctorId,
      },
    });
  };

  const getDoctorListBySpeciality = async (speciality) => {
    console.log(speciality);
    try {
      const res = await ConsultDoctorList(speciality);
      console.log("doctor list", res);
      if (res.length > 0) {
        setDoctorList(res); // Set the doctor list based on speciality
      }
      setIsVisible(false); // Close the modal after selection
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
              <CustomButton
                title="Select By Speciality"
                handlePress={() => setIsVisible(true)}
                containerStyles="w-full mt-7"
              />
            </View>
            <View className="flex ">
              {doctorList.map((doctor, idx) => (
                <TouchableOpacity
                  className="w-full flex flex-row border border-gray-400 rounded-xl p-2 m-1"
                  onPress={() => handlePress(doctor._id)}
                  key={idx}
                >
                  <Image
                    source={doctor.image || images.doctorProfile}
                    style={{ width: 100, height: 100 }}
                  />
                  <View className="w-1/2 ml-3 justify-center">
                    <Text>{doctor.name}</Text>
                    <Text>Education</Text>
                    <Text>Ratting</Text>
                    <Text>Total Experience</Text>
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
                <Text className="font-bold text-center">End Of List</Text>
              )}
            </View>
          </View>
          <Modal
            className="bg-gray-100"
            animationType="slide"
            transparent={true}
            visible={isvisible}
            onRequestClose={() => {
              setIsVisible(false);
            }}
          >
            <View
              className="bg-gray-200"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
              <View className="flex-row justify-around">
                <CustomButtonFlex
                  title="Close"
                  handlePress={() => setIsVisible(false)}
                />
                {/* <CustomButtonFlex
                  title="Close"
                  handlePress={() => setIsVisible(false)}
                /> */}
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Consult;

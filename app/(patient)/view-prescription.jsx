import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Table from "../../components/Table";
import { useLocalSearchParams } from "expo-router";

const ViewPrescription = () => {
  const params = useLocalSearchParams();
  console.log("patient", params);
  const headers = ["Medication", "Dosage", "Route", "Duration"];

  const data = [
    {
      medication: "Tablet 1",
      dosage: "1 morning, 1 night (before food)",
      route: "mouth intake",
      duration: "10 days",
    },
    {
      medication: "Tablet 2",
      dosage: "1 morning, 1 night (after food)",
      route: "mouth intake",
      duration: "11 days",
    },
    {
      medication: "Tablet 3",
      dosage: "1 morning, 1 night (before food)",
      route: "mouth intake",
      duration: "10 days",
    },
  ];

  const testData = [
    {
      testName: "Test 1",
      report: "",
    },
    {
      testName: "Test 2",
      report: "",
    },
  ];

  const renderRow = ({ item }) => (
    <View className="flex flex-row">
      {Object.values(item).map((value, index) => (
        <View key={index}>
          <Text>{value}</Text>
        </View>
      ))}
      <TouchableOpacity>
        <Text className="text-blue-600 ml-3">Open Report</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text>
              <Text className="font-pbold">Doctor Name:</Text> Dr. Prabal Laad
            </Text>
            <Text>
              <Text className="font-pbold">Patient Name:</Text> John Wick
            </Text>
            <Text>
              <Text className="font-pbold">Date:</Text> 21 / 08 / 2024
            </Text>
            <Text>
              <Text className="font-pbold">Syntom Descripton:</Text> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Quae pariatur odit
              culpa quibusdam placeat laudantium laborum! Eius nobis saepe
              rerum! Dolores cumque nulla sequi voluptatum vitae voluptatibus
              quisquam ipsam minima?
            </Text>
            <View>
              <Text className="font-pbold">Medications:</Text>
              <Table headers={headers} data={data} />
            </View>
            <View className="flex">
              <Text className="font-pbold">Test: </Text>
              <FlatList
                data={testData}
                renderItem={renderRow}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <Text>
              <Text className="font-pbold">Doctor's Remark: </Text> Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Aspernatur tenetur
              deserunt nihil ab laborum deleniti iste ea, consectetur unde vero
              molestias, suscipit qui perspiciatis ratione debitis rem
              temporibus, itaque ipsa!
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default ViewPrescription;

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useLocalSearchParams } from "expo-router";

const CunsultationDetails = () => {
  const params = useLocalSearchParams();
  console.log("patient", params);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const consultations = [
    {
      id: 12,
      date: "24-08-2024",
      remark: "Lorem",
    },
    {
      id: 12,
      date: "24-08-2024",
      remark: "Lorem",
    },
    {
      id: 12,
      date: "24-08-2024",
      remark: "Lorem",
    },
  ];

  const submit = (id) => {
    router.push({
      pathname: "/view-prescription",
      params: {
        prescriptionId: id,
      },
    });
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="font-psemibold text-xl">
              Number of Interaction: {consultations.length}
            </Text>
            <Text className="font-psemibold text-xl">
              Previous Consultations
            </Text>
            {consultations.map((item, idx) => (
              <View className="p-3 bg-white rounded-xl my-2" key={idx}>
                <Text>Visited on: {item.date}</Text>
                <Text>
                  <Text className="font-bold">Remark: </Text>
                  {item.remark}
                </Text>
                <CustomButton
                  title={"View Full Report"}
                  handlePress={() => submit(item.id)}
                  containerStyles="mr-3 min-h-[42px]"
                  textStyles="text-sm"
                  isLoading={isSubmitting}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default CunsultationDetails;

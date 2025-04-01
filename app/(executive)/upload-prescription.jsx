import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { FILETYPE } from "../../constants";
import { getDocumentList } from "../../services/executiveServices";
import useExecutive from "../../context/ExecutiveProvider";
import FileReaderModal from "../../components/FileReaderModal";

const UploadPrescription = () => {
  const { executiveId } = useExecutive();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
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

  useEffect(() => {
    const getter = async () => {
      try {
        const resList = await getDocumentList(
          executiveId,
          FILETYPE.PRESCRIPTION
        );

        console.log(resList);
        setRecordList(resList.filesList);
      } catch (error) {
        console.log(error);
      }
    };
    getter();
  }, []);

  const openReport = (report) => {
    setModalVisible(true);
    setSelectedRecord(report);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center h-100 px-4 my-6">
            <Text className="text-2xl text-primary font-pbold">
              Presciptions
            </Text>
            <CustomButton
              title={"Upload Your Presciptions"}
              handlePress={() => router.push("/prescription-form")}
              containerStyles="my-2 min-h-[40px] bg-white border border-secondary"
              textStyles="text-secondary"
              isLoading={isSubmitting}
            />
            <View>
              {recordList && recordList.length > 0 ? (
                recordList.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openReport(item)}
                  >
                    <View className="bg-white p-3 my-2">
                      <Text>{item.name}</Text>
                      <Text>{item.date}</Text>
                      <Text>
                        <Text className="font-bold">Prescription by:</Text>{" "}
                        {item.uploadedBy}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View className="flex-1 justify-center items-center h-full">
                  <Text className="text-center text-gray-500">
                    No records found
                  </Text>
                </View>
              )}
            </View>
            {setModalVisible && selectedRecord && (
              <FileReaderModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                report={selectedRecord}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default UploadPrescription;

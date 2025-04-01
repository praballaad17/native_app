import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import { FILETYPE } from "../../constants";
import FileReaderModal from "../../components/FileReaderModal";
import useUserType from "../../context/UserProvider";
import { getDocumentList } from "../../services/patientServices";
import { formateDate } from "../../utils/utils";
import { TouchableOpacity } from "react-native";

const UploadPrescription = () => {
  const { userId } = useUserType();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1); // Start from page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [recordList, setRecordList] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getter = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const resList = await getDocumentList(userId, FILETYPE.PRESCRIPTION);

        if (resList.length > 0) {
          setRecordList(resList); // Append new doctors to the list
        } else {
          setHasMore(false); // No more data to load
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop loading after data fetch
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
              handlePress={() => router.push("/patient-prescription-form")}
              containerStyles="my-2 min-h-[40px] bg-white border border-secondary"
              textStyles="text-secondary"
              isLoading={isSubmitting}
            />
            <View>
              {recordList.map((item, index) => (
                <TouchableOpacity onPress={() => openReport(item)}>
                  <View className="bg-white p-3 my-2" key={index}>
                    <Text>{item.fileName}</Text>
                    <Text>{formateDate(item.date)}</Text>
                    <Text>
                      <Text className="font-bold">Prescription by:</Text>{" "}
                      {item.uploadedBy}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
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

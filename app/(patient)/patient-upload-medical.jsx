import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import {
  FetchAllDoctorList,
  getDocumentList,
} from "../../services/patientServices";
import useUserType from "../../context/UserProvider";
import { FILETYPE } from "../../constants";
import { formateDate } from "../../utils/utils";
import { TouchableOpacity } from "react-native";
import DocumentReader from "../../components/document-reader";
import FileReaderModal from "../../components/FileReaderModal";

const UploadMedical = () => {
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
        const resList = await getDocumentList(userId, FILETYPE.MEDICALRECORD);

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
    console.log("openReport");
    setModalVisible(true);
    setSelectedRecord(report);
  };

  console.log(recordList);

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
              {recordList &&
                recordList.map((item, index) => (
                  <TouchableOpacity onPress={() => openReport(item)}>
                    <View className="bg-white p-3 my-2" key={index}>
                      <Text>{item.fileName}</Text>
                      <Text>{formateDate(item.date)}</Text>
                      <Text>{item.uploadedBy}</Text>
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

export default UploadMedical;

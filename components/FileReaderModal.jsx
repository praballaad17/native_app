import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { generateURLView } from "../services/awsServices";
import { useLoader } from "../hooks/useLoader";
import { formateDate } from "../utils/utils";

const FileReaderModal = ({ modalVisible, setModalVisible, report }) => {
  const { fileName, date, s3Key } = report;
  const [url, setUrl] = useState();
  const { setIsLoading } = useLoader();

  useEffect(() => {
    const getter = async () => {
      true;
      setIsLoading;
      const { url } = await generateURLView(s3Key);
      setUrl(url);
      setIsLoading(false);
    };
    getter();
  }, [report]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setUrl("");
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.reportName}>{fileName}</Text>
          <Text style={styles.reportDate}>Date: {formateDate(date)}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: url }}
              style={styles.reportImage}
              resizeMode="contain"
            />
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  reportImage: {
    width: width - 32, // Full width minus padding
    height: (width - 32) * 0.75, // Adjust aspect ratio as needed
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default FileReaderModal;

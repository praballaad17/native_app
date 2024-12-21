import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { generateURLView } from "../services/awsServices";

const MedicalReport = ({ report }) => {
  const { fileName, date, s3Key } = report;
  const [url, setUrl] = useState();

  useEffect(() => {
    const getter = async () => {
      const { url } = await generateURLView(s3Key);
      setUrl(url);
    };
    getter();
  }, [report]);

  console.log("url", url);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.reportName}>{fileName}</Text>
      <Text style={styles.reportDate}>Date: {date}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: url }}
          style={styles.reportImage}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};

export default MedicalReport;

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  reportName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  reportDate: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  imageContainer: {
    alignItems: "center",
  },
  reportImage: {
    width: width - 32, // Full width minus padding
    height: (width - 32) * 0.75, // Adjust aspect ratio as needed
    marginBottom: 16,
    borderRadius: 8,
  },
});

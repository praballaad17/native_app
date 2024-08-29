import { View, Text, Alert, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

const UploadPdf = () => {
  const [pdfUri, setPdfUri] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      console.log(result);

      if (result.canceled === false) {
        setPdfUri(result.assets[0].uri);
      } else {
        Alert.alert("Cancelled", "File selection was cancelled.");
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  console.log(pdfUri);

  return (
    <View>
      <Text>UploadPdf</Text>
      <Button title="Select PDF" onPress={pickDocument} />

      {/* {pdfUri && (
        <View style={styles.pdfContainer}>
          <Text style={styles.previewText}>PDF Preview:</Text>
          <WebView
            style={styles.pdfViewer}
            source={{ uri: pdfUri }}
            javaScriptEnabled={true}
          />
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  pdfContainer: {
    marginTop: 20,
  },
  previewText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pdfViewer: {
    flex: 1,
    height: 400, // Adjust height to fit your layout
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default UploadPdf;

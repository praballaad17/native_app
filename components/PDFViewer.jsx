import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

const PDFViewer = ({ pdfUri }) => {
  const [fileUri, setFileUri] = useState(null);
  console.log(pdfUri);
  useEffect(() => {
    const loadPDF = async () => {
      try {
        // Move the PDF file to a location WebView can access
        const pdfLocation = `${FileSystem.documentDirectory}myPDF.pdf`;
        await FileSystem.copyAsync({
          from: pdfUri,
          to: pdfLocation,
        });
        setFileUri(pdfLocation);
      } catch (error) {
        console.error("Error loading PDF", error);
      }
    };

    loadPDF();
  }, [pdfUri]);

  console.log(fileUri);

  return (
    <View style={styles.container}>
      {fileUri ? (
        // Render the PDF using WebView
        <WebView source={{ uri: fileUri }} style={styles.pdf} />
      ) : (
        <Text style={styles.noPdfText}>No PDF selected</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  pdfViewer: {
    flex: 1,
    zIndex: 50,
    width: 100,
    height: 100,
  },
  noPdfText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default PDFViewer;

import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import PDFViewer from "../../components/PDFViewer";
import * as FileSystem from "expo-file-system";
import { WebView } from "react-native-webview";

const PdfView = () => {
  const params = useLocalSearchParams();

  const [fileUri, setFileUri] = useState(null);
  useEffect(() => {
    const loadPDF = async () => {
      try {
        // Move the PDF file to a location WebView can access
        const pdfLocation = `${FileSystem.documentDirectory}myPDF.pdf`;
        await FileSystem.copyAsync({
          from: params.pdfUri,
          to: pdfLocation,
        });
        console.log("pdfLocation", pdfLocation);
        setFileUri(pdfLocation);
      } catch (error) {
        console.error("Error loading PDF", error);
      }
    };

    loadPDF();
  }, [params.pdfUri]);

  console.log(fileUri);

  return (
    <View>
      <Text>PdfView {params.pdfurl}</Text>
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
export default PdfView;

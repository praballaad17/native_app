import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Dynamic Table Component
const DynamicTable = ({ headers, data }) => {
  // Function to render each row dynamically
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {Object.values(item).map((value, index) => (
        <Text key={index} style={styles.cell}>
          {value}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Render table headers */}
      <View style={styles.row}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.cellHeader}>
            {header}
          </Text>
        ))}
      </View>

      {/* Render table rows dynamically */}
      <FlatList
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
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

export default DynamicTable;

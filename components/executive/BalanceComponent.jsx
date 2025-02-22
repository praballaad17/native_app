import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import  useExecutive  from "../../context/ExecutiveProvider.js";

const BalanceComponent = () => {
  const { payoutBalance, handleWithdraw } = useExecutive();
    return (
        <>
        {/* Payout Balance Section */}
              <View style={styles.payoutSection}>
                <Text style={styles.label}>Payout Balance:</Text>
                <Text style={styles.balance}>₹{payoutBalance.toFixed(2)}</Text>
                {payoutBalance > 0 ? (
                  <TouchableOpacity
                    style={styles.withdrawButton}
                    onPress={handleWithdraw}
                  >
                    <Text style={styles.buttonText}>Withdraw</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.infoText}>
                    No balance available for withdrawal.
                  </Text>
                )}
              </View>
              </>
    );
};

export default BalanceComponent;


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: "#f8f8f8",
    },
    payoutSection: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
    },
    balance: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#4CAF50",
    },
    withdrawButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      textAlign: "center",
      fontSize: 16,
    },
    infoText: {
      fontSize: 14,
      color: "#888",
      marginTop: 10,
    },
    requestsSection: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    requestItem: {
      backgroundColor: "#f1f1f1",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    historySection: {
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    historyItem: {
      backgroundColor: "#f9f9f9",
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
  });
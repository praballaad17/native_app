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
import { addWithdraw, getWithdraw } from "../../services/executiveServices";

const PayoutComponent = () => {
  const [payoutBalance, setPayoutBalance] = useState(1500.0); // Current balance
  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 1, amount: 300, status: "Pending", date: "2024-08-01" },
    { id: 2, amount: 500, status: "Approved", date: "2024-07-15" },
  ]); // Withdrawal history

  useEffect(() => {
    const getter = async () => {
      try {
        const res = await getWithdraw();
        console.log(res);
      } catch (error) {
        console.log(error);
        Alert.alert("Unable to fetch! Check internet connection");
      }
    };

    getter();
  }, []);

  const handleWithdraw = async () => {
    // Here you'd implement the request to withdraw logic
    alert(
      "Your withdrawal request has been submitted and is awaiting approval."
    );
    // Simulate a new request
    const newRequest = {
      id: 3,
      amount: payoutBalance,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    };
    try {
      const res = await addWithdraw(newRequest);
    } catch (error) {
      Alert.alert("Unable to create Withdraw request, Please Try Later!");
    }
    setWithdrawalRequests([...withdrawalRequests, newRequest]);
    setPayoutBalance(0); // Reset the payout balance
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

      {/* Current Withdrawal Requests */}
      <View style={styles.requestsSection}>
        <Text style={styles.sectionHeader}>Withdrawal Status:</Text>
        {withdrawalRequests.filter((req) => req.status === "Pending").length ===
        0 ? (
          <Text style={styles.infoText}>No pending withdrawal requests.</Text>
        ) : (
          <FlatList
            data={withdrawalRequests.filter((req) => req.status === "Pending")}
            renderItem={({ item }) => (
              <View style={styles.requestItem}>
                <Text>Amount: ₹{item.amount}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Date: {item.date}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>

      {/* Withdrawal History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionHeader}>Withdrawal History:</Text>
        <FlatList
          data={withdrawalRequests}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text>Amount: ₹{item.amount}</Text>
              <Text>Status: {item.status}</Text>
              <Text>Date: {item.date}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default PayoutComponent;

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

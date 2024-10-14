import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const ReferAndEarn = () => {
  const [referralCode, setReferralCode] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);

  // Example: 500 points earned per referral
  const pointsPerReferral = 500;
  const pointsToRupeeConversionRate = 10;

  const handleRefer = () => {
    // Simulate referral and increase points
    setTotalPoints(totalPoints + pointsPerReferral);
    Alert.alert("Success", "You have earned 500 points!");
  };

  const calculateRupees = (points) => {
    return points / pointsToRupeeConversionRate;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Refer and Earn</Text>

      {/* Referral Code Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter referral code"
        value={referralCode}
        onChangeText={setReferralCode}
      />

      {/* Refer Button */}
      <TouchableOpacity style={styles.button} onPress={handleRefer}>
        <Text style={styles.buttonText}>Refer Now</Text>
      </TouchableOpacity>

      {/* Display Points and Equivalent Rupees */}
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>Total Points: {totalPoints}</Text>
        <Text style={styles.rupeesText}>
          Equivalent Rupees: ₹{calculateRupees(totalPoints).toFixed(2)}
        </Text>
      </View>

      {/* Redemption Info */}
      <Text style={styles.infoText}>
        You earn 500 points per referral. 10 points = 1 rupee.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pointsContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  pointsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  rupeesText: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default ReferAndEarn;

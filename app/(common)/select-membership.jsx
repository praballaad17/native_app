import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomButton from "../../components/CustomButton";

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: "Basic Plan", price: "$9.99/month" },
    { id: 2, name: "Standard Plan", price: "$19.99/month" },
    { id: 3, name: "Premium Plan", price: "$29.99/month" },
  ];

  const handleSubmit = () => {
    if (selectedPlan) {
      Alert.alert(`You selected the ${selectedPlan.name}!`);
    } else {
      Alert.alert("Please select a plan.");
    }
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView className=" h-full">
        <ScrollView>
          <View className="w-full h-full  px-4 my-6 items-center">
            <Text style={styles.title} className="font-bold">
              Choose Your Subscription Plan
            </Text>
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planContainer,
                  selectedPlan &&
                    selectedPlan.id === plan.id &&
                    styles.selectedPlan,
                ]}
                onPress={() => setSelectedPlan(plan)}
              >
                <Text style={styles.planText}>{plan.name}</Text>
                <Text style={styles.priceText}>{plan.price}</Text>
              </TouchableOpacity>
            ))}

            <CustomButton
              title="Submit"
              handlePress={handleSubmit}
              containerStyles="w-full mt-7"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    marginBottom: 20,
  },
  planContainer: {
    width: "95%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    alignItems: "center",
  },
  selectedPlan: {
    borderColor: "#FF9C01",
    backgroundColor: "#ffc375",
  },
  planText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 14,
    color: "#666",
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default SubscriptionPlans;

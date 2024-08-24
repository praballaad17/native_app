import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // You can use any icon set

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <View style={{ flexDirection: "row" }}>
      {/* Loop to display stars based on the rating */}
      {[...Array(totalStars)].map((_, index) => {
        if (index < Math.floor(rating)) {
          // Full Star
          return <Icon key={index} name="star" size={24} color="#FFD700" />;
        } else if (index < rating) {
          // Half Star
          return (
            <Icon key={index} name="star-half" size={24} color="#FFD700" />
          );
        } else {
          // Empty Star
          return (
            <Icon key={index} name="star-border" size={24} color="#CCCCCC" />
          );
        }
      })}
    </View>
  );
};

export default StarRating;

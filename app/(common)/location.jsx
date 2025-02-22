import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  FontAwesome,
  Feather,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useUserType from "../../context/UserProvider";
import { router } from "expo-router";
import { majorCitiesInIndia } from "../../constants/payload";

const LocationSelector = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState(majorCitiesInIndia);
  const [loading, setLoading] = useState(false);
  const { location, setLocation } = useUserType();
 
  useEffect(() => {
    // Filter cities based on search text
    if (searchText === "") {
      setFilteredCities(majorCitiesInIndia);
    } else {
      setFilteredCities(
        majorCitiesInIndia.filter((city) =>
          city.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText]);

  const detectCurrentLocation = async () => {
    // Request permission to access location
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access location was denied"
      );
      return;
    }

    // Get the current location
    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Use reverse geocoding to get city name
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (reverseGeocode.length > 0) {
      setLocation(reverseGeocode[0].city || "Unknown City");
      Alert.alert(
        "Location Detected",
        `Detected City: ${reverseGeocode[0].city}`
      );
      setLoading(false);
    } else {
      Alert.alert("Error", "Could not detect city from location");
      setLoading(false);
    }
  };

  const selectCity = (city) => {
    console.log(city);
    setLocation(city);
    router.push("/");
  }

  const renderCityItem = ({ item }) => {
    return (
      <TouchableOpacity  onPress={() => selectCity(item)} style={styles.cityItem}>
        {/* City Name */}
        <Text style={styles.cityText}>{item}</Text>

        {/* Right Chevron Icon */}
        <Feather
          name="chevron-right"
          size={24}
          color="gray"
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
     <GestureHandlerRootView>
          <SafeAreaView className="h-full">
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search city..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <TouchableOpacity
        style={styles.detectButton}
        disabled={loading}
        onPress={detectCurrentLocation}
      >
        <Text style={styles.detectButtonText}>
          {location
            ? `Current Location: ${location}`
            : "Detect Current Location"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={filteredCities}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCityItem}
        style={styles.cityList}
      />
    </View>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  searchInput: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  detectButton: {
    backgroundColor: "#FFA500",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  detectButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cityList: {
    flex: 1,
  },
  cityItem: {
    paddingVertical: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cityText: {
    fontSize: 18,
  },
});

export default LocationSelector;

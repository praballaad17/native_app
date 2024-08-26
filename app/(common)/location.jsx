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

const majorCitiesInIndia = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
  "Surat",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Visakhapatnam",
  "Indore",
  "Thane",
  "Bhopal",
  "Patna",
  "Vadodara",
  "Ghaziabad",
];

// Map city names to icons
const cityIcons = {
  Mumbai: { name: "building", library: FontAwesome },
  Delhi: { name: "landmark", library: FontAwesome },
  Bangalore: { name: "laptop", library: Entypo }, // Represents IT hub
  Hyderabad: { name: "city", library: MaterialIcons }, // Can represent any city
  Ahmedabad: { name: "industry", library: FontAwesome }, // Represents industrial city
  Chennai: { name: "beach", library: FontAwesome }, // Known for Marina Beach
  Kolkata: { name: "book", library: FontAwesome }, // Represents intellectual hub
  Surat: { name: "diamond", library: FontAwesome }, // Diamond city
  Pune: { name: "university", library: FontAwesome }, // Educational hub
  Jaipur: { name: "fort-awesome", library: FontAwesome }, // Pink City with forts
  Lucknow: { name: "landmark", library: FontAwesome },
  Kanpur: { name: "industry", library: FontAwesome },
  Nagpur: { name: "city", library: MaterialIcons },
  Visakhapatnam: { name: "ship", library: FontAwesome }, // Port city
  Indore: { name: "city", library: MaterialIcons },
  Thane: { name: "home", library: FontAwesome }, // Residential city
  Bhopal: { name: "tree", library: FontAwesome }, // Known for greenery
  Patna: { name: "landmark", library: FontAwesome },
  Vadodara: { name: "city", library: MaterialIcons },
  Ghaziabad: { name: "city", library: MaterialIcons },
};

const LocationSelector = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredCities, setFilteredCities] = useState(majorCitiesInIndia);
  const [currentCity, setCurrentCity] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setCurrentCity(reverseGeocode[0].city || "Unknown City");
      // Alert.alert(
      //   "Location Detected",
      //   `Detected City: ${reverseGeocode[0].city}`
      // );
      setLoading(false);
    } else {
      Alert.alert("Error", "Could not detect city from location");
      setLoading(false);
    }
  };

  const renderCityItem = ({ item }) => {
    const { name, library: IconLibrary } = cityIcons[item] || defaultCityIcon;

    return (
      <TouchableOpacity style={styles.cityItem}>
        {/* City Icon */}
        {/* <IconLibrary
          name={name}
          size={24}
          color="gray"
          style={styles.cityIcon}
        /> */}

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
          {currentCity
            ? `Current Location: ${currentCity}`
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

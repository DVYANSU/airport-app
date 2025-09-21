import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationCheck() {
  const [isInsideAirport, setIsInsideAirport] = useState(null);
  const [loading, setLoading] = useState(false);

  // Delhi Airport coordinates
  const DELHI_AIRPORT = {
    latitude: 28.5562,
    longitude: 77.1000,
  };

  // Geofence radius in kilometers
  const GEOFENCE_RADIUS = 2;

  useEffect(() => {
    checkLocation();
  }, []);

  // Haversine distance calculation
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const checkGeofence = (userLat, userLon) => {
    const distance = calculateDistance(
      userLat,
      userLon,
      DELHI_AIRPORT.latitude,
      DELHI_AIRPORT.longitude
    );
    return distance <= GEOFENCE_RADIUS;
  };

  const checkLocation = async () => {
    setLoading(true);

    try {
      // Ask for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to check your location."
        );
        setLoading(false);
        return;
      }

      // Get current position
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = location.coords;
      const inside = checkGeofence(latitude, longitude);

      setIsInsideAirport(inside);
    } catch (error) {
      console.log("Location error:", error);
      Alert.alert("Error", "Unable to fetch location.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Location Check</Text>

      <View style={styles.statusContainer}>
        {isInsideAirport !== null && (
          <View>
            <Text style={styles.statusText}>
              {isInsideAirport
                ? "Inside Airport Zone ■"
                : "Outside Airport Zone ■"}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={checkLocation}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Checking Location..." : "Check Location"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#474747",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#f49b33",
  },
  statusContainer: {
    width: "100%",
    marginBottom: 20,
  },
  statusBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#f49b33",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

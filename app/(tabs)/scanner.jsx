import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Scanner() {

  // to store scanned QR/barcode data
  const [scannedData, setScannedData] = useState("");

// get camera permission status and function to request permission
  const [permission, requestPermission] = useCameraPermissions();


 // Function wii be used  when a barcode/QR code is scanned
  const handleBarCodeScanned = ({ type, data }) => {
    if (!scannedData) {
      setScannedData(data);
      Alert.alert("Scanned", `Type: ${type}\nData: ${data}`);
    }
  };

  // Camera permission needed
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text style={styles.button}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scannedData ? (
        <CameraView
          style={styles.camera}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "ean13", "code128"],
          }}
          onBarcodeScanned={handleBarCodeScanned}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Scanned: {scannedData}</Text>
          <TouchableOpacity onPress={() => setScannedData("")}>
            <Text style={styles.button}>Scan Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor:"#2b2b2b" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  resultContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  resultText: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  message: { textAlign: "center", paddingBottom: 10 },
  button: { fontSize: 18, color: "#f49b33", fontWeight: "bold", padding: 10 },
});

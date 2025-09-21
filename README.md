
# 🚀 Airport App

A **React Native** application built with **[Expo](https://expo.dev/)** and **expo-router**, featuring QR/barcode scanning, geolocation, and user profile management.

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)  
- [Expo CLI / EAS CLI](https://docs.expo.dev/build/introduction/)  
- [Android Studio](https://developer.android.com/studio) for SDK & emulator  
- Physical Android device or emulator to test the APK  

---

## ⚡ Installation

1. Clone the repository:  
```bash
git clone https://github.com/DVYANSU/airport-app.git
cd airport-app
```

2. Install dependencies:  
```bash
npm install
```

3. Start the app in development mode:  
```bash
npx expo start
```

---

## 🛠 Build APK with EAS

1. Install EAS CLI globally (if not already):  
```bash
npm install -g eas-cli
```

2. Login to Expo:  
```bash
eas login
```

3. Configure the build:  
```bash
eas build:configure
```
This will generate an `eas.json` file.

4. Build APK for Android (preview profile):  
```bash
eas build -p android --profile preview
```

---

Features

- Splash & Login – Start app with splash screen, then login with stored credentials.  
- Scanner – Scan QR and barcodes using device camera.  
- Location Check – Detect if inside Delhi Airport geofence.  
- Profile (Name & Email) – Display user info stored in AsyncStorage; logout clears data.  
- Bottom Tab Navigation – Easy navigation between Scanner, Location, and Profile screens.  

---

Testing Flow

1️ Open App
- Splash screen appears → check it loads correctly.

2️ Login
- Enter Name & Email → navigate to home tabs.

3️ Scanner Tab
- Grant camera permission.  
- Scan QR/barcode → alert shows scanned data.  
- Tap **Scan Again** to reset scanner.

4 Location Tab
- Grant location permission.  
- Verify geofence: “Inside Airport Zone ■” or “Outside Airport Zone ■”.  
- Tap **Check Location** to refresh status.

5️ Profile Tab
- Display **Name & Email** fetched from AsyncStorage.  
- Tap **Logout** → confirm alert → Name & Email cleared → redirected to Login screen.

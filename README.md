# Etiqueta Virtual Mobile App

## Overview

Etiqueta Virtual is a mobile application built with Expo, designed to scan and manage barcodes. The app is available for iOS, Android, and web platforms.

## Technical Specifications

### Version Information

- **Current Version:** 6.0.0
- **iOS Build Number:** 5.4.1
- **Android Version Code:** 10

### Platform Support

- iOS
- Android
- Web

### SDK & Engine

- **Expo SDK Version:** 51.0.0
- **JavaScript Engine:** Hermes

### Backend Integration

- **API Base URL:** https://api.catalogo.rondanet.com

### Build Configuration

#### iOS

- **Bundle Identifier:** org.gs1uy.etiquetavirtual
- **Camera Usage Permission:** Barcode scanning functionality

#### Android

- **Package Name:** com.etiqueta.virtual
- **Compile SDK Version:** 34
- **Target SDK Version:** 34
- **Build Tools Version:** 34.0.0

### Assets & Resources

- **App Icon:** `./assets/solidIcon.png`
- **Splash Screen:** `./assets/splash1.png`
- **Splash Configuration:**
  - **Resize Mode:** contain
  - **Background Color:** white

### Development Features

- **Source Extensions Support:** js, jsx, svg, ts, tsx
- **Metro Config Integration**
- **Updates Configuration:** Disabled
- **Cache Timeout:** 0

## Project Identifiers

- **Expo Project ID:** 20d57323-820c-49bd-85bb-6732c30bb4b9
- **Project Slug:** farmcode

## Key Features

- Barcode Scanning
- Authentication System
- Virtual Label Management

## Installation and Setup

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) and [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed.

### Install Dependencies

To install all necessary dependencies, run:

```bash
npm install
```

### Run Application

To run the app locally with Expo, use:

```bash
expo start
```

### Build the Application

To build the app for production, run:

```bash
eas build --platform android
eas build --platform ios
```

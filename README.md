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

- **Expo Project ID:** 20323323-860c-49bd-25bb-6732c30bb4b9
- **Project Slug:** farmcode

## Key Features

- Barcode Scanning
- Authentication System
- Virtual Label Management

## Transferring Project to Another Expo Account

To transfer this project to a different Expo account, follow these steps:

1. Create a new project in your target Expo account.
2. Get the new project ID from the Expo dashboard.
3. Update the project ID in `app.json`:

   ```json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "YOUR-NEW-PROJECT-ID"
         }
       }
     }
   }
   ```

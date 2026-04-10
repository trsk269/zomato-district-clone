# Expense Tracker

A modern, structured mobile application built with **Expo**, **React Native**, and **TypeScript**.

## 🚀 Overview

This project is an Expense Tracker application designed with a focus on scalability and modern development workflows. It uses **Expo Managed Workflow** with **Continuous Native Generation (CNG)** and **EAS** for seamless builds and deployments.

## 🛠 Tech Stack

- **Framework**: [Expo](https://expo.dev/) (Managed Workflow)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (Link-based routing)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: React Native StyleSheet with Light/Dark mode support
- **Build System**: [EAS (Expo Application Services)](https://expo.dev/eas)

## 📁 Project Structure

The project follows a clean, modular architecture:

```text
.
├── app/                  # Expo Router routes (Navigation layer)
├── src/                  # Core application logic
│   ├── components/       # Reusable UI components (Themed, ExternalLink, etc.)
│   ├── constants/        # App tokens, colors, and global styles
│   ├── hooks/            # Custom React hooks
│   ├── context/          # State management (React Context)
│   ├── services/         # API clients and local storage logic
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
├── assets/               # Static assets (images, fonts)
├── legacy/               # Backup of original project files
├── app.json              # Expo configuration
├── eas.json              # EAS build configuration
└── tsconfig.json         # TypeScript configuration with @/* aliases
```

## 🚦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/expo-go) app on your physical device (optional)

### Installation

1. Navigate to the project directory:

   ```bash
   cd ExpenseTracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npx expo start
```

- Press **i** to open in the iOS Simulator.
- Press **a** to open in the Android Emulator.
- Press **w** to open in the Web Browser.
- Scan the **QR Code** with the Expo Go app to run on a physical device.

## 🏗 Build & Deployment (CNG & EAS)

This project is configured for **Continuous Native Generation**. You specify your native requirements in `app.json`, and EAS handles the generation of native code.

### Development Build

To create a development build:

```bash
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

### Production Build

```bash
eas build --profile production --platform ios
# or
eas build --profile production --platform android
```

## 📝 License

This project is for demonstration purposes.

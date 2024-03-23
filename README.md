# React Native App Setup Guide

This guide provides step-by-step instructions to set up a development environment for building React Native apps using Expo CLI. Follow the instructions below to get started.

## Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- Node.js version 18.14.1 LTS
  - **Windows**: [node-v18.14.1-x64.msi](https://nodejs.org/en/blog/release/v18.14.1)
  - **macOS**: [node-v18.14.1.pkg](https://nodejs.org/en/blog/release/v18.14.1)
- Git (if not already installed)
  - Download from [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Installation

### Windows Users

1. Install Git (if not already installed) from the provided link.
2. Open a terminal and run the following command to install Expo CLI:

   ```bash
   npx create-expo-app AwesomeProject
   cd AwesomeProject
   npx expo start
   ```

### macOS Users

1. Install Homebrew:
   - For macOS version 12 or earlier: [https://brew.sh/](https://brew.sh/)
   - For macOS version later than 12: [Homebrew-4.2.8.pkg](download_link_for_homebrew)
2. After installing Homebrew, open a terminal and run the following command to install Git:

   ```bash
   brew install git
   ```

3. Create a new Expo project:

   ```bash
   npx create-expo-app AwesomeProject
   cd AwesomeProject
   sudo npm cache clean -f
   npx expo start
   ```

   If you encounter an error related to cacache, execute the cleaning command mentioned above.

## Additional Steps

1. Verify Node.js and Git installations by typing the following commands in the terminal:

   ```bash
   node --version
   git --version
   ```

2. If Expo CLI is installed globally, uninstall it:

   ```bash
   sudo npm -g uninstall expo-cli
   npm start
   ```

3. If you encounter "'npm' is not recognized" error, ensure Node.js is properly installed.

## Usage

- Use Expo Go on your mobile device to scan the QR code displayed after running `npx expo start`.
- For Windows users, set up the Android Simulator by installing Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio) and following the provided instructions.
- For macOS users, set up the iOS Simulator by getting Xcode from the App Store using Spotlight.

## Contributing

Feel free to contribute to improving this setup guide by submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

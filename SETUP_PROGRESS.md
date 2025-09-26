# PlannerBuddy Mobile App - Development Environment Setup

## Overview
This document tracks the setup progress for the PlannerBuddy React Native/Expo mobile application development environment on macOS.

**Date:** September 25, 2025  
**Project:** plannerbuddy-mobileapp  
**Platform:** macOS (Apple Silicon)  

---

## ✅ Completed Tasks

### 1. Ruby Environment Setup
**Problem:** CocoaPods installation failed due to Ruby version incompatibility
- **Issue:** Ruby 2.6.10 was too old (CocoaPods requires Ruby >= 3.1.0)
- **Solution:** Installed CocoaPods 1.10.1 which is compatible with Ruby 2.6.x

**Commands Used:**
```bash
# Check Ruby version
ruby --version  # Output: ruby 2.6.10p210

# Install compatible CocoaPods version
gem install cocoapods -v 1.10.1 --user-install

# Add gem binaries to PATH
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
echo 'export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"' >> ~/.zshrc

# Fix FFI gem for Apple Silicon
gem install ffi --user-install
```

**Result:** ✅ CocoaPods 1.10.1 successfully installed

### 2. Ruby Version Manager Installation
**Attempted rbenv installation for future Ruby upgrades:**
```bash
# Install rbenv manually
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# Add to PATH
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(~/.rbenv/bin/rbenv init - zsh)"
```

**Note:** Installation was partially completed but not fully configured due to admin permission requirements.

### 3. iOS Simulator Setup
**Problem:** No iOS simulators available
- **Issue:** iOS Simulator was installed but no iOS runtimes were downloaded

**Solution Steps:**
```bash
# Check iOS Simulator installation
xcode-select -p  # Output: /Applications/Xcode.app/Contents/Developer

# Check available runtimes (initially empty)
xcrun simctl list runtimes

# Install iOS runtime
xcodebuild -downloadPlatform iOS
# Successfully downloaded: iOS 26.0 (23A343)

# Create iPhone 15 simulator
xcrun simctl create "iPhone 15 - PlannerBuddy" "iPhone 15" "iOS26.0"
# Created simulator with ID: 8A2E64BF-1493-40CA-B7A6-82A5FD7D73E3

# Boot the simulator
xcrun simctl boot "iPhone 15 - PlannerBuddy"

# Open Simulator app
open -a Simulator
```

**Result:** ✅ iOS Simulator successfully set up and running

### 4. Expo Development Server
**Problem:** SSL certificate issues when connecting to Expo API
- **Error:** `unable to get local issuer certificate` when fetching from `api.expo.dev`

**Solution:**
```bash
# Start Expo in offline mode to bypass SSL issues
npx expo start --offline
```

**Result:** ✅ Expo development server running successfully in offline mode

---

## 🔄 Partially Completed / Issues Remaining

### CocoaPods Integration
**Status:** Partially working with warnings
- CocoaPods 1.10.1 is installed and functional
- `pod install` runs but shows warnings about Yoga pod validation
- Some UUID issues in Xcode project configuration

**Current Warnings:**
```
[!] The `Yoga` pod failed to validate due to 1 error:
    - ERROR | version: The version of the spec should be higher than 0.
[!] `<PBXResourcesBuildPhase UUID=...>` attempted to initialize an object with an unknown UUID
```

### Expo Go Installation
**Status:** Needs completion
- iOS Simulator is running
- Expo development server is working
- Expo Go app needs to be installed on simulator for testing

---

## 📱 Current Status

### What's Working:
- ✅ Ruby 2.6.10 with CocoaPods 1.10.1
- ✅ iOS Simulator with iOS 26.0 runtime
- ✅ iPhone 15 simulator device created and booted
- ✅ Expo development server running in offline mode
- ✅ Metro bundler starting successfully

### What's Available:
- **Ruby Version:** 2.6.10p210
- **CocoaPods Version:** 1.10.1
- **Node.js Version:** v22.17.1
- **npm Version:** 10.9.2
- **iOS Simulator:** iPhone 15 - PlannerBuddy (iOS 26.0)
- **Simulator ID:** 8A2E64BF-1493-40CA-B7A6-82A5FD7D73E3

---

## 🔧 Tools & Versions Installed

| Tool | Version | Status |
|------|---------|--------|
| Ruby | 2.6.10p210 | ✅ Working |
| CocoaPods | 1.10.1 | ✅ Installed |
| Node.js | v22.17.1 | ✅ Working |
| npm | 10.9.2 | ✅ Working |
| Xcode | Installed | ✅ Working |
| iOS Simulator | iOS 26.0 | ✅ Running |
| Expo CLI | Latest | ✅ Working |

---

## 🚀 Next Steps (Future Tasks)

1. **Fix CocoaPods Warnings:**
   - Resolve Yoga pod validation issues
   - Clean up Xcode project configuration

2. **Install Expo Go:**
   - Install Expo Go app on iOS simulator
   - Test app loading on simulator

3. **Upgrade Ruby (Optional):**
   - Complete rbenv setup with admin permissions
   - Install Ruby 3.2+ for latest CocoaPods support

4. **SSL Certificate Fix:**
   - Resolve certificate issues to enable online mode
   - Enable full Expo development features

---

## 📝 Key Commands for Reference

### Start Development Server:
```bash
npx expo start --offline  # Offline mode (current working method)
npx expo start            # Online mode (has SSL issues)
```

### iOS Simulator Management:
```bash
# List available simulators
xcrun simctl list devices

# Boot simulator
xcrun simctl boot "iPhone 15 - PlannerBuddy"

# Open Simulator app
open -a Simulator
```

### CocoaPods Commands:
```bash
# Install dependencies
cd ios && pod install

# Check CocoaPods version
pod --version
```

---

## 💡 Notes & Troubleshooting

### SSL Certificate Issues:
If you encounter SSL certificate errors, use `--offline` flag with Expo commands as a workaround.

### Admin Permissions:
Some installations (like Homebrew) require administrator privileges. Alternative manual installations were used where needed.

### Ruby Version:
While Ruby 2.6.10 is older, it works fine with CocoaPods 1.10.1 for current development needs. Upgrading to Ruby 3.2+ can be done later if needed.

---

**Setup completed by:** GitHub Copilot Assistant  
**Environment:** macOS with Apple Silicon  
**Project Type:** React Native with Expo
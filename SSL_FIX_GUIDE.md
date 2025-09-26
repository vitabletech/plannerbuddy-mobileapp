# SSL Certificate Fix for Expo Development

## Problem
When running `npm start` or `expo start`, you encounter:
```
FetchError: request to https://api.expo.dev/v2/sdks/51.0.0/native-modules failed, reason: unable to get local issuer certificate
```

## Solutions Implemented

### 1. Quick Fix (Temporary)
Run with SSL verification disabled:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 npm start
```

### 2. Permanent Script Solution
Use the new script added to package.json:
```bash
npm run start:secure
```

### 3. Environment Variable Solution
Uncomment the SSL configuration in `.env` file:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

## Alternative Solutions

### Option 1: Corporate Network SSL Fix
If you're behind a corporate firewall, configure npm to use your company's certificate:
```bash
npm config set strict-ssl false
npm config set registry http://registry.npmjs.org/
```

### Option 2: Node.js Version
Ensure you're using Node.js >= 20.0.0 as specified in package.json:
```bash
node --version
```

### Option 3: Clear Caches
If issues persist, clear all caches:
```bash
npm cache clean --force
npx expo start -c --clear
```

### Option 4: Use Expo CLI with Tunnel
For network issues, use tunneling:
```bash
npm run tunnel
```

## Package Updates
The following packages were updated to latest compatible versions:
- expo: ~51.0.39
- @expo/vector-icons: ^14.0.3  
- expo-contacts: ~13.0.5
- expo-font: ~12.0.10
- expo-router: ~3.5.24
- jest-expo: ~51.0.4
- react-native: 0.74.5
- react-native-safe-area-context: 4.10.5

## Security Note
The `NODE_TLS_REJECT_UNAUTHORIZED=0` setting disables SSL certificate verification. Only use this for development environments and consider finding a more secure solution for production builds.

## Recommended Approach
1. Use `npm run start:secure` for development
2. Keep the .env variable commented out by default
3. Only enable SSL bypass when encountering certificate issues
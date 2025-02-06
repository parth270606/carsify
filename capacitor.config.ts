import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ridenjoy.app',
  appName: 'ride-n-joy',
  webDir: 'dist',
  server: {
    url: 'https://b74936fd-6844-4b2b-ba1c-88fa61f30de9.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  bundledWebRuntime: false
};

export default config;
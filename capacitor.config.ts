import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'FinanceTracker',
  webDir: 'www',
  server: {
    cleartext: true,
    allowNavigation: ['192.168.29.12'],
  },
};

export default config;

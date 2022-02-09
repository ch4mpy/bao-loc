import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.c4_soft.bao_loc',
  appName: 'bao-loc',
  webDir: '../../dist/bao-loc',
  server: {
    hostname: 'localhost',
    androidScheme: 'https'
  }
};

export default config;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export type KleithorApiResponse<T = undefined> = {
  status: number;
  code: string;
  message: string;
  data: T;
};

export type KleithorDeviceTokenResponse = {
  id: number;
  active: boolean;
  token: string;
  created_at: string;
};

export class NotificationService {
  static asyncStorageKey = 'a3pli.pushNotifications';
  private static apiHost = 'https://backend.tklein.it';

  static async getLocalSavedState(): Promise<boolean | null> {
    const result = await AsyncStorage.getItem(this.asyncStorageKey);
    return result === null ? null : result === 'true';
  }

  static async setLocalSavedState(enabled: boolean) {
    return await AsyncStorage.setItem(this.asyncStorageKey, enabled + '');
  }

  static async getExpoPushToken() {
    let token = '';
    if (Device !== undefined && Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
    return token;
  }

  static async getDevicePushToken() {
    let token = '';
    if (Device !== undefined && Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
    return token;
  }

  static async register(deviceToken: string) {
    try {
      const body = {
        token: deviceToken,
      };
      const options: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };
      const req = await axios.post(this.apiHost + '/v1/infoapp/', body, options);
      const res = (await req.data) as unknown as KleithorApiResponse<KleithorDeviceTokenResponse>;
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else throw new Error("Couldn't update the device token");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  static async update(deviceToken: string, enabled: boolean = true) {
    try {
      const body = {
        token: deviceToken,
        active: enabled,
      };
      const options: AxiosRequestConfig = {
        headers: { 'Content-Type': 'application/json' },
      };
      const req = await axios.post(this.apiHost + '/v1/infoapp/', body, options);
      const res = (await req.data) as unknown as KleithorApiResponse<KleithorDeviceTokenResponse>;
      if (res.status >= 200 && res.status < 300) {
        return res;
      } else throw new Error("Couldn't update the device token");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
}

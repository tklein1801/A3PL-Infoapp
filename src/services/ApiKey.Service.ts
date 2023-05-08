import AsyncStorage from '@react-native-async-storage/async-storage';
import { IStoreContext } from '../context/Store.context';
import { PanthorService } from './Panthor.service';

export class ApiKeyService {
  private static storageKey = 'a3pli.api_key';

  static async retrive() {
    try {
      const result = await AsyncStorage.getItem(this.storageKey);
      return typeof result === 'string' && result.length > 0 ? result : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  static async save(key: IStoreContext['apiKey']) {
    try {
      if (key === null) return await AsyncStorage.removeItem(this.storageKey);
      await AsyncStorage.setItem(this.storageKey, key);
    } catch (err) {
      console.error(err);
    }
  }

  static async validate(key: IStoreContext['apiKey']) {
    return PanthorService.validateSecret(key);
  }
}

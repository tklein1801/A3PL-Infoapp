import axios from 'axios';
import { Panthor } from '../constants/';
import { Changelog, MarketItem, Profile, RpgServer, Server, ShopType, Vehicle } from '../types/';
import type {
  ApiResponse,
  ChangelogResponse,
  ErrorResponse,
  MarketItemResponse,
  ProfileResponse,
  RpgServerResponse,
  ServerResponse,
  ShopCategory,
  ShopTypeResponse,
  ValidSecretResponse,
  VehicleResponse,
} from '../types/';

export class PanthorService {
  static async validateSecret(apiKey: string): Promise<Boolean> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/validate/' + apiKey);
      const json: ValidSecretResponse | ErrorResponse = await response.data;
      return json.status === 'Success';
    } catch (message) {
      console.error(message);
      return false;
    }
  }

  static async getProfile(apiKey: string): Promise<Profile | null> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/' + apiKey);
      const json: ApiResponse<ProfileResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) throw new Error(JSON.stringify(json));
      return new Profile(json.data[0]);
    } catch (message) {
      console.error(message);
      return null;
    }
  }

  static async getVehicles(apiKey: string): Promise<Vehicle[]> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/' + apiKey + '/vehicles');
      const json: ApiResponse<VehicleResponse> = await response.data;
      return json.data.map((props) => new Vehicle(props));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getChangelogs(): Promise<Changelog[]> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/changelog');
      const json: ApiResponse<ChangelogResponse> = await response.data;
      return json.data.map((props) => new Changelog(props));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getServers(): Promise<RpgServer[] | Server[]> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/servers');
      const json: ApiResponse<RpgServerResponse | ServerResponse> = await response.data;
      return [
        ...json.data.map((server) =>
          server.Id < 16 ? new RpgServer(server as RpgServerResponse) : new Server(server as ServerResponse)
        ),
      ];
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getMarket(serverId: number): Promise<MarketItem[]> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/market/' + serverId);
      const json: ApiResponse<MarketItemResponse> = await response.data;
      return json.data.map((item) => new MarketItem(item));
    } catch (message) {
      console.error(message);
      return [];
    }
  }

  static async getShopTypes(category: ShopCategory): Promise<ShopType[]> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + `/v1/info/${category}_shoptypes`);
      const json: ApiResponse<ShopTypeResponse> = await response.data;
      return json.data.map((shop) => new ShopType(category, shop));
    } catch (message) {
      console.error(message);
      return [];
    }
  }
}

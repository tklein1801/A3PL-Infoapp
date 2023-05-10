import axios from 'axios';
import { Panthor } from '../constants/panthor.constant';
import { Changelog, MarketItem, Profile, RpgServer, Server, ShopType, Vehicle } from '../types';
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
} from '../types';
import { ServiceResponse, handleServiceError } from './ServiceResponse';
import type { TServiceResponse } from './ServiceResponse';

export class PanthorService {
  static options = {
    timeout: 2 * 1000,
  };

  static async validateSecret(apiKey: string): Promise<TServiceResponse<boolean>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/validate/' + apiKey);
      const json: ValidSecretResponse | ErrorResponse = await response.data;
      if (response.status !== 200 || json.status === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(json.status === 'Success');
    } catch (error) {
      return handleServiceError(false, error);
    }
  }

  static async getProfile(apiKey: string): Promise<TServiceResponse<Profile | null>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/' + apiKey);
      const json: ApiResponse<ProfileResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(new Profile(json.data[0]));
    } catch (error) {
      return handleServiceError(null, error);
    }
  }

  static async getVehicles(apiKey: string): Promise<TServiceResponse<Vehicle[]>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/player/' + apiKey + '/vehicles');
      const json: ApiResponse<VehicleResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(json.data.map((props) => new Vehicle(props)));
    } catch (error) {
      return handleServiceError([], error);
    }
  }

  static async getChangelogs(): Promise<TServiceResponse<Changelog[]>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/changelog');
      const json: ApiResponse<ChangelogResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(json.data.map((props) => new Changelog(props)));
    } catch (error) {
      return handleServiceError([], error);
    }
  }

  static async getServers(): Promise<TServiceResponse<RpgServer[] | Server[]>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/servers', this.options);
      const json: ApiResponse<ServerResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse([
        ...json.data.map((server) =>
          server.Id < 16 ? new RpgServer(server as RpgServerResponse) : new Server(server as ServerResponse)
        ),
      ]);
    } catch (error) {
      return handleServiceError([], error);
    }
  }

  static async getMarket(serverId: number): Promise<TServiceResponse<MarketItem[]>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + '/v1/market/' + serverId);
      const json: ApiResponse<MarketItemResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(json.data.map((item) => new MarketItem(item)));
    } catch (error) {
      return handleServiceError([], error);
    }
  }

  static async getShopTypes(category: ShopCategory): Promise<TServiceResponse<ShopType[]>> {
    try {
      const response = await axios.get(Panthor.apiBaseUrl + `/v1/info/${category}_shoptypes`);
      const json: ApiResponse<ShopTypeResponse> = await response.data;
      if (response.status !== 200 || json.data === undefined) {
        throw new Error(JSON.stringify(json));
      }
      return ServiceResponse(json.data.map((shop) => new ShopType(category, shop)));
    } catch (error) {
      return handleServiceError([], error);
    }
  }
}

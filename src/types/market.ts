import { Panthor } from '../constants/';
import type { ApiResponse } from './api_response';

const ILLEGAL_ITEMS = [
  'cocaine_r',
  'fentanyl_r',
  'heroin_r',
  'lsd',
  'moonshiner',
  'purple_haze_r',
  'white_russian_r',
  'white_widow_r',
  'wine_r',
  'met',
  'vodka',
  'beer',
];

export type MarketItemResponse = {
  item: string;
  price: number;
  server: number;
  updated_at: string;
  created_at: string;
  localized: string;
  export_virt_item?: {
    item: string;
    name: string;
    sellPrice: number;
    buyPrice: number;
    illegal: number;
    exp: number;
    weight: number;
    market: number;
    icon: string;
  };
};

export type ItemBacklogResponse = {
  id: number;
  item: string;
  price: number;
  server_id: number;
  created_at: string;
};

export class ItemBacklog {
  id: number;
  item: string;
  price: number;
  serverId: number;
  createdAt: Date;

  constructor({ id, item, price, server_id, created_at }: ItemBacklogResponse) {
    this.id = id;
    this.item = item;
    this.price = price;
    this.serverId = server_id;
    this.createdAt = new Date(created_at);
  }
}

export class MarketItem {
  item: string;
  price: number;
  server: number;
  updatedAt: Date;
  createdAt: Date;
  localized: string;
  exportVirtItem?: {
    item: string;
    name: string;
    sellPrice: number;
    buyPrice: number;
    illegal: boolean;
    exp: number;
    weight: number;
    market: number;
    icon: string;
  };

  constructor({ item, price, server, updated_at, created_at, localized, export_virt_item }: MarketItemResponse) {
    this.item = item;
    this.price = price;
    this.server = server;
    this.updatedAt = new Date(updated_at);
    this.createdAt = new Date(created_at);
    this.localized = localized;
    if (export_virt_item) {
      this.exportVirtItem = {
        ...export_virt_item,
        illegal: this.isIllegal(),
      };
    }
  }

  isIllegal(): boolean {
    return this.exportVirtItem ? this.exportVirtItem.illegal : ILLEGAL_ITEMS.includes(this.item);
  }

  getImageUrl(): string {
    return `https://files.dulliag.de/app/market_${this.item}.png`;
  }

  async getPriceBacklog(server: number, backlogCount: number) {
    try {
      const response = await fetch(`${Panthor.apiBaseUrl}/v1/market_logs/${server}/${this.item}/${backlogCount}`);
      const backlog: ApiResponse<[ItemBacklogResponse]> = await response.json();
      return backlog.data[0].map((item) => new ItemBacklog(item));
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

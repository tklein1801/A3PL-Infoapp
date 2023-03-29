import { Timezone, TimezoneResponse } from './api_response';

export type ServerResponse = {
  Id: number;
  ModId: number;
  appId: number;
  online: number;
  Servername: string;
  Description: string | null;
  IpAddress: string;
  Port: number;
  ServerPassword: number | string;
  Gamemode: number;
  StartParameters: string;
  Slots: number;
  Update_Mods: number;
  Playercount: number;
  Players: string[];
  updated_at: TimezoneResponse;
};

export class Server {
  id: number;
  modId: number;
  appId: number;
  online: boolean;
  servername: string;
  description: string | null;
  ipAddress: string;
  port: number;
  serverPassword: number | string;
  gamemode: number;
  startParameters: string;
  slots: number;
  updateMods: number;
  playercount: number;
  players: string[];
  updatedAt: Timezone;

  constructor(data: ServerResponse) {
    this.id = data.Id;
    this.modId = data.ModId;
    this.appId = data.appId;
    this.online = data.online === 1;
    this.servername = data.Servername;
    this.description = data.Description;
    this.ipAddress = data.IpAddress;
    this.port = data.Port;
    this.serverPassword = data.ServerPassword;
    this.gamemode = data.Gamemode;
    this.startParameters = data.StartParameters;
    this.slots = data.Slots;
    this.updateMods = data.Update_Mods;
    this.playercount = data.Playercount;
    this.players = data.Players.sort();
    this.updatedAt = new Timezone(data.updated_at);
  }
}

export type RpgServerResponse = ServerResponse & {
  Civilians: number;
  Medics: number;
  Cops: number;
  Adac: number;
  Side: {
    Civs: string[];
    Medics: string[];
    Cops: string[];
    RAC: string[];
  };
};

export class RpgServer extends Server {
  civilians: number;
  medics: number;
  cops: number;
  rac: number;
  justice: number;
  side: {
    civs: string[];
    medics: string[];
    cops: string[];
    justice: string[];
    rac: string[];
  };

  constructor(data: RpgServerResponse) {
    super(data);
    const onlineDojPlayers: string[] = data.Side.Cops.filter((player) => player.includes('[Justiz]'));
    const onlinePolicePlayers: string[] = data.Side.Cops.filter((player) => !player.includes('[Justiz]'));
    this.civilians = data.Civilians;
    this.medics = data.Medics;
    this.rac = data.Adac;
    this.justice = onlineDojPlayers.length;
    this.cops = onlinePolicePlayers.length;
    this.side = {
      civs: data.Side.Civs.sort(),
      medics: data.Side.Medics.sort(),
      rac: data.Side.RAC.sort(),
      justice: onlineDojPlayers.sort(),
      cops: onlinePolicePlayers.sort(),
    };
  }
}

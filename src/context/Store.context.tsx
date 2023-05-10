import React from 'react';
import { PanthorService } from '../services';
import { ApiKeyService } from '../services/ApiKey.Service';
import type { Profile, RpgServer, Server } from '../types';

type StoreContextDispatch<K extends keyof IStoreContext> = React.Dispatch<React.SetStateAction<IStoreContext[K]>>;

export interface IStoreContext {
  loading: boolean;
  setLoading: StoreContextDispatch<'loading'>;
  refreshing: boolean;
  setRefreshing: StoreContextDispatch<'refreshing'>;
  /** Tells if we're currently checking if an `API-Key` is set on the device or not */
  checking: boolean;
  setChecking: StoreContextDispatch<'checking'>;
  apiKey: string | null;
  setApiKey: StoreContextDispatch<'apiKey'>;
  profile: Profile | null;
  setProfile: StoreContextDispatch<'profile'>;
  servers: RpgServer[] | Server[];
  setServers: StoreContextDispatch<'servers'>;
}

export const StoreContext = React.createContext({} as IStoreContext);

export const StoreProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [checking, setChecking] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [apiKey, setApiKey] = React.useState<IStoreContext['apiKey']>(null);
  const [profile, setProfile] = React.useState<IStoreContext['profile']>(null);
  const [servers, setServers] = React.useState<IStoreContext['servers']>([]);

  React.useLayoutEffect(() => {
    setChecking(true);
    ApiKeyService.retrive()
      .then(setApiKey)
      .catch(() => setApiKey(null))
      .finally(() => setChecking(false));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (apiKey) {
      PanthorService.getProfile(apiKey)
        .then(({ data }) => setProfile(data))
        .catch(() => setProfile(null))
        .finally(() => setLoading(false));
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [apiKey]);

  return (
    <StoreContext.Provider
      value={React.useMemo(
        () => ({
          loading,
          setLoading,
          refreshing,
          setRefreshing,
          checking,
          setChecking,
          apiKey,
          setApiKey,
          profile,
          setProfile,
          servers,
          setServers,
        }),
        [loading, refreshing, checking, apiKey, profile, servers]
      )}
    >
      {children}
    </StoreContext.Provider>
  );
};

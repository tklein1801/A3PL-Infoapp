import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import type { CardProps } from 'react-native-paper';
import { Icon, IconSize } from '../Icon';
import type { IconProps } from '../Icon';

export type Reason = 'NO_RESULTS' | 'NETWORK_ERR' | 'MISSING_API_KEY' | 'UNKNOWN_ERROR';

export function isReason(reason: string) {
  return (
    reason === 'NO_RESULTS' || reason === 'NETWORK_ERR' || reason === 'MISSING_API_KEY' || reason === 'UNKNOWN_ERROR'
  );
}

export type NoResultsProps = {
  icon?: IconProps['icon'];
  iconProps?: Omit<IconProps, 'icon'>;
  message?: string;
  reason?: Reason;
} & Pick<CardProps, 'style'>;

export enum ResultMessage {
  NoResults = 'Keine Ergebnisse',
  NetworkError = 'Netzwerfehler',
  MissingApiKey = 'API-Key nicht gesetzt',
  UnknownError = 'Unbekannter Fehler',
}

export const NoResults: React.FC<NoResultsProps> = ({ message, reason, icon, iconProps, ...rest }) => {
  const displayedMessage = React.useMemo(() => {
    if (message) return message;
    switch (reason) {
      case 'NETWORK_ERR':
        return ResultMessage.NetworkError;

      case 'NO_RESULTS':
        return ResultMessage.NoResults;

      case 'MISSING_API_KEY':
        return ResultMessage.MissingApiKey;

      case 'UNKNOWN_ERROR':
      default:
        return ResultMessage.UnknownError;
    }
  }, [reason, message]);

  const displayedIcon = React.useMemo(() => {
    if (icon) return icon;
    switch (reason) {
      case 'NETWORK_ERR':
        return 'access-point-network-off';

      case 'NO_RESULTS':
        return 'text-search';

      case 'MISSING_API_KEY':
        return 'account-key';

      case 'UNKNOWN_ERROR':
      default:
        return 'help-circle-outline';
    }
  }, [reason]);

  return (
    <Card style={[rest.style, { padding: 16 }]}>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <Icon icon={displayedIcon} size={IconSize.large} {...iconProps} />
      </View>
      <Text variant="titleMedium" style={{ textAlign: 'center', marginTop: 8 }}>
        {displayedMessage}
      </Text>
    </Card>
  );
};

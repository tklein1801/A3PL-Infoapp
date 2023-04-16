import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Icon, IconSize } from '../Icon';

export type StatsCardProps = {
  icon?: string;
  title: string;
  subtitle?: string;
};

export const StatsCard: React.FC<StatsCardProps> = ({ icon, title, subtitle }) => {
  return (
    <Card style={{ flex: 1 }}>
      <Card.Content style={{ display: 'flex', flexDirection: 'row' }}>
        {icon && <Icon icon={icon} size={IconSize.small} style={{ marginRight: 8 }} />}
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <Text variant="titleSmall">{title}</Text>
          {subtitle && <Text variant="labelSmall">{subtitle}</Text>}
        </View>
      </Card.Content>
    </Card>
  );
};

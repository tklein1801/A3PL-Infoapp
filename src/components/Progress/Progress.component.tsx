import React from 'react';
import { View } from 'react-native';
import { Surface, Text, useTheme } from 'react-native-paper';

export interface ProgressProps {
  currentLevel?: number;
  progress: number;
  withLabel?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({ currentLevel, progress, withLabel = false }) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      {withLabel && (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="labelMedium">{currentLevel}</Text>
          <Text variant="labelMedium">{currentLevel + 1}</Text>
        </View>
      )}
      <Surface
        style={{
          width: '100%',
          height: 20,
          borderRadius: theme.roundness,
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: 20,
            borderRadius: theme.roundness,
            backgroundColor: theme.colors.primary,
          }}
        ></View>
      </Surface>
    </React.Fragment>
  );
};

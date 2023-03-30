import { format } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { List, Surface, Text, useTheme } from 'react-native-paper';
import { Changelog as ChangelogModel } from '../../types';

export type ChangelogProps = {
  changelog: ChangelogModel;
  isFirst?: boolean;
  isLast?: boolean;
  isExpanded?: boolean;
};

export const Changelog: React.FC<ChangelogProps> = ({
  changelog,
  isFirst = false,
  isLast = false,
  isExpanded = false,
}) => {
  const theme = useTheme();
  const { id, version, changeMission, changeMod, changeMap, releaseAt } = changelog;
  const accordionStyle = {
    backgroundColor: theme.colors.elevation.level1,
    borderTopLeftRadius: isFirst ? theme.roundness * 3 : 0,
    borderTopRightRadius: isFirst ? theme.roundness * 3 : 0,
    borderBottomLeftRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
    borderBottomRightRadius: isLast && !isExpanded ? theme.roundness * 3 : 0,
  };

  const surfaceStyle = {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
    borderBottomRightRadius: isLast && isExpanded ? theme.roundness * 3 : 0,
  };
  return (
    <List.Accordion id={id} title={`Changelog v${version} - ${format(releaseAt, 'dd.MM.yy')}`} style={accordionStyle}>
      <Surface style={surfaceStyle}>
        {changeMission.length > 0 && (
          <React.Fragment>
            <Text variant="titleSmall">Mission</Text>
            <View>
              {changeMission.map((change, idx) => (
                <Text key={id + '-mission-' + idx}>{change}</Text>
              ))}
            </View>
          </React.Fragment>
        )}

        {changeMod.length > 0 && (
          <React.Fragment>
            <Text variant="titleSmall" style={{ marginTop: 16 }}>
              Mod
            </Text>
            <View>
              {changeMod.map((change, idx) => (
                <Text key={id + '-mod-' + idx}>{change}</Text>
              ))}
            </View>
          </React.Fragment>
        )}

        {changeMap.length > 0 && (
          <React.Fragment>
            <Text variant="titleSmall" style={{ marginTop: 16 }}>
              Karte
            </Text>
            <View>
              {changeMap.map((change, idx) => (
                <Text key={id + '-map-' + idx}>{change}</Text>
              ))}
            </View>
          </React.Fragment>
        )}
      </Surface>
    </List.Accordion>
  );
};

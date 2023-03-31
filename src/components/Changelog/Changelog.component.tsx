import { format } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { Changelog as ChangelogModel } from '../../types';
import { Accordion } from '../Accordion/Accordion.component';

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
  const { id, version, changeMission, changeMod, changeMap, releaseAt } = changelog;

  return (
    <Accordion
      id={id}
      title={`Changelog v${version} - ${format(releaseAt, 'dd.MM.yy')}`}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      divider
    >
      <React.Fragment>
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
      </React.Fragment>
    </Accordion>
  );
};

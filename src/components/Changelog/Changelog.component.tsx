import { format } from 'date-fns';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { Changelog as ChangelogModel } from '../../types';
import { Accordion, AccordionProps } from '../Accordion/Accordion.component';

export type ChangelogProps = {
  changelog: ChangelogModel;
} & Pick<AccordionProps, 'isExpanded' | 'isLast' | 'isFirst'>;

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
          <ChangeCategory title="Mission" changes={changeMission} style={{ marginTop: 0 }} />
        )}

        {changeMod.length > 0 && <ChangeCategory title="Mod" changes={changeMod} />}

        {changeMap.length > 0 && <ChangeCategory title="Karte" changes={changeMap} />}
      </React.Fragment>
    </Accordion>
  );
};

type ChangeCategoryProps = {
  title: string;
  changes: ChangelogModel['changeMap'] | ChangelogModel['changeMission'] | ChangelogModel['changeMod'];
  style?: ViewProps['style'];
};

export const ChangeCategory: React.FC<ChangeCategoryProps> = ({ title, changes, style }) => {
  const id = React.useId();
  return (
    <View>
      <Text variant="titleSmall" style={[{ marginTop: 16 }, style]}>
        {title}
      </Text>
      <View>
        {changes.map((change, idx) => (
          <Change key={`${id}-${title.toLowerCase()}-${idx}`}>{change}</Change>
        ))}
      </View>
    </View>
  );
};

type ChangeProps = React.PropsWithChildren;

const Change: React.FC<ChangeProps> = ({ children }) => {
  return (
    <Text>
      {'\u2022'} {children}
    </Text>
  );
};

import React from 'react';
import { View } from 'react-native';
import { Avatar, Chip, Divider, List, TextInput, useTheme } from 'react-native-paper';
import { Phonebook as PhonebookModel, Profile } from '../../types';
import { Accordion } from '../Accordion/Accordion.component';
import { LabelValue } from '../LabelValue/LabelValue.component';
import { NoResults } from '../NoResults/NoResults.component';

export interface PhonebookProps {
  phonebook: PhonebookModel;
}

export const Phonebook: React.FC<PhonebookProps> = ({ phonebook }) => {
  const theme = useTheme();
  const [keyword, setKeyword] = React.useState('');
  const shownContacts = React.useMemo(() => {
    if (keyword.length < 1) return phonebook.phonebook;
    return phonebook.phonebook.filter((pb) => pb.name.toLowerCase().includes(keyword.toLowerCase()));
  }, [keyword, phonebook.phonebook]);

  return (
    <React.Fragment>
      <View style={{ marginTop: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 16, columnGap: 16 }}>
          <View>
            <Avatar.Text label={phonebook.identity.name.slice(0, 2).toUpperCase()} />
          </View>

          <View>
            <LabelValue label="Name" value={phonebook.identity.name} />
            <LabelValue label="Nationalität" value={phonebook.identity.id_nationality} />
          </View>

          <View>
            <LabelValue label="Geburts" value={phonebook.identity.id_birthday.toString()} />
            <LabelValue label="Fraktion" value={<Chip>{phonebook.identity.side.getLabel()}</Chip>} />
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
        <TextInput
          mode="outlined"
          label="Suchen"
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
          style={{ backgroundColor: theme.colors.elevation.level1 }}
        />
      </View>

      <List.Section>
        <List.Subheader>Kontakte</List.Subheader>
        {shownContacts.length < 1 ? (
          <List.Item
            title="Keine Kontakte"
            titleStyle={{ textAlign: 'center' }}
            description={keyword.length > 0 ? `Keine Treffer für '${keyword}'!` : undefined}
            descriptionStyle={{ textAlign: 'center' }}
          />
        ) : (
          shownContacts.map((contact, index) => (
            <React.Fragment key={contact.number}>
              {index !== 0 && <Divider />}
              <List.Item
                left={(props) => <List.Icon icon="account-circle" {...props} />}
                title={contact.name}
                description={`${contact.number || 'Keine Nummer'}\n${contact.iban || 'Keine IBAN'}`}
              />
            </React.Fragment>
          ))
        )}
      </List.Section>
    </React.Fragment>
  );
};

export interface PhonebookWrapperProps {
  phonebooks: Profile['phonebooks'];
}

export const PhonebookWrapper: React.FC<PhonebookWrapperProps> = ({ phonebooks }) => {
  const [currentPhonebook, setCurrentPhonebook] = React.useState<PhonebookModel['idNR'] | null>(null);

  return (
    <React.Fragment>
      {phonebooks.length > 0 ? (
        <List.AccordionGroup
          expandedId={currentPhonebook}
          onAccordionPress={(expandedId) =>
            setCurrentPhonebook(expandedId === currentPhonebook ? null : Number(expandedId))
          }
        >
          {phonebooks.map((phonebook, index, arr) => (
            <Accordion
              key={phonebook.idNR}
              id={phonebook.idNR}
              title={phonebook.identity.name}
              isFirst={index === 0}
              isLast={index === arr.length - 1}
              isExpanded={currentPhonebook === phonebook.idNR}
              surfaceStyle={{ paddingVertical: 0, paddingHorizontal: 0 }}
              divider
            >
              <Phonebook phonebook={phonebook} />
            </Accordion>
          ))}
        </List.AccordionGroup>
      ) : (
        <NoResults message="Keine Kontakte gefunden" />
      )}
    </React.Fragment>
  );
};

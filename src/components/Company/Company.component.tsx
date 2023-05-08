import React from 'react';
import { View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import { formatter } from '../../services';
import { Company as CompanyModel } from '../../types';
import { Accordion, AccordionProps } from '../Accordion';
import { LabelValue } from '../LabelValue';

export type CompanyProps = {
  company: CompanyModel;
} & Pick<AccordionProps, 'isFirst' | 'isLast' | 'isExpanded'>;

export const Company: React.FC<CompanyProps> = ({ company, isFirst, isLast, isExpanded }) => {
  const bankAccounts = company.getBankAccounts();
  return (
    <Accordion
      id={company.id}
      title={company.name}
      description={company.disabled ? 'Inaktiv' : 'Aktiv'}
      isFirst={isFirst}
      isLast={isLast}
      isExpanded={isExpanded}
      surfaceStyle={{ paddingHorizontal: 0, paddingVertical: 0 }}
      divider
    >
      <View style={{ paddingHorizontal: 16 }}>
        <LabelValue label="Telefonnummer" value={company.phone} />
      </View>
      {bankAccounts.length > 0 && (
        <List.Section style={{ marginVertical: 0 }}>
          <List.Subheader style={{ marginTop: 0, paddingTop: 0 }}>Bankverbindungen</List.Subheader>
          {bankAccounts.map((account, index) => (
            <React.Fragment key={account.iban}>
              {index !== 0 && <Divider />}
              <List.Item
                title={`(${index + 1}) ${account.iban}`}
                description={account.owner}
                left={(props) => <List.Icon {...props} icon="credit-card" />}
                right={() => (
                  <View style={{ display: 'flex', justifyContent: 'center' }}>
                    <Text>{formatter.format(account.balance)}</Text>
                  </View>
                )}
              />
            </React.Fragment>
          ))}
        </List.Section>
      )}
    </Accordion>
  );
};

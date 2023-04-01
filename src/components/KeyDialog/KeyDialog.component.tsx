import React from 'react';
import { Button, Dialog, Portal, Text, TextInput, useTheme } from 'react-native-paper';
import { SnackbarContext } from '../../context/Snackbar.context';
import { StoreContext } from '../../context/Store.context';
import { ApiKeyService } from '../../services/ApiKey.Service';

export const KeyDialog = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState('');
  const { checking, apiKey, setApiKey } = React.useContext(StoreContext);
  const { showSnackbar } = React.useContext(SnackbarContext);

  const handleSave = async () => {
    try {
      if (value.length === 0) return showSnackbar({ message: 'API-Key fehlt' });
      const valid = await ApiKeyService.validate(value);
      if (!valid) return showSnackbar({ message: 'Ungültiger API-Key' });
      await ApiKeyService.save(value);
      setApiKey(value);
      showSnackbar({ message: 'API-Key gespeichert' });
    } catch (error) {
      console.error(error);
      showSnackbar({ message: 'Speichern fehlgeschlagen', action: { label: 'Erneut', onPress: handleSave } });
    }
  };

  return (
    <Portal>
      <Dialog visible={!checking && apiKey === null} dismissable={false}>
        <Dialog.Title>Einstellungen</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            Um das volle Potenzial der App auszuschöpfen muss dein Panthor API-Key angegeben werden.
          </Text>

          <TextInput
            mode="outlined"
            label="API-Key"
            value={value}
            onChangeText={setValue}
            style={{ marginTop: 8, backgroundColor: theme.colors.elevation.level3 }}
          />
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={handleSave}>Speichern</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

import React from 'react';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import { expo } from '../../app.json';
import { LabelValue } from '../components/LabelValue/LabelValue.component';
import { Layout } from '../components/Layout/Layout.component';
import { Panthor } from '../constants';
import { SnackbarContext } from '../context/Snackbar.context';
import { StoreContext } from '../context/Store.context';
import { ApiKeyService } from '../services/ApiKey.Service';

export const SettingsScreen = () => {
  const theme = useTheme();
  const { apiKey, setApiKey } = React.useContext(StoreContext);
  const [value, setValue] = React.useState(apiKey);
  const { showSnackbar } = React.useContext(SnackbarContext);

  const handleDelete = async () => {
    try {
      await ApiKeyService.save(null);
      setApiKey(null);
      showSnackbar({ message: 'API-Key gelöscht' });
    } catch (error) {
      console.error(error);
      showSnackbar({ message: 'Löschen fehlgeschlagen', action: { label: 'Erneut', onPress: handleSave } });
    }
  };

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
    <Layout>
      <Card style={{ marginBottom: 16 }}>
        <Card.Title title="Einstellungen" />
        <Card.Content>
          <Text variant="bodyMedium">
            Um das volle Potenzial der App auszuschöpfen muss dein Panthor API-Key angegeben werden.
          </Text>
          <TextInput
            mode="outlined"
            label="API-Key"
            value={value}
            onChangeText={setValue}
            style={{ marginTop: 8, backgroundColor: theme.colors.elevation.level2 }}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="text" onPress={handleDelete}>
            Löschen
          </Button>
          <Button mode="contained" onPress={handleSave}>
            Speichern
          </Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Card.Cover
          source={{
            uri: 'https://opengraph.githubassets.com/27243bf731ee5a6df2277b9717adfb57fe3e680d279a028ff9e6455f47a8516d/tklein1801/A3PLI',
          }}
        />
        <Card.Content>
          <LabelValue label="Name" value={expo.name} />
          <LabelValue label="Version" value={expo.version} />
        </Card.Content>
      </Card>

      <Card>
        <Card.Cover source={{ uri: Panthor.modPreview }} />
        <Card.Content>
          <Text style={{ textAlign: 'center', marginTop: 16 }}>
            Es handelt sich um keine offizielle App von Panthor.de
          </Text>
        </Card.Content>
      </Card>
    </Layout>
  );
};

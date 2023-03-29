import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, CardProps, Text } from 'react-native-paper';
import { RpgServer, Server as ServerType } from '../../types';

export type ServerProps = {
  cardStyle?: CardProps['style'];
  server: RpgServer | ServerType;
  onPress: (server: ServerProps['server']) => void;
};

export const Server: React.FC<ServerProps> = ({ server, onPress, cardStyle }) => {
  return (
    <Card style={cardStyle} onPress={() => onPress(server)}>
      <Card.Title title={server.servername} subtitle={`Online: ${server.players.length}/${server.playercount}`} />
      <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {server instanceof RpgServer ? (
          <React.Fragment>
            <View style={styles.column}>
              <Text>Zivilisten: {server.civilians}</Text>
            </View>
            <View style={styles.column}>
              <Text>Abramier: {server.medics}</Text>
            </View>
            <View style={styles.column}>
              <Text>RAC'ler: {server.rac}</Text>
            </View>
            <View style={styles.column}>
              <Text>Polizisten: {server.cops}</Text>
            </View>
            <View style={styles.column}>
              <Text>Justiz'ler: {server.justice}</Text>
            </View>
          </React.Fragment>
        ) : (
          <View>
            <Text>Spieler: {server.players.length}</Text>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  column: {
    width: '50%',
  },
});

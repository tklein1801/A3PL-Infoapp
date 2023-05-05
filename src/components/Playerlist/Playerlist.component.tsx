import React from 'react';
import { Card, Chip, Text } from 'react-native-paper';
import { Server } from '../../types';

export const Playerlist: React.FC<{ players: Server['players'] }> = ({ players }) => {
  const id = React.useId();

  return (
    <Card>
      <Card.Title title="Spielerliste" />
      <Card.Content style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {players.length > 0 ? (
          players.map((player, index) => (
            <Chip key={id + '-player-' + index + '-' + player} style={{ marginRight: 4, marginBottom: 4 }} compact>
              {player}
            </Chip>
          ))
        ) : (
          <Text>Keine Spieler online</Text>
        )}
      </Card.Content>
    </Card>
  );
};

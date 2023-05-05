import React, { useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Theme } from '../../theme/theme';
import { LayoutProps } from '../Layout/Layout.component';
import { RefreshControl } from '../RefreshControl/RefreshControl.component';

export type HorizontalCardListProps = {
  cards: JSX.Element[];
  onScroll?: (currentIndex: number) => void;
  refreshControl?: LayoutProps['refreshControl'];
};

const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_SPACING = 8;

export const HorizontalCardList: React.FC<HorizontalCardListProps> = ({ cards, onScroll, refreshControl }) => {
  const [currentCard, setCurrentCard] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.round(contentOffset.x / CARD_WIDTH);
    setCurrentCard(currentIndex);
    if (onScroll) onScroll(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // contentContainerStyle={{
        //   backgroundColor: 'red',
        // }}
        refreshControl={
          refreshControl ? (
            <RefreshControl refreshing={refreshControl.refreshing} onRefresh={refreshControl.onRefresh} />
          ) : undefined
        }
      >
        {cards.map((card, index) => (
          <View
            key={index}
            style={[
              styles.itemContainer,
              // { width: CARD_WIDTH, marginRight: index === cards.length - 1 ? 0 : CARD_SPACING },
            ]}
          >
            {card}
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {cards.map((card, index) => (
          <View key={index} style={[styles.indicator, index === currentCard && styles.currentIndicator]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    width: CARD_WIDTH,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    // @ts-ignore
    backgroundColor: Theme.colors.surfaceDisabled,
    margin: 4,
  },
  currentIndicator: {
    backgroundColor: Theme.colors.primary,
  },
});

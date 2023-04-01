import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Theme } from '../../theme/theme';
import { KeyDialog } from '../KeyDialog/KeyDialog.component';
import { RefreshControl } from '../RefreshControl/RefreshControl.component';

export type LayoutProps = React.PropsWithChildren & {
  refreshControl?: { refreshing: boolean; onRefresh: () => void };
};

export const Layout: React.FC<LayoutProps> = ({ refreshControl = undefined, children }) => {
  return (
    <ScrollView
      refreshControl={
        refreshControl ? (
          <RefreshControl refreshing={refreshControl.refreshing} onRefresh={refreshControl.onRefresh} />
        ) : undefined
      }
      style={styles.scrollView}
    >
      <View style={styles.container}>
        <KeyDialog />
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Theme.colors.background,
  },
  container: {
    margin: 16,
  },
});

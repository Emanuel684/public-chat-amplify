import * as React from 'react';
import { StyleSheet } from 'react-native';

import Components_Login from '../components/Components_Login';
import { Text, View } from '../components/Themed';

export default function TabChat() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Public chat after login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Components_Login path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

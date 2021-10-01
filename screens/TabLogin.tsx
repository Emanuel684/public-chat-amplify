import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Components_Login from '../components/Components_Login';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Components_Chat from '../components/Components_Chat';


function TabLogin({ navigation }: RootTabScreenProps<'TabLogin'>) {

  const [login, onChangeLogin] = React.useState(null);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.separator} />
        {/* Component of chat */}
        
        <Components_Chat login={login} />

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        {/* Component of Login */}
        <Components_Login onChangeLogin={onChangeLogin} login={login} />

      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});

export default TabLogin;
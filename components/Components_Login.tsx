import React from 'react';
import { StyleSheet, SafeAreaView, TextInput, Button } from 'react-native';

import { View } from './Themed';

import { withAuthenticator } from 'aws-amplify-react-native';

// This is the part for the suscription 
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createMessage } from "../src/graphql/mutations";

import Components_SingOut from '../components/Components_SingOut';

import { useEffect } from 'react';

function Components_Login({ onChangeLogin, login }: { onChangeLogin: any, login: any }) {

  const [message, onChangeMessage] = React.useState('');

  useEffect(() => {
    onChangeLogin(true)
  }, [])

  return (
    <View>
      <Components_SingOut onChangeLogin={onChangeLogin} login={login} />
      <SafeAreaView style={{ paddingBottom: 20 }} >
        <View style={{ width: 250 }}>
          <TextInput
            multiline={true}
            numberOfLines={20}
            maxLength={300}
            style={styles.input}
            onChangeText={Text => onChangeMessage(Text)}
            placeholder="Message"
            value={message}
          />
        </View>
        <Button
          onPress={() => {
            sendMessage(message)
            onChangeMessage('')
          }}
          title="Send message"
          color="#ff9900" />
      </SafeAreaView>
    </View>
  );
}

async function sendMessage(message: string) {
  const send_message = {
    username: await Auth.currentAuthenticatedUser().then((a) => a.username),
    message: message,
  };
  return await API.graphql(graphqlOperation(createMessage, { input: send_message }));
}



const styles = StyleSheet.create({
  input: {
    height: 80,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: '#ffe6bf',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  button: {
    backgroundColor: '#33AAFF',
    borderWidth: 10,
    borderRadius: 20,
    borderColor: "#33AAFF",
    padding: 5,
  }
});


export default withAuthenticator(Components_Login);
import React, { useRef } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';

import { Text, View } from './Themed';

// This is the part for the suscription 
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { onCreateMessage } from '../src/graphql/subscriptions';
import { listMessages } from "../src/graphql/queries";

import { useEffect } from 'react';


export default function Components_Chat({ login }: { login: any }) {

  const [data_message, onChangeDataMessage] = React.useState([]) as any;

  const [usernamelogin, onChangeUsernameLogin] = React.useState(Auth.currentAuthenticatedUser().then((a) => a.username)) as any;

  const [validator, onChangeValidator] = React.useState(true);

  useEffect(() => {
    if (validator) {
      getData();
      onChangeValidator(false);
    }

    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: async (todoData: any) => {
        const array = Array.from(data_message).concat([todoData.value.data.onCreateMessage]);
        onChangeDataMessage(array);
      }
    });
    scrollRef.current.scrollTo({ y: 30000, Animation: true });
    return (() => {
      subscription.unsubscribe()
    })
  }, [data_message, usernamelogin])

  async function getData() {
    API.graphql(graphqlOperation(listMessages, { limit: 20 })).then((evt: any) => {
      return (onChangeDataMessage(evt.data.listMessages.items));
    });
  }

  const scrollRef = useRef();


  return (
    <SafeAreaView>
      <View style={{ width: '95%', height: 500 }}>
        <Text style={styles.title}>Chat online</Text>

        <ScrollView nestedScrollEnabled={true} horizontal={false}
          // onLayout={(event) =>
          //   console.log(event.nativeEvent.layout)
          // }
          ref={scrollRef}
          decelerationRate="normal"
          showsVerticalScrollIndicator={false}
        >

          {
            data_message.map((todo: any, i: any) => {
              Auth.currentAuthenticatedUser().then((a) => onChangeUsernameLogin(a.username));
              if (todo.username == usernamelogin && login == true) {
                return (
                  <View style={styles.container_message_principal} key={todo.id}>
                    <View style={styles.card_message_principaluser}>
                      <Text style={styles.username}>{todo.username}</Text>
                      <Text style={styles.message_text}>{todo.message}</Text>
                    </View>
                  </View>
                )
              } else if (todo.username != usernamelogin) {
                return (
                  <View style={styles.container_message_second} key={todo.id}>
                    <View style={styles.card_message_seconduser}>
                      <Text style={styles.username}>{todo.username}</Text>
                      <Text style={styles.message_text}>{todo.message}</Text>
                    </View>
                  </View>
                )
              } else if (todo.username == usernamelogin) {
                return (
                  <View style={styles.container_message_second} key={todo.id}>
                    <View style={styles.card_message_seconduser}>
                      <Text style={styles.username}>{todo.username}</Text>
                      <Text style={styles.message_text}>{todo.message}</Text>
                    </View>
                  </View>
                )
              }
            })
          }

        </ScrollView>


      </View>
    </SafeAreaView>
  );


}


const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: '#ff9900',
    borderRadius: 10,
    textAlign: 'center',
  },
  card_message_principaluser: {
    backgroundColor: '#ff9900',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: '#ffb445',
  },
  message_text: {
    fontSize: 18,
  },
  username: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  container_message_principal: {
    backgroundColor: '#fff4e3',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingEnd: 10,
  },
  container_message_second: {
    backgroundColor: '#fff4e3',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingStart: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  card_message_seconduser: {
    backgroundColor: '#ffcc82',
    borderRadius: 10,
    padding: 10,
  },
});

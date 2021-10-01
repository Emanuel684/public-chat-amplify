import React from 'react';
import { StyleSheet, Button } from 'react-native';

import { View } from './Themed';

import { Auth } from 'aws-amplify';

export default function Components_SingOut({ onChangeLogin, login }: { onChangeLogin: any, login:any}) {
    return (
        <View style={{ paddingTop: 50 }}>
            <Button
                onPress={signOut}
                title="Sing Out of the chat"
                color="#ff9900"
            />
        </View>
    );

    async function signOut() {
        try {
            Auth.signOut({ global: true });
            onChangeLogin(false)
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
}


const styles = StyleSheet.create({

});

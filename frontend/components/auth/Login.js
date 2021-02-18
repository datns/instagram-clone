import React from 'react';
import { View, Button, TextInput } from "react-native";
import firebase from "firebase";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSignIn = async () => {
        try {
            const result = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('result', result);
        } catch(error) {
            console.log('error', error);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="email"
                onChangeText={(email) => setEmail(email)}
            />
            <TextInput
                placeholder="password"
                secureTextEntry
                onChangeText={(password) => setPassword(password)}
            />
            <Button
                onPress={onSignIn}
                title="Sign In"
            />
        </View>
    )
}

import React from 'react';
import {View, Button, TextInput} from "react-native";
import firebase from "firebase";

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const onSignUp = async () => {
        try {
            const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
            if (result) {
                const newUser = firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                    });
                console.log('newUser', newUser);
            }
            console.log('result', result);
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <View>
            <TextInput
                placeholder="name"
                onChangeText={(name) => setName(name)}
            />
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
                onPress={onSignUp}
                title="Sign Up"
            />
        </View>
    )
}

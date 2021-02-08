import React from 'react';
import { View, Button, TextInput } from "react-native";

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const onSignUp = () => {

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
                onPress={() => {}}
                title="Sign Up"
            />
        </View>
    )
}

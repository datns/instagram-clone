import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import * as firebase from "firebase";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import {Text} from "react-native-web";

const firebaseConfig = {
    apiKey: "AIzaSyBdbXRIEsqD4V2gH0xnvwAStVRjL6zZWkQ",
    authDomain: "instagram-clone-f93ef.firebaseapp.com",
    projectId: "instagram-clone-f93ef",
    storageBucket: "instagram-clone-f93ef.appspot.com",
    messagingSenderId: "974388182811",
    appId: "1:974388182811:web:6a430609d42022adab1dbe",
    measurementId: "G-DXWG6RSTKW"
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const Stack = createStackNavigator();

export default function App() {
    const [loaded, setLoaded] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(!user) {
                setLoggedIn(false);
            } else {
                setLoggedIn(true);
            }
            setLoaded(true);
        })
    }, [])

    if (!loaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Loading</Text>
            </View>
        )
    }

    if (!loggedIn) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>User is logged in</Text>
        </View>
    )
}

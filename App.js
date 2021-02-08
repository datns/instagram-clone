import 'react-native-gesture-handler';
import React from 'react';
import * as firebase from "firebase";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';

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
    return (
        <NavigationContainer>
           <Stack.Navigator initialRouteName="Landing">
               <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }}/>
               <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
           </Stack.Navigator>
        </NavigationContainer>
    );
}

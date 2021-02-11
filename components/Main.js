import React from 'react';
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, fetchUserPosts} from "../redux/actions";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import AddScreen from './main/Add';
import Add from "./main/Add";

const Tab = createMaterialBottomTabNavigator();

const EmptyView = () => <View />;
export default function Main() {
    const dispatch = useDispatch();
    const currentUser = useSelector(store => store.userState.currentUser);

    console.log('currentUser', currentUser)
    React.useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchUserPosts());
    }, []);

    if (!currentUser)
        return (
            <View/>
        )
    return (
        <Tab.Navigator initialRouteName="Feed" labeled={false}>
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="AddContainer"
                component={EmptyView}
                listeners={({navigation}) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate('Add')
                    }
                })}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

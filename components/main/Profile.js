import React from 'react';
import { View, Text } from 'react-native';
import {useSelector} from "react-redux";
import store from '../../redux/store';

export default function Profile() {
    const posts = useSelector(store => store.userState.posts);
    const currentUser = useSelector(store => store.userState.currentUser);
    console.log('posts', posts);
    return(
        <View>
            <Text>Profile</Text>
        </View>
    )
}

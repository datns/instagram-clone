import React from 'react';
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../redux/actions";

export default function Main() {
    const dispatch = useDispatch();
    const currentUser = useSelector(store => store.userState.currentUser);

    console.log('currentUser', currentUser)
    React.useEffect(() => {
        dispatch(fetchUser());
    }, []);

    if (!currentUser)
        return(
            <View />
        )
    return (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Text>{currentUser.name} is logged in</Text>
        </View>
    )
}

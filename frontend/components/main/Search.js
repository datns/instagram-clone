import React from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import firebase from "firebase";
import "firebase/firestore";

export default function Search({navigation}) {
    const [users, setUsers] = React.useState([]);

    const fetchUsers = async (search) => {
        try {
            const snapshot = await firebase.firestore()
                .collection('users')
                .where('name', '>=', search)
                .get();
            console.log('snapshot', snapshot);
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data};
            });
            setUsers(users);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <View>
            <TextInput onChangeText={(search) => fetchUsers(search)} placeholder="Type Here..."/>
            <FlatList
                numColumns={1}
                data={users}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Profile", {uid: item.id})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import {useSelector} from "react-redux";

export default function Profile() {
    const posts = useSelector(store => store.userState.posts);
    const currentUser = useSelector(store => store.userState.currentUser);
    console.log('posts', posts);
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.containerImage}>
                                <Image
                                    style={styles.image}
                                    source={{uri: item.downloadURL}}
                                />
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
    containerInfo: {
        margin: 10
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,
    },
    image: {
        flex: 1,
        aspectRatio: 1
    }
});

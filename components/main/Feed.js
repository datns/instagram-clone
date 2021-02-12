import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector} from "react-redux";

export default function Feed(props) {
    const users = useSelector(state => state.usersState.users);
    const usersLoaded = useSelector(state => state.usersState.usersLoaded);
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        let posts = [];
        users.map(user => {
            if (!!user.posts)
                posts = [...posts, ...user.posts]
        })

        posts.sort(function (x, y) {
            return x.creation - y.creation;
        })
        setPosts(posts);
    }, [usersLoaded, users])

    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    data={posts}
                    renderItem={({item}) => (
                        <View style={styles.containerImage}>
                            <Text>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{uri: item.downloadURL}}
                            />
                        </View>
                    )}
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
})

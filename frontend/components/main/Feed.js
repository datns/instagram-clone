import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, Button} from 'react-native';
import {useSelector} from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

export default function Feed({navigation}) {
    const users = useSelector(state => state.usersState.users);
    const following = useSelector(state => state.userState.following);
    const usersFollowingLoaded = useSelector(state => state.usersState.usersFollowingLoaded);
    const feed = useSelector(state => state.usersState.feed);
    const [posts, setPosts] = React.useState([]);

    console.log('feed', feed);

    React.useEffect(() => {
        let posts = [];
        if (usersFollowingLoaded === following.length && following.length !== 0) {
            feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(feed);
        }

    }, [usersFollowingLoaded, following, feed])

    const onLikePress = async (userId, postId) => {
        await firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({});

        await firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .update({
                likesCount: firebase.firestore.FieldValue.increment(1)
            })
    }

    const onDislikePress = async (userId, postId) => {
        await firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete();

        await firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .update({
                likesCount: firebase.firestore.FieldValue.increment(-1)
            })
    }
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
                            {item.currentUserLike ?
                                (
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)}
                                    />
                                ): (
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)}
                                    />
                                )
                            }
                            <Text onPress={() => navigation.navigate('Comment', {
                                postId: item.id,
                                uid: item.user.uid,
                            })}>
                                View Comments...
                            </Text>
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

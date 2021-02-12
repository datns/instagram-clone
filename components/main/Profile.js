import React from 'react';
import {View, Text, FlatList, StyleSheet, Image, Button} from 'react-native';
import {useSelector} from "react-redux";
import firebase from "firebase";
import "firebase/firestore";

export default function Profile(props) {
    const [userPost, setUserPosts] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [following, setFollowing] = React.useState(false);
    const posts = useSelector(store => store.userState.posts);
    const userFollowing = useSelector(store => store.userState.following);
    const currentUser = useSelector(store => store.userState.currentUser);
    const currentUserId = firebase.auth().currentUser.uid;
    const uid = props.route.params.uid;

    React.useEffect(() => {
        if (uid === currentUserId) {
            setUser(currentUser);
            setUserPosts(posts);
        } else {
            firebase.firestore().collection("users")
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data())
                    } else {
                        console.log('does not exist')
                    }
                });
            firebase.firestore().collection("posts")
                .doc(uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {
                            id,
                            ...data
                        }
                    })
                    setUserPosts(posts)
                })
        }
        if (userFollowing.indexOf(uid) !== -1)
            setFollowing(true);
        else setFollowing(false);
    }, [uid, userFollowing]);

    const onFollow = async () => {
        await firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(uid)
            .set({})
    }

    const onUnFollow = async () => {
        await firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(uid)
            .delete();
    }

    if (user === null)
        return (<View/>)
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                {uid !== currentUserId ? (
                    <View>
                        {following ? (
                            <Button
                                title={"Following"}
                                onPress={onUnFollow}
                            />
                        ) : (
                            <Button
                                title="Follow"
                                onPress={onFollow}
                            />
                        )}
                    </View>
                ) : null}
            </View>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPost}
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

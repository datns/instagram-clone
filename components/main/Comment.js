import React from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';

import firebase from "firebase";
import "firebase/firestore";

export default function Comment(props) {
    const [comments, setComments] = React.useState([]);
    const [postId, setPostId] = React.useState("");
    const [text, setText] = React.useState("");

    React.useEffect(() => {
        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return {id, ...data}
                    })
                    setComments(comments);
                    setPostId(props.route.params.postId);
                })
        }
    }, [props.route.params.postId]);

    const onCommentSend = async () => {
        await firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View>
            <FlatList
                data={comments}
                renderItem={({item}) => (
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />
            <View>
                <TextInput
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)}
                />
                <Button
                    onPress={onCommentSend}
                    title="Send"
                />
            </View>
        </View>
    )
}

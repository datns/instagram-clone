import React from 'react';
import {View, Text, FlatList, Button, TextInput} from 'react-native';

import firebase from "firebase";
import "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsersData} from "../../redux/actions";

export default function Comment(props) {
    const [comments, setComments] = React.useState([]);
    const [postId, setPostId] = React.useState("");
    const [text, setText] = React.useState("");
    const users = useSelector(state => state.usersState.users);
    const dispatch = useDispatch();

    React.useEffect(() => {
        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }
                const user = users.find(x => x.uid === comments[i].creator);
                if (user === undefined) {
                    dispatch(fetchUsersData(comments[i].creator, false));
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments);
        }

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
                    matchUserToComment(comments);
                })
            setPostId(props.route.params.postId);
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, users]);

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
                extraData={users}
                renderItem={({item}) => {
                    return (
                        <View>
                            {item.user !== undefined ?
                                <Text>
                                    {item.user.name}
                                </Text> : null}
                            <Text>{item.text}</Text>
                        </View>
                    )
                 }
                }
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

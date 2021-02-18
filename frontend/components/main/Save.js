import React from 'react';
import {View, TextInput, Image, Button} from 'react-native';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/firebase-storage";

export default function Save(props) {
    const [caption, setCaption] = React.useState('');
    const uri = props.route.params.image
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
    const uploadImage = async () => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const task = firebase.storage().ref().child(childPath).put(blob);
        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log('taskCompleted', snapshot)
            });
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = async (downloadURL) => {
        try {
            const result = await firebase.firestore().collection('posts')
                .doc(firebase.auth().currentUser.uid)
                .collection('userPosts')
                .add({
                    downloadURL,
                    caption,
                    creation: firebase.firestore.FieldValue.serverTimestamp()
                });
            if (result)
                props.navigation.popToTop();
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri}}/>
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={uploadImage}/>
        </View>
    )
}

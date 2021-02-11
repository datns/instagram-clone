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
                console.log('taskCompleted', snapshot)
            });
        }

        const taskError = snapshot => {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
    console.log(props);
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

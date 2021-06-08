import React, {useEffect, useState} from 'react'
import {Image, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ChildNameScreen(props) {
    const [childName, setChildName] = useState('');
    const [childData, setChildData] = useState(null);

    // setChildData(props.e);
    const onContinuePress = () => {
        console.log(props.extraData)
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        if (childName && childName.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                id: props.extraData.id,
                email: props.extraData.email,
                fullName: props.extraData.fullName,
                children: [
                    {name: childName, level: props.route.params.level, birthDay: props.route.params.birthDay}
                ]
            };
            console.log(data)
            childRef
                .set(data)
                .then(_doc => {
                    setChildName('')
                    props.navigation.navigate('Courses')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }
    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto',marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='angle-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 30, paddingRight: 20}}
                />
            </TouchableOpacity>
                <View style={styles.buttonsWrapper}>
                    <Text style={{color: 'black', fontSize: 24, margin: 'auto'}}>{props.route.params.level} {props.route.params.birthDay.toString()}</Text>
                    {/*<Text style={{color: 'black', fontSize: 24, margin: 'auto'}}>your child’s Name</Text>*/}
                </View>
            <TextInput
                style={styles.input}
                placeholder='Enter Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setChildName(text)}
                value={childName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <TouchableOpacity
                    style={styles.button}
                    onPress={() => onContinuePress()}
                >
                        <Text style={styles.buttonTitle}>Continue</Text>
                </TouchableOpacity>
        </View>
    )
}

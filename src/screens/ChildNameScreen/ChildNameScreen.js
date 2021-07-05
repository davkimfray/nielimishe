import React, {useEffect, useState} from 'react'
import {Image, ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Updates from 'expo-updates';

export default function ChildNameScreen(props) {
    const [childName, setChildName] = useState('');
    const [childData, setChildData] = useState(null);
    const [loading, setLoading] = useState(false)

    const listOfChildren = props.route.params.children ? props.route.params.children : []

    // setChildData(props.e);
    const onContinuePress = () => {
        setLoading(true)
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        if (childName && childName.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
              let data;
          
            if(listOfChildren.length > 0) {
               const children = []
              for(let i=0; i <= listOfChildren.length; i++) {
                  if (i === listOfChildren.length) {
                    children.push({name: childName, level: props.route.params.level, birthDay: props.route.params.birthDay})
                  }else {
                      const val = listOfChildren[i]
                    children.push(val)
                  }  
              }
              const selectedChild = children.length - 1
     data = {
                    id: props.extraData.id,
                    email: props.extraData.email,
                    fullName: props.extraData.fullName,
                    selectedChild: selectedChild,
                    role: props.extraData.role,
                    children: children
                }; 
            } else {
                data  = {
                    id: props.extraData.id,
                    email: props.extraData.email,
                    fullName: props.extraData.fullName,
                    selectedChild: 0,
                    role: props.extraData.role,
                    children: [
                        {name: childName, level: props.route.params.level, birthDay: props.route.params.birthDay}
                    ]
                };
            }
            childRef
                .set(data)
                .then(_doc => {
                    setChildName('')
                    props.navigation.navigate('Home')
                    Keyboard.dismiss()
                    setLoading(false)
                       })
                .catch((error) => {
                    alert(error)
                    setLoading(false)
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
                    <Text style={{color: 'black', fontSize: 24, margin: 'auto'}}>your child’s Name</Text>
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
                    style={loading ? [styles.button, sharedStyles.disabledButton] : styles.button}
                    onPress={() => onContinuePress()}
                >
                          {loading ? 
                            <ActivityIndicator size={'large'} color={'#FCB97D'} style={{paddingRight: 16}}/>
                        :   <Text/>
                        }
                        <Text style={styles.buttonTitle}>Continue</Text>
                </TouchableOpacity>
        </View>
    )
}

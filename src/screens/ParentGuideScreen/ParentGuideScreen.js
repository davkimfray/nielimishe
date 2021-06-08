
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ParentGuideScreen(props) {
    const guides = [
        {name: 'USE POSITIVE AFFIRMATIONS'},
        {name: 'INSTILL GRATITUDE'},
        {name: 'BE PRESENT'},
        {name: 'EXPOSE THEM TO NEW THINGS'},
        {name: 'DON’T LET YOUR PERCEPTION BECOME THEIR REALITY'},
        {name: 'SPEAK POLITELY'},
        {name: 'RESPOND DON’T REACT'},
        {name: 'SHOW THEM LOVE'},
    ]
let buttonStyle = [];
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
        <View style={styles.container}>
            {guides.map((guide, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => props.navigation.navigate('ChildLevel')}>
                    <Text style={styles.buttonTitle}>{guide.name.toUpperCase()}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
)
}

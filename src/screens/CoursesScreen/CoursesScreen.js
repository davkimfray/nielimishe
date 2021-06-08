
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CoursesScreen(props) {
    const courses = [
        {name: 'Counting', color: '#FD820B'},
        {name: 'Sounds', color: '#DF1125'},
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
            {courses.map((course, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, {backgroundColor: course.color}]}

                    onPress={() => props.navigation.navigate('ChildLevel')}>
                    <Text style={styles.buttonTitle}>{course.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>
)
}


import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/Feather";

export default function CourseContentScreen(props) {
    const [courses, setCourses] = useState([]);
    const colors = ['#FD820B','#DF1125']


    useEffect(() => {
        const courseRef = firebase.firestore().collection('courses')
        courseRef
            // .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    let newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = Object.keys(doc.data())
                        // entity.id = doc.id
                        newEntities = Array.prototype.concat(entity)
                    });
                    newEntities = [...new Set(newEntities)]
                    console.log(newEntities)
                    setCourses(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])



    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto',marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='chevron-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 30, paddingRight: 20}}
                />
            </TouchableOpacity>
        <View style={styles.container}>
            {courses.map((course, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, {backgroundColor: colors[index]}]}

                    onPress={() => props.navigation.navigate('ChildLevel')}>
                    <Text style={styles.buttonTitle}>{course}</Text>
                </TouchableOpacity>
            ))}
        </View>
        {/*<View style={styles.container}>*/}
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => props.navigation.navigate('AddCourseScreen')}
                    >
                    <Icon
                        name='plus'
                        color='red'
                        size={30}
                        // style={{padding: 20}}
                    />
                </TouchableOpacity>
        {/*</View>*/}

    </View>
)
}

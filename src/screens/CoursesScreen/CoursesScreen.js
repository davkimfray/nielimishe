
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/Feather";

export default function CoursesScreen(props) {
    const [courses, setCourses] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const colors = ['#FD820B','#DF1125']
let buttonStyle = [];
    
const contentLevel = props.extraData.role === 'admin' ? props.route.params.level : props.extraData.children[props.extraData.selectedChild].level 
// console.log(props.extraData.children[props.extraData.selectedChild].level);
    useEffect(() => {
        const courseRef = firebase.firestore().collection('courses')
        courseRef
        
            // .orderBy('createdAt', 'desc')
            // .onSnapshot(
            //     querySnapshot => {
            //         let newEntities = []
            //         querySnapshot.forEach(doc => {
            //             const entity = Object.keys(doc.data())
            //             // entity.id = doc.id
            //             newEntities = Array.prototype.concat(entity)
            //             console.log(doc.data())
            //         });
            //         newEntities = [...new Set(newEntities)]
            //         console.log(querySnapshot)
            //         setCourses(newEntities)
            //     },

                .doc(contentLevel)
                // .withConverter()
                // .orderBy('createdAt', 'desc')
                .onSnapshot(
                    querySnapshot => {
                        setCourses(Object.keys(querySnapshot.data()))
                        setCoursesData(querySnapshot.data())
                    },
                error => {
                    console.log(error)
                }
            )
    }, [])



    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto',marginTop: 40}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='chevron-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 8, paddingRight: 20}}
                />
              </TouchableOpacity>
        <View style={styles.container}>
            {courses.map((course, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, {backgroundColor: colors[index]}]}

                    onPress={() => props.navigation.navigate('CourseContentScreen', {courseName: course, courseData: coursesData[course]})}>
                    <Text style={styles.buttonTitle}>{course}</Text>
                </TouchableOpacity>
            ))}
        </View>
        {/*<View style={styles.container}>*/}
       { props.extraData.role === 'admin' ?
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => props.navigation.navigate('AddCourseScreen', {level: props.route.params.level})}
                    >
                    <Icon
                        name='plus'
                        color='red'
                        size={30}
                        // style={{padding: 20}}
                    />
                </TouchableOpacity>
                : <Text/>
}
        {/*</View>*/}

    </View>
)
}

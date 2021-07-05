
import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CoursesScreen(props) {
    const [courses, setCourses] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [loading, setLoading] = useState(true)

    const getRandomColor = () => { 
        return 'rgb(' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ')';
     }

    const colors = ['#FD820B','#DF1125']
let buttonStyle = [];
    
let contentLevel
    let userData;
    useEffect(() => {
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        childRef
        .onSnapshot(querySnapshot => {
            userData = querySnapshot.data()
            contentLevel = props.extraData.role === 'admin' ? props.route.params.level : userData.children[userData.selectedChild].level 

            const courseRef = firebase.firestore().collection('courses')
            courseRef
                    .doc(contentLevel)
                    .onSnapshot(
                        querySnapshot => {
                            setCourses(Object.keys(querySnapshot.data()))
                            setCoursesData(querySnapshot.data())
                            setLoading(false)
                        },
                    error => {
                        console.log(error)
                        setLoading(false)
                    }
                )
        })
    }, [])


    return (
        <View style={sharedStyles.container}>
                          <View style={sharedStyles.screenTitleWrapper}>
                    <TouchableOpacity style={{flex: 1}} 
                        onPress={() => props.navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                        />
                    </TouchableOpacity>

<TouchableOpacity
                            style={{paddingRight: 0, borderRadius: 50, backgroundColor: 'white', elevation: 3}}
                onPress={() => {props.navigation.navigate('ProfileScreen')}}>
                <Icon
                            name='user-circle'
                            color='#FCB97D'
                            size={36}
                        />
                    </TouchableOpacity>
                </View>
        {loading ? 
           <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
           <ActivityIndicator size={80} color={'#FCB97D'}/>
       </View>
        :
        <View style={styles.container}>
            {courses.map((course, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.button, {backgroundColor: getRandomColor()}]}

                    onPress={() => props.navigation.navigate('CourseContentScreen', {courseName: course, courseData: coursesData[course]})}>
                    <Text style={styles.buttonTitle}>{course}</Text>
                </TouchableOpacity>
            ))}
        </View>
}
        {/*<View style={styles.container}>*/}
       { props.extraData.role === 'admin' ? 
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => props.navigation.navigate('AddCourseScreen', {level: props.route.params.level})}
                    >
                    <Icon
                        name='plus'
                        color='white'
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

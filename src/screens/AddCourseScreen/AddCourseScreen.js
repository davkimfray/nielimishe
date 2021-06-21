import React, {useEffect, useState} from 'react'
import {Image, Picker, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import sharedStyles from "../sharedStyles"
import styles from "./styles"
import {firebase} from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";

export default function AddCourseScreen(props) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [course, setCourse] = useState("");
    const [courses, setCourses] = useState([]);
    const [level, setLevel] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        const courseRef = firebase.firestore().collection('courses')
        courseRef
        .doc(props.route.params.level)
            // .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    setCourses(Object.keys(querySnapshot.data()))
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onSubmitPressed = () => {
        let newCourse = ''
        if (selectedCourse.trim().length > 0) {
            if (selectedCourse === 'new') {
                if (course.trim().length < 1) {
                    alert("Add New Course or Select available course.")
                    return
                } else newCourse = course
            } else newCourse = selectedCourse
        } else {
            alert("Select available course or Select Add New Course to add new one.")
            return
        }
        // if (level.trim().length < 1) {
        //     alert("Select Level.")
        //     return
        // }
        if (link.trim().length < 1) {
            alert("Add Content Link.")
            return
        }

        if (newCourse.trim().length > 0 && link.trim().length > 0) {

            console.log(newCourse)
            let data = {}
            data[newCourse] = firebase.firestore.FieldValue.arrayUnion(link)
console.log(data);
                    const courseRef = firebase.firestore().collection('courses')
                    const courseContentRef = firebase.firestore().collection('courseContent')
                    courseRef
                        .doc(props.route.params.level)
                        .update(data)
                        .then(() => {
                            props.navigation.navigate('Courses')
                        })
                        .catch((error) => {
                            alert(error)
                        });
            // courseContentRef
            //             .doc(uid)
            //             .set(data)
            //             .then(() => {
            //                 navigation.navigate('Home', {user: data})
            //             })
            //             .catch((error) => {
            //                 alert(error)
            //             });
        }
        // firebase
        //     .auth()
        //     .createUserWithEmailAnddescription(email, description)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         const data = {
        //             id: uid,
        //             email,
        //             fullName: email,
        //             role: 'user'
        //         };
        //         const usersRef = firebase.firestore().collection('users')
        //         usersRef
        //             .doc(uid)
        //             .set(data)
        //             .then(() => {
        //                 navigation.navigate('Home', {user: data})
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             });
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     });
    }

    return (
        <View style={sharedStyles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                style={{flex: 1, width: '100%'}}
                keyboardShouldPersistTaps="always">
                <View style={sharedStyles.screenTitleWrapper}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                            style={{paddingLeft: 30, paddingRight: 20}}
                        />
                    </TouchableOpacity>
                    <Text style={[sharedStyles.screenTitle, {backgroundColor: 'transparent'}]}/>
                </View>
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                <Text style={{marginLeft: '12%', color: 'gray'}}>Select Course</Text>
                <View style={sharedStyles.selectInput}>
                    <Picker
                        selectedValue={selectedCourse}
                        style={{width: '100%'}}
                        onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
                    >
                        <Picker.Item label="Select Course" color="gray" value=""/>
                        {courses.map((value, index) => (
                            <Picker.Item key={index} label={value} value={value}/>
                        ))}
                        <Picker.Item label="Add New Course" value="new"/>
                    </Picker>
                </View>
                {selectedCourse === 'new' ?
                    <TextInput
                        style={sharedStyles.input}
                        placeholder='Add New Course'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setCourse(text)}
                        value={course}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    : <Text/>
                }

                {/* <Text style={{marginLeft: '12%', color: 'gray'}}>Select Level</Text>
                <View style={sharedStyles.selectInput}>
                    <Picker
                        selectedValue={level}
                        style={{width: '100%'}}
                        onValueChange={(levelValue, itemIndex) => setLevel(levelValue)}
                        placeholder="Select Level"
                    >
                        <Picker.Item label="Select Level" color="gray" value=""/>
                        <Picker.Item label="Low" value="Low"/>
                        <Picker.Item label="Medium" value="Medium"/>
                        <Picker.Item label="High" value="High"/>
                    </Picker>
                </View> */}
                <Text style={{marginLeft: '12%', marginTop: 16, color: 'gray'}}>Add Video Id</Text>
                <TextInput
                    style={sharedStyles.input}
                    placeholder='Add Video Id'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setLink(text)}
                    value={link}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                <TouchableOpacity
                    style={sharedStyles.button}
                    onPress={() => onSubmitPressed()}>
                    <Text style={styles.buttonTitle}>Submit</Text>
                </TouchableOpacity>
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
            </KeyboardAwareScrollView>
        </View>
    )
}

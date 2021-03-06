import React, {useEffect, useState} from 'react'
import {Image, Picker, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import sharedStyles from "../sharedStyles"
import styles from "./styles"
import {firebase} from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

export default function AddCourseScreen(props) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [course, setCourse] = useState("");
    const [courses, setCourses] = useState([]);
    const [level, setLevel] = useState("");
    const [link, setLink] = useState("");
    const [userPhone, setUserPhone] = useState({})
    const uid = props.extraData.id
    let userPhoneNumber = []

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

    const sendSms = () => {
        axios
            .post('https://tanzaniatx.herokuapp.com/sms/', {
                "phonenumber": "0686206206",
                "message": "Hello Nielimishe have added a new course, please open our app to check!"
            }).then(r => {
            console.log('response is: ', r);
        }).catch(reason => {
            console.log('error occured: ', reason)
        })
    }

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
        if (link.trim().length < 1) {
            alert("Add Content Link.")
            return
        }

        if (newCourse.trim().length > 0 && link.trim().length > 0) {

            console.log(newCourse)
            let data = {}
            data[newCourse] = firebase.firestore.FieldValue.arrayUnion(link)
            const courseRef = firebase.firestore().collection('courses')
            courseRef
                .doc(props.route.params.level)
                .update(data)
                .then(() => {
                    sendSms();
                    props.navigation.navigate('Courses')
                })
                .catch((error) => {
                    alert(error)
                });
        }
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

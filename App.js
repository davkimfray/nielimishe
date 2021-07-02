import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {
    LoginScreen, HomeScreen, RegistrationScreen, HelpScreen, ChildLevelScreen,
    ChildBirthdayScreen, ChildNameScreen, CoursesScreen, EBooksScreen, ParentGuideScreen,
    AddCourseScreen, ProfileScreen, AddEbookScreen, CourseContentScreen
} from './src/screens'
import {firebase} from './src/firebase/config'
import {decode, encode} from 'base-64'
import {View, Text, Image} from "react-native";

if (!global.btoa) {
    global.btoa = encode
}
if (!global.atob) {
    global.atob = decode
}

const Stack = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)


    useEffect(() => {
        const usersRef = firebase.firestore().collection('users');
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data()
                        setLoading(false)
                        setUser(userData)
                    })
                    .catch((error) => {
                        setLoading(false)
                    });
            } else {
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (

            // <Text>Loading...</Text>
            <Image source={require('../nielimishe/assets/nielimishe-Splash.png')} />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    // headerStyle: {backgroundColor: '#621FF7'},
                    headerTitleAlign: 'center',
                    // headerBackTitleVisible: true,
                    // headerTintColor: '#fff',
                    // headerTitleStyle: {
                    //     fontWeight: 'bold',
                    // },
                }}
            >
                {user ? (
                    <>
                        <Stack.Screen name="Home" options={{headerShown: false}}>
                            {props => <HomeScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ChildLevel" options={{headerShown: false}}>
                            {props => <ChildLevelScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ChildBirthday" options={{headerShown: false}}>
                            {props => <ChildBirthdayScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ChildName" options={{headerShown: false}}>
                            {props => <ChildNameScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="Courses" options={{headerShown: false}}>
                            {props => <CoursesScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        {/*<Stack.Screen name="CourseContentScreen" options={{headerShown: false}}>*/}
                        {/*    {props => <CourseContentScreen {...props} extraData={user}/>}*/}
                        {/*</Stack.Screen>*/}
                        <Stack.Screen name="AddCourseScreen" options={{headerShown: false}}>
                            {props => <AddCourseScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="EBooks" options={{headerShown: false}}>
                            {props => <EBooksScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ParentGuide" options={{headerShown: false}}>
                            {props => <ParentGuideScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="ProfileScreen" options={{headerShown: false}}>
                            {props => <ProfileScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                        <Stack.Screen name="AddEbookScreen" options={{headerShown: false}}>
                            {props => <AddEbookScreen {...props} extraData={user}/>}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Register" component={RegistrationScreen} options={{headerShown: false}}/>
                        <Stack.Screen name="Help" component={HelpScreen} options={{headerShown: false}}/>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

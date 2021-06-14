import React, {useState} from "react";
import {View, Image, TextInput, TouchableOpacity, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import styles from './styles'
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";


export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Register')
    }

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={sharedStyles.container}>
            <KeyboardAwareScrollView
                style={{flex: 1, width: '100%'}}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                keyboardShouldPersistTaps="always">
                <View style={sharedStyles.screenTitleWrapper}>
                    <Text style={sharedStyles.screenTitle}>Login</Text>
                </View>
                <Image style={sharedStyles.logo} source={require('../../../assets/nielimishe-logo.png')}/>
                <Text style={sharedStyles.logoText}>Nielimishe</Text>
                <TextInput
                    style={sharedStyles.input}
                    placeholder='Email'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={sharedStyles.input}
                    placeholder='Password'
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.buttonTitle}>Not Registered?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Help')}>
                        <Text style={styles.buttonTitle}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                <TouchableOpacity
                    style={sharedStyles.buttonLogin}
                    onPress={() => onLoginPress()}>
                    <Text style={styles.buttonLoginTitle}>Log in</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        </View>
    )
}

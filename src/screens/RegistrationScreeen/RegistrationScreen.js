import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";

export default function RegistrationScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    fullName: email,
                    role: 'user'
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <View style={sharedStyles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={sharedStyles.screenTitleWrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                            style={{paddingLeft: 30, paddingRight: 20}}
                        />
                    </TouchableOpacity>
                    <Text style={sharedStyles.screenTitle}>Register</Text>
                </View>
                <Image
                    style={sharedStyles.logo}
                    source={require('../../../assets/nielimishe-logo.png')}
                />
                <Text style={sharedStyles.logoText}>Nielimishe</Text>
                <TextInput
                    style={sharedStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={sharedStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={sharedStyles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.buttonsWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonTitle}>Already Registered?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Help')}>
                        <Text style={styles.buttonTitle}>Need Help?</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{flex: 1}}/>{/*Just for vertical align center*/}
                <TouchableOpacity
                    style={styles.buttonRegister}
                    onPress={() => onRegisterPress()}>
                    <Text style={sharedStyles.buttonRegisterTitle}>Register</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        </View>
    )
}

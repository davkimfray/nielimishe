import React, { useState } from 'react'
import { Image, Text, ActivityIndicator, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";

export default function RegistrationScreen({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)


    const onRegisterPress = () => {
        setLoading(true);
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
        setLoading(false);
        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
        setLoading(false);
    });
            })
            .catch((error) => {
                alert(error)
        setLoading(false);
    });
    }

    return (
        <View style={sharedStyles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={sharedStyles.screenTitleWrapper}>
                    {/* <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                            style={{paddingLeft: 30, paddingRight: 20}}
                        />
                    </TouchableOpacity> */}
                    <Text style={sharedStyles.screenTitle}>Register</Text>
                </View>
                <View style={{flex:1}}/>
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
     
                <TouchableOpacity
                    style={loading ? [styles.buttonRegister, sharedStyles.disabledButton] : styles.buttonRegister}
                    disabled={loading}
                    onPress={() => onRegisterPress()}>
                        {loading ? 
                            <ActivityIndicator size={'large'} color={'#8962F8'} style={{paddingRight: 16}}/>
                        :   <Text/>
                        }
                    <Text style={styles.buttonRegisterTitle}>Register</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center",marginTop:20}}>
                    <Text style={sharedStyles.footerText}>Alredy have an account? <Text onPress={() => navigation.navigate('Login')
} style={sharedStyles.footerLink}>Log in</Text></Text>
                </View>

                <View style={sharedStyles.footerView}>
                    {/* <Text onPress={() => navigation.navigate('Help')} style={sharedStyles.footerLink}>Need Help?</Text> */}
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

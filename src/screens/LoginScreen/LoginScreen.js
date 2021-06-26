import React, {useState} from "react";
import {View, ActivityIndicator, Image, TextInput, TouchableOpacity, Text} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import styles from './styles'
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";
import { color } from "react-native-reanimated";


export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onLoginPress = () => {
        setLoading(true);
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
                        setLoading(false)
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                    })
                    .catch(error => {
                        alert(error)
                        setLoading(false)
                    });
            })
            .catch(error => {
                alert(error)
                setLoading(false)
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
                <View style={{flex:1}}/>
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
<TouchableOpacity
                    style={loading ? [styles.button, sharedStyles.disabledButton] : styles.button}
                    disabled={loading}
                    onPress={() => onLoginPress()}>
                        {loading ? 
                            <ActivityIndicator size={'large'} color={'#8962F8'} style={{paddingRight: 16}}/>
                        :   <Text/>
                        }
                    <Text style={styles.buttonLoginTitle}>Log in</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, alignItems: "center",marginTop:20}}>
                    <Text style={sharedStyles.footerText}>Don't have an account? <Text onPress={() => navigation.navigate('Register')
} style={sharedStyles.footerLink}>Register</Text></Text>
                </View>

                <View style={sharedStyles.footerView}>
                    {/* <Text onPress={() => navigation.navigate('Help')} style={sharedStyles.footerLink}>Need Help?</Text> */}
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

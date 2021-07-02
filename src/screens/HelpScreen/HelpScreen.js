import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'

export default function HelpScreen({navigation}) {
    const [email, setEmail] = useState('')

    const onAlreadyRegisteredPress = () => {
        navigation.navigate('Login')
    }
    const onHelpPress = () => {
        // navigation.navigate('Help')
    }

    return (
        <View style={sharedStyles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={sharedStyles.screenTitleWrapper}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                            style={{paddingLeft: 10, paddingRight: 20}}
                        />
                    </TouchableOpacity>

                        <Text style={sharedStyles.screenTitle}>Help</Text>
                </View>
                <View style={styles.buttonsWrapper}>
                    <Text style={{color: 'black', fontWeight: 'bold', margin: 'auto'}}>Enter Register mail-id to recover your account</Text>
                </View>
                <TextInput
                    style={sharedStyles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonTitle}>Send recover mail</Text>
                    </TouchableOpacity>

            </KeyboardAwareScrollView>
        </View>
    )
}

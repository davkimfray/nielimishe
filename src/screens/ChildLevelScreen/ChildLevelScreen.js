import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'

export default function ChildLevelScreen(props) {
    const [email, setEmail] = useState('')

    const onAlreadyRegisteredPress = () => {
        navigation.navigate('Login')
    }
    const onHelpPress = () => {
        // navigation.navigate('Help')
    }

    const onRegisterPress = () => {

    }

    return (
        <View style={sharedStyles.container}>
            <TouchableOpacity
                style={{marginLeft: 0, marginRight: 'auto',marginTop: 50}}
                onPress={() => props.navigation.goBack()}>
                <Icon
                    name='angle-left'
                    color='black'
                    size={36}
                    style={{paddingLeft: 30, paddingRight: 20}}
                />
            </TouchableOpacity>
                <View style={styles.buttonsWrapper}>
                    <Text style={{color: 'black', fontSize: 24, margin: 'auto'}}>Select your child’s level</Text>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {props.navigation.navigate('ChildBirthday', {level: 'Low'})}}>
                    <View style={styles.indicatorWrapper}>
                        <Text style={styles.indicatorLow}/>
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', color: 'black'}}>Low</Text>
                        <Text style={styles.buttonTitle}>2 Years</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('ChildBirthday', {level:'Medium'})}>
                    <View style={styles.indicatorWrapper}>
                        <Text style={styles.indicatorMedium}/>
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', color: 'black'}}>Medium</Text>
                        <Text style={styles.buttonTitle}>3-4 Years</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('ChildBirthday', {child: {level: 'High'}})}>
                    <View style={styles.indicatorWrapper}>
                        <Text style={styles.indicatorHigh}/>
                    </View>
                    <View>
                        <Text style={{fontWeight: 'bold', color: 'black'}}>High</Text>
                        <Text style={styles.buttonTitle}>5-6 Years</Text>
                    </View>
                </TouchableOpacity>
        </View>
    )
}

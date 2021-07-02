import React, {useEffect, useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import sharedStyles from "../sharedStyles";
import { firebase } from '../../firebase/config'
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ChildBirthdayScreen(props) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [childData, setChildData] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(  () => {
        // setChildData(props.route.params)
        // setChildData({level: props.route.params, birthDay: 'currentDate'})
        return () => {
        setShow(false)
    }
    });

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
        // setChildData({level: childData.level, birthDay: 'currentDate'})
    };

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
                    <Text style={{color: 'black', fontSize: 24, margin: 'auto'}}>Select your child’s birthday</Text>
                </View>
            <Text style={{color: '#FD820B'}}>please enter a date</Text>
            <Text
                style={styles.dateInput}
                onPress={() => setShow(true)}
            >
                {date.toDateString()}
            </Text>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
            <Text style={{flex: 1}}/>{/*Just for vertical align center*/}

            <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.navigation.navigate('ChildName', {children: props.route.params.children, level: props.route.params.level, birthDay: new Date(date).toDateString()})}
                >
                        <Text style={styles.buttonTitle}>Next</Text>
                </TouchableOpacity>
        </View>
    )
}


import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function HomeScreen(props) {
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [child, setChild] = useState('')
    const [userID, setUserID] = useState(null)

    const entityRef = firebase.firestore().collection('child')

    useEffect(() => {
        setUserID(props.extraData.id)
        setChild(props.extraData.children)
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }


    const renderEntity = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {index}. {item.text}
                </Text>
            </View>
        )
    }

    return (

        <View style={styles.container}>
            {/*<View>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        placeholder='Add new entity'*/}
            {/*        placeholderTextColor="#aaaaaa"*/}
            {/*        onChangeText={(text) => setEntityText(text)}*/}
            {/*        value={entityText}*/}
            {/*        underlineColorAndroid="transparent"*/}
            {/*        autoCapitalize="none"*/}
            {/*    />*/}
            {/*    <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>*/}
            {/*        <Text style={styles.buttonText}>Add</Text>*/}
            {/*    </TouchableOpacity>*/}
            {/*</View>*/}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {props.navigation.navigate(props.extraData.role === 'admin' ? 'ChildLevel' : child ? 'Courses' : 'ChildLevel', {goTo: 'Courses'})}}>
                <Text style={styles.buttonTitle}>Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {props.navigation.navigate(props.extraData.role === 'admin' ? 'ChildLevel' : child ? 'EBooks' : 'ChildLevel', {goTo: 'EBooks'})}}>
                <Text style={styles.buttonTitle}>E-Book</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {props.navigation.navigate(props.extraData.role === 'admin' ? 'ChildLevel' : child ? 'ParentGuide' : 'ChildLevel', {goTo: 'ParentGuide'})}}>
                <Text style={styles.buttonTitle}>Parenting Guide</Text>
            </TouchableOpacity>
    </View>
)
}

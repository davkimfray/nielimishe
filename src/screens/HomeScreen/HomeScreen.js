
import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import Icon from "react-native-vector-icons/FontAwesome";
import sharedStyles from "../sharedStyles";

export default function HomeScreen(props) {
    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])
    const [child, setChild] = useState('')
    const [userID, setUserID] = useState(null)
    const [loading, setLoading] = useState(true)

    const entityRef = firebase.firestore().collection('child')

    useEffect(() => {
        const usersRef = firebase.firestore().collection('users').doc(props.extraData.id)        ;
                usersRef
                    .onSnapshot(document => {
                        const userData = document.data()
                        setLoading(false)
                        setUserID(props.extraData.id)
                        setChild(userData.children)
                        console.log(userData.children
                            );

  })
                    // .catch((error) => {
                    //     setLoading(false)
                    // });
    }, []);


    return (

        <View style={sharedStyles.container}>
                    <View style={sharedStyles.screenTitleWrapper}>
                    <Text style={{flex: 1}} />

<TouchableOpacity
                            style={{paddingRight: 0, borderRadius: 50, backgroundColor: 'white', elevation: 3}}
                onPress={() => {props.navigation.navigate('ProfileScreen')}}>
                <Icon
                            name='user-circle'
                            color='#FCB97D'
                            size={36}
                        />
                    </TouchableOpacity>
                </View>
                {loading ? 
           <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}}>
           <ActivityIndicator size={80} color={'#8962F8'}/>
       </View>
        :
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
                onPress={() => {props.navigation.navigate('ParentGuide', {goTo: 'ParentGuide'})}}>
                <Text style={styles.buttonTitle}>Parenting Guide</Text>
            </TouchableOpacity>
    </View>
}
    </View>
)
}


import React, { useEffect, useState } from 'react'
import {Text, FlatList, ActivityIndicator, Image, ImageBackground, TouchableOpacity, View, Button} from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import math from "../../../assets/ebooks/see_inside_maths.jpg"
import { FAB } from "react-native-paper";

export default function EBooksScreen(props) {
    const books = [
        {name: 'Counting', image: math},
        {name: 'Sounds', image: math},
    ]
    const [categories, setCategories] = useState([]);
    const [ebooksData, setEbooksData] = useState([]);
    const [loading, setLoading] = useState(true)

    const getRandomColor = () => { 
        return 'rgb(' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ',' + (Math.floor(Math.random() * 252)) + ')';
     }

    const colors = ['#FD820B','#DF1125']
let buttonStyle = [];
    
let contentLevel
    let userData;
    useEffect(() => {
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        childRef
        .onSnapshot(querySnapshot => {
            userData = querySnapshot.data()
            contentLevel = props.extraData.role === 'admin' ? props.route.params.level : userData.children[userData.selectedChild].level 

            const ebookRef = firebase.firestore().collection('ebooks')
            ebookRef
                    .doc(contentLevel)
                    .onSnapshot(
                        querySnapshot => {
                            setCategories(Object.keys(querySnapshot.data()))
                            setEbooksData(querySnapshot.data())
                            setLoading(false)
                        },
                    error => {
                        console.log(error)
                        setLoading(false)
                    }
                )
        })
    }, [])

    return (
        <View style={sharedStyles.container}>
                               <View style={sharedStyles.screenTitleWrapper}>
                    <TouchableOpacity style={{flex: 1}} 
                        onPress={() => props.navigation.goBack()}>
                        <Icon
                            name='angle-left'
                            color='black'
                            size={36}
                        />
                    </TouchableOpacity>

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
           <ActivityIndicator size={80} color={'#FCB97D'}/>
       </View>
        :
        <FlatList
        contentContainerStyle={styles.container}
        data={categories}
        renderItem={({ item, index }) => (
           <TouchableOpacity
                    key={index}
                    style={[styles.button, {backgroundColor: getRandomColor()}]}

                    onPress={() => props.navigation.navigate('EBooksContentScreen', {categoryName: item, ebooksData: ebooksData[item]})}>
                    <Text style={styles.buttonTitle}>{item}</Text>
                </TouchableOpacity>
                )}
        keyExtractor={(item, index) => (item+index)}
      /> 
}
            { props.extraData.role === 'admin' ? 
                <TouchableOpacity
                    style={{
                    backgroundColor: '#FCB97D',
                    elevation: 3,
                    height: 60,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: 'center',
                    padding: 16,
                    position: 'absolute',
                    bottom: 36,
                    right: 36,
            }}
                    onPress={() => props.navigation.navigate('AddEbookScreen', {level: props.route.params.level})}
                    >
                    <Icon
                        name='plus'
                        color='white'
                        size={30}
                    />
                </TouchableOpacity>
                : <Text/>
}
    </View>
)
}

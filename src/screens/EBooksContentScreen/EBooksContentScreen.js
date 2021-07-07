import React, {useEffect, useState} from 'react'
import {
    Text,
    FlatList,
    ActivityIndicator,
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
    Button,
    Pressable
} from 'react-native'
import {firebase} from '../../firebase/config'
import sharedStyles from "../sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import math from "../../../assets/ebooks/see_inside_maths.jpg"
import styles from "./styles"

export default function EBooksContentScreen(props) {
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

    const colors = ['#FD820B', '#DF1125']

    let contentLevel
    let userData;
    useEffect(() => {
        const childRef = firebase.firestore().collection('users').doc(props.extraData.id)
        childRef
            .onSnapshot(querySnapshot => {
                userData = querySnapshot.data()
                contentLevel = props.extraData.role === 'admin' ? props.route.params.level : userData.children[userData.selectedChild].level

                const ebookRef = firebase.firestore().collection('ebooks')
                // ebookRef
                //         .doc(contentLevel)
                //         .onSnapshot(
                //             querySnapshot => {
                //                 setCategories(Object.keys(querySnapshot.data()))
                //                 setEbooksData(querySnapshot.data())
                //                 setLoading(false)
                //             },
                //         error => {
                //             console.log(error)
                //             setLoading(false)
                //         }
                //     )
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
                    onPress={() => {
                        props.navigation.navigate('ProfileScreen')
                    }}>
                    <Icon
                        name='user-circle'
                        color='#FCB97D'
                        size={36}
                    />
                </TouchableOpacity>
            </View>

            {!loading ?
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={80} color={'#8962F8'}/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{width: '100%', alignItems: 'center'}}
                    data={props.route.params.ebooksData}
                    renderItem={({item, index}) => (
                        <Pressable onPress={() => props.navigation.navigate('ViewBookDetailsScreen',
                            {
                                categoryName: item,
                                ebooksData: ebooksData[item]}
                        )}>
                        <View style={styles.container}>
                            <Image
                                style={styles.image}
                                source={{uri: item}}
                            />

                            {/* <Text style={{position: 'absolute'}}>{item}</Text> */}
                        </View>
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => (index)}
                />
            }
        </View>
    )
}

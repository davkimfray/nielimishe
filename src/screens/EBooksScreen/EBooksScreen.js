
import React, { useEffect, useState } from 'react'
import {Text, Image, ImageBackground, TouchableOpacity, View, Button} from 'react-native'
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
        <View style={styles.container}>
            {books.map((book, index) => (

                <TouchableOpacity
                        key={index}
                        style={styles.button}

                        onPress={() => props.navigation.navigate('ChildLevel')}>
                        {/*<ImageBackground key={index} source={book.image} style={styles.image}>*/}
                        {/*/!*<Text style={styles.buttonTitle}>{book.name}</Text>*!/*/}
                        {/*</ImageBackground>*/}
                     <Image
                         style={styles.image}
                         source={book.image}
                     />
                    </TouchableOpacity>

            ))}
        </View>
            <FAB medium icon='plus' style={styles.fab} onPress={() => props.navigation.navigate('AddEbookScreen')} />
    </View>
)
}

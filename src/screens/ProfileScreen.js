
import React, { useEffect, useState } from 'react'
import {Text, Image, ImageBackground, TouchableOpacity, View } from 'react-native'
import { firebase } from '../firebase/config'
import sharedStyles from "./sharedStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import math from "../../assets/ebooks/see_inside_maths.jpg"
import { StyleSheet } from 'react-native';
 
export default function ProfileScreen(props) {
    const books = [
        {name: 'Counting', image: math},
        {name: 'Sounds', image: math},
    ]
    return (
        <View style={sharedStyles.container}>
        <View style={sharedStyles.screenTitleWrapper}>

<TouchableOpacity
               onPress={() => props.navigation.goBack()}>
<Icon
    name='angle-left'
    color='black'
    size={36}
/>
</TouchableOpacity>
<Text style={{ fontSize: 18, fontWeight: "bold", paddingLeft: -24}}>My Profile</Text>
<Text/>
</View>

<View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',width: '90%',padding: 16}}>
            <Text style={{textTransform: 'uppercase',backgroundColor: '#8962F8',borderRadius: 50, padding: 16, paddingLeft:24,
                 paddingRight:24, color: 'white',fontSize: 24}}>
                 {props.extraData.fullName.slice(0,1)}
            </Text>
            <View style={{marginLeft: 24}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.extraData.email}</Text>
            <Text>{props.extraData.email}</Text>
            </View>
        </View>
        <View style={{alignItems: 'center',justifyContent: 'flex-start',flex:1,width: '95%',marginTop:30, backgroundColor: 'white', elevation:3,borderRadius:20}}>

        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',width: '90%',padding: 16,paddingBottom:0,
            "borderBottomColor": "black","borderBottomWidth": 1}}>
                {/* <Text style={{textTransform: 'uppercase',backgroundColor: '#8962F8',borderRadius: 50, padding: 16, paddingLeft:24,
                    paddingRight:24, color: 'white',fontSize: 24}}>
                    {props.extraData.fullName.slice(0,1)}
                </Text> */}
                <Icon
                    style={{padding:8}}
                    name='child'
                    color='#8962F8'
                    size={36}
                />
                <View style={{marginLeft: 24}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>children</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-start',width: '98%',padding: 16}}>
                {/* <Text style={{textTransform: 'uppercase',backgroundColor: '#8962F8',borderRadius: 50, padding: 16, paddingLeft:24,
                    paddingRight:24, color: 'white',fontSize: 24}}>
                    {props.extraData.fullName.slice(0,1)}
                </Text> */}
                <Icon
                    style={{padding:16}}
                    name='child'
                    color='#8962F8'
                    size={36}
                />
                <View style={{marginLeft: 24}}>
                <Text style={{fontSize: 24, fontWeight: 'bold'}}>children</Text>
                </View>
            </View>
        </View>

        <View style={{alignItems: 'center',justifyContent: 'flex-start',width: '95%',marginTop:30, backgroundColor: 'white', elevation:3,borderRadius:20}}>
            </View>
            <TouchableOpacity
                 style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center',width: '90%', marginBottom:40, backgroundColor: 'white', elevation:3,borderRadius:20,padding:20}}

               onPress={() => props.navigation.goBack()}>
<Icon
    name='power-off'
    color='red'
    size={28}
/>
<Text style={{fontSize: 24, paddingLeft:24, color:'red'}}>Log out</Text>
</TouchableOpacity>
    </View>
)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
    },
    image: {
        height: 300,
        width: '100%',
        borderRadius: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: 30,
        width: '70%',
        elevation: 6,
        borderRadius: 20,

    },
})
